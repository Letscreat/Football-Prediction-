export interface PlayerPrediction {
  name: string;
  goalProbability: number;
  assistProbability: number;
  shotsPrediction: number;
  shotsOnTargetPrediction: number;
}

export interface TeamPrediction {
  totalGoalsPrediction: number;
  possessionPrediction: number;
  shotsPrediction: number;
  shotsOnTargetPrediction: number;
  cornersPrediction: number;
  cardsPrediction: number;
  topScorers: PlayerPrediction[];
}

export interface MatchPrediction {
  homeTeam: TeamPrediction;
  awayTeam: TeamPrediction;
  bothTeamsToScore: {
    prediction: boolean;
    probability: number;
  };
  totalGoals: {
    prediction: number;
    over25: number;  // Probability for over 2.5 goals
    under25: number; // Probability for under 2.5 goals
  };
  correctScore: {
    prediction: string;
    probability: number;
  };
  firstGoalScorer: PlayerPrediction;
  homeWinProbability: number;
  awayWinProbability: number;
  drawProbability: number;
  confidence: number;
  factors: PredictionFactors;
}

export interface PredictionFactors {
  homeAdvantage: number;
  form: number;
  headToHead: number;
  injuries: number;
  leaguePosition: number;
  goalScoring: number;
  defensiveRecord: number;
  fatigue: number;
}