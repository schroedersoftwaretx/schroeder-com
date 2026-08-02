import Link from 'next/link'
import { siteName } from 'app/site'
import { projects, type Project } from './data'

export const metadata = {
  title: 'Projects',
  description: `Selected engineering and data projects by ${siteName}.`,
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      id={project.slug}
      className="scroll-mt-8 rounded-xl border border-neutral-200 p-5 dark:border-neutral-800 md:p-6"
    >
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <h2 className="text-lg font-semibold tracking-tight">
          {project.title}
        </h2>
        <div className="flex gap-x-4 text-sm">
          {project.writeup ? (
            <Link
              className="underline underline-offset-4 text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
              href={project.writeup}
            >
              Write-up
            </Link>
          ) : null}
          {project.repo ? (
            <a
              className="underline underline-offset-4 text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
            >
              Code
            </a>
          ) : null}
        </div>
      </div>

      <p className="measure mt-3 text-neutral-700 dark:text-neutral-300">
        {project.blurb}
      </p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="rounded-md bg-neutral-100 px-2 py-0.5 font-mono text-xs text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400"
          >
            {tech}
          </li>
        ))}
      </ul>

      <ul className="measure mt-4 list-disc space-y-1.5 pl-5 text-sm text-neutral-700 dark:text-neutral-300">
        {project.highlights.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  )
}

export default function ProjectsPage() {
  return (
    <section>
      <h1 className="measure text-2xl font-semibold tracking-tighter">
        Projects
      </h1>
      <p className="measure mt-3 text-neutral-700 dark:text-neutral-300">
        A few things I&apos;ve built. Where there&apos;s a write-up, it goes into
        the design decisions and the failures in far more detail than a bullet
        point can.
      </p>

      <div className="mt-10 space-y-6">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  )
}
