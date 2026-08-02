import { ImageResponse } from 'next/og'
import { getBlogPosts } from 'app/blog/utils'
import { formatDate } from 'app/blog/utils'
import { readingTime } from 'app/blog/text'
import { siteName } from 'app/site'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Blog post preview'

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }))
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getBlogPosts().find((p) => p.slug === slug)
  const title = post?.metadata.title ?? siteName

  // Long titles need to step down a size or they overflow the card.
  const fontSize = title.length > 70 ? 58 : title.length > 45 ? 68 : 80

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0a0a0a',
          padding: '72px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            color: '#8b8b8b',
            fontSize: 26,
          }}
        >
          <div
            style={{
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              background: '#47a3f3',
            }}
          />
          <div style={{ display: 'flex' }}>schroedersoftware.com</div>
        </div>

        <div
          style={{
            display: 'flex',
            color: '#fafafa',
            fontSize,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            maxWidth: '1000px',
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            color: '#8b8b8b',
            fontSize: 28,
          }}
        >
          <div style={{ display: 'flex', color: '#d4d4d4' }}>{siteName}</div>
          {post ? (
            <div style={{ display: 'flex' }}>
              {formatDate(post.metadata.publishedAt)} ·{' '}
              {readingTime(post.content)} min read
            </div>
          ) : null}
        </div>
      </div>
    ),
    size
  )
}
