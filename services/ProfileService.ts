import { Answer, ProfileType, Profile, Language } from '../types';
import { SURVEY_DATA } from '../constants';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export class ProfileService {
  static async saveResultToBackend(profile: Profile, testType: string, scores: any, lang: Language) {
    const authDataString = localStorage.getItem('telegram_auth');
    if (!authDataString) return null;

    try {
      const authData = JSON.parse(authDataString);
      // The auth data is stored as { user: { ... } } or just { ... }
      const telegramUser = authData.user || authData;

      const response = await fetch(`${API_BASE_URL}/api/save-result`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          auth_data: telegramUser,
          test_type: testType,
          answers: profile.answers,
          scores: scores,
          lang: lang
        }),
      });
      return await response.json();
    } catch (e) {
      console.error('Failed to save to backend', e);
      return null;
    }
  }

  static async loadResultFromBackend() {
    const authDataString = localStorage.getItem('telegram_auth');
    if (!authDataString) return null;

    try {
      const authData = JSON.parse(authDataString);
      const user = authData.user || authData;
      
      const response = await fetch(`${API_BASE_URL}/api/me/result`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        return await response.json();
      }
      return null;
    } catch (e) {
      console.error('Failed to load from backend', e);
      return null;
    }
  }

  static async fetchAllResults() {
    const authDataString = localStorage.getItem('telegram_auth');
    if (!authDataString) return [];

    try {
      const authData = JSON.parse(authDataString);
      const user = authData.user || authData;
      
      const response = await fetch(`${API_BASE_URL}/api/results?telegram_id=${user.id}&hash=${user.hash}`);
      if (response.ok) {
        return await response.json();
      }
      return [];
    } catch (e) {
      console.error('Failed to fetch admin results', e);
      return [];
    }
  }

  static calculateCategoryScore(answers: Record<string, Answer>, subCatKey: string): number {
    const questions = SURVEY_DATA.flatMap(c => c.questions).filter(q => q.category === 'Sensory' && q.subCategory?.en === subCatKey);
    if (questions.length === 0) return 0;

    let total = 0;
    let count = 0;
    questions.forEach(q => {
      const ans = answers[q.id];
      if (ans && typeof ans.value === 'number') {
        total += ans.value;
        count++;
      }
    });

    return count > 0 ? Number((total / count).toFixed(1)) : 0;
  }

  static getProfileTypeLabel(type: ProfileType | undefined, lang: Language): string {
    if (!type) return '';
    const labels: Record<ProfileType, Record<Language, string>> = {
      [ProfileType.APHANTASIA]: { uk: 'Афантазія', en: 'Aphantasia', ru: 'Афантазия' },
      [ProfileType.HYPOPHANTASIA]: { uk: 'Гіпофантазія', en: 'Hypophantasia', ru: 'Гипофантазия' },
      [ProfileType.PHANTASIA]: { uk: 'Фантазія', en: 'Phantasia', ru: 'Фантазия' },
      [ProfileType.HYPERPHANTASIA]: { uk: 'Гіперфантазія', en: 'Hyperphantasia', ru: 'Гиперфантазия' },
    };
    return labels[type][lang];
  }

  static getProfileType(visualScore: number): ProfileType {
    if (visualScore <= 1.5) return ProfileType.APHANTASIA;
    if (visualScore <= 3) return ProfileType.HYPOPHANTASIA;
    if (visualScore >= 4.5) return ProfileType.HYPERPHANTASIA;
    return ProfileType.PHANTASIA;
  }

  static getProfiles(): Profile[] {
    const saved = localStorage.getItem('neuroprofile_profiles');
    if (!saved) return [];
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse profiles', e);
      return [];
    }
  }

  static saveProfiles(profiles: Profile[]): void {
    localStorage.setItem('neuroprofile_profiles', JSON.stringify(profiles));
  }

  static createProfile(name: string, surveyId: string, customId?: string): Profile {
    const profiles = this.getProfiles();
    
    // If customId provided, check if it already exists to avoid duplicates
    if (customId) {
      const existing = profiles.find(p => p.id === customId);
      if (existing) return existing;
    }

    const newProfile: Profile = {
      id: customId || 'profile_' + Math.random().toString(36).slice(2, 11) + '_' + Date.now().toString(36),
      name,
      answers: {},
      lastUpdated: new Date().toISOString(),
      surveyId,
    };
    
    profiles.push(newProfile);
    this.saveProfiles(profiles);
    return newProfile;
  }

  static updateProfile(profileId: string, answers: Record<string, Answer>, type?: ProfileType): void {
    const profiles = this.getProfiles();
    const index = profiles.findIndex(p => p.id === profileId);
    if (index !== -1) {
      profiles[index].answers = answers;
      profiles[index].lastUpdated = new Date().toISOString();
      if (type) profiles[index].type = type;
      this.saveProfiles(profiles);
    }
  }

  static renameProfile(profileId: string, newName: string): void {
    const profiles = this.getProfiles();
    const index = profiles.findIndex(p => p.id === profileId);
    if (index !== -1) {
      profiles[index].name = newName;
      profiles[index].lastUpdated = new Date().toISOString();
      this.saveProfiles(profiles);
    }
  }

  static deleteProfile(profileId: string): void {
    const profiles = this.getProfiles().filter(p => p.id !== profileId);
    this.saveProfiles(profiles);
  }
}
