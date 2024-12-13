import { Match } from '../types/match';
import { api } from './api';

export const fetchLiveMatches = async (): Promise<Match[]> => {
  try {
    const response = await api.get('/matches', {
      params: { status: 'LIVE' }
    });
    return response.data.matches;
  } catch (error) {
    console.error('Error fetching live matches:', error);
    throw error;
  }
};

export const fetchUpcomingMatches = async (days: number = 7): Promise<Match[]> => {
  try {
    const response = await api.get('/matches', {
      params: {
        status: 'SCHEDULED',
        days
      }
    });
    return response.data.matches;
  } catch (error) {
    console.error('Error fetching upcoming matches:', error);
    throw error;
  }
};

export const fetchMatchDetails = async (matchId: string): Promise<Match> => {
  try {
    const response = await api.get(`/matches/${matchId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching match details:', error);
    throw error;
  }
};