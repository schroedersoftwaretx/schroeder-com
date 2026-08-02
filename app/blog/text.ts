/**
 * Pure text helpers shared by the MDX renderer and the post chrome (TOC,
 * reading time). Deliberately free of `fs` so this module stays importable
 * from anywhere, unlike `./utils`.
 */

export type Heading = { text: string; slug: string }

export function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
}

/** Strips fenced code, which otherwise dominates the word count on these posts. */
function stripFencedCode(content: string) {
  return content.replace(/```[\s\S]*?```/g, '')
}

/**
 * Reduces a raw markdown heading to the text the renderer will actually
 * produce, so the id generated here matches the id on the rendered <h2>.
 * `## Step 1: Ingestion (\`main.py\`)` renders as "Step 1: Ingestion (main.py)".
 */
function headingToText(raw: string) {
  return raw
    .replace(/`([^`]*)`/g, '$1')
    .replace(/\*\*([^*]*)\*\*/g, '$1')
    .replace(/\*([^*]*)\*/g, '$1')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .trim()
}

/**
 * Top-level (h2) headings only — h3s would make the contents list longer than
 * the section it is meant to summarize. Code fences are removed first so a
 * `## ` inside a code sample cannot masquerade as a section.
 */
export function extractHeadings(content: string): Heading[] {
  const source = stripFencedCode(content)
  const pattern = /^##[ \t]+(.+?)[ \t]*$/gm
  const headings: Heading[] = []

  let match: RegExpExecArray | null
  while ((match = pattern.exec(source)) !== null) {
    const text = headingToText(match[1])
    if (text) headings.push({ text, slug: slugify(text) })
  }

  return headings
}

/** Words per minute for technical prose; deliberately conservative. */
const WPM = 225

export function readingTime(content: string) {
  const prose = stripFencedCode(content)
    .replace(/`[^`]*`/g, '') // inline code
    .replace(/<[^>]+>/g, ' ') // JSX component tags
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1') // links and images

  const words = prose.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / WPM))
}
