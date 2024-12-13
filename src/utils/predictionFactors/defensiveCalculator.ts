import { TeamStanding } from '../../types/standings';

export const calculateDefensiveFactor = (teamStanding: TeamStanding): number => {
  const goalsAgainstPerGame = teamStanding.goalsAgainst / teamStanding.playedGames;
  const averageGoalsAgainstPerGame = 1.5; // League average goals against per game
  
  // Better defense means fewer goals against
  const defensiveRatio = averageGoalsAgainstPerGame / goalsAgainstPerGame;
  
  return Math.min(defensiveRatio, 1); // Normalize to 0-1 scale
};