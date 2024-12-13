import React from 'react';
import { MatchEvent } from '../../types/match';

interface MatchEventsProps {
  events: MatchEvent[];
}

export const MatchEvents: React.FC<MatchEventsProps> = ({ events }) => {
  const getEventIcon = (type: MatchEvent['type']) => {
    switch (type) {
      case 'GOAL':
        return '⚽';
      case 'YELLOW_CARD':
        return '🟨';
      case 'RED_CARD':
        return '🟥';
      case 'SUBSTITUTION':
        return '🔄';
      default:
        return '•';
    }
  };

  return (
    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
      <h4 className="text-sm font-medium text-gray-700 mb-3">Match Events</h4>
      <div className="space-y-2">
        {events.map((event, index) => (
          <div key={index} className="flex items-center text-sm">
            <span className="w-8 text-gray-500">{event.minute}'</span>
            <span className="mr-2">{getEventIcon(event.type)}</span>
            <span className="font-medium">{event.player}</span>
            {event.assistedBy && (
              <span className="text-gray-500 ml-1">
                (assist: {event.assistedBy})
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};