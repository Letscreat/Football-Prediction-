import React from 'react';
import { Match, Prediction } from '../types';
import { format } from 'date-fns';

interface MatchCardProps {
  match: Match;
  prediction: Prediction;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match, prediction }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <img src={match.homeTeam.logo} alt={match.homeTeam.name} className="w-10 h-10 mr-2" />
          <span className="font-semibold">{match.homeTeam.name}</span>
        </div>
        <div className="text-gray-600">vs</div>
        <div className="flex items-center">
          <span className="font-semibold">{match.awayTeam.name}</span>
          <img src={match.awayTeam.logo} alt={match.awayTeam.name} className="w-10 h-10 ml-2" />
        </div>
      </div>

      <div className="text-sm text-gray-600 mb-4">
        <div>{format(new Date(match.date), 'PPP')}</div>
        <div>{match.venue}</div>
        <div>{match.competition}</div>
      </div>

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
  );
};