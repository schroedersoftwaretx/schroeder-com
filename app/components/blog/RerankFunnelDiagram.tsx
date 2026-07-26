type Tier = {
  count: number
  title: string
  model: string
  note: string
  width: number
  bar: string
}

const TIERS: Tier[] = [
  {
    count: 48,
    title: 'Every document',
    model: 'no model',
    note: 'The full Firestore collection, embedded once at startup and held in memory.',
    width: 100,
    bar: 'bg-neutral-300 dark:bg-neutral-700',
  },
  {
    count: 10,
    title: 'Hybrid retrieval',
    model: 'bi-encoder + BM25',
    note: 'Cosine similarity against precomputed vectors, fused 50/50 with normalized BM25 scores. Cheap enough to run against everything.',
    width: 55,
    bar: 'bg-blue-400 dark:bg-blue-600',
  },
  {
    count: 5,
    title: 'Cross-encoder rerank',
    model: 'ms-marco-MiniLM-L-6-v2',
    note: 'Scores the query and each document together as one input. Far more accurate, far too slow for 48 — fine for 10.',
    width: 32,
    bar: 'bg-emerald-500 dark:bg-emerald-600',
  },
]

export default function RerankFunnelDiagram() {
  return (
    <figure className="not-prose my-8 rounded-xl border border-neutral-200 p-4 dark:border-neutral-800 md:p-6">
      <div className="space-y-5">
        {TIERS.map((tier, i) => (
          <div key={tier.title}>
            <div className="mb-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-mono text-lg font-semibold tabular-nums text-neutral-900 dark:text-neutral-100">
                {tier.count}
              </span>
              <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                {tier.title}
              </span>
              <span className="rounded border border-neutral-200 px-1.5 py-0.5 font-mono text-xs text-neutral-500 dark:border-neutral-700 dark:text-neutral-400">
                {tier.model}
              </span>
            </div>

            <div
              className={`h-8 rounded-md ${tier.bar}`}
              style={{ width: `${tier.width}%` }}
            />

            <p className="mt-2 max-w-xl text-xs text-neutral-500 dark:text-neutral-400">
              {tier.note}
            </p>

            {i < TIERS.length - 1 && (
              <div
                aria-hidden="true"
                className="mt-3 text-center text-neutral-400 dark:text-neutral-500"
              >
                ↓
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="mt-5 border-t border-neutral-200 pt-3 text-xs text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
        Cheap over everything, expensive over the survivors — the same shape as a
        candidate generator feeding a ranker.
      </p>
    </figure>
  )
}
