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

export type WrPlayer = { name: string; adp: number; vorp: number }

export type FullRosterPlayer = {
  name: string
  position: string
  adp: number
  vorp: number
}

// All players projected to have VORP >= 0 (i.e. above replacement level at
// their position). Extends the top-50 data out to ADP ~160 for RBs, ~105 for
// WRs, ~103 for TEs, and ~141 for QBs — wherever each position's value curve
// crosses zero.
export const allPositivePlayers: FullRosterPlayer[] = [
  // ─── RBs (replacement baseline ≈ 44.2 pts) ──────────────────────────────
  { name: 'Bijan Robinson',      position: 'RB', adp:   1.4, vorp: 272.4 },
  { name: 'Jahmyr Gibbs',        position: 'RB', adp:   2.9, vorp: 255.4 },
  { name: 'Christian McCaffrey', position: 'RB', adp:   6.7, vorp: 238.5 },
  { name: 'Jonathan Taylor',     position: 'RB', adp:   7.7, vorp: 219.8 },
  { name: 'James Cook',          position: 'RB', adp:   9.7, vorp: 208.3 },
  { name: 'Kenneth Walker',      position: 'RB', adp:  14.6, vorp: 176.0 },
  { name: 'Ashton Jeanty',       position: 'RB', adp:  15.4, vorp: 207.0 },
  { name: "De'Von Achane",       position: 'RB', adp:  16.2, vorp: 210.5 },
  { name: 'Omarion Hampton',     position: 'RB', adp:  18.8, vorp: 189.7 },
  { name: 'Saquon Barkley',      position: 'RB', adp:  19.5, vorp: 191.0 },
  { name: 'Jeremiyah Love',      position: 'RB', adp:  19.7, vorp: 197.0 },
  { name: 'Chase Brown',         position: 'RB', adp:  22.2, vorp: 179.3 },
  { name: 'Josh Jacobs',         position: 'RB', adp:  27.6, vorp: 164.3 },
  { name: 'Bucky Irving',        position: 'RB', adp:  31.6, vorp: 144.8 },
  { name: 'Derrick Henry',       position: 'RB', adp:  34.5, vorp: 191.2 },
  { name: 'Breece Hall',         position: 'RB', adp:  38.3, vorp: 168.1 },
  { name: 'Kyren Williams',      position: 'RB', adp:  39.1, vorp: 152.3 },
  { name: 'Travis Etienne',      position: 'RB', adp:  43.7, vorp: 162.4 },
  { name: 'Javonte Williams',    position: 'RB', adp:  45.8, vorp: 151.3 },
  { name: 'TreVeyon Henderson',  position: 'RB', adp:  54.7, vorp: 127.0 },
  { name: 'Rachaad White',       position: 'RB', adp:  58.3, vorp: 105.2 },
  { name: 'Isiah Pacheco',       position: 'RB', adp:  62.1, vorp:  92.8 },
  { name: 'David Montgomery',    position: 'RB', adp:  67.4, vorp:  81.3 },
  { name: 'Aaron Jones',         position: 'RB', adp:  72.8, vorp:  70.4 },
  { name: 'Alvin Kamara',        position: 'RB', adp:  76.5, vorp:  63.7 },
  { name: 'Rhamondre Stevenson', position: 'RB', adp:  81.2, vorp:  55.1 },
  { name: 'Zamir White',         position: 'RB', adp:  87.6, vorp:  48.9 },
  { name: 'J.K. Dobbins',        position: 'RB', adp:  93.4, vorp:  42.6 },
  { name: 'Brian Robinson',      position: 'RB', adp:  99.2, vorp:  38.4 },
  { name: 'Najee Harris',        position: 'RB', adp: 105.7, vorp:  32.1 },
  { name: 'Chuba Hubbard',       position: 'RB', adp: 112.3, vorp:  26.8 },
  { name: 'Antonio Gibson',      position: 'RB', adp: 118.9, vorp:  21.4 },
  { name: 'Ty Chandler',         position: 'RB', adp: 126.4, vorp:  16.2 },
  { name: 'Gus Edwards',         position: 'RB', adp: 133.8, vorp:  11.7 },
  { name: 'Rico Dowdle',         position: 'RB', adp: 141.5, vorp:   7.3 },
  { name: 'Samaje Perine',       position: 'RB', adp: 149.2, vorp:   3.8 },
  { name: 'Ray Davis',           position: 'RB', adp: 157.8, vorp:   1.2 },
  // ─── WRs (replacement baseline ≈ 119.5 pts) ─────────────────────────────
  { name: "Ja'Marr Chase",       position: 'WR', adp:   3.4, vorp: 185.6 },
  { name: 'Puka Nacua',          position: 'WR', adp:   4.9, vorp: 193.0 },
  { name: 'Jaxon Smith-Njigba',  position: 'WR', adp:   5.4, vorp: 165.1 },
  { name: 'CeeDee Lamb',         position: 'WR', adp:  10.6, vorp: 151.0 },
  { name: 'Amon-Ra St. Brown',   position: 'WR', adp:  11.2, vorp: 161.0 },
  { name: 'Justin Jefferson',    position: 'WR', adp:  12.4, vorp: 128.6 },
  { name: 'Drake London',        position: 'WR', adp:  14.1, vorp: 121.2 },
  { name: 'Malik Nabers',        position: 'WR', adp:  19.2, vorp: 126.9 },
  { name: 'Nico Collins',        position: 'WR', adp:  21.1, vorp: 116.5 },
  { name: 'George Pickens',      position: 'WR', adp:  23.1, vorp: 116.4 },
  { name: 'Chris Olave',         position: 'WR', adp:  26.4, vorp: 117.1 },
  { name: 'A.J. Brown',          position: 'WR', adp:  30.8, vorp: 106.1 },
  { name: 'Rashee Rice',         position: 'WR', adp:  32.7, vorp: 127.8 },
  { name: 'Tee Higgins',         position: 'WR', adp:  35.5, vorp:  89.1 },
  { name: 'Tetairoa McMillan',   position: 'WR', adp:  37.3, vorp:  96.4 },
  { name: 'Garrett Wilson',      position: 'WR', adp:  40.9, vorp: 115.1 },
  { name: 'Jaylen Waddle',       position: 'WR', adp:  46.2, vorp:  68.0 },
  { name: 'Davante Adams',       position: 'WR', adp:  46.9, vorp:  68.7 },
  { name: 'Ladd McConkey',       position: 'WR', adp:  47.8, vorp:  84.1 },
  { name: 'Zay Flowers',         position: 'WR', adp:  49.1, vorp: 101.9 },
  { name: 'Jameson Williams',    position: 'WR', adp:  51.6, vorp:  86.7 },
  { name: 'DeVonta Smith',       position: 'WR', adp:  55.9, vorp:  87.9 },
  { name: 'Emeka Egbuka',        position: 'WR', adp:  56.1, vorp:  78.1 },
  { name: 'DJ Moore',            position: 'WR', adp:  63.8, vorp:  52.6 },
  { name: 'Courtland Sutton',    position: 'WR', adp:  74.5, vorp:  38.1 },
  { name: 'Joshua Palmer',       position: 'WR', adp:  82.6, vorp:  27.3 },
  { name: "Wan'Dale Robinson",   position: 'WR', adp:  88.2, vorp:  24.7 },
  { name: 'Romeo Doubs',         position: 'WR', adp:  96.3, vorp:  16.8 },
  { name: 'Elijah Moore',        position: 'WR', adp: 104.7, vorp:   8.3 },
  // ─── TEs (replacement baseline ≈ 108.7 pts) ─────────────────────────────
  { name: 'Trey McBride',        position: 'TE', adp:  18.7, vorp: 131.8 },
  { name: 'Brock Bowers',        position: 'TE', adp:  26.4, vorp: 125.4 },
  { name: 'Colston Loveland',    position: 'TE', adp:  47.9, vorp:  91.3 },
  { name: 'Sam LaPorta',         position: 'TE', adp:  62.4, vorp:  51.2 },
  { name: 'Evan Engram',         position: 'TE', adp:  71.8, vorp:  37.6 },
  { name: 'Mark Andrews',        position: 'TE', adp:  79.3, vorp:  24.9 },
  { name: 'Jake Ferguson',       position: 'TE', adp:  87.1, vorp:  14.3 },
  { name: 'Cole Kmet',           position: 'TE', adp:  94.6, vorp:   6.8 },
  { name: 'Tyler Higbee',        position: 'TE', adp: 103.2, vorp:   2.1 },
  // ─── QBs (replacement baseline ≈ 225.3 pts) ─────────────────────────────
  { name: 'Josh Allen',          position: 'QB', adp:  28.2, vorp: 136.2 },
  { name: 'Lamar Jackson',       position: 'QB', adp:  37.9, vorp:  92.0 },
  { name: 'Drake Maye',          position: 'QB', adp:  46.2, vorp:  86.3 },
  { name: 'Jalen Hurts',         position: 'QB', adp:  56.8, vorp:  71.4 },
  { name: 'Patrick Mahomes',     position: 'QB', adp:  63.5, vorp:  62.8 },
  { name: 'Jayden Daniels',      position: 'QB', adp:  69.4, vorp:  54.1 },
  { name: 'Sam Darnold',         position: 'QB', adp:  76.8, vorp:  45.7 },
  { name: 'Bo Nix',              position: 'QB', adp:  84.3, vorp:  37.2 },
  { name: 'Baker Mayfield',      position: 'QB', adp:  92.7, vorp:  29.6 },
  { name: 'Matthew Stafford',    position: 'QB', adp: 101.4, vorp:  22.3 },
  { name: 'Dak Prescott',        position: 'QB', adp: 110.6, vorp:  15.8 },
  { name: 'Caleb Williams',      position: 'QB', adp: 120.1, vorp:  10.2 },
  { name: 'Geno Smith',          position: 'QB', adp: 130.7, vorp:   5.6 },
  { name: 'Tua Tagovailoa',      position: 'QB', adp: 141.3, vorp:   2.4 },
]

// WR-only dataset spanning the full ADP range, used to demonstrate
// cubic polynomial overfitting.  Late-round negatives pull the tail
// down so steeply that mid-range stars appear below the curve.
export const wrPolynomialData: WrPlayer[] = [
  // Early rounds
  { name: "Ja'Marr Chase",     adp:   3.4, vorp:  185.6 },
  { name: 'Puka Nacua',        adp:   4.9, vorp:  193.0 },
  { name: 'Jaxon Smith-Njigba',adp:   5.4, vorp:  165.1 },
  { name: 'CeeDee Lamb',       adp:  10.6, vorp:  151.0 },
  { name: 'Amon-Ra St. Brown', adp:  11.2, vorp:  161.0 },
  { name: 'Justin Jefferson',  adp:  12.4, vorp:  128.6 },
  { name: 'Drake London',      adp:  14.1, vorp:  121.2 },
  // Mid rounds
  { name: 'Malik Nabers',      adp:  19.2, vorp:  126.9 },
  { name: 'Nico Collins',      adp:  21.1, vorp:  116.5 },
  { name: 'George Pickens',    adp:  23.1, vorp:  116.4 },
  { name: 'Chris Olave',       adp:  26.4, vorp:  117.1 },
  { name: 'A.J. Brown',        adp:  30.8, vorp:  106.1 },
  { name: 'Rashee Rice',       adp:  32.7, vorp:  127.8 },
  { name: 'Tee Higgins',       adp:  35.5, vorp:   89.1 },
  { name: 'Tetairoa McMillan', adp:  37.3, vorp:   96.4 },
  { name: 'Garrett Wilson',    adp:  40.9, vorp:  115.1 },
  { name: 'Jaylen Waddle',     adp:  46.2, vorp:   68.0 },
  { name: 'Davante Adams',     adp:  46.9, vorp:   68.7 },
  { name: 'Ladd McConkey',     adp:  47.8, vorp:   84.1 },
  { name: 'Zay Flowers',       adp:  49.1, vorp:  101.9 },
  { name: 'Jameson Williams',  adp:  51.6, vorp:   86.7 },
  { name: 'DeVonta Smith',     adp:  55.9, vorp:   87.9 },
  { name: 'Emeka Egbuka',      adp:  56.1, vorp:   78.1 },
  // Later rounds — declining VORP
  { name: 'DJ Moore',          adp:  63.8, vorp:   52.6 },
  { name: 'Courtland Sutton',  adp:  74.5, vorp:   38.1 },
  { name: "Wan'Dale Robinson", adp:  88.2, vorp:   24.7 },
  { name: 'Elijah Moore',      adp: 104.7, vorp:    8.3 },
  { name: 'Adam Thielen',      adp: 136.4, vorp:  -19.8 },
  { name: 'Mecole Hardman',    adp: 158.9, vorp:  -38.5 },
  { name: 'Tim Patrick',       adp: 186.5, vorp:  -49.2 },
  // Deep late-round / speculative WRs — strongly negative VORP.
  // These anchor the right tail of the polynomial fit and are what
  // cause it to overshoot the curve downward at high ADP.
  { name: 'Kyle Williams',     adp: 222.1, vorp:  -57.7 },
  { name: 'Keon Coleman',      adp: 234.8, vorp:  -80.7 },
  { name: 'Jalen Philyor',     adp: 245.0, vorp:  -96.4 },
  { name: 'Kendrick Bourne',   adp: 251.3, vorp: -112.3 },
]
