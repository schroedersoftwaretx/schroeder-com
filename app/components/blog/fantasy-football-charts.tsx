'use client'

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Label,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  overvaluedPlayers,
  POSITION_COLORS,
  TIER_COLORS,
  top50Players,
  undervaluedPlayers,
  type ResidualPlayer,
} from 'app/blog/fantasy-football-data'

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
  const data = [...undervaluedPlayers].sort((a, b) => b.residual - a.residual)
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
            tick={{ fill: '#f1f5f9', fontSize: 12 }}
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
  const data = [...overvaluedPlayers].sort((a, b) => a.residual - b.residual)
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
            tick={{ fill: '#f1f5f9', fontSize: 12 }}
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
  const positions = ['RB', 'WR', 'TE', 'QB'] as const
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
