import { SurveyDefinition } from './types';
import { APHANTASIA_CATEGORIES } from './db/aphantasia_test';
import { PERSONALITY_CATEGORIES } from './db/personality_test';

export const SURVEY_DATA = [...APHANTASIA_CATEGORIES, ...PERSONALITY_CATEGORIES];

export const AVAILABLE_SURVEYS: SurveyDefinition[] = [
  {
    id: 'full_aphantasia_profile',
    title: {
      uk: 'Повний Профіль Афантазії',
      en: 'Full Aphantasia Profile',
      ru: 'Полный Профиль Афантазии'
    },
    description: {
       uk: 'Детальний аналіз сенсорної уяви, процесів мислення та стратегій пам\'яті.',
       en: 'Detailed analysis of sensory imagination, thinking processes, and memory strategies.',
       ru: 'Детальный анализ сенсорного воображения, процессов мышления и стратегий памяти.'
    },
    categories: [APHANTASIA_CATEGORIES[0], APHANTASIA_CATEGORIES[1], APHANTASIA_CATEGORIES[2]]
  },
  {
    id: 'sensory_only',
    title: {
      uk: '↳ Тільки Сенсорна Уява',
      en: '↳ Sensory Imagination Only',
      ru: '↳ Только Сенсорное Воображение'
    },
    description: {
       uk: 'Скорочений тест, що фокусується лише на візуальних, аудіальних та інших відчуттях.',
       en: 'Shortened test focusing only on visual, auditory, and other sensations.',
       ru: 'Сокращенный тест, фокусирующийся только на визуальных, аудиальных и других ощущениях.'
    },
    categories: [APHANTASIA_CATEGORIES[0]]
  },
  {
    id: 'processes_only',
    title: {
      uk: '↳ Тільки Процеси Уяви',
      en: '↳ Imagination Processes Only',
      ru: '↳ Только Процессы Воображения'
    },
    description: {
       uk: 'Як саме ваш мозок конструює образи та думки.',
       en: 'How exactly your brain constructs images and thoughts.',
       ru: 'Как именно ваш мозг конструирует образы и мысли.'
    },
    categories: [APHANTASIA_CATEGORIES[1]]
  },
  {
    id: 'strategies_only',
    title: {
      uk: '↳ Тільки Стратегії та Пам\'ять',
      en: '↳ Strategies and Memory Only',
      ru: '↳ Только Стратегии и Память'
    },
    description: {
       uk: 'Аналіз стилю мислення, пам\'яті та соціальної взаємодії.',
       en: 'Analysis of thinking style, memory, and social interaction.',
       ru: 'Анализ стиля мышления, памяти и социального взаимодействия.'
    },
    categories: [APHANTASIA_CATEGORIES[2]]
  },
  {
    id: 'personality_mbti',
    title: {
      uk: 'Особистісний профіль (MBTI-стиль)',
      en: 'Personality Profile (MBTI-style)',
      ru: 'Личностный профиль (MBTI-стиль)'
    },
    description: {
      uk: 'Окремий тест для визначення вашого стилю спілкування, роботи та прийняття рішень.',
      en: 'A separate test to determine your communication style, work, and decision-making.',
      ru: 'Отдельный тест для определения вашего стиля общения, работы и принятия решений.'
    },
    categories: [PERSONALITY_CATEGORIES[0]]
  }
];
