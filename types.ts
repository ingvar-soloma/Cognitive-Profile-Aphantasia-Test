export type Language = 'uk' | 'en' | 'ru';

export type LocalizedString = Record<Language, string>;

export enum QuestionType {
  SCALE = 'SCALE', // 1-5 rating
  CHOICE = 'CHOICE', // Radio buttons
  TEXT = 'TEXT', // Text input only
}

export interface Option {
  label: LocalizedString;
  value: string;
}

export interface Question {
  id: string;
  text: LocalizedString;
  type: QuestionType;
  options?: Option[]; // For CHOICE type
  placeholder?: LocalizedString; // For TEXT type
  category: string; // Internal ID for logic
  subCategory?: LocalizedString; // Display text
  hint?: LocalizedString; // Added optional hint/example text
}

// Flat version for components after localization is applied
export interface LocalizedQuestion {
  id: string;
  text: string;
  type: QuestionType;
  options?: { label: string; value: string }[];
  placeholder?: string;
  category: string;
  subCategory?: string;
  hint?: string;
}

export interface Answer {
  questionId: string;
  value: string | number | null; // scale number or choice value
  note: string; // The optional text description
}

export interface CategoryData {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  questions: Question[];
}

// Flat version for components
export interface LocalizedCategoryData {
  id: string;
  title: string;
  description: string;
  questions: LocalizedQuestion[];
}

export interface SurveyDefinition {
  id: string;
  title: LocalizedString;
  description?: LocalizedString;
  categories: CategoryData[];
}

export interface LocalizedSurveyDefinition {
  id: string;
  title: string;
  description?: string;
  categories: LocalizedCategoryData[];
}

export interface UIStrings {
  title: string;
  description: string;
  start: string;
  resume: string; // For file upload button or similar
  back: string;
  next: string;
  finish: string;
  export: string;
  import: string;
  reset: string;
  saveJson: string;
  saveToon: string; // Added TOON label
  scale1: string;
  scale2: string;
  scale3: string;
  scale4: string;
  scale5: string;
  yourAnswer: string;
  optionalComment: string;
  resultsTitle: string;
  resultsDesc: string;
  sensoryMap: string;
  scoreDetails: string;
  notesTitle: string;
  noNotes: string;
  downloadJson: string;
  retake: string;
  progress: string;
  completed: string;
  part: string;
  of: string;
  howToRate: string;
  howToRateTitle: string;
  profileAphantasia: string;
  profileHypophantasia: string;
  profileHyperphantasia: string;
  profilePhantasia: string;
}