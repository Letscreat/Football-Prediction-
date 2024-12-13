export interface Team {
  id: string;
  name: string;
  logo: string;
  form: string[];
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  date: string;
  competition: string;
  venue: string;
}

export interface Prediction {
  homeWinProbability: number;
  awayWinProbability: number;
  drawProbability: number;
  factors: {
    homeAdvantage: number;
    form: number;
    headToHead: number;
    injuries: number;
  };
}