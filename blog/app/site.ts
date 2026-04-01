/** Site-wide copy and canonical URL. Prefer NEXT_PUBLIC_SITE_URL in production (no trailing slash). */
export const siteName = "Sean Aidan O'Toole"

export const siteDescription =
  'Software engineer and data scientist — portfolio, blog, and resume.'

const explicitUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, '') ?? ''

/** Empty env var must not win over the fallback — `??` alone keeps `""` and breaks `new URL(baseUrl)` in layout metadata. */
export const baseUrl = (
  explicitUrl.length > 0
    ? explicitUrl
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'https://schroeder.com'
) as string
