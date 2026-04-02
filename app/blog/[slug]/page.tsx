import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import { formatDate, getBlogPosts } from 'app/blog/utils'
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
  const absoluteImage = image
    ? image.startsWith('http')
      ? image
      : `${baseUrl}${image}`
    : undefined

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      ...(absoluteImage
        ? {
            images: [{ url: absoluteImage }],
          }
        : {}),
    },
    twitter: {
      card: absoluteImage ? 'summary_large_image' : 'summary',
      title,
      description,
      ...(absoluteImage ? { images: [absoluteImage] } : {}),
    },
  }
}

export default async function Blog({ params }: PageProps) {
  const { slug } = await params
  let post = getBlogPosts().find((post) => post.slug === slug)

  if (!post) {
    notFound()
  }

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
            ...(post.metadata.image
              ? {
                  image: post.metadata.image.startsWith('http')
                    ? post.metadata.image
                    : `${baseUrl}${post.metadata.image}`,
                }
              : {}),
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              '@type': 'Person',
              name: siteName,
            },
          }),
        }}
      />
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {post.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.metadata.publishedAt)}
        </p>
      </div>
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
    </section>
  )
}
