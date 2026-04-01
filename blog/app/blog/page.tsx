import { BlogPosts } from 'app/components/posts'

import { siteName } from 'app/site'

export const metadata = {
  title: 'Blog',
  description: `Writing by ${siteName} — software, data, and projects.`,
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Blog</h1>
      <BlogPosts />
    </section>
  )
}
