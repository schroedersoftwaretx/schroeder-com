import { siteName } from 'app/site'

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
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
        858-263-5881 |{' '}
        <a
          className="underline underline-offset-4"
          href="mailto:SchroederSoftwareTX@gmail.com"
        >
          SchroederSoftwareTX@gmail.com
        </a>{' '}
        |{' '}
        <a
          className="underline underline-offset-4"
          href="https://linkedin.com/in/seanotoole04"
          target="_blank"
          rel="noreferrer"
        >
          linkedin.com/in/seanotoole04
        </a>{' '}
        |{' '}
        <a
          className="underline underline-offset-4"
          href="https://github.com/schroedersoftwaretx"
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
          <p className="font-medium">University of Texas at San Antonio</p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Bachelor of Science in Computer Science, Minor in Mathematics
          </p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Concentration in Data Science and Software Engineering | Aug 2022 -
            May 2026 | GPA: 3.90
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Skills</h2>
          <div className="space-y-2 text-neutral-700 dark:text-neutral-300">
            <p>
              <span className="font-medium">Languages:</span> Java, Python, C,
              SQL, JavaScript, PHP, HTML/CSS, R, BASIC, Bash, Kotlin
            </p>
            <p>
              <span className="font-medium">Developer Tools:</span> AWS, Git,
              Android Studio
            </p>
            <p>
              <span className="font-medium">Libraries:</span> TensorFlow,
              scikit-learn, Matplotlib
            </p>
            <p>
              <span className="font-medium">Other:</span> German
              (Intermediate), Spanish (Elementary), Adobe Photoshop and Premiere
              Pro (2000+ hours)
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
                  Designed and maintained relational and cloud-hosted databases
                  (PostgreSQL, MySQL, Firebase Firestore).
                </li>
                <li>
                  Implemented efficient schema structures and data models for
                  frontend integration and future scaling.
                </li>
                <li>
                  Optimized queries and data retrieval processes to reduce
                  latency and improve user experience.
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
                  Utilized Llama to create automated feedback loops for software
                  development tasks.
                </li>
                <li>
                  Analyzed and categorized GitHub change requests, contributing
                  to a 60% increase in model accuracy for developer feedback.
                </li>
                <li>
                  Developed scripts with BeautifulSoup to extract user comments
                  and change requests from GitHub repositories.
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
                  Led the Four-Year Plan Committee and initiatives impacting
                  2,000+ students.
                </li>
                <li>
                  Collaborated across departments to host events promoting
                  academic growth and career awareness.
                </li>
                <li>
                  Worked with leadership to analyze data trends and improve
                  student engagement, retention, and graduation rates.
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Projects</h2>
          <ul className="space-y-6">
            <li>
              <p className="font-medium">Fantasy Football Assistant</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Python, scikit-learn
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-neutral-700 dark:text-neutral-300">
                <li>
                  Developed a data-driven fantasy football program to identify
                  undervalued players and improve draft decisions.
                </li>
                <li>
                  Designed draft strategy and team composition algorithms with
                  statistical backtesting.
                </li>
                <li>
                  Used PCA and LDA for dimensionality reduction, model
                  optimization, and player classification.
                </li>
              </ul>
            </li>
            <li>
              <p className="font-medium">
                High-Volume Data Ingestion and Modeling Pipeline
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                AWS, PHP, MySQL
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-neutral-700 dark:text-neutral-300">
                <li>
                  Designed and implemented a scalable ETL pipeline to process
                  and validate 5M+ records with parallel chunking and
                  multi-process execution.
                </li>
                <li>
                  Built a normalized relational schema with indexed lookup
                  tables, reducing storage overhead by 90% and improving upload
                  speed by 400%.
                </li>
                <li>
                  Implemented batch insertion with SQL constraint handling for
                  duplicate detection and structured error routing.
                </li>
              </ul>
            </li>
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
              <span className="font-medium">Certifications:</span> IBM AI
              Foundations for Business, University of Michigan Generative AI
              Essentials, Google Data Analytics Professional, Certiport
              HTML/CSS, Microsoft Fundamentals, Computational Thinking, 652
              Cyber Security
            </p>
            <p>
              <span className="font-medium">Honors:</span> President&apos;s
              Scholarship (5x), Dr. Craig Endowed Scholarship in the Sciences,
              Scholarship for Computer Scientists Who Don&apos;t Run Good,
              President&apos;s List (4x), Dean&apos;s List (1x), Honors College
              Student, Most Outstanding Information Technology Student, Most
              Outstanding Business and Administration Student, Distinguished
              Student Athlete
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
