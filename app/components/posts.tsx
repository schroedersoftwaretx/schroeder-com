import Link from 'next/link'
import { formatDate, getSortedBlogPosts } from 'app/blog/utils'
import { readingTime } from 'app/blog/text'

export function BlogPosts() {
  const allBlogs = getSortedBlogPosts()

  return (
    <div className="measure space-y-8">
      {allBlogs.map((post) => (
        <article key={post.slug}>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 tabular-nums">
            {formatDate(post.metadata.publishedAt, false)}
            <span aria-hidden="true"> · </span>
            {readingTime(post.content)} min read
          </p>
          <h3 className="mt-1 tracking-tight">
            <Link
              className="font-medium text-neutral-900 hover:underline hover:underline-offset-4 dark:text-neutral-100"
              href={`/blog/${post.slug}`}
            >
              {post.metadata.title}
            </Link>
          </h3>
          <p className="mt-1.5 text-neutral-700 dark:text-neutral-300">
            {post.metadata.summary}
          </p>
        </article>
      ))}
    </div>
  )
}
