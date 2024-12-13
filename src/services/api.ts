import axios from 'axios';
import { Match, Team } from '../types';
import { LeagueStandings } from '../types/standings';

const API_KEY = 'YOUR_API_KEY';
const BASE_URL = 'https://api.football-data.org/v2';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'X-Auth-Token': API_KEY,
  },
});

export const fetchUpcomingMatches = async (): Promise<Match[]> => {
  try {
    const response = await api.get('/matches');
    return response.data.matches;
  } catch (error) {
    console.error('Error fetching matches:', error);
    throw error;
  }
};

export const fetchTeamDetails = async (teamId: string): Promise<Team> => {
  try {
    const response = await api.get(`/teams/${teamId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching team details:', error);
    throw error;
  }
};

export const fetchLeagueStandings = async (leagueId: string): Promise<LeagueStandings> => {
  try {
    const response = await api.get(`/competitions/${leagueId}/standings`);
    return response.data;
  } catch (error) {
    console.error('Error fetching league standings:', error);
    throw error;
  }
};