/**
 * Generates public/rss.xml at build time (Route Handlers are not available with output: 'export').
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const postsDir = path.join(__dirname, '..', 'app', 'blog', 'posts')

const REQUIRED_FIELDS = ['title', 'publishedAt', 'summary']

/** Kept in sync with parseFrontmatter in app/blog/utils.ts. */
const FRONTMATTER_REGEX = /^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/

function parseFrontmatter(content, label) {
  const m = FRONTMATTER_REGEX.exec(content)
  if (!m) {
    throw new Error(
      `${label}: missing or malformed frontmatter. The file must begin with a ` +
        `--- block on line 1 containing ${REQUIRED_FIELDS.join(', ')}.`
    )
  }
  const meta = {}
  for (const line of m[1].split(/\r?\n/)) {
    if (!line.trim() || line.trimStart().startsWith('#')) continue
    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    let val = line.slice(idx + 1).trim()
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1)
    }
    if (key) meta[key] = val
  }
  const missing = REQUIRED_FIELDS.filter((field) => !meta[field])
  if (missing.length > 0) {
    throw new Error(
      `${label}: frontmatter is missing required field(s): ${missing.join(', ')}.`
    )
  }
  return meta
}

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

const baseUrl =
  (process.env.NEXT_PUBLIC_SITE_URL || '').trim().replace(/\/$/, '') ||
  'https://schroedersoftware.com'
const siteName = "Sean Aidan O'Toole"
const siteDescription =
  'Software engineer and data scientist — portfolio, blog, and resume.'

const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.mdx'))
const posts = files
  .map((file) => {
    const raw = fs.readFileSync(path.join(postsDir, file), 'utf8')
    const metadata = parseFrontmatter(raw, path.join('app', 'blog', 'posts', file))
    const slug = path.basename(file, '.mdx')
    return { metadata, slug }
  })
  .sort(
    (a, b) =>
      new Date(b.metadata.publishedAt) - new Date(a.metadata.publishedAt)
  )

const itemsXml = posts
  .map(
    (post) => `    <item>
      <title>${escapeXml(post.metadata.title)}</title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <description>${escapeXml(post.metadata.summary || '')}</description>
      <pubDate>${new Date(post.metadata.publishedAt).toUTCString()}</pubDate>
    </item>`
  )
  .join('\n')

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteName)}</title>
    <link>${baseUrl}</link>
    <description>${escapeXml(siteDescription)}</description>
${itemsXml}
  </channel>
</rss>
`

const outDir = path.join(__dirname, '..', 'public')
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })
fs.writeFileSync(path.join(outDir, 'rss.xml'), rss, 'utf8')
console.log('Generated public/rss.xml')
