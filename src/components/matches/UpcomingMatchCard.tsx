import React from 'react';
import { Match } from '../../types/match';
import { format } from 'date-fns';

interface UpcomingMatchCardProps {
  match: Match;
}

export const UpcomingMatchCard: React.FC<UpcomingMatchCardProps> = ({ match }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center space-x-2">
          <img 
            src={match.competition.emblem} 
            alt={match.competition.name}
            className="w-6 h-6"
          />
          <span className="text-sm text-gray-600">{match.competition.name}</span>
        </div>
        <div className="text-sm text-gray-500">
          {format(new Date(match.date), 'MMM d, HH:mm')}
        </div>
      </div>

      <div className="flex justify-between items-center my-4">
        <div className="flex items-center space-x-3">
          <img src={match.homeTeam.logo} alt={match.homeTeam.name} className="w-8 h-8" />
          <span className="font-medium">{match.homeTeam.name}</span>
        </div>
        <div className="text-sm font-medium text-gray-500">vs</div>
        <div className="flex items-center space-x-3">
          <span className="font-medium">{match.awayTeam.name}</span>
          <img src={match.awayTeam.logo} alt={match.awayTeam.name} className="w-8 h-8" />
        </div>
      </div>

      <div className="text-sm text-gray-500 mt-2">
        <div className="flex justify-between">
          <span>{match.venue}</span>
          <span>{match.competition.country}</span>
        </div>
      </div>
    </div>
  );
};