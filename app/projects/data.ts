export type Project = {
  /** Anchor target on /projects, so the resume can deep-link to one entry. */
  slug: string
  title: string
  /** Single-line version used on the resume, where space is the constraint. */
  oneLiner: string
  /** Fuller framing used on the projects page. */
  blurb: string
  stack: string[]
  highlights: string[]
  writeup?: string
  /**
   * Public repo URL. Left undefined until each repo has been audited for
   * committed credentials — a linked repo with a key in its history is worse
   * than no link at all.
   */
  repo?: string
}

/** Ordered strongest-first; both /projects and /resume render in this order. */
export const projects: Project[] = [
  {
    slug: 'world-cup-fantasy',
    title: 'World Cup Fantasy',
    oneLiner:
      'Solo full-stack fantasy platform: 53,000 lines of TypeScript, 39 Postgres tables, 51 API routes, and 518 tests, shipped in 7 weeks.',
    blurb:
      'A full-stack fantasy sports platform built solo in seven weeks — league management, scoring, standings, and awards over live match data.',
    stack: [
      'TypeScript',
      'Next.js 15',
      'React 19',
      'PostgreSQL',
      'Drizzle',
      'Vitest',
      'GitHub Actions',
    ],
    highlights: [
      'Built and shipped a solo full-stack platform in 7 weeks: 53,000 lines of TypeScript across a Next.js/React frontend, a framework-agnostic domain layer, 39 Postgres tables, 22 idempotent migrations, and 51 API routes.',
      'Designed an immutable-source, derived-everything architecture where standings, head-to-head results, and awards are pure functions over an append-only stat table, so a provider correction propagates everywhere with no cache-invalidation logic.',
      'Wrote 518 tests across unit, integration (Testcontainers-managed Postgres running real migrations), and component tiers, gated in GitHub Actions CI.',
    ],
  },
  {
    slug: 'utsa-gpt',
    title: 'UTSA GPT',
    oneLiner:
      'Hybrid-retrieval RAG backend that grounds Gemini on private Firestore collections, served behind an async FastAPI endpoint.',
    blurb:
      'A retrieval-augmented chatbot that answers questions from private data instead of from the model’s own training. I owned the Python backend and the RAG implementation; teammates built the ingestion pipeline and the React frontend.',
    stack: [
      'Python',
      'FastAPI',
      'Gemini',
      'Firestore',
      'sentence-transformers',
      'BM25',
    ],
    highlights: [
      'Hybrid retrieval fusing dense sentence-transformer embeddings with BM25 keyword scoring, then reranking the top 10 candidates through a cross-encoder down to the 5 most relevant.',
      'Cached document embeddings by SHA-256 content hash and moved four blocking model calls onto worker threads, removing event-loop stalls under concurrent requests.',
      'Diagnosed a tokenizer defect that silently disabled sparse retrieval, lifting ranked corpus coverage from 6% to 100% and correcting the top-ranked result.',
    ],
    writeup: '/blog/rag-chatbot',
  },
  {
    slug: 'fantasy-football-analytics',
    title: 'Fantasy Football Draft Analytics Engine',
    oneLiner:
      'Isotonic regression over draft-market pricing plus a Monte Carlo decision engine to surface mispriced players in real time.',
    blurb:
      'A modeling project to find players the draft market has mispriced, and a live decision engine that acts on it during a draft.',
    stack: ['Python', 'scikit-learn', 'scipy', 'pandas', 'SQLite'],
    highlights: [
      'Modeled a market’s price-to-value curve with per-position isotonic regression after linear, logarithmic, and polynomial fits failed to capture its shape, using residuals against the monotonic fit to identify mispriced assets.',
      'Built a real-time decision engine combining five normalized signals under phase-dependent weightings with Monte Carlo opportunity-cost estimation (50 seeded simulations per evaluation), run/cliff detection, and deterministic override rules.',
      'Reverse-engineered an undocumented private API — including a non-standard raw-JWT auth scheme and inconsistent versioned base URLs — and built a 6-stage ETL pipeline into a normalized 15-table warehouse of ~26,000 rows.',
    ],
    writeup: '/blog/fantasy-football-analysis',
  },
  {
    slug: 'underdog-draft-analytics',
    title: 'Underdog Draft Analytics Platform',
    oneLiner:
      'Point-in-time draft grading that eliminates look-ahead bias, built on a pure-function evaluation core.',
    blurb:
      'A platform for grading draft decisions after the fact — which is only meaningful if the grading refuses to use information that did not exist at the time.',
    stack: ['TypeScript', 'React', 'Vite', 'Python', 'pandas', 'Parquet'],
    highlights: [
      'Eliminated look-ahead bias in retrospective decision grading by implementing point-in-time projection snapshots, ensuring every historical decision is scored only against information that existed when it was made.',
      'Designed a strictly pure-function evaluation core with no I/O or side effects, enabling the same ranking functions to serve both real-time forward recommendation and retroactive backward grading with zero duplicated logic.',
      'Reverse-engineered an undocumented commercial API with a Python probe harness enumerating ~120 endpoint permutations across two hosts and five API versions, auto-generating a live endpoint reference and a written spec.',
    ],
  },
  {
    slug: 'equipment-inventory-platform',
    title: 'Equipment Inventory Platform',
    oneLiner:
      'A distributed PHP/MySQL platform on AWS EC2: a 15-endpoint REST API plus a parallel ingestion pipeline for a 5.1M-row dataset.',
    blurb:
      'One system, two halves. The ingestion side loads and validates multi-million-row supplier datasets; the service side exposes them through an API-driven web tier split across a network boundary.',
    stack: ['PHP', 'MySQL', 'Nginx', 'AWS EC2'],
    highlights: [
      'Built a parallel ingestion pipeline for a 5.1M-row / 405 MB dataset, partitioning it into 52 chunks run through a hand-rolled POSIX process pool with bounded concurrency and PID-based liveness reaping.',
      'Eliminated roughly 10M redundant SQL round-trips by pre-loading foreign-key lookups into in-memory hash maps, and paired batched INSERTs with a row-by-row fallback on MySQL error 1062 — keeping batch throughput while retaining exact attribution for every duplicate.',
      'Refactored a duplicated web tier into a fully API-driven client across a network boundary, removing all database access and credentials from the public EC2 instance and replacing 14 direct-SQL functions with a cURL client layer.',
      'Designed a 15-endpoint REST-style API with front-controller routing (Nginx try_files → PHP-FPM), a uniform {status, message, data} envelope, and a typed data-quality layer classifying every rejected row into one of 8 error categories.',
    ],
  },
]
