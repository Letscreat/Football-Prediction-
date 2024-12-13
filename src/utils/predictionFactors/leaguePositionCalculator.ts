import { TeamStanding } from '../../types/standings';

export const calculateLeaguePositionFactor = (
  teamStanding: TeamStanding,
  totalTeams: number
): number => {
  // Convert position to a 0-1 scale where top position = 1
  const positionFactor = (totalTeams - teamStanding.position + 1) / totalTeams;
  
  // Consider points per game
  const pointsPerGame = teamStanding.points / teamStanding.playedGames;
  const maxPossiblePoints = 3; // 3 points per game is maximum
  const pointsFactor = pointsPerGame / maxPossiblePoints;

  return (positionFactor * 0.7) + (pointsFactor * 0.3);
};