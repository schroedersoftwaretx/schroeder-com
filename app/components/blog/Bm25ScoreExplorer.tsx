'use client'

import { useState } from 'react'

// All scores below are real BM25Okapi output, measured against the actual
// 48-document corpus from nfl_schedule.csv using the same rank_bm25 settings
// the backend uses. Regenerate with scripts/dump_bm25_scores.py.

const TARGET = 'day: Thursday, date: September 4, away: Dallas, home: Philadelphia'

type Row = { doc: string; score: number }

type Mode = {
  id: string
  label: string
  query: string
  tokens: string[]
  rows: Row[]
  nonzero: number
  verdict: string
  tone: 'bad' | 'warn' | 'good'
}

const MODES: Mode[] = [
  {
    id: 'raw',
    label: 'Raw question',
    query: 'when do the cowboys play the eagles',
    tokens: ['when', 'do', 'the', 'cowboys', 'play', 'the', 'eagles'],
    rows: [
      { doc: TARGET, score: 0 },
      { doc: 'day: Sunday, date: September 14, away: New York, home: Dallas', score: 0 },
      { doc: 'day: Sunday, date: September 21, away: Dallas, home: Chicago', score: 0 },
    ],
    nonzero: 0,
    verdict:
      'Every document scores 0.000. The corpus stores city names, so "cowboys" and "eagles" match nothing. Without the rewrite step, the sparse half of the retriever contributes literally nothing.',
    tone: 'bad',
  },
  {
    id: 'current',
    label: 'Rewritten · current tokenizer',
    query: 'Dallas Cowboys next opponent Philadelphia Eagles game date',
    tokens: ['dallas', 'cowboys', 'next', 'opponent', 'philadelphia', 'eagles', 'game', 'date'],
    rows: [
      { doc: 'day: Sunday, date: September 14, away: New York, home: Dallas', score: 3.406 },
      { doc: TARGET, score: 3.02 },
      { doc: 'day: Sunday, date: September 21, away: Los Angeles, home: Philadelphia', score: 2.881 },
    ],
    nonzero: 3,
    verdict:
      'The wrong game wins. Only 3 of 48 documents score at all, because .split() leaves commas glued to tokens — "dallas," never matches "dallas". A document only matches on its final field, the home team.',
    tone: 'warn',
  },
  {
    id: 'fixed',
    label: 'Rewritten · fixed tokenizer',
    query: 'Dallas Cowboys next opponent Philadelphia Eagles game date',
    tokens: ['dallas', 'cowboys', 'next', 'opponent', 'philadelphia', 'eagles', 'game', 'date'],
    rows: [
      { doc: TARGET, score: 5.761 },
      { doc: 'day: Sunday, date: September 21, away: Dallas, home: Chicago', score: 3.112 },
      { doc: 'day: Sunday, date: September 14, away: New York, home: Dallas', score: 2.969 },
      { doc: 'day: Sunday, date: September 14, away: Philadelphia, home: Kansas City', score: 2.969 },
      { doc: 'day: Sunday, date: September 21, away: Los Angeles, home: Philadelphia', score: 2.969 },
    ],
    nonzero: 48,
    verdict:
      'One line — regex tokenization instead of .split() — and the correct game jumps to first with nearly double the score. All 48 documents now participate in ranking.',
    tone: 'good',
  },
]

const TONE = {
  bad: 'border-red-200 bg-red-50 text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-200',
  warn: 'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200',
  good: 'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200',
}

export default function Bm25ScoreExplorer() {
  const [active, setActive] = useState(0)
  const mode = MODES[active]
  const max = Math.max(...mode.rows.map((r) => r.score), 1)

  return (
    <figure className="not-prose my-8 rounded-xl border border-neutral-200 p-4 dark:border-neutral-800 md:p-6">
      <div className="mb-4 flex flex-wrap gap-2">
        {MODES.map((m, i) => (
          <button
            key={m.id}
            onClick={() => setActive(i)}
            className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
              i === active
                ? 'border-neutral-900 bg-neutral-900 text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900'
                : 'border-neutral-200 text-neutral-600 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="mb-4">
        <div className="mb-1 text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
          Query sent to BM25
        </div>
        <code className="block break-words rounded-md bg-neutral-100 p-2 text-xs text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
          {mode.query}
        </code>
        <div className="mt-2 flex flex-wrap gap-1">
          {mode.tokens.map((t, i) => (
            <span
              key={`${t}-${i}`}
              className="rounded border border-neutral-200 px-1.5 py-0.5 font-mono text-xs text-neutral-600 dark:border-neutral-700 dark:text-neutral-400"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {mode.rows.map((row) => {
          const isTarget = row.doc === TARGET
          return (
            <div key={row.doc}>
              <div className="mb-1 flex items-baseline justify-between gap-3">
                <span
                  className={`break-words text-xs ${
                    isTarget
                      ? 'font-semibold text-neutral-900 dark:text-neutral-100'
                      : 'text-neutral-500 dark:text-neutral-400'
                  }`}
                >
                  {row.doc}
                  {isTarget && (
                    <span className="ml-2 rounded bg-emerald-100 px-1.5 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                      correct answer
                    </span>
                  )}
                </span>
                <span className="shrink-0 font-mono text-xs tabular-nums text-neutral-500 dark:text-neutral-400">
                  {row.score.toFixed(3)}
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
                <div
                  className={`h-full rounded-full ${
                    isTarget ? 'bg-emerald-500' : 'bg-neutral-300 dark:bg-neutral-600'
                  }`}
                  style={{ width: `${(row.score / max) * 100}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>

      <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">
        Showing the top {mode.rows.length} of 48 documents.{' '}
        <span className="font-medium">{mode.nonzero}</span> scored above zero.
      </p>

      <div className={`mt-4 rounded-lg border p-3 text-sm ${TONE[mode.tone]}`}>
        {mode.verdict}
      </div>
    </figure>
  )
}
