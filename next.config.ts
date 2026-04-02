import type { NextConfig } from 'next'

/** Static HTML export for hosts like Hostinger (`out/` includes `index.html`). Not used on Vercel if you prefer SSR—see README. */
const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}

export default nextConfig
