/**
 * Gives the generated Open Graph images a .png extension.
 *
 * Next's `opengraph-image` metadata convention emits an extensionless file
 * (`out/blog/<slug>/opengraph-image`). On Vercel that is fine — the framework
 * sets the Content-Type. On a plain static host it is not: Apache and nginx
 * fall back to application/octet-stream for an unknown extension, and the
 * Facebook, LinkedIn, and X crawlers all reject a non-image Content-Type. The
 * failure is silent — the page still loads, the card just never renders.
 *
 * So after export we rename the files and repoint every reference at them.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, '..', 'out')

const IMAGE_BASENAME = 'opengraph-image'
/** Files that can carry a URL reference to the image. */
const REWRITABLE = new Set(['.html', '.txt', '.json', '.js'])

if (!fs.existsSync(outDir)) {
  console.error(`fix-og-images: no ${outDir} directory — run the build first.`)
  process.exit(1)
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    return entry.isDirectory() ? walk(full) : [full]
  })
}

const files = walk(outDir)

let renamed = 0
for (const file of files) {
  if (path.basename(file) !== IMAGE_BASENAME) continue
  fs.renameSync(file, `${file}.png`)
  renamed++
}

let rewritten = 0
for (const file of files) {
  if (!REWRITABLE.has(path.extname(file))) continue

  const original = fs.readFileSync(file, 'utf8')
  if (!original.includes(IMAGE_BASENAME)) continue

  // The query string is Next's cache-buster; a static host ignores it, so drop
  // it in favour of the real filename.
  const updated = original
    .replace(/opengraph-image\?[a-z0-9]+/gi, `${IMAGE_BASENAME}.png`)
    .replace(/opengraph-image(?!\.png)/g, `${IMAGE_BASENAME}.png`)

  if (updated !== original) {
    fs.writeFileSync(file, updated, 'utf8')
    rewritten++
  }
}

console.log(
  `fix-og-images: renamed ${renamed} image(s), updated ${rewritten} file(s)`
)
