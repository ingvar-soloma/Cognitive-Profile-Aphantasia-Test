export enum QuestionType {
  SCALE = 'SCALE', // 1-5 rating
  CHOICE = 'CHOICE', // Radio buttons
  TEXT = 'TEXT', // Text input only
}

export interface Option {
  label: string;
  value: string;
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options?: Option[]; // For CHOICE type
  placeholder?: string; // For TEXT type
  category: string;
  subCategory?: string;
  hint?: string; // Added optional hint/example text
}

export interface Answer {
  questionId: string;
  value: string | number | null; // scale number or choice value
  note: string; // The optional text description
}

export interface CategoryData {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}