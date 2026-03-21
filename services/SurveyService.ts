import { SurveyDefinition } from '../types';

const API_URL = import.meta.env.VITE_API_URL || '';

export const SurveyService = {
  // Get list of all available surveys
  getAvailableSurveys: async (): Promise<SurveyDefinition[]> => {
    try {
      const response = await fetch(`${API_URL}/api/tests`);
      if (!response.ok) throw new Error('Failed to fetch surveys');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('SurveyService.getAvailableSurveys error:', error);
      return [];
    }
  },

  // Get full details of a specific survey by its ID
  getSurveyById: async (surveyId: string): Promise<SurveyDefinition | undefined> => {
    try {
      const response = await fetch(`${API_URL}/api/tests/${surveyId}`);
      if (!response.ok) {
         if (response.status === 404) {
            console.warn(`Survey ${surveyId} not found, fetching list to fallback...`);
            const all = await SurveyService.getAvailableSurveys();
            return all[0];
         }
         throw new Error('Failed to fetch survey details');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('SurveyService.getSurveyById error:', error);
      return undefined;
    }
  },
};
