import { CategoryData, QuestionType, SurveyDefinition } from './types';

export const SURVEY_DATA: CategoryData[] = [
  {
    id: 'cat1',
    title: {
      uk: 'Категорія 1: Сенсорна Уява',
      en: 'Category 1: Sensory Imagination',
      ru: 'Категория 1: Сенсорное Воображение'
    },
    description: {
      uk: 'Оцініть яскравість образів за шкалою від 1 (Повна відсутність) до 5 (Гіперфантазія).',
      en: 'Rate the vividness of images on a scale from 1 (Total absence) to 5 (Hyperphantasia).',
      ru: 'Оцените яркость образов по шкале от 1 (Полное отсутствие) до 5 (Гиперфантазия).'
    },
    questions: [
      {
        id: '1_A_1',
        category: 'Sensory',
        subCategory: { uk: 'Візуальна', en: 'Visual', ru: 'Визуальная' },
        text: {
          uk: 'Уявіть червоний трикутник. Наскільки чітко Ви його "бачите"?',
          en: 'Imagine a red triangle. How clearly do you "see" it?',
          ru: 'Представьте красный треугольник. Насколько четко вы его "видите"?'
        },
        type: QuestionType.SCALE,
      },
      {
        id: '1_A_2',
        category: 'Sensory',
        subCategory: { uk: 'Візуальна', en: 'Visual', ru: 'Визуальная' },
        text: {
          uk: 'Уявіть обличчя близької людини. Чи бачите Ви його, чи просто знаєте його особливості?',
          en: 'Imagine the face of a loved one. Do you see it, or just know its features?',
          ru: 'Представьте лицо близкого человека. Вы видите его или просто знаете его особенности?'
        },
        type: QuestionType.TEXT,
        placeholder: {
          uk: 'Опишіть ваш досвід...',
          en: 'Describe your experience...',
          ru: 'Опишите ваш опыт...'
        },
      },
      {
        id: '1_A_3',
        category: 'Sensory',
        subCategory: { uk: 'Візуальна', en: 'Visual', ru: 'Визуальная' },
        text: {
          uk: 'Коли Ви читаєте художній опис природи, чи "розгортається" у Вашій голові картина?',
          en: 'When reading a descriptive passage of nature, does a scene "unfold" in your mind?',
          ru: 'Когда вы читаете художественное описание природы, "разворачивается" ли в вашей голове картина?'
        },
        hint: {
          uk: 'Приклад: Ви "бачите" зелений ліс і сонячні промені як у фільмі, чи просто розумієте факт "тут описано ліс" без візуалізації?',
          en: 'Example: Do you "see" a green forest and sunbeams like a movie, or just understand the fact "a forest is described" without visualizing?',
          ru: 'Пример: Вы "видите" зеленый лес и солнечные лучи как в фильме, или просто понимаете факт "здесь описан лес" без визуализации?'
        },
        type: QuestionType.CHOICE,
        options: [
          { label: { uk: 'Так', en: 'Yes', ru: 'Да' }, value: 'yes' },
          { label: { uk: 'Ні', en: 'No', ru: 'Нет' }, value: 'no' },
          { label: { uk: 'Частково (як схема)', en: 'Partially (like a schema)', ru: 'Частично (как схема)' }, value: 'partial' },
        ],
      },
      {
        id: '1_B_1',
        category: 'Sensory',
        subCategory: { uk: 'Аудіальна', en: 'Auditory', ru: 'Аудиальная' },
        text: {
          uk: 'Уявіть мелодію улюбленої пісні. Наскільки чітко Ви її "чуєте"?',
          en: 'Imagine the melody of your favorite song. How clearly do you "hear" it?',
          ru: 'Представьте мелодию любимой песни. Насколько четко вы ее "слышите"?'
        },
        type: QuestionType.SCALE,
      },
      {
        id: '1_B_2',
        category: 'Sensory',
        subCategory: { uk: 'Аудіальна', en: 'Auditory', ru: 'Аудиальная' },
        text: {
          uk: 'Уявіть голос друга/родича. Ви чуєте його тон чи просто знаєте його тембр?',
          en: 'Imagine the voice of a friend/relative. Do you hear the tone or just know the timbre?',
          ru: 'Представьте голос друга/родственника. Вы слышите его тон или просто знаете его тембр?'
        },
        type: QuestionType.TEXT,
        placeholder: {
          uk: 'Опишіть, чи чуєте ви інтонації...',
          en: 'Describe if you hear intonations...',
          ru: 'Опишите, слышите ли вы интонации...'
        },
      },
      {
        id: '1_B_3',
        category: 'Sensory',
        subCategory: { uk: 'Аудіальна', en: 'Auditory', ru: 'Аудиальная' },
        text: {
          uk: 'Спробуйте уявити звук водоспаду. Наскільки реалістично це звучить?',
          en: 'Try to imagine the sound of a waterfall. How realistic does it sound?',
          ru: 'Попробуйте представить звук водопада. Насколько реалистично это звучит?'
        },
        type: QuestionType.SCALE,
      },
      {
        id: '1_C_1',
        category: 'Sensory',
        subCategory: { uk: 'Тактильна', en: 'Tactile', ru: 'Тактильная' },
        text: {
          uk: 'Уявіть, як гладите кота. Чи відчуваєте Ви його хутро (текстуру, тепло)?',
          en: 'Imagine petting a cat. Do you feel the fur (texture, warmth)?',
          ru: 'Представьте, как гладите кота. Чувствуете ли вы его мех (текстуру, тепло)?'
        },
        type: QuestionType.SCALE,
      },
      {
        id: '1_C_2',
        category: 'Sensory',
        subCategory: { uk: 'Смакова', en: 'Gustatory', ru: 'Вкусовая' },
        text: {
          uk: 'Уявіть смак лимона. Чи відчуваєте Ви кислоту?',
          en: 'Imagine the taste of a lemon. Do you feel the sourness?',
          ru: 'Представьте вкус лимона. Чувствуете ли вы кислоту?'
        },
        type: QuestionType.SCALE,
      },
      {
        id: '1_C_3',
        category: 'Sensory',
        subCategory: { uk: 'Нюхова', en: 'Olfactory', ru: 'Обонятельная' },
        text: {
          uk: 'Уявіть запах скошеної трави. Чи відчуваєте Ви аромат?',
          en: 'Imagine the smell of cut grass. Do you smell the scent?',
          ru: 'Представьте запах скошенной травы. Чувствуете ли вы аромат?'
        },
        type: QuestionType.SCALE,
      },
    ],
  },
  {
    id: 'cat2',
    title: {
      uk: 'Категорія 2: Процеси Уяви',
      en: 'Category 2: Imagination Processes',
      ru: 'Категория 2: Процессы Воображения'
    },
    description: {
      uk: 'Як саме ваш мозок конструює образи та думки.',
      en: 'How exactly your brain constructs images and thoughts.',
      ru: 'Как именно ваш мозг конструирует образы и мысли.'
    },
    questions: [
      {
        id: '2_1',
        category: 'Process',
        subCategory: { uk: 'Конструювання', en: 'Construction', ru: 'Конструирование' },
        text: {
          uk: 'Процес конструювання (Візуальний): Як з\'являється у свідомості складний об\'єкт (наприклад, стілець)?',
          en: 'Construction process (Visual): How does a complex object (e.g., a chair) appear in your mind?',
          ru: 'Процесс конструирования (Визуальный): Как появляется в сознании сложный объект (например, стул)?'
        },
        type: QuestionType.CHOICE,
        options: [
          { label: { uk: 'Виникає миттєво і цілісно', en: 'Appears instantly and wholly', ru: 'Возникает мгновенно и целостно' }, value: 'instant' },
          { label: { uk: 'Поступово конструюється (по частинах)', en: 'Constructed gradually (part by part)', ru: 'Постепенно конструируется (по частям)' }, value: 'gradual' },
          { label: { uk: 'Не бачу, але аналізую властивості', en: 'I don\'t see, but analyze properties', ru: 'Не вижу, но анализирую свойства' }, value: 'analytical' },
        ],
      },
      {
        id: '2_2',
        category: 'Process',
        subCategory: { uk: 'Абстрактне мислення', en: 'Abstract Thinking', ru: 'Абстрактное мышление' },
        text: {
          uk: 'Формат абстрактного мислення: У якому форматі відбувається Ваше мислення, коли розмірковуєте про складну проблему?',
          en: 'Abstract thinking format: In what format does your thinking occur when pondering a complex problem?',
          ru: 'Формат абстрактного мышления: В каком формате происходит ваше мышление, когда размышляете о сложной проблеме?'
        },
        hint: {
          uk: 'Приклад: Ви ведете внутрішній монолог ("так, спершу це..."), уявляєте візуальні схеми/структури, чи просто "знаєте" зв\'язки без слів і картинок?',
          en: 'Example: Do you have an inner monologue ("ok, first this..."), imagine visual schemas/structures, or just "know" connections without words/images?',
          ru: 'Пример: Вы ведете внутренний монолог ("так, сперва это..."), представляете визуальные схемы/структуры, или просто "знаете" связи без слов и картинок?'
        },
        type: QuestionType.CHOICE,
        options: [
          { label: { uk: 'Внутрішній діалог (слова)', en: 'Inner dialogue (words)', ru: 'Внутренний диалог (слова)' }, value: 'verbal' },
          { label: { uk: 'Абстрактні символи/концепції', en: 'Abstract symbols/concepts', ru: 'Абстрактные символы/концепции' }, value: 'abstract' },
          { label: { uk: 'Схеми, діаграми', en: 'Schemas, diagrams', ru: 'Схемы, диаграммы' }, value: 'schematic' },
        ],
      },
      {
        id: '2_3',
        category: 'Process',
        subCategory: { uk: 'Кінестетика', en: 'Kinesthetics', ru: 'Кинестетика' },
        text: {
          uk: 'Домінування уяви руху: Коли уявляєте фізичну дію (кидаєте м\'яч), що чіткіше?',
          en: 'Movement imagination dominance: When imagining a physical action (throwing a ball), what is clearer?',
          ru: 'Доминирование воображения движения: Когда представляете физическое действие (бросаете мяч), что четче?'
        },
        type: QuestionType.CHOICE,
        options: [
          { label: { uk: 'Візуальна картинка', en: 'Visual picture', ru: 'Визуальная картинка' }, value: 'visual' },
          { label: { uk: 'Кінестетичне відчуття (м\'язи)', en: 'Kinesthetic sensation (muscles)', ru: 'Кинестетическое ощущение (мышцы)' }, value: 'kinesthetic' },
          { label: { uk: 'Обидва рівнозначно', en: 'Both equally', ru: 'Оба равнозначно' }, value: 'both' },
          { label: { uk: 'Нічого', en: 'Nothing', ru: 'Ничего' }, value: 'none' },
        ],
      },
      {
        id: '2_4',
        category: 'Process',
        subCategory: { uk: 'Деталізація', en: 'Detailing', ru: 'Детализация' },
        text: {
          uk: 'Швидкість та зусилля деталізації: Якщо образ нечіткий, скільки часу потрібно, щоб додати деталі?',
          en: 'Speed and effort of detailing: If an image is vague, how long does it take to add details?',
          ru: 'Скорость и усилия детализации: Если образ нечеткий, сколько времени нужно, чтобы добавить детали?'
        },
        type: QuestionType.CHOICE,
        options: [
          { label: { uk: 'Деталі додаються одразу', en: 'Details added instantly', ru: 'Детали добавляются сразу' }, value: 'instant' },
          { label: { uk: 'Потрібно кілька секунд зусиль', en: 'Takes a few seconds of effort', ru: 'Нужно несколько секунд усилий' }, value: 'effort' },
          { label: { uk: 'Зусилля не допомагають', en: 'Effort does not help', ru: 'Усилия не помогают' }, value: 'impossible' },
        ],
      },
      {
        id: '2_5',
        category: 'Process',
        subCategory: { uk: 'Концептуалізація', en: 'Conceptualization', ru: 'Концептуализация' },
        text: {
          uk: 'Опишіть різницю між "знанням" про об\'єкт та "баченням" його у голові. Чи відчуваєте Ви цю різницю?',
          en: 'Describe the difference between "knowing" about an object and "seeing" it in your head. Do you feel this difference?',
          ru: 'Опишите разницу между "знанием" об объекте и "видением" его в голове. Чувствуете ли вы эту разницу?'
        },
        type: QuestionType.TEXT,
      },
      {
        id: '2_6',
        category: 'Process',
        subCategory: { uk: 'Просторова Маніпуляція', en: 'Spatial Manipulation', ru: 'Пространственная Манипуляция' },
        text: {
          uk: 'Як Ви уявляєте обертання складного 3D-об\'єкта (наприклад, неіснуючого механізму)?',
          en: 'How do you imagine rotating a complex 3D object (e.g., a non-existent mechanism)?',
          ru: 'Как вы представляете вращение сложного 3D-объекта (например, несуществующего механизма)?'
        },
        type: QuestionType.CHOICE,
        options: [
          { label: { uk: 'Бачу, як він обертається, як у відео', en: 'I see it rotating like a video', ru: 'Вижу, как он вращается, как в видео' }, value: 'visual_rotate' },
          { label: { uk: 'Знаю його нову позицію, використовуючи логіку/правила', en: 'I know its new position using logic/rules', ru: 'Знаю его новую позицию, используя логику/правила' }, value: 'logic_rules' },
          { label: { uk: 'Відчуваю рух як кінестетичне відчуття', en: 'I feel the movement as a kinesthetic sensation', ru: 'Ощущаю движение как кинестетическое чувство' }, value: 'kinesthetic' },
        ],
      },
      {
        id: '2_7',
        category: 'Process',
        subCategory: { uk: 'Робоча Пам\'ять', en: 'Working Memory', ru: 'Рабочая Память' },
        text: {
          uk: 'Коли Ви утримуєте в пам\'яті список із 7-10 слів, Ви їх:',
          en: 'When holding a list of 7-10 words in memory, you are:',
          ru: 'Когда вы удерживаете в памяти список из 7-10 слов, вы их:'
        },
        hint: {
          uk: 'Приклад: Ви постійно їх проговорюєте внутрішнім голосом, чи уявляєте, що вони написані на дошці?',
          en: 'Example: Are you constantly repeating them with an inner voice, or do you imagine them written on a board?',
          ru: 'Пример: Вы постоянно их проговариваете внутренним голосом, или представляете, что они написаны на доске?'
        },
        type: QuestionType.CHOICE,
        options: [
          { label: { uk: 'Постійно проговорюєте внутрішнім діалогом', en: 'Constantly repeating them via inner dialogue', ru: 'Постоянно проговариваете внутренним диалогом' }, value: 'verbal_loop' },
          { label: { uk: 'Уявляєте, що вони написані/позначені', en: 'Imagine them written/labeled', ru: 'Представляете, что они написаны/обозначены' }, value: 'visual_labels' },
          { label: { uk: 'Перетворюєте на концепції, щоб "знати" їх', en: 'Convert them into concepts to "know" them', ru: 'Превращаете в концепции, чтобы "знать" их' }, value: 'conceptual' },
        ],
      },
    ],
  },
  {
    id: 'cat3',
    title: {
      uk: 'Категорія 3: Стратегії та Пам\'ять',
      en: 'Category 3: Strategies and Memory',
      ru: 'Категория 3: Стратегии и Память'
    },
    description: {
      uk: 'Аналіз стилю мислення, пам\'яті та соціальної взаємодії.',
      en: 'Analysis of thinking style, memory, and social interaction.',
      ru: 'Анализ стиля мышления, памяти и социального взаимодействия.'
    },
    questions: [
      {
        id: '3_A_1',
        category: 'Strategy',
        subCategory: { uk: 'Логіка', en: 'Logic', ru: 'Логика' },
        text: {
          uk: 'Обробка абстрактної логіки: Як Ви вирішуєте складну логічну задачу? (Словами, схемами, відчуттям?)',
          en: 'Abstract logic processing: How do you solve a complex logic problem? (Words, schemas, feeling?)',
          ru: 'Обработка абстрактной логики: Как вы решаете сложную логическую задачу? (Словами, схемами, ощущением?)'
        },
        hint: {
          uk: 'Приклад: Ви будуєте ментальну модель/графік, проговорюєте логічний ланцюжок словами, чи покладаєтесь на інтуїтивне відчуття правильності?',
          en: 'Example: Do you build a mental model/graph, speak the logic chain in words, or rely on an intuitive feeling of correctness?',
          ru: 'Пример: Вы строите ментальную модель/график, проговариваете логическую цепочку словами, или полагаетесь на интуитивное ощущение правильности?'
        },
        type: QuestionType.TEXT,
      },
      {
        id: '3_A_2',
        category: 'Strategy',
        subCategory: { uk: 'Мовлення', en: 'Speech', ru: 'Речь' },
        text: {
          uk: 'Коли Ви говорите, чи формулюєте Ви речення послідовно в голові, чи слова просто "з\'являються"?',
          en: 'When you speak, do you formulate sentences sequentially in your head, or do words just "appear"?',
          ru: 'Когда вы говорите, формулируете ли вы предложения последовательно в голове, или слова просто "появляются"?'
        },
        type: QuestionType.TEXT,
      },
      {
        id: '3_A_3',
        category: 'Strategy',
        subCategory: { uk: 'Діалог', en: 'Dialogue', ru: 'Диалог' },
        text: {
          uk: 'Чи використовуєте Ви внутрішній діалог (розмова із собою у голові) часто і детально?',
          en: 'Do you use inner dialogue (talking to yourself in your head) often and in detail?',
          ru: 'Используете ли вы внутренний диалог (разговор с собой в голове) часто и детально?'
        },
        type: QuestionType.CHOICE,
        options: [
            { label: { uk: 'Так', en: 'Yes', ru: 'Да' }, value: 'yes' },
            { label: { uk: 'Ні', en: 'No', ru: 'Нет' }, value: 'no' },
            { label: { uk: 'Частково', en: 'Partially', ru: 'Частично' }, value: 'partial' },
        ]
      },
      {
        id: '3_A_4',
        category: 'Strategy',
        subCategory: { uk: 'Механізми', en: 'Mechanisms', ru: 'Механизмы' },
        text: {
          uk: 'Коли Ви уявляєте, як щось працює (наприклад, двигун), Ви уявляєте це як 3D модель чи як список правил?',
          en: 'When you imagine how something works (e.g., an engine), do you see it as a 3D model or a list of rules?',
          ru: 'Когда вы представляете, как что-то работает (например, двигатель), вы представляете это как 3D модель или как список правил?'
        },
        type: QuestionType.CHOICE,
        options: [
            { label: { uk: '3D Модель', en: '3D Model', ru: '3D Модель' }, value: '3d' },
            { label: { uk: 'Список функцій/правил', en: 'List of functions/rules', ru: 'Список функций/правил' }, value: 'rules' },
            { label: { uk: 'Змішаний тип', en: 'Mixed type', ru: 'Смешанный тип' }, value: 'mixed' },
        ]
      },
      {
        id: '3_B_1',
        category: 'Memory',
        subCategory: { uk: 'Епізодична', en: 'Episodic', ru: 'Эпизодическая' },
        text: {
          uk: 'Опишіть свій найяскравіший спогад дитинства. Наскільки яскрава візуальна картинка?',
          en: 'Describe your most vivid childhood memory. How vivid is the visual picture?',
          ru: 'Опишите свое самое яркое воспоминание детства. Насколько яркая визуальная картинка?'
        },
        type: QuestionType.CHOICE,
        options: [
            { label: { uk: 'Як фільм (жива картина)', en: 'Like a movie (living picture)', ru: 'Как фильм (живая картина)' }, value: 'movie' },
            { label: { uk: 'Як послідовність подій', en: 'Like a sequence of events', ru: 'Как последовательность событий' }, value: 'sequence' },
            { label: { uk: 'Як сухий факт', en: 'Like a dry fact', ru: 'Как сухой факт' }, value: 'fact' },
        ]
      },
      {
        id: '3_B_2',
        category: 'Memory',
        subCategory: { uk: 'Семантична', en: 'Semantic', ru: 'Семантическая' },
        text: {
          uk: 'Чи часто трапляється, що Ви знаєте факт, але не пам\'ятаєте, коли/де про це дізналися?',
          en: 'Does it happen often that you know a fact but don\'t remember when/where you learned it?',
          ru: 'Часто ли случается, что вы знаете факт, но не помните, когда/где об этом узнали?'
        },
        type: QuestionType.CHOICE,
        options: [
            { label: { uk: 'Так', en: 'Yes', ru: 'Да' }, value: 'yes' },
            { label: { uk: 'Ні', en: 'No', ru: 'Нет' }, value: 'no' },
        ]
      },
      {
        id: '3_B_3',
        category: 'Memory',
        subCategory: { uk: 'Обличчя', en: 'Faces', ru: 'Лица' },
        text: {
          uk: 'Чи легко Вам запам\'ятовувати імена людей, порівняно з їхніми обличчями?',
          en: 'Is it easy for you to remember people\'s names compared to their faces?',
          ru: 'Легко ли вам запоминать имена людей по сравнению с их лицами?'
        },
        type: QuestionType.TEXT,
      },
      {
        id: '3_B_4',
        category: 'Memory',
        subCategory: { uk: 'Сновидіння', en: 'Dreams', ru: 'Сновидения' },
        text: {
          uk: 'Які Ваші сновидіння?',
          en: 'What are your dreams like?',
          ru: 'Какие у вас сновидения?'
        },
        type: QuestionType.CHOICE,
        options: [
          { label: { uk: 'Чіткі, кольорові, реалістичні візуальні образи', en: 'Clear, colorful, realistic visual images', ru: 'Четкие, цветные, реалистичные визуальные образы' }, value: 'visual_dreams' },
          { label: { uk: 'Невізуальні (діалог, відчуття, знання того, що відбувається)', en: 'Non-visual (dialogue, feelings, knowing what happens)', ru: 'Невизуальные (диалог, ощущения, знание происходящего)' }, value: 'non_visual_dreams' },
          { label: { uk: 'Не пам\'ятаю сновидінь', en: 'I do not remember dreams', ru: 'Не помню сновидений' }, value: 'no_recall' },
        ],
      },
      {
        id: '3_C_1',
        category: 'Navigation',
        subCategory: { uk: 'Карта', en: 'Map', ru: 'Карта' },
        text: {
          uk: 'У великій будівлі Ви легко формуєте ментальну карту, чи орієнтуєтеся по кроках ("наліво-прямо")?',
          en: 'In a large building, do you easily form a mental map, or navigate by steps ("left, then straight")?',
          ru: 'В большом здании вы легко формируете ментальную карту, или ориентируетесь по шагам ("налево-прямо")?'
        },
        type: QuestionType.CHOICE,
        options: [
            { label: { uk: 'Ментальна карта', en: 'Mental map', ru: 'Ментальная карта' }, value: 'map' },
            { label: { uk: 'Послідовність кроків', en: 'Sequence of steps', ru: 'Последовательность шагов' }, value: 'steps' },
        ]
      },
      {
        id: '3_D_1',
        category: 'Social',
        subCategory: { uk: 'Емпатія', en: 'Empathy', ru: 'Эмпатия' },
        text: {
          uk: 'Коли хтось розповідає про травму, Ви відчуваєте емоцію чи аналізуєте ситуацію?',
          en: 'When someone talks about trauma, do you feel the emotion or analyze the situation?',
          ru: 'Когда кто-то рассказывает о травме, вы чувствуете эмоцию или анализируете ситуацию?'
        },
        type: QuestionType.CHOICE,
        options: [
            { label: { uk: 'Відчуваю емоцію (Співчуття)', en: 'Feel emotion (Compassion)', ru: 'Чувствую эмоцию (Сочувствие)' }, value: 'emotional' },
            { label: { uk: 'Аналізую ситуацію (Когнітивна емпатія)', en: 'Analyze situation (Cognitive empathy)', ru: 'Анализирую ситуацию (Когнитивная эмпатия)' }, value: 'cognitive' },
            { label: { uk: 'Обидва', en: 'Both', ru: 'Оба' }, value: 'both' },
        ]
      },
      {
        id: '3_D_2',
        category: 'Social',
        subCategory: { uk: 'Суперечка', en: 'Argument', ru: 'Спор' },
        text: {
          uk: 'Що є Вашим головним інструментом у суперечці?',
          en: 'What is your main tool in an argument?',
          ru: 'Что является вашим главным инструментом в споре?'
        },
        type: QuestionType.CHOICE,
        options: [
            { label: { uk: 'Логічні аргументи', en: 'Logical arguments', ru: 'Логические аргументы' }, value: 'logic' },
            { label: { uk: 'Емоційна переконливість', en: 'Emotional persuasiveness', ru: 'Эмоциональная убедительность' }, value: 'emotion' },
        ]
      },
      {
        id: '3_E_1',
        category: 'Strategy',
        subCategory: { uk: 'Навчання', en: 'Learning', ru: 'Обучение' },
        text: {
          uk: 'Що є найефективнішим для запам\'ятовування нової інформації (наприклад, розділу підручника)?',
          en: 'What is most effective for you to memorize new information (e.g., a textbook chapter)?',
          ru: 'Что является наиболее эффективным для запоминания новой информации (например, раздела учебника)?'
        },
        type: QuestionType.CHOICE,
        options: [
          { label: { uk: 'Багаторазове читання/переказ вголос (фокус на словах)', en: 'Multiple reading/reciting aloud (focus on words)', ru: 'Многократное чтение/пересказ вслух (фокус на словах)' }, value: 'verbal_repetition' },
          { label: { uk: 'Побудова ментальних схем, логічних карт (фокус на зв\'язках)', en: 'Building mental schemas, logical maps (focus on connections)', ru: 'Построение ментальных схем, логических карт (фокус на связях)' }, value: 'schematic_mapping' },
          { label: { uk: 'Спроба візуалізувати матеріал як сцену', en: 'Trying to visualize the material as a scene', ru: 'Попытка визуализировать материал как сцену' }, value: 'visualize_scene' },
        ],
      },
      {
        id: '3_E_2',
        category: 'Strategy',
        subCategory: { uk: 'Ухвалення Рішень', en: 'Decision Making', ru: 'Принятие Решений' },
        text: {
          uk: 'При ухваленні важливого рішення Ви покладаєтесь на:',
          en: 'When making an important decision, you rely on:',
          ru: 'При принятии важного решения вы полагаетесь на:'
        },
        type: QuestionType.CHOICE,
        options: [
          { label: { uk: 'Детальний логічний аналіз (плюси/мінуси)', en: 'Detailed logical analysis (pros/cons)', ru: 'Подробный логический анализ (плюсы/минусы)' }, value: 'pure_logic' },
          { label: { uk: 'Швидке інтуїтивне "відчуття" правильності', en: 'Quick intuitive "feeling" of correctness', ru: 'Быстрое интуитивное "чувство" правильности' }, value: 'intuition' },
          { label: { uk: 'Змішаний підхід, з перевагою логіки', en: 'Mixed approach, leaning towards logic', ru: 'Смешанный подход, с преобладанием логики' }, value: 'mixed_logic' },
        ],
      },
    ],
  },
  {
    id: 'cat4',
    title: {
      uk: 'Категорія 4: Особистісні Риси (MBTI)',
      en: 'Category 4: Personality Traits (MBTI)',
      ru: 'Категория 4: Личностные Черты (MBTI)'
    },
    description: {
      uk: 'Оцініть свій спосіб мислення та взаємодії зі світом.',
      en: 'Evaluate your way of thinking and interacting with the world.',
      ru: 'Оцените свой способ мышления и взаимодействия с миром.'
    },
    questions: [
      {
        id: 'p_01',
        category: 'Personality',
        subCategory: { uk: 'Робочий стиль', en: 'Work style', ru: 'Рабочий стиль' },
        text: {
          uk: 'Я найкраще працюю під тиском і часто виконую завдання в останню хвилину.',
          en: 'I work best under pressure and often complete tasks at the last minute.',
          ru: 'Я лучше всего работаю под давлением и часто выполняю задачи в последнюю минуту.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_02',
        category: 'Personality',
        subCategory: { uk: 'Соціальність', en: 'Social', ru: 'Социальность' },
        text: {
          uk: 'Я почуваюся комфортно та впевнено в соціальних ситуаціях, навіть із людьми, яких погано знаю.',
          en: 'I feel comfortable and confident in social situations, even with people I don\'t know well.',
          ru: 'Я чувствую себя комфортно и уверенно в социальных ситуациях, даже с людьми, которых плохо знаю.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_03',
        category: 'Personality',
        subCategory: { uk: 'Креативність', en: 'Creativity', ru: 'Креативность' },
        text: {
          uk: 'Я знаходжу натхнення та креативність у відкритих підходах, а не в детальному плануванні.',
          en: 'I find inspiration and creativity in open-ended approaches rather than a detailed plan.',
          ru: 'Я нахожу вдохновение и креативность в открытых подходах, а не в детальном планировании.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_04',
        category: 'Personality',
        subCategory: { uk: 'Сприйняття', en: 'Perception', ru: 'Восприятие' },
        text: {
          uk: 'Я ціную фільми з чіткими темами та ідеями, а не ті, що залишають простір для інтерпретації.',
          en: 'I appreciate movies with clear themes and messages rather than those open to interpretation.',
          ru: 'Я ценю фильмы с четкими темами и идеями, а не те, что оставляют пространство для интерпретации.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_05',
        category: 'Personality',
        subCategory: { uk: 'Планування', en: 'Planning', ru: 'Планирование' },
        text: {
          uk: 'Я отримую задоволення від досягнення поставлених цілей шляхом систематичного планування.',
          en: 'I find joy in achieving set goals through systematic planning.',
          ru: 'Я получаю удовольствие от достижения поставленных целей путем систематического планирования.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_06',
        category: 'Personality',
        subCategory: { uk: 'Соціальність', en: 'Social', ru: 'Социальность' },
        text: {
          uk: 'Мені подобаються короткі бесіди та часті контакти з колегами протягом робочого дня.',
          en: 'I enjoy quick chats and frequent check-ins with colleagues throughout the workday.',
          ru: 'Мне нравятся короткие беседы и частые контакты с коллегами в течение рабочего дня.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_07',
        category: 'Personality',
        subCategory: { uk: 'Логіка', en: 'Logic', ru: 'Логика' },
        text: {
          uk: 'Я відчуваю піднесення, коли можу логічно вирішувати складні проблеми.',
          en: 'I feel invigorated when I can solve complex problems logically.',
          ru: 'Я чувствую воодушевление, когда могу логически решать сложные проблемы.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_08',
        category: 'Personality',
        subCategory: { uk: 'Емпатія', en: 'Empathy', ru: 'Эмпатия' },
        text: {
          uk: 'Мені важко залишатися осторонь, коли інші переживають емоційне потрясіння.',
          en: 'I find it challenging to remain detached when others are experiencing emotional distress.',
          ru: 'Мне трудно оставаться в стороне, когда другие переживают эмоциональное потрясение.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_09',
        category: 'Personality',
        subCategory: { uk: 'Соціальність', en: 'Social', ru: 'Социальность' },
        text: {
          uk: 'Я почуваюся найбільш розслаблено, коли можу насолодитися власною компанією.',
          en: 'I feel most relaxed when I can enjoy my own company.',
          ru: 'Я чувствую себя наиболее расслабленно, когда могу насладиться собственной компанией.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_10',
        category: 'Personality',
        subCategory: { uk: 'Принципи', en: 'Principles', ru: 'Принципы' },
        text: {
          uk: 'Я вважаю, що помилки повинні мати наслідки.',
          en: 'I think mistakes should have consequences.',
          ru: 'Я считаю, что ошибки должны иметь последствия.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_11',
        category: 'Personality',
        subCategory: { uk: 'Емпатія', en: 'Empathy', ru: 'Эмпатия' },
        text: {
          uk: 'Я відчуваю тривогу, коли не погоджуюся з людьми.',
          en: 'I get anxious when I disagree with people.',
          ru: 'Я чувствую тревогу, когда не соглашаюсь с людьми.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_12',
        category: 'Personality',
        subCategory: { uk: 'Робочий стиль', en: 'Work style', ru: 'Рабочий стиль' },
        text: {
          uk: 'Мені подобається адреналін і зосередженість, які з\'являються під час роботи під тиском.',
          en: 'I enjoy the adrenaline and focus that come when working under pressure.',
          ru: 'Мне нравится адреналин и сосредоточенность, которые появляются при работе под давлением.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_13',
        category: 'Personality',
        subCategory: { uk: 'Конфліктність', en: 'Conflict', ru: 'Конфликтность' },
        text: {
          uk: 'Я схильний уникати суперечок з іншими, навіть якщо маю іншу думку.',
          en: 'I tend to avoid arguing with others, even when I have a different opinion.',
          ru: 'Я склонен избегать споров с другими, даже если у меня другое мнение.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_14',
        category: 'Personality',
        subCategory: { uk: 'Ризик', en: 'Risk', ru: 'Риск' },
        text: {
          uk: 'Мені подобається ризикувати та досліджувати незвідані сфери для пошуку нових рішень.',
          en: 'I enjoy taking chances and exploring uncharted territories to discover new solutions.',
          ru: 'Мне нравится рисковать и исследовать неизведанные сферы для поиска новых решений.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_15',
        category: 'Personality',
        subCategory: { uk: 'Соціальність', en: 'Social', ru: 'Социальность' },
        text: {
          uk: 'У компаніях я зазвичай чекаю, поки інші почнуть розмову першими.',
          en: 'I usually wait for others to initiate conversations in social settings.',
          ru: 'В компаниях я обычно жду, пока другие начнут разговор первыми.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_16',
        category: 'Personality',
        subCategory: { uk: 'Традиції', en: 'Tradition', ru: 'Традиции' },
        text: {
          uk: 'Я схильний дотримуватися перевірених методів і надійних рутинних справ.',
          en: 'I tend to stick to proven methods and reliable routines.',
          ru: 'Я склонен придерживаться проверенных методов и надежных рутинных дел.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_17',
        category: 'Personality',
        subCategory: { uk: 'Емоції', en: 'Emotions', ru: 'Эмоции' },
        text: {
          uk: 'Мені подобається ділитися своїм захопленням і щастям з іншими.',
          en: 'I enjoy sharing my excitement and happiness with others.',
          ru: 'Мне нравится делиться своим восторгом и счастьем с другими.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_18',
        category: 'Personality',
        subCategory: { uk: 'Емпатія', en: 'Empathy', ru: 'Эмпатия' },
        text: {
          uk: 'Я вважаю цінним слухати інших і визнавати їхні почуття.',
          en: 'I find value in listening and validating the feelings of others.',
          ru: 'Я считаю ценным слушать других и признавать их чувства.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_19',
        category: 'Personality',
        subCategory: { uk: 'Підтримка', en: 'Support', ru: 'Поддержка' },
        text: {
          uk: 'Мені подобається надавати емоційну підтримку друзям, коли вони цього потребують.',
          en: 'I enjoy providing emotional support for my friends when they need it.',
          ru: 'Мне нравится оказывать эмоциональную поддержку друзьям, когда они в этом нуждаются.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_20',
        category: 'Personality',
        subCategory: { uk: 'Креативність', en: 'Creativity', ru: 'Креативность' },
        text: {
          uk: 'Мені подобається розпочинати проєкти та дивитися, куди мене заведе креативність, замість того, щоб спочатку все планувати.',
          en: 'I like starting projects and seeing where my creativity leads over planning everything out first.',
          ru: 'Мне нравится начинать проекты и смотреть, куда меня заведет креативность, вместо того чтобы сначала все планировать.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_21',
        category: 'Personality',
        subCategory: { uk: 'Кооперація', en: 'Cooperation', ru: 'Кооперация' },
        text: {
          uk: 'Коли я стикаюся з викликом, мій перший крок — звернутися за порадою чи думкою до інших.',
          en: 'When facing a challenge, my first step is to seek input and advice from others.',
          ru: 'Когда я сталкиваюсь с вызовом, мой первый шаг — обратиться за советом или мнением к другим.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_22',
        category: 'Personality',
        subCategory: { uk: 'Традиції', en: 'Tradition', ru: 'Традиции' },
        text: {
          uk: 'У командних обговореннях я зосереджуюсь на тому, щоб наш підхід ґрунтувався на методах, які вже довели свою ефективність.',
          en: 'In team discussions, I focus on grounding our approach in what we know works.',
          ru: 'В командных обсуждениях я сосредотачиваюсь на том, чтобы наш подход основывался на методах, которые уже доказали свою эффективность.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_23',
        category: 'Personality',
        subCategory: { uk: 'Робочий стиль', en: 'Work style', ru: 'Рабочий стиль' },
        text: {
          uk: 'Мені подобається розділяти роботу та особисте життя.',
          en: 'I like to keep my work and personal life separate.',
          ru: 'Мне нравится разделять работу и личную жизнь.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_24',
        category: 'Personality',
        subCategory: { uk: 'Планування', en: 'Planning', ru: 'Планирование' },
        text: {
          uk: 'Я почуваюся спокійно, коли все заплановано і знаходиться на своїх місцях.',
          en: 'I feel calm when everything is scheduled and in its place.',
          ru: 'Я чувствую себя спокойно, когда все запланировано и находится на своих местах.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_25',
        category: 'Personality',
        subCategory: { uk: 'Соціальність', en: 'Social', ru: 'Социальность' },
        text: {
          uk: 'Мені подобається часто спілкуватися з новими людьми.',
          en: 'I enjoy engaging with new people frequently.',
          ru: 'Мне нравится часто общаться с новыми людьми.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_26',
        category: 'Personality',
        subCategory: { uk: 'Традиції', en: 'Tradition', ru: 'Традиции' },
        text: {
          uk: 'Я віддаю перевагу замовленню улюблених страв, а не спробам чогось нового.',
          en: 'I prefer ordering my favorite dishes rather than trying something new.',
          ru: 'Я предпочитаю заказывать любимые блюда, а не пробовать что-то новое.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_27',
        category: 'Personality',
        subCategory: { uk: 'Соціальність', en: 'Social', ru: 'Социальность' },
        text: {
          uk: 'Я віддаю перевагу соціальній активності над індивідуальною.',
          en: 'I prefer social activities over individual ones.',
          ru: 'Я предпочитаю социальную активность индивидуальной.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_28',
        category: 'Personality',
        subCategory: { uk: 'Планування', en: 'Planning', ru: 'Планирование' },
        text: {
          uk: 'Зазвичай я завершую завдання або проєкти задовго до дедлайну.',
          en: 'I usually complete tasks or projects well before deadlines.',
          ru: 'Обычно я завершаю задачи или проекты задолго до дедлайна.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_29',
        category: 'Personality',
        subCategory: { uk: 'Інтуїція', en: 'Intuition', ru: 'Интуиция' },
        text: {
          uk: 'Мені подобається розуміти загальну картину та те, як мої рішення вплинуть на майбутнє.',
          en: 'I enjoy figuring out the big picture and how my decisions will impact the future.',
          ru: 'Мне нравится понимать общую картину и то, как мои решения повлияют на будущее.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_30',
        category: 'Personality',
        subCategory: { uk: 'Сенсорика', en: 'Sensing', ru: 'Сенсорика' },
        text: {
          uk: 'Вирішуючи проблеми, я спочатку розглядаю існуючі умови та обмеження.',
          en: 'When solving problems, I start by considering the existing conditions and constraints.',
          ru: 'Решая проблемы, я сначала рассматриваю существующие условия и ограничения.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_31',
        category: 'Personality',
        subCategory: { uk: 'Соціальність', en: 'Social', ru: 'Социальность' },
        text: {
          uk: 'У групових розмовах я волію слухати, а не брати на себе ініціативу.',
          en: 'I like to listen rather than take the lead in group conversations.',
          ru: 'В групповых разговорах я предпочитаю слушать, а не брать на себя инициативу.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_32',
        category: 'Personality',
        subCategory: { uk: 'Інтуїція', en: 'Intuition', ru: 'Интуиция' },
        text: {
          uk: 'Мене захоплюють складні, детальні та інноваційні ідеї.',
          en: 'I\'m fascinated by complex, detailed and innovative ideas.',
          ru: 'Меня восхищают сложные, детальные и инновационные идеи.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_33',
        category: 'Personality',
        subCategory: { uk: 'Інтуїція', en: 'Intuition', ru: 'Интуиция' },
        text: {
          uk: 'Я ціную інноваційний проєкт, який зазнав невдачі, більше, ніж той, що став успішним завдяки дотриманню традицій.',
          en: 'I appreciate an innovative project that fails over one that succeeds by sticking to tradition.',
          ru: 'Я ценю инновационный проект, потерпевший неудачу, больше, чем тот, который стал успешным благодаря следованию традициям.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_34',
        category: 'Personality',
        subCategory: { uk: 'Логіка', en: 'Logic', ru: 'Логика' },
        text: {
          uk: 'Для мене важливіше бути правим, ніж подобатися іншим через те, що я кажу.',
          en: 'I prefer being correct over being liked for what I say.',
          ru: 'Для меня важнее быть правым, чем нравиться другим из-за того, что я говорю.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_35',
        category: 'Personality',
        subCategory: { uk: 'Навчання', en: 'Learning', ru: 'Обучение' },
        text: {
          uk: 'Я віддаю перевагу структурованому підходу під час вивчення чогось нового, дотримуючись чіткого плану та вказівок.',
          en: 'I prefer a structured approach when learning something new, following a clear plan and guidelines.',
          ru: 'Я предпочитаю структурированный подход при изучении чего-то нового, следуя четкому плану и указаниям.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_36',
        category: 'Personality',
        subCategory: { uk: 'Соціальність', en: 'Social', ru: 'Социальность' },
        text: {
          uk: 'Я часто почуваюся виснаженим після спілкування і потребує часу наодинці, щоб відновити сили.',
          en: 'I often feel drained after socializing and need time alone to recharge.',
          ru: 'Я часто чувствую себя истощенным после общения и нуждаюсь во времени наедине, чтобы восстановить силы.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_37',
        category: 'Personality',
        subCategory: { uk: 'Стихійність', en: 'Spontaneity', ru: 'Стихийность' },
        text: {
          uk: 'Я вважає, що несподівані зміни роблять мої дні цікавішими.',
          en: 'I think unexpected changes make my days interesting.',
          ru: 'Я считаю, что неожиданные изменения делают мои дни интереснее.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_38',
        category: 'Personality',
        subCategory: { uk: 'Емпатія', en: 'Empathy', ru: 'Эмпатия' },
        text: {
          uk: 'Приймаючи рішення, я ставлю почуття інших на перше місце.',
          en: 'I prioritize the feelings of others when making decisions.',
          ru: 'Принимая решения, я ставлю чувства других на первое место.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_39',
        category: 'Personality',
        subCategory: { uk: 'Логіка', en: 'Logic', ru: 'Логика' },
        text: {
          uk: 'Я приймаю рішення на основі того, що є логічним, а не того, що здається правильним за відчуттями.',
          en: 'I make decisions based on what makes sense rather than what feels right.',
          ru: 'Я принимаю решения на основе того, что логично, а не того, что кажется правильным по ощущениям.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_40',
        category: 'Personality',
        subCategory: { uk: 'Планування', en: 'Planning', ru: 'Планирование' },
        text: {
          uk: 'Я часто складаю списки та розклади, щоб організувати свої справи.',
          en: 'I often make lists and schedules to organize my activities.',
          ru: 'Я часто составляю списки и расписания, чтобы организовать свои дела.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_41',
        category: 'Personality',
        subCategory: { uk: 'Креативність', en: 'Creativity', ru: 'Креативность' },
        text: {
          uk: 'Мені не подобається займатися творчим самовираженням, наприклад, писати або створювати музику.',
          en: 'I don\'t enjoy participating in creative expression, like writing or making music.',
          ru: 'Мне не нравится заниматься творческим самовыражением, например, писать или создавать музыку.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_42',
        category: 'Personality',
        subCategory: { uk: 'Емпатія', en: 'Empathy', ru: 'Эмпатия' },
        text: {
          uk: 'Я схильний поводитися відсторонено, щоб уникнути емоційного дискомфорту.',
          en: 'I tend to act detached to avoid emotional distress.',
          ru: 'Я склонен вести себя отстраненно, чтобы избежать эмоционального дискомфорта.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_43',
        category: 'Personality',
        subCategory: { uk: 'Емпатія', en: 'Empathy', ru: 'Эмпатия' },
        text: {
          uk: 'Я легко співпереживаю емоціям інших людей.',
          en: 'I empathize easily with others\' emotions.',
          ru: 'Я легко сопереживаю эмоциям других людей.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_44',
        category: 'Personality',
        subCategory: { uk: 'Робочий стиль', en: 'Work style', ru: 'Рабочий стиль' },
        text: {
          uk: 'Я найкраще працюю в середовищі, де можу працювати тихо та незалежно.',
          en: 'I excel in environments where I can work quietly and independently.',
          ru: 'Я лучше всего работаю в среде, где могу работать тихо и независимо.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_45',
        category: 'Personality',
        subCategory: { uk: 'Соціальність', en: 'Social', ru: 'Социальность' },
        text: {
          uk: 'На соціальних заходах я волію залишатися в тіні.',
          en: 'I prefer to stay in the background during social events.',
          ru: 'На социальных мероприятиях я предпочитаю оставаться в тени.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_46',
        category: 'Personality',
        subCategory: { uk: 'Інтуїція', en: 'Intuition', ru: 'Интуиция' },
        text: {
          uk: 'Мені подобається знаходити глибші сенси в інформації, з якою я стикаюся.',
          en: 'I enjoy finding deeper meanings in the information I come across.',
          ru: 'Мне нравится находить более глубокие смыслы в информации, с которой я сталкиваюсь.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_47',
        category: 'Personality',
        subCategory: { uk: 'Робочий стиль', en: 'Work style', ru: 'Рабочий стиль' },
        text: {
          uk: 'Я волію працювати в творчому середовищі, а не в такому, де є чіткі інструкції та обов\'язки.',
          en: 'I prefer working in a creative environment over one with clear guidelines and responsibilities.',
          ru: 'Я предпочитаю работать в творческой среде, а не в такой, где есть четкие инструкции и обязанности.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_48',
        category: 'Personality',
        subCategory: { uk: 'Практичність', en: 'Practicality', ru: 'Практичность' },
        text: {
          uk: 'Я ціную практичність більше, ніж експериментальні ідеї.',
          en: 'I value practicality over experimental ideas.',
          ru: 'Я ценю практичность больше, чем экспериментальные идеи.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_49',
        category: 'Personality',
        subCategory: { uk: 'Планування', en: 'Planning', ru: 'Планирование' },
        text: {
          uk: 'Зазвичай я складаю плани на кілька днів наперед.',
          en: 'I usually make plans days in advance.',
          ru: 'Обычно я составляю планы на несколько дней вперед.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_50',
        category: 'Personality',
        subCategory: { uk: 'Інтуїція', en: 'Intuition', ru: 'Интуиция' },
        text: {
          uk: 'Я часто думаю про нові ідеї та майбутні проєкти, навіть коли зараз працюю над чимось іншим.',
          en: 'I often think about new ideas and future projects, even when currently working on something.',
          ru: 'Я часто думаю о новых идеях и будущих проектах, даже когда сейчас работаю над чем-то другим.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_51',
        category: 'Personality',
        subCategory: { uk: 'Планування', en: 'Planning', ru: 'Планирование' },
        text: {
          uk: 'Працюючи над груповим проєктом, я закликаю до встановлення чітких ролей і дедлайнів із самого початку.',
          en: 'When working on a group project, I encourage setting clear roles and deadlines from the beginning.',
          ru: 'Работая над групповым проектом, я призываю к установлению четких ролей и дедлайнов с самого начала.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_52',
        category: 'Personality',
        subCategory: { uk: 'Логіка', en: 'Logic', ru: 'Логика' },
        text: {
          uk: 'Приймаючи рішення, я віддаю перевагу ефективності, навіть якщо це може зачепити чиїсь почуття.',
          en: 'I favor effectiveness when making decisions, even if it hurts someone\'s feelings.',
          ru: 'Принимая решения, я отдаю предпочтение эффективности, даже если это может задеть чьи-то чувства.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_53',
        category: 'Personality',
        subCategory: { uk: 'Соціальність', en: 'Social', ru: 'Социальность' },
        text: {
          uk: 'Знайомство з новими людьми часто викликає у мене тривогу або стрес.',
          en: 'Meeting new people often makes me feel anxious or stressed.',
          ru: 'Знакомство с новыми людьми часто вызывает у меня тревогу или стресс.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_54',
        category: 'Personality',
        subCategory: { uk: 'Комунікація', en: 'Communication', ru: 'Коммуникация' },
        text: {
          uk: 'Під час зустрічей мені подобається відкрито обговорювати питання та обмінюватися ідеями з іншими.',
          en: 'During meetings, I like to discuss issues openly and exchange ideas with others.',
          ru: 'Во время встреч мне нравится открыто обсуждать вопросы и обмениваться идеями с другими.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_55',
        category: 'Personality',
        subCategory: { uk: 'Інтуїція', en: 'Intuition', ru: 'Интуиция' },
        text: {
          uk: 'Вивчаючи щось нове, я люблю починати з теорії та загальних концепцій.',
          en: 'When learning something new, I like to start with the theory and general concepts.',
          ru: 'Изучая что-то новое, я люблю начинать с теории и общих концепций.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_56',
        category: 'Personality',
        subCategory: { uk: 'Емоції', en: 'Emotions', ru: 'Эмоции' },
        text: {
          uk: 'Я схильний відкрито виражати свої емоції.',
          en: 'I tend to express my emotions openly.',
          ru: 'Я склонен открыто выражать свои эмоции.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_57',
        category: 'Personality',
        subCategory: { uk: 'Стихійність', en: 'Spontaneity', ru: 'Стихийность' },
        text: {
          uk: 'Я вважаю, що надмірне планування позбавляє життя задоволення.',
          en: 'I find that too much planning takes the fun out of life.',
          ru: 'Я считаю, что избыточное планирование лишает жизнь удовольствия.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_58',
        category: 'Personality',
        subCategory: { uk: 'Абстракція', en: 'Abstraction', ru: 'Абстракция' },
        text: {
          uk: 'Я часто пояснюю свої ідеї за допомогою метафор або гіпотетичних сценаріїв.',
          en: 'I often explain my ideas using metaphors or hypothetical scenarios.',
          ru: 'Я часто объясняю свои идеи с помощью метафор или гипотетических сценариев.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_59',
        category: 'Personality',
        subCategory: { uk: 'Креативність', en: 'Creativity', ru: 'Креативность' },
        text: {
          uk: 'Я віддаю перевагу дослідженню нових можливостей і рішень, не дотримуючись суворого плану.',
          en: 'I prefer exploring new possibilities and solutions without sticking to a strict plan.',
          ru: 'Я предпочитаю исследование новых возможностей и решений, не следуя строгому плану.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_60',
        category: 'Personality',
        subCategory: { uk: 'Комунікація', en: 'Communication', ru: 'Коммуникация' },
        text: {
          uk: 'У розмові я швидко відповідаю і насолоджуюся динамічним обміном думками.',
          en: 'In conversations, I\'m quick to respond and enjoy rapid exchanges.',
          ru: 'В разговоре я быстро отвечаю и наслаждаюсь динамичным обменом мнениями.'
        },
        type: QuestionType.SCALE
      }
    ]
  }
];

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
    categories: [SURVEY_DATA[0], SURVEY_DATA[1], SURVEY_DATA[2]]
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
    categories: [SURVEY_DATA[3]]
  },
  {
    id: 'sensory_only',
    title: {
      uk: 'Тільки Сенсорна Уява',
      en: 'Sensory Imagination Only',
      ru: 'Только Сенсорное Воображение'
    },
    description: {
       uk: 'Скорочений тест, що фокусується лише на візуальних, аудіальних та інших відчуттях.',
       en: 'Shortened test focusing only on visual, auditory, and other sensations.',
       ru: 'Сокращенный тест, фокусирующийся только на визуальных, аудиальных и других ощущениях.'
    },
    categories: [SURVEY_DATA[0]]
  },
  {
    id: 'processes_only',
    title: {
      uk: 'Тільки Процеси Уяви',
      en: 'Imagination Processes Only',
      ru: 'Только Процессы Воображения'
    },
    description: {
       uk: 'Як саме ваш мозок конструює образи та думки.',
       en: 'How exactly your brain constructs images and thoughts.',
       ru: 'Как именно ваш мозг конструирует образы и мысли.'
    },
    categories: [SURVEY_DATA[1]]
  },
  {
    id: 'strategies_only',
    title: {
      uk: 'Тільки Стратегії та Пам\'ять',
      en: 'Strategies and Memory Only',
      ru: 'Только Стратегии и Память'
    },
    description: {
       uk: 'Аналіз стилю мислення, пам\'яті та соціальної взаємодії.',
       en: 'Analysis of thinking style, memory, and social interaction.',
       ru: 'Анализ стиля мышления, памяти и социального взаимодействия.'
    },
    categories: [SURVEY_DATA[2]]
  },
];
