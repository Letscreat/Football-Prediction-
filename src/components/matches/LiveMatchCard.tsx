import React from 'react';
import { Match } from '../../types/match';
import { format } from 'date-fns';
import { MatchStats } from './MatchStats';
import { MatchEvents } from './MatchEvents';

interface LiveMatchCardProps {
  match: Match;
}

export const LiveMatchCard: React.FC<LiveMatchCardProps> = ({ match }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-red-500">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center space-x-2">
          <img 
            src={match.competition.emblem} 
            alt={match.competition.name}
            className="w-6 h-6"
          />
          <span className="text-sm text-gray-600">{match.competition.name}</span>
        </div>
        <div className="flex items-center">
          <span className="animate-pulse bg-red-500 text-white px-2 py-1 rounded text-sm">
            LIVE {match.minute}'
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center my-4">
        <div className="flex items-center space-x-3">
          <img src={match.homeTeam.logo} alt={match.homeTeam.name} className="w-8 h-8" />
          <span className="font-medium">{match.homeTeam.name}</span>
        </div>
        <div className="text-2xl font-bold">
          {match.score.home} - {match.score.away}
        </div>
        <div className="flex items-center space-x-3">
          <span className="font-medium">{match.awayTeam.name}</span>
          <img src={match.awayTeam.logo} alt={match.awayTeam.name} className="w-8 h-8" />
        </div>
      </div>

      {match.stats && <MatchStats stats={match.stats} />}
      {match.events && match.events.length > 0 && <MatchEvents events={match.events} />}
    </div>
  );
};