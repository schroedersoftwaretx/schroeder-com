import Link from 'next/link'
import { contact, siteName } from 'app/site'
import { projects } from 'app/projects/data'

export const metadata = {
  title: 'Resume',
  description: `${siteName} — resume and experience.`,
}

export default function ResumePage() {
  return (
    <section>
      <h1 className="font-semibold text-2xl tracking-tighter">
        Sean Aidan O&apos;Toole
      </h1>
      {/* Phone deliberately omitted here — a public HTML page gets harvested by
          scrapers. It stays on the PDF, which is what recruiters actually keep. */}
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
        <a
          className="underline underline-offset-4"
          href={`mailto:${contact.email}`}
        >
          {contact.email}
        </a>{' '}
        |{' '}
        <a
          className="underline underline-offset-4"
          href={contact.linkedin}
          target="_blank"
          rel="noreferrer"
        >
          linkedin.com/in/seanotoole04
        </a>{' '}
        |{' '}
        <a
          className="underline underline-offset-4"
          href={contact.github}
          target="_blank"
          rel="noreferrer"
        >
          github.com/schroedersoftwaretx
        </a>
      </p>
      <p className="mt-4">
        <a
          className="text-sm text-neutral-700 dark:text-neutral-300 underline underline-offset-4 hover:text-neutral-900 dark:hover:text-neutral-100"
          href="/resume.pdf"
          download="Sean-Aidan-OToole-Resume.pdf"
        >
          Download PDF resume
        </a>
      </p>

      <div className="space-y-10 mt-8">
        <div>
          <h2 className="text-lg font-semibold mb-2">Education</h2>
          <div className="space-y-4">
            <div>
              <p className="font-medium">IE University</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Master in Business Analytics and Data Science
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Madrid, Spain | Sept 2026 - Jul 2027 (expected)
              </p>
            </div>
            <div>
              <p className="font-medium">University of Texas at San Antonio</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                B.S. Computer Science, Minor in Mathematics — Honors College
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Concentration in Data Science and Software Engineering | Aug 2022
                - May 2026 | GPA: 3.90/4.00
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Skills</h2>
          <div className="space-y-2 text-neutral-700 dark:text-neutral-300">
            <p>
              <span className="font-medium">Languages:</span> Python, SQL,
              TypeScript, R, Java, PHP, C
            </p>
            <p>
              <span className="font-medium">ML &amp; Statistics:</span>{' '}
              scikit-learn, pandas, NumPy, scipy, isotonic regression,
              clustering, Monte Carlo, backtesting, RAG, LLMs
            </p>
            <p>
              <span className="font-medium">Data Engineering:</span> ETL design,
              PostgreSQL, MySQL, SQLite, Parquet, schema normalization, entity
              resolution, AWS
            </p>
            <p>
              <span className="font-medium">Web &amp; Frameworks:</span>{' '}
              Next.js, React, Node.js, FastAPI, Drizzle ORM, Nginx
            </p>
            <p>
              <span className="font-medium">Testing &amp; CI:</span> Vitest,
              Testcontainers, Testing Library, GitHub Actions
            </p>
            <p>
              <span className="font-medium">Tools:</span> Git, Linux, Docker,
              Jupyter, Matplotlib
            </p>
            <p>
              <span className="font-medium">Languages (spoken):</span> German
              (Intermediate), Spanish (Elementary)
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Experience</h2>
          <ul className="space-y-6">
            <li>
              <p className="font-medium">Database Developer - The Experts Tribe</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                San Antonio, TX | May 2025 - August 2025
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-neutral-700 dark:text-neutral-300">
                <li>
                  Designed and maintained production PostgreSQL, MySQL, and
                  Firebase Firestore systems supporting customer-facing
                  applications.
                </li>
                <li>
                  Implemented normalized schema structures and data models to
                  support frontend integration and scalability for future
                  feature expansion.
                </li>
                <li>
                  Optimized SQL queries, indexing strategies, and schema design
                  to reduce latency and improve application responsiveness.
                </li>
              </ul>
            </li>
            <li>
              <p className="font-medium">
                Artificial Intelligence Research Assistant - University of Texas
                at San Antonio
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                San Antonio, TX | Oct 2024 - May 2025
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-neutral-700 dark:text-neutral-300">
                <li>
                  Built automated feedback loops using Llama-based LLM systems
                  to evaluate and improve software development task output.
                </li>
                <li>
                  Developed Python data pipelines with BeautifulSoup to collect,
                  clean, and process GitHub repository change requests and
                  review comments at scale.
                </li>
                <li>
                  Improved model accuracy 60% through iterative experimentation,
                  prompt refinement, and feature engineering on
                  developer-feedback classification.
                </li>
              </ul>
            </li>
            <li>
              <p className="font-medium">
                College of Science Mentor - UTSA College of Sciences Student
                Success Center
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                San Antonio, TX | Aug 2023 - June 2025
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-neutral-700 dark:text-neutral-300">
                <li>
                  Partnered with College of Sciences leadership to analyze
                  student outcome data, translating trends into actionable
                  strategies for improving engagement and retention.
                </li>
                <li>
                  Led the Four-Year Plan Committee, coordinating
                  career-readiness initiatives serving 2,000+ students across
                  timelines, budget, and resources.
                </li>
                <li>
                  Collaborated across departments to host events promoting
                  academic growth and career awareness.
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Projects</h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
            Summarized here. Each links to a fuller breakdown on the{' '}
            <Link className="underline underline-offset-4" href="/projects">
              projects page
            </Link>
            .
          </p>
          <ul className="space-y-5">
            {projects.map((project) => (
              <li key={project.slug}>
                <p className="font-medium">{project.title}</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {project.stack.join(', ')}
                </p>
                <p className="mt-1 text-neutral-700 dark:text-neutral-300">
                  {project.oneLiner}
                </p>
                <p className="mt-1 flex flex-wrap gap-x-4 text-sm">
                  <Link
                    className="underline underline-offset-4 text-neutral-600 dark:text-neutral-400"
                    href={`/projects#${project.slug}`}
                  >
                    Details
                  </Link>
                  {project.writeup ? (
                    <Link
                      className="underline underline-offset-4 text-neutral-600 dark:text-neutral-400"
                      href={project.writeup}
                    >
                      Write-up
                    </Link>
                  ) : null}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Awards and Honors</h2>
          <div className="space-y-2 text-neutral-700 dark:text-neutral-300">
            <p>
              <span className="font-medium">Positions:</span> ACM Media Officer
              (2023-2025), RowdyHacks Officer (2023-2025), GWG Scholar
              (2022-2025)
            </p>
            <p>
              <span className="font-medium">Honors:</span> President&apos;s
              Scholarship (5x), President&apos;s List (4x), Dean&apos;s List,
              Dr. Craig Endowed Scholarship in the Sciences, Honors College,
              Most Outstanding Information Technology Student
            </p>
            <p>
              <span className="font-medium">Certifications:</span> Google Data
              Analytics Professional, IBM AI Foundations for Business,
              University of Michigan Generative AI Essentials
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
