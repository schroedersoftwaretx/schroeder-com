export type TierPlayer = {
  name: string
  position: string
  adp: number
  vorp: number
  tier: number
}

export type ResidualPlayer = {
  name: string
  position: string
  adp: number
  vorp: number
  residual: number
  isoRank: number
}

export const undervaluedPlayers: ResidualPlayer[] = [
  {
    name: 'Zay Flowers',
    position: 'WR',
    adp: 49.1,
    vorp: 101.9,
    residual: 19.0,
    isoRank: 1,
  },
  {
    name: 'Garrett Wilson',
    position: 'WR',
    adp: 40.9,
    vorp: 115.1,
    residual: 14.9,
    isoRank: 2,
  },
  {
    name: 'Derrick Henry',
    position: 'RB',
    adp: 34.5,
    vorp: 191.2,
    residual: 24.1,
    isoRank: 3,
  },
  {
    name: 'Rashee Rice',
    position: 'WR',
    adp: 32.7,
    vorp: 127.8,
    residual: 11.0,
    isoRank: 5,
  },
  {
    name: "De'Von Achane",
    position: 'RB',
    adp: 16.2,
    vorp: 210.5,
    residual: 12.7,
    isoRank: 12,
  },
  {
    name: 'Ashton Jeanty',
    position: 'RB',
    adp: 15.4,
    vorp: 207.0,
    residual: 9.2,
    isoRank: 14,
  },
  {
    name: 'Jeremiyah Love',
    position: 'RB',
    adp: 19.7,
    vorp: 197.0,
    residual: 4.4,
    isoRank: 18,
  },
  {
    name: 'Travis Etienne',
    position: 'RB',
    adp: 43.7,
    vorp: 162.4,
    residual: 5.1,
    isoRank: 17,
  },
  {
    name: 'Jameson Williams',
    position: 'WR',
    adp: 51.6,
    vorp: 86.7,
    residual: 3.8,
    isoRank: 15,
  },
  {
    name: 'DeVonta Smith',
    position: 'WR',
    adp: 55.9,
    vorp: 87.9,
    residual: 5.0,
    isoRank: 12,
  },
]

export const overvaluedPlayers: ResidualPlayer[] = [
  {
    name: 'Bucky Irving',
    position: 'RB',
    adp: 31.6,
    vorp: 144.8,
    residual: -22.3,
    isoRank: 55,
  },
  {
    name: 'Kenneth Walker',
    position: 'RB',
    adp: 14.6,
    vorp: 176.0,
    residual: -21.8,
    isoRank: 54,
  },
  {
    name: 'A.J. Brown',
    position: 'WR',
    adp: 30.8,
    vorp: 106.1,
    residual: -10.7,
    isoRank: 57,
  },
  {
    name: 'Tee Higgins',
    position: 'WR',
    adp: 35.5,
    vorp: 89.1,
    residual: -11.1,
    isoRank: 58,
  },
  {
    name: 'Omarion Hampton',
    position: 'RB',
    adp: 18.8,
    vorp: 189.7,
    residual: -2.9,
    isoRank: 40,
  },
  {
    name: 'Jaylen Waddle',
    position: 'WR',
    adp: 46.2,
    vorp: 68.0,
    residual: -14.9,
    isoRank: 63,
  },
]

export const top50Players: TierPlayer[] = [
  { name: 'Bijan Robinson', position: 'RB', adp: 1.4, vorp: 272.4, tier: 1 },
  { name: 'Jahmyr Gibbs', position: 'RB', adp: 2.9, vorp: 255.4, tier: 1 },
  { name: "Ja'Marr Chase", position: 'WR', adp: 3.4, vorp: 185.6, tier: 1 },
  { name: 'Puka Nacua', position: 'WR', adp: 4.9, vorp: 193.0, tier: 1 },
  { name: 'Jaxon Smith-Njigba', position: 'WR', adp: 5.4, vorp: 165.1, tier: 1 },
  { name: 'Christian McCaffrey', position: 'RB', adp: 6.7, vorp: 238.5, tier: 1 },
  { name: 'Jonathan Taylor', position: 'RB', adp: 7.7, vorp: 219.8, tier: 1 },
  { name: 'James Cook', position: 'RB', adp: 9.7, vorp: 208.3, tier: 1 },
  { name: 'CeeDee Lamb', position: 'WR', adp: 10.6, vorp: 151.0, tier: 2 },
  { name: 'Amon-Ra St. Brown', position: 'WR', adp: 11.2, vorp: 161.0, tier: 2 },
  { name: 'Justin Jefferson', position: 'WR', adp: 12.4, vorp: 128.6, tier: 2 },
  { name: 'Drake London', position: 'WR', adp: 14.1, vorp: 121.2, tier: 2 },
  { name: 'Kenneth Walker', position: 'RB', adp: 14.6, vorp: 176.0, tier: 2 },
  { name: 'Ashton Jeanty', position: 'RB', adp: 15.4, vorp: 207.0, tier: 2 },
  { name: "De'Von Achane", position: 'RB', adp: 16.2, vorp: 210.5, tier: 2 },
  { name: 'Trey McBride', position: 'TE', adp: 18.7, vorp: 131.8, tier: 2 },
  { name: 'Omarion Hampton', position: 'RB', adp: 18.8, vorp: 189.7, tier: 2 },
  { name: 'Malik Nabers', position: 'WR', adp: 19.2, vorp: 126.9, tier: 2 },
  { name: 'Saquon Barkley', position: 'RB', adp: 19.5, vorp: 191.0, tier: 2 },
  { name: 'Jeremiyah Love', position: 'RB', adp: 19.7, vorp: 197.0, tier: 2 },
  { name: 'Nico Collins', position: 'WR', adp: 21.1, vorp: 116.5, tier: 3 },
  { name: 'Chase Brown', position: 'RB', adp: 22.2, vorp: 179.3, tier: 3 },
  { name: 'George Pickens', position: 'WR', adp: 23.1, vorp: 116.4, tier: 3 },
  { name: 'Brock Bowers', position: 'TE', adp: 26.4, vorp: 125.4, tier: 3 },
  { name: 'Chris Olave', position: 'WR', adp: 26.4, vorp: 117.1, tier: 3 },
  { name: 'Josh Jacobs', position: 'RB', adp: 27.6, vorp: 164.3, tier: 3 },
  { name: 'Josh Allen', position: 'QB', adp: 28.2, vorp: 136.2, tier: 3 },
  { name: 'A.J. Brown', position: 'WR', adp: 30.8, vorp: 106.1, tier: 3 },
  { name: 'Bucky Irving', position: 'RB', adp: 31.6, vorp: 144.8, tier: 3 },
  { name: 'Rashee Rice', position: 'WR', adp: 32.7, vorp: 127.8, tier: 3 },
  { name: 'Derrick Henry', position: 'RB', adp: 34.5, vorp: 191.2, tier: 3 },
  { name: 'Tee Higgins', position: 'WR', adp: 35.5, vorp: 89.1, tier: 4 },
  { name: 'Tetairoa McMillan', position: 'WR', adp: 37.3, vorp: 96.4, tier: 4 },
  { name: 'Lamar Jackson', position: 'QB', adp: 37.9, vorp: 92.0, tier: 4 },
  { name: 'Breece Hall', position: 'RB', adp: 38.3, vorp: 168.1, tier: 4 },
  { name: 'Kyren Williams', position: 'RB', adp: 39.1, vorp: 152.3, tier: 4 },
  { name: 'Garrett Wilson', position: 'WR', adp: 40.9, vorp: 115.1, tier: 4 },
  { name: 'Travis Etienne', position: 'RB', adp: 43.7, vorp: 162.4, tier: 4 },
  { name: 'Javonte Williams', position: 'RB', adp: 45.8, vorp: 151.3, tier: 4 },
  { name: 'Drake Maye', position: 'QB', adp: 46.2, vorp: 86.3, tier: 4 },
  { name: 'Jaylen Waddle', position: 'WR', adp: 46.2, vorp: 68.0, tier: 5 },
  { name: 'Davante Adams', position: 'WR', adp: 46.9, vorp: 68.7, tier: 5 },
  { name: 'Ladd McConkey', position: 'WR', adp: 47.8, vorp: 84.1, tier: 5 },
  { name: 'Colston Loveland', position: 'TE', adp: 47.9, vorp: 91.3, tier: 5 },
  { name: 'Zay Flowers', position: 'WR', adp: 49.1, vorp: 101.9, tier: 5 },
  { name: 'Jameson Williams', position: 'WR', adp: 51.6, vorp: 86.7, tier: 5 },
  { name: 'TreVeyon Henderson', position: 'RB', adp: 54.7, vorp: 127.0, tier: 5 },
  { name: 'DeVonta Smith', position: 'WR', adp: 55.9, vorp: 87.9, tier: 5 },
  { name: 'Emeka Egbuka', position: 'WR', adp: 56.1, vorp: 78.1, tier: 5 },
]

export const POSITION_COLORS: Record<string, string> = {
  RB: '#3B82F6',
  WR: '#10B981',
  TE: '#F59E0B',
  QB: '#EF4444',
}

export const TIER_COLORS = [
  '#1e3a5f',
  '#2563EB',
  '#3B82F6',
  '#60A5FA',
  '#93C5FD',
  '#BFDBFE',
  '#DBEAFE',
  '#EFF6FF',
]
