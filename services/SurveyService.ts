import { AVAILABLE_SURVEYS } from '../constants';
import { SurveyDefinition } from '../types';

// Simulate network latency (in milliseconds) to test loading states
const SIMULATED_DELAY = 1000;

export const SurveyService = {
  // Get list of all available surveys (useful for menus or selection screens)
  getAvailableSurveys: async (): Promise<SurveyDefinition[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(AVAILABLE_SURVEYS), SIMULATED_DELAY);
    });
  },

  // Get full details of a specific survey by its ID
  getSurveyById: async (surveyId: string): Promise<SurveyDefinition | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const survey = AVAILABLE_SURVEYS.find((s) => s.id === surveyId);
        resolve(survey);
      }, SIMULATED_DELAY);
    });
  },
};
