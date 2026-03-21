import { APHANTASIA_CATEGORIES } from './db/aphantasia_test';
import { PERSONALITY_CATEGORIES } from './db/personality_test';
import { PERFECTIONISM_CATEGORIES } from './db/perfectionism_test';
import * as fs from 'fs';

const tests = [
    {
        id: 'full_aphantasia_profile',
        title: { uk: 'Повний Когнітивний Профіль', en: 'Full Cognitive Profile', ru: 'Полный Когнитивный Профиль' },
        description: { uk: 'Поглиблений аналіз вашої уяви та сприйняття.', en: 'In-depth analysis of your imagination and perception.', ru: 'Углубленный анализ вашего воображения и восприятия.' },
        categories: APHANTASIA_CATEGORIES
    },
    {
        id: 'personality_test',
        title: { uk: 'Тест Особистості', en: 'Personality Test', ru: 'Тест Личности' },
        description: { uk: 'Дізнайтеся більше про свій характер.', en: 'Learn more about your character.', ru: 'Узнайте больше о своем характере.' },
        categories: PERSONALITY_CATEGORIES
    },
    {
        id: 'perfectionism_test',
        title: { uk: 'Тест на Перфекціонізм', en: 'Perfectionism Test', ru: 'Тест на Перфекционизм' },
        description: { uk: 'Наскільки ви прагнете до ідеалу?', en: 'How much do you strive for the ideal?', ru: 'Насколько вы стремитесь к идеалу?' },
        categories: PERFECTIONISM_CATEGORIES
    }
];

fs.writeFileSync('./backend/data/tests_seed.json', JSON.stringify(tests, null, 2));
console.log('Tests exported to backend/data/tests_seed.json');
