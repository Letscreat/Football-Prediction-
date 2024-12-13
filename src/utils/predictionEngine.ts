import { Match, Prediction } from '../types';
import { TeamStanding } from '../types/standings';
import { calculateFormFactor } from './predictionFactors/formCalculator';
import { calculateLeaguePositionFactor } from './predictionFactors/leaguePositionCalculator';
import { calculateGoalScoringFactor } from './predictionFactors/goalScoringCalculator';
import { calculateDefensiveFactor } from './predictionFactors/defensiveCalculator';

const calculateHomeAdvantage = (match: Match): number => {
  // Base home advantage
  const baseHomeAdvantage = 0.6;
  
  // Adjust for home team's home record (if available)
  // This could be enhanced with actual home record data
  return baseHomeAdvantage;
};

const calculateFatigueFactor = (lastMatchDate: Date): number => {
  const daysSinceLastMatch = Math.floor(
    (Date.now() - lastMatchDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  
  // Optimal rest is considered 6-7 days
  if (daysSinceLastMatch >= 6 && daysSinceLastMatch <= 7) return 1;
  if (daysSinceLastMatch < 3) return 0.3;
  if (daysSinceLastMatch < 5) return 0.7;
  if (daysSinceLastMatch > 10) return 0.8; // Too much rest might affect match sharpness
  
  return 0.9;
};

export const generatePrediction = (
  match: Match,
  homeStanding: TeamStanding,
  awayStanding: TeamStanding,
  totalTeams: number
): Prediction => {
  // Calculate individual factors
  const homeAdvantage = calculateHomeAdvantage(match);
  const homeForm = calculateFormFactor(match.homeTeam.form);
  const awayForm = calculateFormFactor(match.awayTeam.form);
  
  const homeLeaguePosition = calculateLeaguePositionFactor(homeStanding, totalTeams);
  const awayLeaguePosition = calculateLeaguePositionFactor(awayStanding, totalTeams);
  
  const homeGoalScoring = calculateGoalScoringFactor(homeStanding);
  const awayGoalScoring = calculateGoalScoringFactor(awayStanding);
  
  const homeDefense = calculateDefensiveFactor(homeStanding);
  const awayDefense = calculateDefensiveFactor(awayStanding);
  
  // Weighted combination of factors
  const homeStrength = (
    homeAdvantage * 0.15 +
    homeForm * 0.2 +
    homeLeaguePosition * 0.25 +
    homeGoalScoring * 0.2 +
    homeDefense * 0.2
  );
  
  const awayStrength = (
    awayForm * 0.25 +
    awayLeaguePosition * 0.25 +
    awayGoalScoring * 0.25 +
    awayDefense * 0.25
  );
  
  // Calculate probabilities
  const totalStrength = homeStrength + awayStrength;
  const homeWinProbability = homeStrength / totalStrength;
  const awayWinProbability = awayStrength / totalStrength;
  const drawProbability = 0.25; // Base draw probability
  
  // Normalize probabilities to sum to 1
  const total = homeWinProbability + awayWinProbability + drawProbability;
  const normalizedHome = homeWinProbability / total;
  const normalizedAway = awayWinProbability / total;
  const normalizedDraw = drawProbability / total;
  
  // Calculate confidence based on factor consistency
  const confidence = Math.min(
    1,
    (Math.abs(homeStrength - awayStrength) + 0.3) * 0.7
  );
  
  return {
    homeWinProbability: normalizedHome,
    awayWinProbability: normalizedAway,
    drawProbability: normalizedDraw,
    confidence,
    factors: {
      homeAdvantage,
      form: (homeForm + awayForm) / 2,
      leaguePosition: (homeLeaguePosition + awayLeaguePosition) / 2,
      goalScoring: (homeGoalScoring + awayGoalScoring) / 2,
      defensiveRecord: (homeDefense + awayDefense) / 2,
      injuries: 0.5, // Placeholder - would need injury data
      headToHead: 0.5, // Placeholder - would need historical match data
      fatigue: 0.5, // Placeholder - would need match schedule data
    },
    recommendedBet: confidence > 0.7 ? 
      (normalizedHome > normalizedAway ? 'Home Win' : 'Away Win') :
      'No Clear Recommendation'
  };
};