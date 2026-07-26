import fs from 'fs'
import path from 'path'

type Metadata = {
  title: string
  publishedAt: string
  summary: string
  image?: string
}

const REQUIRED_FIELDS = ['title', 'publishedAt', 'summary'] as const

/**
 * Matches a frontmatter block only at the very top of the file. Anchoring
 * matters: an unanchored regex will happily treat a pair of `---` horizontal
 * rules in the body as frontmatter and delete everything between them.
 */
const FRONTMATTER_REGEX = /^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/

function parseFrontmatter(fileContent: string, label: string) {
  const match = FRONTMATTER_REGEX.exec(fileContent)

  if (!match) {
    throw new Error(
      `${label}: missing or malformed frontmatter. The file must begin with a ` +
        `--- block on line 1 containing ${REQUIRED_FIELDS.join(', ')}.`
    )
  }

  // Slice past the matched block rather than .replace() — replace would strip
  // the first matching pattern anywhere in the file, not just the header.
  const content = fileContent.slice(match[0].length).trim()
  const metadata: Partial<Metadata> = {}

  match[1].split(/\r?\n/).forEach((line) => {
    if (!line.trim() || line.trimStart().startsWith('#')) return
    const separator = line.indexOf(':')
    if (separator === -1) return
    const key = line.slice(0, separator).trim()
    let value = line.slice(separator + 1).trim()
    value = value.replace(/^['"](.*)['"]$/, '$1') // Remove quotes
    if (key) metadata[key as keyof Metadata] = value
  })

  const missing = REQUIRED_FIELDS.filter((field) => !metadata[field])
  if (missing.length > 0) {
    throw new Error(
      `${label}: frontmatter is missing required field(s): ${missing.join(', ')}.`
    )
  }

  return { metadata: metadata as Metadata, content }
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx')
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, 'utf-8')
  return parseFrontmatter(rawContent, path.relative(process.cwd(), filePath))
}

function getMDXData(dir: string) {
  return getMDXFiles(dir).map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file))
    const slug = path.basename(file, path.extname(file))

    return {
      metadata,
      slug,
      content,
    }
  })
}

export function getBlogPosts() {
  return getMDXData(path.join(process.cwd(), 'app', 'blog', 'posts'))
}

export function formatDate(date: string, includeRelative = false) {
  let currentDate = new Date()
  if (!date.includes('T')) {
    date = `${date}T00:00:00`
  }
  let targetDate = new Date(date)

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth()
  let daysAgo = currentDate.getDate() - targetDate.getDate()

  let formattedDate = ''

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`
  } else {
    formattedDate = 'Today'
  }

  let fullDate = targetDate.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  if (!includeRelative) {
    return fullDate
  }

  return `${fullDate} (${formattedDate})`
}
