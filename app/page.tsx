import Link from 'next/link'
import { BlogPosts } from 'app/components/posts'
import { baseUrl, contact, siteName } from 'app/site'

const links = [
  { label: 'Email', href: `mailto:${contact.email}` },
  { label: 'GitHub', href: contact.github },
  { label: 'LinkedIn', href: contact.linkedin },
  { label: 'Projects', href: '/projects' },
  { label: 'Résumé', href: '/resume' },
]

/**
 * Person schema so that searches for the name resolve to this site rather than
 * to a scraped profile aggregator. Posts carry their own BlogPosting schema.
 */
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteName,
  url: baseUrl,
  email: `mailto:${contact.email}`,
  jobTitle: 'Software Engineer and Data Scientist',
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'University of Texas at San Antonio',
  },
  sameAs: [contact.github, contact.linkedin],
}

export default function Page() {
  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <h1 className="measure mb-4 text-2xl font-semibold tracking-tighter">
        Sean Aidan O&apos;Toole
      </h1>

      <p className="measure text-lg leading-relaxed text-neutral-700 dark:text-neutral-200">
        I build backend and data systems — retrieval pipelines, ETL, and the
        models that sit on top of them.
      </p>

      <div className="measure mt-6 space-y-4 text-neutral-700 dark:text-neutral-300">
        <p>
          I finished a BS in Computer Science at the University of Texas at San
          Antonio in May 2026, with a concentration in data science and software
          engineering and a minor in mathematics. This September I start a Master
          in Business Analytics and Data Science at IE University in Madrid,
          finishing in July 2027.
        </p>
        <p>
          Most recently I built{' '}
          <Link
            className="underline underline-offset-4 hover:text-neutral-900 dark:hover:text-neutral-100"
            href="/projects#world-cup-fantasy"
          >
            World Cup Fantasy
          </Link>{' '}
          over the course of seven weeks. 53,000 lines of TypeScript over 39 Postgres
          tables, with 518 tests gated in CI. Before that I built the Python
          backend for{' '}
          <Link
            className="underline underline-offset-4 hover:text-neutral-900 dark:hover:text-neutral-100"
            href="/blog/rag-chatbot"
          >
            UTSA GPT
          </Link>
          , a retrieval-augmented chatbot that grounds Gemini on private
          Firestore collections.
        </p>
        <p>
          I write here about the parts of a project that don&apos;t fit on a
          resume. Speaking about my decision process and what I learned along the way.
        </p>
        <p className="text-neutral-600 dark:text-neutral-400">
          I&apos;m looking for full-time software and data roles starting August
          2027, in the US or the EU.
        </p>
      </div>

      <ul className="measure mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
        {links.map(({ label, href }) => {
          const external = href.startsWith('http')
          return (
            <li key={label}>
              <a
                className="underline underline-offset-4 text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100"
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

      <h2 className="measure mt-14 mb-6 text-lg font-semibold tracking-tight">
        Writing
      </h2>
      <BlogPosts />
    </section>
  )
}
