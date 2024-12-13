import { Team } from '../../types';

export const calculateFormFactor = (recentForm: string[]): number => {
  const weights = {
    W: 3,
    D: 1,
    L: 0,
  };

  const formPoints = recentForm.reduce((total, result, index) => {
    // More recent matches have higher weight
    const recencyWeight = 1 + (index / recentForm.length);
    return total + (weights[result as keyof typeof weights] * recencyWeight);
  }, 0);

  const maxPossiblePoints = recentForm.length * 3 * 2; // Maximum points with recency weights
  return formPoints / maxPossiblePoints;
};