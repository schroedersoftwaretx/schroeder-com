import Link from 'next/link'
import { contact } from 'app/site'

type Neighbor = { slug: string; title: string } | null

function NeighborLink({
  post,
  label,
  align,
}: {
  post: Neighbor
  label: string
  align: 'left' | 'right'
}) {
  if (!post) return <div />

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group flex flex-col gap-1 rounded-lg border border-neutral-200 p-4 dark:border-neutral-800 ${
        align === 'right' ? 'sm:text-right' : ''
      }`}
    >
      <span className="text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
        {label}
      </span>
      <span className="text-sm font-medium text-neutral-900 group-hover:underline group-hover:underline-offset-4 dark:text-neutral-100">
        {post.title}
      </span>
    </Link>
  )
}

/**
 * Closes out a post with somewhere to go next. Without this a reader who
 * finishes a long piece lands on the site footer and leaves.
 */
export default function PostFooter({
  newer,
  older,
}: {
  newer: Neighbor
  older: Neighbor
}) {
  return (
    <div className="measure mt-16">
      {newer || older ? (
        <div className="grid gap-3 sm:grid-cols-2">
          <NeighborLink post={newer} label="Newer" align="left" />
          <NeighborLink post={older} label="Older" align="right" />
        </div>
      ) : null}

      <div className="mt-10 border-t border-neutral-200 pt-8 dark:border-neutral-800">
        <p className="font-medium text-neutral-900 dark:text-neutral-100">
          Sean Aidan O&apos;Toole
        </p>
        <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
          I build backend and data systems. I&apos;m looking for full-time
          software and data roles starting August 2027, in the US or the EU.
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {[
            { label: 'Email', href: `mailto:${contact.email}` },
            { label: 'GitHub', href: contact.github },
            { label: 'LinkedIn', href: contact.linkedin },
            { label: 'Projects', href: '/projects' },
            { label: 'All posts', href: '/blog' },
          ].map(({ label, href }) => {
            const external = href.startsWith('http')
            return (
              <li key={label}>
                <a
                  className="text-neutral-700 underline underline-offset-4 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100"
                  href={href}
                  {...(external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  {label}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
