import type { Heading } from 'app/blog/text'

/**
 * Rendered inline above the article rather than as a sticky sidebar: the post
 * layout gives figures the full container width, and a sidebar would force the
 * text column to give up that space permanently for a control used once.
 */
export default function TableOfContents({
  headings,
}: {
  headings: Heading[]
}) {
  if (headings.length === 0) return null

  return (
    <nav
      aria-labelledby="toc-heading"
      className="measure mb-10 rounded-xl border border-neutral-200 p-5 dark:border-neutral-800"
    >
      <h2
        id="toc-heading"
        className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400"
      >
        Contents
      </h2>
      <ol className="mt-3 grid gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2">
        {headings.map((heading, i) => (
          <li key={heading.slug} className="flex gap-2">
            <span
              aria-hidden="true"
              className="tabular-nums text-neutral-400 dark:text-neutral-600"
            >
              {i + 1}.
            </span>
            <a
              className="text-neutral-700 underline-offset-4 hover:underline dark:text-neutral-300"
              href={`#${heading.slug}`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
