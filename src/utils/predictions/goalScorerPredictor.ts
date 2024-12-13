import { Player, Team, Match } from '../../types';
import { PlayerPrediction } from '../../types/prediction';

interface PlayerStats {
  goalsScored: number;
  assists: number;
  shots: number;
  shotsOnTarget: number;
  minutesPlayed: number;
}

export const predictPlayerPerformance = (
  player: Player,
  team: Team,
  match: Match,
  recentStats: PlayerStats
): PlayerPrediction => {
  // Calculate goals per minute ratio
  const goalsPerMinute = recentStats.goalsScored / recentStats.minutesPlayed;
  const shotsPerMinute = recentStats.shots / recentStats.minutesPlayed;
  const shotsOnTargetRatio = recentStats.shotsOnTarget / recentStats.shots;

  // Predict for a 90-minute match
  const expectedShots = shotsPerMinute * 90;
  const expectedShotsOnTarget = expectedShots * shotsOnTargetRatio;
  
  // Calculate goal probability considering form and opposition
  const baseGoalProbability = goalsPerMinute * 90;
  const formFactor = calculatePlayerFormFactor(player);
  const oppositionFactor = calculateOppositionStrength(match, team);

  const adjustedGoalProbability = 
    baseGoalProbability * formFactor * oppositionFactor;

  return {
    name: player.name,
    goalProbability: Math.min(adjustedGoalProbability, 0.8), // Cap at 80%
    assistProbability: calculateAssistProbability(recentStats),
    shotsPrediction: expectedShots,
    shotsOnTargetPrediction: expectedShotsOnTarget
  };
};

const calculatePlayerFormFactor = (player: Player): number => {
  // Implementation based on recent performances
  return 1.0; // Placeholder
};

const calculateOppositionStrength = (match: Match, team: Team): number => {
  // Implementation based on opposition's defensive record
  return 1.0; // Placeholder
};

const calculateAssistProbability = (stats: PlayerStats): number => {
  const assistsPerMinute = stats.assists / stats.minutesPlayed;
  return Math.min(assistsPerMinute * 90, 0.7); // Cap at 70%
};