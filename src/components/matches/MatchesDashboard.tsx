import React, { useEffect, useState } from 'react';
import { Match } from '../../types/match';
import { fetchLiveMatches, fetchUpcomingMatches } from '../../services/matchService';
import { LiveMatchCard } from './LiveMatchCard';
import { UpcomingMatchCard } from './UpcomingMatchCard';

export const MatchesDashboard: React.FC = () => {
  const [liveMatches, setLiveMatches] = useState<Match[]>([]);
  const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMatches = async () => {
      try {
        const [live, upcoming] = await Promise.all([
          fetchLiveMatches(),
          fetchUpcomingMatches(7) // Next 7 days
        ]);
        
        setLiveMatches(live);
        setUpcomingMatches(upcoming);
        setLoading(false);
      } catch (err) {
        setError('Failed to load matches. Please try again later.');
        setLoading(false);
      }
    };

    loadMatches();
    
    // Refresh live matches every minute
    const interval = setInterval(async () => {
      try {
        const live = await fetchLiveMatches();
        setLiveMatches(live);
      } catch (err) {
        console.error('Error refreshing live matches:', err);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {liveMatches.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4">Live Matches</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {liveMatches.map(match => (
              <LiveMatchCard key={match.id} match={match} />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-2xl font-bold mb-4">Upcoming Matches</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {upcomingMatches.map(match => (
            <UpcomingMatchCard key={match.id} match={match} />
          ))}
        </div>
      </section>
    </div>
  );
};