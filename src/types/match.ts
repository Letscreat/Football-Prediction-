export interface Score {
  home: number | null;
  away: number | null;
}

export interface MatchEvent {
  type: 'GOAL' | 'YELLOW_CARD' | 'RED_CARD' | 'SUBSTITUTION';
  minute: number;
  team: 'home' | 'away';
  player: string;
  assistedBy?: string;
}

export interface LiveMatchStats {
  possession: {
    home: number;
    away: number;
  };
  shots: {
    home: number;
    away: number;
  };
  shotsOnTarget: {
    home: number;
    away: number;
  };
  corners: {
    home: number;
    away: number;
  };
  fouls: {
    home: number;
    away: number;
  };
}

export interface Match {
  id: string;
  competition: {
    id: string;
    name: string;
    country: string;
    emblem: string;
  };
  homeTeam: {
    id: string;
    name: string;
    logo: string;
    form: string[];
  };
  awayTeam: {
    id: string;
    name: string;
    logo: string;
    form: string[];
  };
  date: string;
  status: 'SCHEDULED' | 'LIVE' | 'FINISHED' | 'POSTPONED' | 'CANCELLED';
  minute?: number;
  score: Score;
  venue: string;
  events?: MatchEvent[];
  stats?: LiveMatchStats;
}