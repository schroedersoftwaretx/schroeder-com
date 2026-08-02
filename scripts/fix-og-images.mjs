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
 * So after a static export we rename the files and repoint every reference.
 *
 * This only applies to `output: 'export'` builds, which produce `out/`. A
 * server build produces `.next` instead, and there Next serves the route
 * itself and sets Content-Type — nothing to fix. In that case this script is
 * a no-op and must not fail the build. Do not point it at `.next`: those are
 * server build artifacts addressed through route manifests, not files served
 * by name, and renaming them would break the build.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, '..', 'out')

const IMAGE_BASENAME = 'opengraph-image'
/** Files that can carry a URL reference to the image. */
const REWRITABLE = new Set(['.html', '.txt', '.json', '.js'])

// No out/ means this was a server build, not a static export. Skip cleanly:
// failing here would break the build on any host that runs `next build` and
// `next start`, which is what production currently does.
if (!fs.existsSync(outDir)) {
  console.log(
    'fix-og-images: no out/ directory, so this was a server build — skipping ' +
      '(Next serves the opengraph-image route and sets Content-Type itself).'
  )
  process.exit(0)
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
