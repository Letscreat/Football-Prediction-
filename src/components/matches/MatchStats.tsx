import React from 'react';
import { LiveMatchStats } from '../../types/match';

interface MatchStatsProps {
  stats: LiveMatchStats;
}

export const MatchStats: React.FC<MatchStatsProps> = ({ stats }) => {
  const renderStatBar = (home: number, away: number, label: string) => {
    const total = home + away;
    const homePercentage = total === 0 ? 50 : (home / total) * 100;
    
    return (
      <div className="mb-2">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>{home}</span>
          <span className="font-medium">{label}</span>
          <span>{away}</span>
        </div>
        <div className="flex h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="bg-blue-500"
            style={{ width: `${homePercentage}%` }}
          />
          <div
            className="bg-red-500"
            style={{ width: `${100 - homePercentage}%` }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
      <h4 className="text-sm font-medium text-gray-700 mb-3">Match Stats</h4>
      {renderStatBar(stats.possession.home, stats.possession.away, 'Possession %')}
      {renderStatBar(stats.shots.home, stats.shots.away, 'Shots')}
      {renderStatBar(stats.shotsOnTarget.home, stats.shotsOnTarget.away, 'Shots on Target')}
      {renderStatBar(stats.corners.home, stats.corners.away, 'Corners')}
      {renderStatBar(stats.fouls.home, stats.fouls.away, 'Fouls')}
    </div>
  );
};