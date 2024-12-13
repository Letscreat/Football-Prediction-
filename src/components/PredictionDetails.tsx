import React from 'react';
import { Prediction } from '../types/prediction';

interface PredictionDetailsProps {
  prediction: Prediction;
}

export const PredictionDetails: React.FC<PredictionDetailsProps> = ({ prediction }) => {
  const renderFactorBar = (value: number, label: string) => (
    <div className="mb-2">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm text-gray-600">{(value * 100).toFixed(1)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full"
          style={{ width: `${value * 100}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Prediction Analysis</h3>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Confidence Level</span>
          <span className={`px-2 py-1 rounded-full text-sm ${
            prediction.confidence > 0.7 ? 'bg-green-100 text-green-800' :
            prediction.confidence > 0.4 ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {(prediction.confidence * 100).toFixed(1)}%
          </span>
        </div>
        
        {prediction.recommendedBet && (
          <div className="mt-2 p-2 bg-gray-50 rounded-md">
            <span className="text-sm font-medium text-gray-700">
              Recommended Bet: {prediction.recommendedBet}
            </span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h4 className="text-md font-medium text-gray-700">Contributing Factors</h4>
        {renderFactorBar(prediction.factors.homeAdvantage, 'Home Advantage')}
        {renderFactorBar(prediction.factors.form, 'Team Form')}
        {renderFactorBar(prediction.factors.leaguePosition, 'League Position')}
        {renderFactorBar(prediction.factors.goalScoring, 'Goal Scoring')}
        {renderFactorBar(prediction.factors.defensiveRecord, 'Defensive Record')}
        {renderFactorBar(prediction.factors.fatigue, 'Team Fatigue')}
      </div>
    </div>
  );
};