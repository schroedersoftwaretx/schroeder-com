import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import { formatDate, getBlogPosts, getSortedBlogPosts } from 'app/blog/utils'
import { extractHeadings, readingTime } from 'app/blog/text'
import TableOfContents from 'app/components/blog/TableOfContents'
import PostFooter from 'app/components/blog/PostFooter'
import { baseUrl, siteName } from 'app/site'

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  let posts = getBlogPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  let post = getBlogPosts().find((post) => post.slug === slug)
  if (!post) {
    return
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata
  // Only pin an image when the post declares one. Left unset, Next's
  // opengraph-image convention supplies a card generated from this post's
  // title — setting `images` here would silently override it.
  const explicitImage = image
    ? image.startsWith('http')
      ? image
      : `${baseUrl}${image}`
    : null

  return {
    title,
    description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      ...(explicitImage ? { images: [{ url: explicitImage }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(explicitImage ? { images: [explicitImage] } : {}),
    },
  }
}

export default async function Blog({ params }: PageProps) {
  const { slug } = await params
  const posts = getSortedBlogPosts()
  const index = posts.findIndex((post) => post.slug === slug)

  if (index === -1) {
    notFound()
  }

  const post = posts[index]
  const headings = extractHeadings(post.content)

  // `posts` is newest-first, so the preceding entry is the newer one.
  const toNeighbor = (i: number) =>
    posts[i] ? { slug: posts[i].slug, title: posts[i].metadata.title } : null
  const newer = toNeighbor(index - 1)
  const older = toNeighbor(index + 1)

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            // Mirrors the metadata resolution above: a declared image wins,
            // otherwise the generated card. Filename matches what
            // scripts/fix-og-images.mjs produces at postbuild.
            image: post.metadata.image
              ? post.metadata.image.startsWith('http')
                ? post.metadata.image
                : `${baseUrl}${post.metadata.image}`
              : `${baseUrl}/blog/${post.slug}/opengraph-image.png`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              '@type': 'Person',
              name: siteName,
            },
          }),
        }}
      />
      <h1 className="measure title font-semibold text-2xl tracking-tighter">
        {post.metadata.title}
      </h1>
      <div className="measure flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.metadata.publishedAt)}
          <span aria-hidden="true"> · </span>
          {readingTime(post.content)} min read
        </p>
      </div>
      <TableOfContents headings={headings} />
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
      <PostFooter newer={newer} older={older} />
    </section>
  )
}
