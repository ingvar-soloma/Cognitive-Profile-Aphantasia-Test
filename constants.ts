import { CategoryData, QuestionType } from './types';

export const SURVEY_DATA: CategoryData[] = [
  {
    id: 'cat1',
    title: 'Категорія 1: Сенсорна Уява',
    description: 'Оцініть яскравість образів за шкалою від 1 (Повна відсутність) до 5 (Гіперфантазія).',
    questions: [
      {
        id: '1_A_1',
        category: 'Сенсорна Уява',
        subCategory: 'Візуальна',
        text: 'Уявіть червоний трикутник. Наскільки чітко Ви його "бачите"?',
        type: QuestionType.SCALE,
      },
      {
        id: '1_A_2',
        category: 'Сенсорна Уява',
        subCategory: 'Візуальна',
        text: 'Уявіть обличчя близької людини. Чи бачите Ви його, чи просто знаєте його особливості?',
        type: QuestionType.TEXT,
        placeholder: 'Опишіть ваш досвід...',
      },
      {
        id: '1_A_3',
        category: 'Сенсорна Уява',
        subCategory: 'Візуальна',
        text: 'Коли Ви читаєте художній опис природи, чи "розгортається" у Вашій голові картина?',
        hint: 'Приклад: Ви "бачите" зелений ліс і сонячні промені як у фільмі, чи просто розумієте факт "тут описано ліс" без візуалізації?',
        type: QuestionType.CHOICE,
        options: [
          { label: 'Так', value: 'yes' },
          { label: 'Ні', value: 'no' },
          { label: 'Частково (як схема)', value: 'partial' },
        ],
      },
      {
        id: '1_B_1',
        category: 'Сенсорна Уява',
        subCategory: 'Аудіальна',
        text: 'Уявіть мелодію улюбленої пісні. Наскільки чітко Ви її "чуєте"?',
        type: QuestionType.SCALE,
      },
      {
        id: '1_B_2',
        category: 'Сенсорна Уява',
        subCategory: 'Аудіальна',
        text: 'Уявіть голос друга/родича. Ви чуєте його тон чи просто знаєте його тембр?',
        type: QuestionType.TEXT,
        placeholder: 'Опишіть, чи чуєте ви інтонації...',
      },
      {
        id: '1_B_3',
        category: 'Сенсорна Уява',
        subCategory: 'Аудіальна',
        text: 'Спробуйте уявити звук водоспаду. Наскільки реалістично це звучить?',
        type: QuestionType.SCALE,
      },
      {
        id: '1_C_1',
        category: 'Сенсорна Уява',
        subCategory: 'Тактильна',
        text: 'Уявіть, як гладите кота. Чи відчуваєте Ви його хутро (текстуру, тепло)?',
        type: QuestionType.SCALE,
      },
      {
        id: '1_C_2',
        category: 'Сенсорна Уява',
        subCategory: 'Смакова',
        text: 'Уявіть смак лимона. Чи відчуваєте Ви кислоту?',
        type: QuestionType.SCALE,
      },
      {
        id: '1_C_3',
        category: 'Сенсорна Уява',
        subCategory: 'Нюхова',
        text: 'Уявіть запах скошеної трави. Чи відчуваєте Ви аромат?',
        type: QuestionType.SCALE,
      },
    ],
  },
  {
    id: 'cat2',
    title: 'Категорія 2: Процеси Уяви',
    description: 'Як саме ваш мозок конструює образи та думки.',
    questions: [
      {
        id: '2_1',
        category: 'Процеси',
        subCategory: 'Конструювання',
        text: 'Процес конструювання (Візуальний): Як з\'являється у свідомості складний об\'єкт (наприклад, стілець)?',
        type: QuestionType.CHOICE,
        options: [
          { label: 'Виникає миттєво і цілісно', value: 'instant' },
          { label: 'Поступово конструюється (по частинах)', value: 'gradual' },
          { label: 'Не бачу, але аналізую властивості', value: 'analytical' },
        ],
      },
      {
        id: '2_2',
        category: 'Процеси',
        subCategory: 'Абстрактне мислення',
        text: 'Формат абстрактного мислення: У якому форматі відбувається Ваше мислення, коли розмірковуєте про складну проблему?',
        hint: 'Приклад: Ви ведете внутрішній монолог ("так, спершу це..."), уявляєте візуальні схеми/структури, чи просто "знаєте" зв\'язки без слів і картинок?',
        type: QuestionType.CHOICE,
        options: [
          { label: 'Внутрішній діалог (слова)', value: 'verbal' },
          { label: 'Абстрактні символи/концепції', value: 'abstract' },
          { label: 'Схеми, діаграми', value: 'schematic' },
        ],
      },
      {
        id: '2_3',
        category: 'Процеси',
        subCategory: 'Кінестетика',
        text: 'Домінування уяви руху: Коли уявляєте фізичну дію (кидаєте м\'яч), що чіткіше?',
        type: QuestionType.CHOICE,
        options: [
          { label: 'Візуальна картинка', value: 'visual' },
          { label: 'Кінестетичне відчуття (м\'язи)', value: 'kinesthetic' },
          { label: 'Обидва рівнозначно', value: 'both' },
          { label: 'Нічого', value: 'none' },
        ],
      },
      {
        id: '2_4',
        category: 'Процеси',
        subCategory: 'Деталізація',
        text: 'Швидкість та зусилля деталізації: Якщо образ нечіткий, скільки часу потрібно, щоб додати деталі?',
        type: QuestionType.CHOICE,
        options: [
          { label: 'Деталі додаються одразу', value: 'instant' },
          { label: 'Потрібно кілька секунд зусиль', value: 'effort' },
          { label: 'Зусилля не допомагають', value: 'impossible' },
        ],
      },
      {
        id: '2_5',
        category: 'Процеси',
        subCategory: 'Концептуалізація',
        text: 'Опишіть різницю між "знанням" про об\'єкт та "баченням" його у голові. Чи відчуваєте Ви цю різницю?',
        type: QuestionType.TEXT,
      },
    ],
  },
  {
    id: 'cat3',
    title: 'Категорія 3: Стратегії та Пам\'ять',
    description: 'Аналіз стилю мислення, пам\'яті та соціальної взаємодії.',
    questions: [
      {
        id: '3_A_1',
        category: 'Стратегії',
        subCategory: 'Логіка',
        text: 'Обробка абстрактної логіки: Як Ви вирішуєте складну логічну задачу? (Словами, схемами, відчуттям?)',
        hint: 'Приклад: Ви будуєте ментальну модель/графік, проговорюєте логічний ланцюжок словами, чи покладаєтесь на інтуїтивне відчуття правильності?',
        type: QuestionType.TEXT,
      },
      {
        id: '3_A_2',
        category: 'Стратегії',
        subCategory: 'Мовлення',
        text: 'Коли Ви говорите, чи формулюєте Ви речення послідовно в голові, чи слова просто "з\'являються"?',
        type: QuestionType.TEXT,
      },
      {
        id: '3_A_3',
        category: 'Стратегії',
        subCategory: 'Діалог',
        text: 'Чи використовуєте Ви внутрішній діалог (розмова із собою у голові) часто і детально?',
        type: QuestionType.CHOICE,
        options: [
            { label: 'Так', value: 'yes' },
            { label: 'Ні', value: 'no' },
            { label: 'Частково', value: 'partial' },
        ]
      },
      {
        id: '3_A_4',
        category: 'Стратегії',
        subCategory: 'Механізми',
        text: 'Коли Ви уявляєте, як щось працює (наприклад, двигун), Ви уявляєте це як 3D модель чи як список правил?',
        type: QuestionType.CHOICE,
        options: [
            { label: '3D Модель', value: '3d' },
            { label: 'Список функцій/правил', value: 'rules' },
            { label: 'Змішаний тип', value: 'mixed' },
        ]
      },
      {
        id: '3_B_1',
        category: 'Пам\'ять',
        subCategory: 'Епізодична',
        text: 'Опишіть свій найяскравіший спогад дитинства. Наскільки яскрава візуальна картинка?',
        type: QuestionType.CHOICE,
        options: [
            { label: 'Як фільм (жива картина)', value: 'movie' },
            { label: 'Як послідовність подій', value: 'sequence' },
            { label: 'Як сухий факт', value: 'fact' },
        ]
      },
      {
        id: '3_B_2',
        category: 'Пам\'ять',
        subCategory: 'Семантична',
        text: 'Чи часто трапляється, що Ви знаєте факт, але не пам\'ятаєте, коли/де про це дізналися?',
        type: QuestionType.CHOICE,
        options: [
            { label: 'Так', value: 'yes' },
            { label: 'Ні', value: 'no' },
        ]
      },
      {
        id: '3_B_3',
        category: 'Пам\'ять',
        subCategory: 'Обличчя',
        text: 'Чи легко Вам запам\'ятовувати імена людей, порівняно з їхніми обличчями?',
        type: QuestionType.TEXT,
      },
      {
        id: '3_C_1',
        category: 'Навігація',
        subCategory: 'Карта',
        text: 'У великій будівлі Ви легко формуєте ментальну карту, чи орієнтуєтеся по кроках ("наліво-прямо")?',
        type: QuestionType.CHOICE,
        options: [
            { label: 'Ментальна карта', value: 'map' },
            { label: 'Послідовність кроків', value: 'steps' },
        ]
      },
      {
        id: '3_D_1',
        category: 'Соціум',
        subCategory: 'Емпатія',
        text: 'Коли хтось розповідає про травму, Ви відчуваєте емоцію чи аналізуєте ситуацію?',
        type: QuestionType.CHOICE,
        options: [
            { label: 'Відчуваю емоцію (Співчуття)', value: 'emotional' },
            { label: 'Аналізую ситуацію (Когнітивна емпатія)', value: 'cognitive' },
            { label: 'Обидва', value: 'both' },
        ]
      },
      {
        id: '3_D_2',
        category: 'Соціум',
        subCategory: 'Суперечка',
        text: 'Що є Вашим головним інструментом у суперечці?',
        type: QuestionType.CHOICE,
        options: [
            { label: 'Логічні аргументи', value: 'logic' },
            { label: 'Емоційна переконливість', value: 'emotion' },
        ]
      }
    ],
  },
];