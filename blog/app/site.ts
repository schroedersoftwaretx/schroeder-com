/** Site-wide copy and canonical URL. Set NEXT_PUBLIC_SITE_URL when deploying. */
export const siteName = "Sean Aidan O'Toole"

export const siteDescription =
  'Software engineer and data scientist — portfolio, blog, and resume.'

export const baseUrl = (
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'https://schroeder.com'
) as string
