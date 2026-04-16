'use client'

import { useEffect, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Label,
  Legend,
  ReferenceDot,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  allPositivePlayers,
  overvaluedPlayers,
  POSITION_COLORS,
  TIER_COLORS,
  top50Players,
  undervaluedPlayers,
  wrPolynomialData,
  type FullRosterPlayer,
  type ResidualPlayer,
  type WrPlayer,
} from 'app/blog/fantasy-football-data'

function useIsClient() {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => setIsClient(true), [])
  return isClient
}

type TooltipPlayer = ResidualPlayer & { tier?: number; residual?: number }

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: { payload: TooltipPlayer }[]
}) {
  if (active && payload && payload.length) {
    const d = payload[0].payload
    return (
      <div
        style={{
          background: '#1e293b',
          border: '1px solid #334155',
          borderRadius: 8,
          padding: '10px 14px',
          color: '#f1f5f9',
          fontSize: 13,
        }}
      >
        <div style={{ fontWeight: 700, marginBottom: 4 }}>{d.name}</div>
        <div style={{ color: POSITION_COLORS[d.position] }}>{d.position}</div>
        <div>
          ADP: <strong>{d.adp}</strong>
        </div>
        <div>
          VORP: <strong>{d.vorp}</strong>
        </div>
        {d.residual !== undefined && (
          <div
            style={{
              color: d.residual > 0 ? '#34d399' : '#f87171',
            }}
          >
            Residual:{' '}
            <strong>
              {d.residual > 0 ? '+' : ''}
              {d.residual}
            </strong>
          </div>
        )}
        {d.tier !== undefined && (
          <div>
            Tier: <strong>{d.tier}</strong>
          </div>
        )}
      </div>
    )
  }
  return null
}

function ResidualTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: { payload: ResidualPlayer }[]
}) {
  if (active && payload && payload.length) {
    const d = payload[0].payload
    return (
      <div
        style={{
          background: '#1e293b',
          border: '1px solid #334155',
          borderRadius: 8,
          padding: '10px 14px',
          color: '#f1f5f9',
          fontSize: 13,
        }}
      >
        <div style={{ fontWeight: 700, marginBottom: 4 }}>{d.name}</div>
        <div style={{ color: POSITION_COLORS[d.position] }}>{d.position}</div>
        <div>
          ADP: <strong>{d.adp}</strong>
        </div>
        <div>
          Residual:{' '}
          <strong
            style={{ color: d.residual > 0 ? '#34d399' : '#f87171' }}
          >
            {d.residual > 0 ? '+' : ''}
            {d.residual}
          </strong>
        </div>
      </div>
    )
  }
  return null
}

export function FantasyTop50TierScatter() {
  const isClient = useIsClient()
  if (!isClient) return <div className="not-prose my-6 w-full min-h-[500px]" />
  return (
    <div className="not-prose my-6 w-full min-h-[500px]">
      <ResponsiveContainer width="100%" height={500}>
        <ScatterChart margin={{ top: 20, right: 30, bottom: 40, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis
            type="number"
            dataKey="adp"
            name="ADP"
            domain={[0, 60]}
            reversed
            stroke="#94a3b8"
            tick={{ fill: '#94a3b8', fontSize: 12 }}
          >
            <Label
              value="ADP (lower = earlier pick)"
              offset={-10}
              position="insideBottom"
              fill="#94a3b8"
              fontSize={12}
            />
          </XAxis>
          <YAxis
            type="number"
            dataKey="vorp"
            name="VORP"
            stroke="#94a3b8"
            tick={{ fill: '#94a3b8', fontSize: 12 }}
          >
            <Label
              value="VORP"
              angle={-90}
              position="insideLeft"
              fill="#94a3b8"
              fontSize={12}
            />
          </YAxis>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(value) => (
              <span style={{ color: '#94a3b8', fontSize: 12 }}>
                Tier {value}
              </span>
            )}
          />
          {[1, 2, 3, 4, 5].map((tier) => (
            <Scatter
              key={tier}
              name={String(tier)}
              data={top50Players.filter((p) => p.tier === tier)}
              fill={TIER_COLORS[tier - 1]}
            />
          ))}
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}

export function FantasyUndervaluedBar() {
  const isClient = useIsClient()
  const data = [...undervaluedPlayers].sort((a, b) => b.residual - a.residual)
  if (!isClient) return <div className="not-prose my-6 w-full min-h-[420px]" />
  return (
    <div className="not-prose my-6 w-full min-h-[420px]">
      <ResponsiveContainer width="100%" height={420}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 60, bottom: 10, left: 130 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#334155"
            horizontal={false}
          />
          <XAxis type="number" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 11 }}>
            <Label
              value="Isotonic Residual (positive = undervalued)"
              position="insideBottom"
              offset={-5}
              fill="#94a3b8"
              fontSize={11}
            />
          </XAxis>
          <YAxis
            type="category"
            dataKey="name"
            stroke="#94a3b8"
            tick={{ fill: 'var(--chart-regression-line)', fontSize: 12 }}
            width={125}
          />
          <Tooltip content={<ResidualTooltip />} />
          <ReferenceLine x={0} stroke="#64748b" />
          <Bar dataKey="residual" radius={[0, 4, 4, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={POSITION_COLORS[entry.position]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function FantasyOvervaluedBar() {
  const isClient = useIsClient()
  const data = [...overvaluedPlayers].sort((a, b) => a.residual - b.residual)
  if (!isClient) return <div className="not-prose my-6 w-full min-h-[360px]" />
  return (
    <div className="not-prose my-6 w-full min-h-[360px]">
      <ResponsiveContainer width="100%" height={360}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 60, bottom: 10, left: 130 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#334155"
            horizontal={false}
          />
          <XAxis type="number" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 11 }}>
            <Label
              value="Isotonic Residual (negative = overvalued)"
              position="insideBottom"
              offset={-5}
              fill="#94a3b8"
              fontSize={11}
            />
          </XAxis>
          <YAxis
            type="category"
            dataKey="name"
            stroke="#94a3b8"
            tick={{ fill: 'var(--chart-regression-line)', fontSize: 12 }}
            width={125}
          />
          <Tooltip content={<ResidualTooltip />} />
          <ReferenceLine x={0} stroke="#64748b" />
          <Bar dataKey="residual" radius={[0, 4, 4, 0]}>
            {data.map((entry, i) => (
              <Cell
                key={i}
                fill={POSITION_COLORS[entry.position]}
                fillOpacity={0.8}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function FantasyPositionScatter() {
  const isClient = useIsClient()
  const positions = ['RB', 'WR', 'TE', 'QB'] as const
  if (!isClient) return <div className="not-prose my-6 w-full min-h-[520px]" />
  return (
    <div className="not-prose my-6 w-full min-h-[520px]">
      <ResponsiveContainer width="100%" height={520}>
        <ScatterChart margin={{ top: 20, right: 30, bottom: 40, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis
            type="number"
            dataKey="adp"
            name="ADP"
            domain={[0, 60]}
            reversed
            stroke="#94a3b8"
            tick={{ fill: '#94a3b8', fontSize: 11 }}
          >
            <Label
              value="ADP — reversed (earlier picks on right)"
              offset={-10}
              position="insideBottom"
              fill="#94a3b8"
              fontSize={11}
            />
          </XAxis>
          <YAxis
            type="number"
            dataKey="vorp"
            name="VORP"
            stroke="#94a3b8"
            tick={{ fill: '#94a3b8', fontSize: 11 }}
          >
            <Label
              value="VORP"
              angle={-90}
              position="insideLeft"
              fill="#94a3b8"
              fontSize={11}
            />
          </YAxis>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(val) => (
              <span
                style={{
                  color: POSITION_COLORS[val] || '#94a3b8',
                  fontSize: 12,
                }}
              >
                {val}
              </span>
            )}
          />
          {positions.map((pos) => (
            <Scatter
              key={pos}
              name={pos}
              data={top50Players.filter((p) => p.position === pos)}
              fill={POSITION_COLORS[pos]}
            />
          ))}
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}

// ─── Isotonic regression helpers ─────────────────────────────────────────────

/**
 * Pool Adjacent Violators Algorithm (PAVA) for a non-increasing isotonic fit.
 * Accepts (adp, vorp) pairs, filters to positive-VORP players only (same as
 * the Python implementation), and returns staircase points in ADP-ascending
 * order.  When rendered by a Scatter with the `line` prop those points form a
 * proper step-function curve.
 */
function isotonicDecreasing(
  data: { adp: number; vorp: number }[]
): { adp: number; vorp: number }[] {
  const pts = data
    .filter((d) => d.vorp > 0)
    .sort((a, b) => a.adp - b.adp)
  if (pts.length === 0) return []

  // Build PAVA blocks: each block tracks the range of ADP values it covers and
  // the sum/count needed to compute the block's mean VORP.
  const blocks: {
    sumVorp: number
    count: number
    minAdp: number
    maxAdp: number
  }[] = []

  for (const pt of pts) {
    blocks.push({ sumVorp: pt.vorp, count: 1, minAdp: pt.adp, maxAdp: pt.adp })
    // Merge back-to-front while the tail block's mean exceeds the previous
    // block's mean (violation of non-increasing constraint).
    while (blocks.length >= 2) {
      const last = blocks[blocks.length - 1]
      const prev = blocks[blocks.length - 2]
      if (last.sumVorp / last.count > prev.sumVorp / prev.count) {
        blocks.pop()
        prev.sumVorp += last.sumVorp
        prev.count += last.count
        prev.maxAdp = last.maxAdp
      } else {
        break
      }
    }
  }

  // Emit staircase points: horizontal segment across the block, then a
  // vertical drop to the next block's mean before continuing.
  const result: { adp: number; vorp: number }[] = []
  for (let i = 0; i < blocks.length; i++) {
    const val = blocks[i].sumVorp / blocks[i].count
    result.push({ adp: blocks[i].minAdp, vorp: val })
    result.push({ adp: blocks[i].maxAdp, vorp: val })
    if (i + 1 < blocks.length) {
      const nextVal = blocks[i + 1].sumVorp / blocks[i + 1].count
      result.push({ adp: blocks[i].maxAdp, vorp: nextVal })
    }
  }
  return result
}

// ─── Isotonic regression chart ───────────────────────────────────────────────

export function FantasyIsotonicRegressionChart() {
  const isClient = useIsClient()
  const positions = ['RB', 'WR', 'TE', 'QB'] as const

  if (!isClient) return <div className="not-prose my-6 w-full min-h-[520px]" />

  return (
    <div className="not-prose my-6 w-full min-h-[520px]">
      <ResponsiveContainer width="100%" height={520}>
        <ScatterChart margin={{ top: 20, right: 30, bottom: 40, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis
            type="number"
            dataKey="adp"
            name="ADP"
            domain={[0, 60]}
            reversed
            stroke="#94a3b8"
            tick={{ fill: '#94a3b8', fontSize: 11 }}
          >
            <Label
              value="ADP — reversed (earlier picks on right)"
              offset={-10}
              position="insideBottom"
              fill="#94a3b8"
              fontSize={11}
            />
          </XAxis>
          <YAxis
            type="number"
            dataKey="vorp"
            name="VORP"
            domain={[0, 300]}
            stroke="#94a3b8"
            tick={{ fill: '#94a3b8', fontSize: 11 }}
          >
            <Label
              value="VORP"
              angle={-90}
              position="insideLeft"
              fill="#94a3b8"
              fontSize={11}
            />
          </YAxis>
          <Tooltip content={<RegressionTooltip />} />
          <Legend
            formatter={(val) => (
              <span
                style={{ color: POSITION_COLORS[val] || '#94a3b8', fontSize: 12 }}
              >
                {val}
              </span>
            )}
          />
          {/* Scatter dots per position — slightly transparent so the curves show through */}
          {positions.map((pos) => (
            <Scatter
              key={pos}
              name={pos}
              data={top50Players.filter((p) => p.position === pos)}
              fill={POSITION_COLORS[pos]}
              opacity={0.65}
            />
          ))}
          {/* Staircase isotonic curves — invisible dots connected by the line prop */}
          {positions.map((pos) => {
            const pts = isotonicDecreasing(
              top50Players.filter((p) => p.position === pos)
            )
            if (pts.length === 0) return null
            return (
              <Scatter
                key={`iso-${pos}`}
                data={pts}
                line={{
                  stroke: POSITION_COLORS[pos],
                  strokeWidth: 2,
                  fill: 'none',
                }}
                shape={(props: any) => (
                  <circle cx={props.cx} cy={props.cy} r={0} fill="none" />
                )}
                fill="none"
                legendType="none"
              />
            )
          })}
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}

// ─── Regression helpers ───────────────────────────────────────────────────────

/** Solve Ax = b via Gaussian elimination with partial pivoting. */
function solveGaussian(A: number[][], b: number[]): number[] {
  const n = A.length
  const M = A.map((row, i) => [...row, b[i]])
  for (let col = 0; col < n; col++) {
    let max = col
    for (let row = col + 1; row < n; row++)
      if (Math.abs(M[row][col]) > Math.abs(M[max][col])) max = row
    ;[M[col], M[max]] = [M[max], M[col]]
    for (let row = col + 1; row < n; row++) {
      if (M[col][col] === 0) continue
      const f = M[row][col] / M[col][col]
      for (let j = col; j <= n; j++) M[row][j] -= f * M[col][j]
    }
  }
  const x = Array<number>(n).fill(0)
  for (let i = n - 1; i >= 0; i--) {
    x[i] = M[i][n]
    for (let j = i + 1; j < n; j++) x[i] -= M[i][j] * x[j]
    if (M[i][i] !== 0) x[i] /= M[i][i]
  }
  return x
}

/**
 * Fit a polynomial of the given degree to (adp, vorp) data using OLS.
 * x is normalised to [0,1] before fitting for numerical stability.
 * Returns a function that maps raw ADP → predicted VORP.
 */
function polyFit(data: WrPlayer[], degree: number): (adp: number) => number {
  const xMin = Math.min(...data.map((d) => d.adp))
  const xMax = Math.max(...data.map((d) => d.adp))
  const norm = (x: number) => (x - xMin) / (xMax - xMin)
  const p = degree + 1
  const AtA: number[][] = Array.from({ length: p }, () => Array<number>(p).fill(0))
  const Atb: number[] = Array<number>(p).fill(0)
  for (const { adp, vorp } of data) {
    const xn = norm(adp)
    for (let i = 0; i < p; i++) {
      Atb[i] += Math.pow(xn, i) * vorp
      for (let j = 0; j < p; j++) AtA[i][j] += Math.pow(xn, i + j)
    }
  }
  const coeffs = solveGaussian(AtA, Atb)
  return (adp: number) => {
    const xn = norm(adp)
    return coeffs.reduce((s, c, i) => s + c * Math.pow(xn, i), 0)
  }
}

/** Tooltip shared by both regression charts — silent when hovering the line. */
function RegressionTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: { payload: Record<string, unknown> }[]
}) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  if (!d.name) return null
  return (
    <div
      style={{
        background: '#1e293b',
        border: '1px solid #334155',
        borderRadius: 8,
        padding: '10px 14px',
        color: '#f1f5f9',
        fontSize: 13,
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: 4 }}>{String(d.name)}</div>
      {d.position !== undefined && (
        <div style={{ color: POSITION_COLORS[String(d.position)] }}>
          {String(d.position)}
        </div>
      )}
      <div>ADP: <strong>{String(d.adp)}</strong></div>
      <div>VORP: <strong>{String(d.vorp)}</strong></div>
    </div>
  )
}

// ─── Linear regression chart ─────────────────────────────────────────────────

export function FantasyLinearRegressionChart() {
  const isClient = useIsClient()
  if (!isClient) return <div className="not-prose my-6 w-full min-h-[460px]" />

  // OLS across all top-50 players (all positions combined)
  const n   = top50Players.length
  const sx  = top50Players.reduce((s, p) => s + p.adp,          0)
  const sy  = top50Players.reduce((s, p) => s + p.vorp,         0)
  const sxy = top50Players.reduce((s, p) => s + p.adp * p.vorp, 0)
  const sx2 = top50Players.reduce((s, p) => s + p.adp ** 2,     0)
  const slope     = (n * sxy - sx * sy) / (n * sx2 - sx ** 2)
  const intercept = (sy - slope * sx) / n
  const linY = (x: number) => Math.max(0, Math.min(300, slope * x + intercept))

  return (
    <div className="not-prose my-6 w-full min-h-[460px]">
      <ResponsiveContainer width="100%" height={460}>
        <ScatterChart margin={{ top: 20, right: 30, bottom: 40, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis
            type="number"
            dataKey="adp"
            domain={[0, 62]}
            reversed
            stroke="#94a3b8"
            tick={{ fill: '#94a3b8', fontSize: 12 }}
          >
            <Label
              value="ADP (reversed — earlier picks right)"
              offset={-10}
              position="insideBottom"
              fill="#94a3b8"
              fontSize={12}
            />
          </XAxis>
          <YAxis
            type="number"
            dataKey="vorp"
            domain={[0, 300]}
            stroke="#94a3b8"
            tick={{ fill: '#94a3b8', fontSize: 12 }}
          >
            <Label
              value="VORP"
              angle={-90}
              position="insideLeft"
              fill="#94a3b8"
              fontSize={12}
            />
          </YAxis>
          <Tooltip content={<RegressionTooltip />} />
          <Legend
            formatter={(v) => (
              <span style={{ color: POSITION_COLORS[v] || '#94a3b8', fontSize: 12 }}>
                {v}
              </span>
            )}
          />
          {/* Two-point Scatter with line prop draws the regression line.
              Same technique as the polynomial curve — proven to work in recharts 3. */}
          <Scatter
            data={[
              { adp: 0.5,  vorp: linY(0.5)  },
              { adp: 61.5, vorp: linY(61.5) },
            ]}
            line={{ stroke: 'var(--chart-regression-line)', strokeWidth: 2, strokeDasharray: '8 4', fill: 'none' }}
            shape={(props: any) => <circle cx={props.cx} cy={props.cy} r={0} fill="none" />}
            fill="none"
            legendType="none"
          />
          {(['RB', 'WR', 'TE', 'QB'] as const).map((pos) => (
            <Scatter
              key={pos}
              name={pos}
              data={top50Players.filter((p) => p.position === pos)}
              fill={POSITION_COLORS[pos]}
            />
          ))}
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}

// ─── Polynomial (cubic) regression chart ─────────────────────────────────────

export function FantasyPolynomialRegressionChart() {
  const isClient = useIsClient()
  if (!isClient) return <div className="not-prose my-6 w-full min-h-[480px]" />

  const cubicFn = polyFit(wrPolynomialData, 3)

  // Dense curve: one point per ADP integer. The Scatter `line` prop connects
  // them in array order, producing a smooth-looking polyline.
  const curvePoints = Array.from({ length: 252 }, (_, i) => ({
    adp: i + 1,
    vorp: cubicFn(i + 1),
  }))

  return (
    <div className="not-prose my-6 w-full min-h-[480px]">
      <ResponsiveContainer width="100%" height={480}>
        <ScatterChart margin={{ top: 20, right: 40, bottom: 40, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis
            type="number"
            dataKey="adp"
            domain={[0, 255]}
            stroke="#94a3b8"
            tick={{ fill: '#94a3b8', fontSize: 12 }}
          >
            <Label
              value="ADP (lower = earlier pick)"
              offset={-10}
              position="insideBottom"
              fill="#94a3b8"
              fontSize={12}
            />
          </XAxis>
          <YAxis
            type="number"
            dataKey="vorp"
            domain={[-130, 220]}
            stroke="#94a3b8"
            tick={{ fill: '#94a3b8', fontSize: 12 }}
          >
            <Label
              value="VORP"
              angle={-90}
              position="insideLeft"
              fill="#94a3b8"
              fontSize={12}
            />
          </YAxis>
          <Tooltip content={<RegressionTooltip />} />
          <ReferenceLine y={0} stroke="#64748b" strokeDasharray="4 4" />
          {/* WR data — same green as all other WR dots in this blog */}
          <Scatter
            name="WR"
            data={wrPolynomialData}
            fill={POSITION_COLORS.WR}
          />
          {/* Cubic curve: invisible dots + orange connecting polyline */}
          <Scatter
            data={curvePoints}
            line={{ stroke: '#f97316', strokeWidth: 2.5, fill: 'none' }}
            shape={(props: any) => (
              <circle cx={props.cx} cy={props.cy} r={0} fill="none" />
            )}
            fill="none"
            legendType="none"
          />
          {/* Annotate the two absurd examples from the article */}
          <ReferenceDot
            x={5.4}
            y={165.1}
            r={7}
            fill="#fbbf24"
            stroke="#1e293b"
            strokeWidth={1.5}
            label={{
              value: 'JSN — ranked 65th WR',
              position: 'right',
              fill: '#1e293b',
              fontSize: 11,
            }}
          />
          <ReferenceDot
            x={222.1}
            y={-57.7}
            r={7}
            fill="#fbbf24"
            stroke="#1e293b"
            strokeWidth={1.5}
            label={{
              value: 'Williams — ranked 2nd WR',
              position: 'left',
              fill: '#1e293b',
              fontSize: 11,
            }}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}

// ─── Full-roster scatter (all VORP ≥ 0 players) ──────────────────────────────

export function FantasyFullRosterScatter() {
  const isClient = useIsClient()
  const positions = ['RB', 'WR', 'TE', 'QB'] as const
  if (!isClient) return <div className="not-prose my-6 w-full min-h-[520px]" />
  return (
    <div className="not-prose my-6 w-full min-h-[520px]">
      <ResponsiveContainer width="100%" height={520}>
        <ScatterChart margin={{ top: 20, right: 30, bottom: 40, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis
            type="number"
            dataKey="adp"
            name="ADP"
            domain={[0, 165]}
            reversed
            stroke="#94a3b8"
            tick={{ fill: '#94a3b8', fontSize: 11 }}
          >
            <Label
              value="ADP — reversed (earlier picks on right)"
              offset={-10}
              position="insideBottom"
              fill="#94a3b8"
              fontSize={11}
            />
          </XAxis>
          <YAxis
            type="number"
            dataKey="vorp"
            name="VORP"
            domain={[0, 285]}
            stroke="#94a3b8"
            tick={{ fill: '#94a3b8', fontSize: 11 }}
          >
            <Label
              value="VORP"
              angle={-90}
              position="insideLeft"
              fill="#94a3b8"
              fontSize={11}
            />
          </YAxis>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(val) => (
              <span
                style={{
                  color: POSITION_COLORS[val] || '#94a3b8',
                  fontSize: 12,
                }}
              >
                {val}
              </span>
            )}
          />
          {positions.map((pos) => (
            <Scatter
              key={pos}
              name={pos}
              data={allPositivePlayers.filter((p) => p.position === pos)}
              fill={POSITION_COLORS[pos]}
            />
          ))}
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}
