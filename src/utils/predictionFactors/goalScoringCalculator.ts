import { TeamStanding } from '../../types/standings';

export const calculateGoalScoringFactor = (teamStanding: TeamStanding): number => {
  const goalsPerGame = teamStanding.goalsFor / teamStanding.playedGames;
  const averageGoalsPerGame = 1.5; // League average goals per game
  
  // Calculate ratio compared to average, cap at 2.0 for normalization
  const goalScoringRatio = Math.min(goalsPerGame / averageGoalsPerGame, 2.0);
  
  return goalScoringRatio / 2; // Normalize to 0-1 scale
};