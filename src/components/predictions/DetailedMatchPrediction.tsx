import React from 'react';
import { MatchPrediction } from '../../types/prediction';
import { format } from 'date-fns';

interface DetailedMatchPredictionProps {
  prediction: MatchPrediction;
  match: Match;
}

export const DetailedMatchPrediction: React.FC<DetailedMatchPredictionProps> = ({
  prediction,
  match
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Match Prediction</h3>
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Confidence: {(prediction.confidence * 100).toFixed(1)}%
          </div>
          <div className="text-sm font-medium text-blue-600">
            {format(new Date(match.date), 'PPp')}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Result Probabilities */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium mb-3">Result Probabilities</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Home Win</span>
              <span>{(prediction.homeWinProbability * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span>Draw</span>
              <span>{(prediction.drawProbability * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span>Away Win</span>
              <span>{(prediction.awayWinProbability * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>

        {/* Goals Prediction */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium mb-3">Goals Prediction</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Total Goals</span>
              <span>{prediction.totalGoals.prediction}</span>
            </div>
            <div className="flex justify-between">
              <span>Over 2.5</span>
              <span>{(prediction.totalGoals.over25 * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span>Both Teams to Score</span>
              <span>{prediction.bothTeamsToScore.probability * 100}%</span>
            </div>
          </div>
        </div>

        {/* Team Statistics */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium mb-3">Home Team Predictions</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Goals</span>
              <span>{prediction.homeTeam.totalGoalsPrediction.toFixed(1)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shots</span>
              <span>{prediction.homeTeam.shotsPrediction.toFixed(1)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shots on Target</span>
              <span>{prediction.homeTeam.shotsOnTargetPrediction.toFixed(1)}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium mb-3">Away Team Predictions</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Goals</span>
              <span>{prediction.awayTeam.totalGoalsPrediction.toFixed(1)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shots</span>
              <span>{prediction.awayTeam.shotsPrediction.toFixed(1)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shots on Target</span>
              <span>{prediction.awayTeam.shotsOnTargetPrediction.toFixed(1)}</span>
            </div>
          </div>
        </div>

        {/* Top Scorer Predictions */}
        <div className="md:col-span-2 bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium mb-3">Goal Scorer Predictions</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prediction.homeTeam.topScorers.slice(0, 3).map((player, index) => (
              <div key={index} className="flex justify-between items-center">
                <span>{player.name}</span>
                <span>{(player.goalProbability * 100).toFixed(1)}%</span>
              </div>
            ))}
            {prediction.awayTeam.topScorers.slice(0, 3).map((player, index) => (
              <div key={index} className="flex justify-between items-center">
                <span>{player.name}</span>
                <span>{(player.goalProbability * 100).toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};