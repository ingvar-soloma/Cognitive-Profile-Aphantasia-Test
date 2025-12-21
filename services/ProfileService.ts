import { Answer, QuestionType, ProfileType, Profile, Language } from '../types';
import { SURVEY_DATA } from '../constants';

export class ProfileService {
  static calculateCategoryScore(answers: Record<string, Answer>, subCatKey: string): number {
    let total = 0;
    let count = 0;

    SURVEY_DATA.forEach(cat => {
      cat.questions.forEach(q => {
        let match = false;
        if (subCatKey === 'Visual' && q.id.startsWith('1_A')) match = true;
        if (subCatKey === 'Auditory' && q.id.startsWith('1_B')) match = true;
        if (subCatKey === 'Tactile' && q.id === '1_C_1') match = true;
        if (subCatKey === 'Gustatory' && q.id === '1_C_2') match = true;
        if (subCatKey === 'Olfactory' && q.id === '1_C_3') match = true;

        if (match && q.type === QuestionType.SCALE) {
          const val = answers[q.id]?.value;
          if (typeof val === 'number') {
            total += val;
            count++;
          }
        }
      });
    });

    return count > 0 ? Number.parseFloat((total / count).toFixed(1)) : 0;
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

  static getProfileType(answers: Record<string, Answer>): ProfileType {
    const visualScore = this.calculateCategoryScore(answers, 'Visual');
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

  static createProfile(name: string, surveyId: string): Profile {
    const newProfile: Profile = {
      id: 'profile_' + Math.random().toString(36).slice(2, 11) + '_' + Date.now().toString(36),
      name,
      answers: {},
      lastUpdated: new Date().toISOString(),
      surveyId,
    };
    const profiles = this.getProfiles();
    profiles.push(newProfile);
    this.saveProfiles(profiles);
    return newProfile;
  }

  static updateProfile(profileId: string, answers: Record<string, Answer>): void {
    const profiles = this.getProfiles();
    const index = profiles.findIndex(p => p.id === profileId);
    if (index !== -1) {
      profiles[index].answers = answers;
      profiles[index].lastUpdated = new Date().toISOString();
      profiles[index].type = this.getProfileType(answers);
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
