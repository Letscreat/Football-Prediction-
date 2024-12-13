export interface TeamStanding {
  position: number;
  team: {
    id: string;
    name: string;
    logo: string;
  };
  playedGames: number;
  won: number;
  draw: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  form: string[];
}

export interface LeagueStandings {
  competition: {
    id: string;
    name: string;
    emblem: string;
  };
  season: {
    id: number;
    startDate: string;
    endDate: string;
    currentMatchday: number;
  };
  standings: TeamStanding[];
}