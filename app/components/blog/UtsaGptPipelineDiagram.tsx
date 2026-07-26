type Stage = {
  label: string
  detail: string
}

const INGEST: Stage[] = [
  { label: 'ESPN', detail: 'Selenium scraper' },
  { label: 'CSV', detail: '47 games' },
  { label: 'Firestore', detail: 'collection: game' },
  { label: 'Documents', detail: 'LlamaIndex' },
  { label: 'Index', detail: '384-dim + BM25' },
]

const QUERY: Stage[] = [
  { label: 'Question', detail: 'POST /chat' },
  { label: 'Rewrite', detail: 'Gemini 2.5 Flash' },
  { label: 'Retrieve', detail: '48 → 10, hybrid' },
  { label: 'Rerank', detail: '10 → 5, cross-encoder' },
  { label: 'Generate', detail: 'Gemini 2.5 Flash' },
]

function Arrow() {
  return (
    <div
      aria-hidden="true"
      className="flex shrink-0 items-center justify-center text-neutral-400 dark:text-neutral-500"
    >
      <span className="md:hidden">↓</span>
      <span className="hidden md:inline">→</span>
    </div>
  )
}

function Lane({
  title,
  caption,
  stages,
  accent,
}: {
  title: string
  caption: string
  stages: Stage[]
  accent: 'neutral' | 'blue'
}) {
  const card =
    accent === 'blue'
      ? 'border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950'
      : 'border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900'

  return (
    <div className="mb-6 last:mb-0">
      <div className="mb-3">
        <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
          {title}
        </h4>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">{caption}</p>
      </div>

      <div className="flex flex-col gap-2 md:flex-row md:items-stretch">
        {stages.map((stage, i) => (
          <div key={stage.label} className="contents">
            {i > 0 && <Arrow />}
            <div
              className={`flex-1 rounded-lg border p-3 text-center md:text-left ${card}`}
            >
              <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                {stage.label}
              </div>
              <div className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                {stage.detail}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function UtsaGptPipelineDiagram() {
  return (
    <figure className="not-prose my-8 rounded-xl border border-neutral-200 p-4 dark:border-neutral-800 md:p-6">
      <Lane
        title="Once, at startup"
        caption="Runs in the FastAPI lifespan hook. Vectors are cached, so this is nearly instant on restart."
        stages={INGEST}
        accent="neutral"
      />
      <Lane
        title="Every question"
        caption="Four blocking calls, all pushed onto a thread pool so the event loop stays free."
        stages={QUERY}
        accent="blue"
      />
    </figure>
  )
}
