import {CategoryData, QuestionType} from '../types';

export const PERSONALITY_CATEGORIES: CategoryData[] = [
  {
    id: 'ocean_o',
    title: {
      uk: 'Відкритість до досвіду (Openness)',
      en: 'Openness to Experience',
      ru: 'Открытость опыту (Openness)'
    },
    description: {
      uk: 'Ваша інтелектуальна допитливість, естетична чутливість та готовність до інновацій.',
      en: 'Your intellectual curiosity, aesthetic sensitivity, and willingness to innovate.',
      ru: 'Ваша интеллектуальная любознательность, эстетическая чувствительность и готовность к инновациям.'
    },
    questions: [
      {
        id: 'p_32',
        category: 'Personality',
        subCategory: {uk: 'Концептуальність', en: 'Conceptual', ru: 'Концептуальность'},
        text: {
          uk: 'Мене захоплюють складні, концептуальні та інноваційні ідеї.',
          en: 'I\'m fascinated by complex, conceptual and innovative ideas.',
          ru: 'Меня восхищают сложные, концептуальные и инновационные идеи.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_46',
        category: 'Personality',
        subCategory: {uk: 'Глибина', en: 'Depth', ru: 'Глубина'},
        text: {
          uk: 'Мені подобається знаходити приховані або глибші сенси в інформації.',
          en: 'I enjoy finding deeper meanings in information.',
          ru: 'Мне нравится находить скрытые или глубокие смыслы в информации.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_58',
        category: 'Personality',
        subCategory: {uk: 'Абстракція', en: 'Abstraction', ru: 'Абстракция'},
        text: {
          uk: 'Я часто пояснюю свої ідеї за допомогою метафор або гіпотетичних сценаріїв.',
          en: 'I often explain my ideas using metaphors or hypothetical scenarios.',
          ru: 'Я часто объясняю свои идеи с помощью метафор или гипотетических сценариев.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_41',
        category: 'Personality',
        subCategory: {uk: 'Креативність', en: 'Creativity', ru: 'Креативность'},
        text: {
          uk: 'Я отримую задоволення від творчого самовираження (письмо, музика, дизайн тощо).',
          en: 'I enjoy creative expression, such as writing, music, or design.',
          ru: 'Я получаю удовольствие от творческого самовыражения (письмо, музыка, дизайн и т.д.).'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_33',
        category: 'Personality',
        subCategory: {uk: 'Інновації', en: 'Innovation', ru: 'Инновации'},
        text: {
          uk: 'Я ціную інноваційний проєкт, який зазнав невдачі, більше, ніж той, що став успішним завдяки дотриманню традицій.',
          en: 'I appreciate an innovative project that fails over one that succeeds by sticking to tradition.',
          ru: 'Я ценю инновационный проект, потерпевший неудачу, больше, чем тот, который стал успешным благодаря следованию традициям.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_29',
        category: 'Personality',
        subCategory: {uk: 'Бачення', en: 'Vision', ru: 'Видение'},
        text: {
          uk: 'Мені подобається розуміти загальну картину та те, як рішення вплинуть на майбутнє.',
          en: 'I enjoy figuring out the big picture and how decisions will impact the future.',
          ru: 'Мне нравится понимать общую картину и то, как решения повлияют на будущее.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_55',
        category: 'Personality',
        subCategory: {uk: 'Теорія', en: 'Theory', ru: 'Теория'},
        text: {
          uk: 'Вивчаючи щось нове, я волію починати з теорії та загальних концепцій.',
          en: 'When learning something new, I like to start with the theory and general concepts.',
          ru: 'Изучая что-то новое, я предпочитаю начинать с теории и общих концепций.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_07',
        category: 'Personality',
        subCategory: {uk: 'Інтелект', en: 'Intellect', ru: 'Интеллект'},
        text: {
          uk: 'Я відчуваю піднесення, коли можу логічно вирішувати складні інтелектуальні проблеми.',
          en: 'I feel invigorated when I can solve complex intellectual problems logically.',
          ru: 'Я чувствую воодушевление при логическом решении сложных интеллектуальных задач.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_47',
        category: 'Personality',
        subCategory: {uk: 'Середовище', en: 'Environment', ru: 'Среда'},
        text: {
          uk: 'Я волію працювати в творчому середовищі, а не в такому, де є лише чіткі інструкції.',
          en: 'I prefer working in a creative environment over one with only clear guidelines.',
          ru: 'Я предпочитаю работать в творческой среде, а не в такой, где есть только четкие инструкции.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_16',
        category: 'Personality',
        subCategory: {uk: 'Консерватизм', en: 'Conservatism', ru: 'Консерватизм'},
        text: {
          uk: 'Я схильний дотримуватися перевірених методів і надійної рутини.',
          en: 'I tend to stick to proven methods and reliable routines.',
          ru: 'Я склонен придерживаться проверенных методов и надежной рутины.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_22',
        category: 'Personality',
        subCategory: {uk: 'Традиції', en: 'Tradition', ru: 'Традиции'},
        text: {
          uk: 'Я волію, щоб командна робота ґрунтувалася на методах, які вже довели свою ефективність.',
          en: 'I prefer team grounding in methods that have already proven effective.',
          ru: 'Я предпочитаю, чтобы командная работа основывалась на методах, которые уже доказали свою эффективность.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_26',
        category: 'Personality',
        subCategory: {uk: 'Традиції', en: 'Tradition', ru: 'Традиции'},
        text: {
          uk: 'Я віддаю перевагу замовленню улюблених страв, а не спробам чогось нового.',
          en: 'I prefer ordering my favorite dishes rather than trying something new.',
          ru: 'Я предпочитаю заказывать любимые блюда, а не пробовать что-то новое.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_30',
        category: 'Personality',
        subCategory: {uk: 'Практичність', en: 'Practicality', ru: 'Практичность'},
        text: {
          uk: 'Вирішуючи проблеми, я спочатку розглядаю існуючі умови та обмеження.',
          en: 'When solving problems, I start by considering the existing conditions and constraints.',
          ru: 'Решая проблемы, я сначала рассматриваю существующие условия и ограничения.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_48',
        category: 'Personality',
        subCategory: {uk: 'Практичність', en: 'Practicality', ru: 'Практичность'},
        text: {
          uk: 'Я вважаю себе практичною людиною, яка твердо стоїть на землі.',
          en: 'I consider myself a practical person who stands firmly on the ground.',
          ru: 'Я считаю себя практичным человеком, который твердо стоит на земле.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_04',
        category: 'Personality',
        subCategory: {uk: 'Сприйняття', en: 'Perception', ru: 'Восприятие'},
        text: {
          uk: 'Я ціную мистецтво з чіткими темами, а не те, що залишає занадто багато простору для інтерпретації.',
          en: 'I appreciate art with clear themes rather than that which leaves too much space for interpretation.',
          ru: 'Я ценю искусство с четкими темами, а не то, что оставляет слишком много пространства для интерпретации.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_14',
        category: 'Personality',
        subCategory: {uk: 'Дослідження', en: 'Exploration', ru: 'Исследование'},
        text: {
          uk: 'Мені подобається ризикувати та досліджувати невідоме для пошуку нових рішень.',
          en: 'I enjoy taking chances and exploring uncharted territories to discover new solutions.',
          ru: 'Мне нравится рисковать и исследовать неизведанное для поиска новых решений.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_50',
        category: 'Personality',
        subCategory: {uk: 'Уява', en: 'Imagination', ru: 'Воображение'},
        text: {
          uk: 'Я часто занурююсь у свої думки про майбутні проєкти, навіть коли зараз працюю над чимось іншим.',
          en: 'I often get lost in thoughts about future projects, even when currently working on something else.',
          ru: 'Я часто погружаюсь в свои мысли о будущих проектах, даже когда сейчас работаю над чем-то другим.'
        },
        type: QuestionType.SCALE
      }
    ]
  },
  {
    id: 'ocean_c',
    title: {
      uk: 'Сумлінність (Conscientiousness)',
      en: 'Conscientiousness',
      ru: 'Добросовестность (Conscientiousness)'
    },
    description: {
      uk: 'Ваша здатність до самоконтролю, планування, організованості та наполегливості.',
      en: 'Your capacity for self-control, planning, organization, and persistence.',
      ru: 'Ваша способность к самоконтролю, планированию, организованности и настойчивости.'
    },
    questions: [
      {
        id: 'p_05',
        category: 'Personality',
        subCategory: {uk: 'Планування', en: 'Planning', ru: 'Планирование'},
        text: {
          uk: 'Я отримую задоволення від досягнення цілей шляхом систематичного планування.',
          en: 'I find joy in achieving set goals through systematic planning.',
          ru: 'Я получаю удовольствие от достижения целей путем систематического планирования.'
        },
        type: QuestionType.SCALE
      },
      {
        id: '100',
        category: 'Personality',
        subCategory: {uk: 'Робочий стиль', en: 'Work style', ru: 'Рабочий стиль'},
        text: {
          uk: 'Я досягаю поставлених цілей завдяки методичному дотриманню плану.',
          en: 'I reach my set goals through methodical adherence to a plan.',
          ru: 'Я достигаю поставленных целей благодаря методичному следованию плану.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_40',
        category: 'Personality',
        subCategory: {uk: 'Порядок', en: 'Orderliness', ru: 'Порядок'},
        text: {
          uk: 'Я часто складаю списки та розклади, щоб організувати свої справи.',
          en: 'I often make lists and schedules to organize my activities.',
          ru: 'Я часто составляю списки и расписания, чтобы организовать свои дела.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_49',
        category: 'Personality',
        subCategory: {uk: 'Передбачливість', en: 'Foresight', ru: 'Предусмотрительность'},
        text: {
          uk: 'Зазвичай я складаю плани на кілька днів наперед.',
          en: 'I usually make plans days in advance.',
          ru: 'Обычно я составляю планы на несколько дней вперед.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_51',
        category: 'Personality',
        subCategory: {uk: 'Обов\'язок', en: 'Dutifulness', ru: 'Долг'},
        text: {
          uk: 'Працюючи над груповим проєктом, я закликаю до встановлення чітких ролей із самого початку.',
          en: 'When working on a group project, I encourage setting clear roles from the beginning.',
          ru: 'Работая над групповым проектом, я призываю к установлению четких ролей с самого начала.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_10',
        category: 'Personality',
        subCategory: {uk: 'Принциповість', en: 'Dutifulness', ru: 'Принципиальность'},
        text: {
          uk: 'Я вважаю, що помилки та порушення встановлених правил повинні мати чіткі наслідки.',
          en: 'I think mistakes and rule-breaking should have clear consequences.',
          ru: 'Я считаю, что ошибки и нарушения установленных правил должны иметь четкие последствия.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_01',
        category: 'Personality',
        subCategory: {uk: 'Стимул', en: 'Spontaneity', ru: 'Стимул'},
        text: {
          uk: 'Я найкраще працюю під тиском і часто виконую основні завдання в останню хвилину.',
          en: 'I work best under pressure and often complete key tasks at the last minute.',
          ru: 'Я лучше всего работаю под давлением и часто выполняю основные задачи в последнюю минуту.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_12',
        category: 'Personality',
        subCategory: {uk: 'Робота в стресі', en: 'Stress work', ru: 'Работа в стрессе'},
        text: {
          uk: 'Мені подобається адреналін і зосередженість, які з\'являються під час термінової роботи.',
          en: 'I enjoy the adrenaline and focus that come when working under a tight deadline.',
          ru: 'Мне нравится адреналин и сосредоточенность, которые появляются при срочной работе.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_37',
        category: 'Personality',
        subCategory: {uk: 'Тиск', en: 'Pressure', ru: 'Давление'},
        text: {
          uk: 'Дедлайни стимулюють мою креативність більше, ніж завчасне планування.',
          en: 'Deadlines stimulate my creativity more than early planning.',
          ru: 'Дедлайны стимулируют мою креативность больше, чем заблаговременное планирование.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_59',
        category: 'Personality',
        subCategory: {uk: 'Гнучкість', en: 'Flexibility', ru: 'Гибкость'},
        text: {
          uk: 'Я віддаю перевагу дослідженню нових можливостей по ходу справи, не дотримуючись суворого графіка.',
          en: 'I prefer exploring new possibilities as I go, without sticking to a strict schedule.',
          ru: 'Я предпочитаю исследование новых возможностей по ходу дела, не следуя строгому графику.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_57',
        category: 'Personality',
        subCategory: {uk: 'Спонтанність', en: 'Spontaneity', ru: 'Спонтанность'},
        text: {
          uk: 'Я вважаю, що надмірне планування обмежує свободу та задоволення від життя.',
          en: 'I find that too much planning limits freedom and the fun of life.',
          ru: 'Я считаю, что избыточное планирование ограничивает свободу и удовольствие от жизни.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_03',
        category: 'Personality',
        subCategory: {uk: 'Гнучкість', en: 'Flexibility', ru: 'Гибкость'},
        text: {
          uk: 'Я знаходжу натхнення у відкритих підходах, а не в жорстких структурах.',
          en: 'I find inspiration in open-ended approaches rather than rigid structures.',
          ru: 'Я нахожу вдохновение в открытых подходах, а не в жестких структурах.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_20',
        category: 'Personality',
        subCategory: {uk: 'Процес', en: 'Process', ru: 'Процесс'},
        text: {
          uk: 'Мені подобається розпочинати проєкти імпульсивно, щоб побачити, куди мене заведе креативність.',
          en: 'I like starting projects impulsively to see where my creativity leads me.',
          ru: 'Мне нравится начинать проекты импульсивно, чтобы увидеть, куда меня заведет креативность.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_23',
        category: 'Personality',
        subCategory: {uk: 'Дисципліна', en: 'Discipline', ru: 'Дисциплина'},
        text: {
          uk: 'Я чітко розмежовую робочі завдання та особистий час.',
          en: 'I clearly separate work tasks and personal time.',
          ru: 'Я четко разграничиваю рабочие задачи и личное время.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_35',
        category: 'Personality',
        subCategory: {uk: 'Послідовність', en: 'Consistency', ru: 'Последовательность'},
        text: {
          uk: 'Я віддаю перевагу поетапному навчанню з чіткими та зрозумілими інструкціями.',
          en: 'I prefer step-by-step learning with clear and easy-to-understand instructions.',
          ru: 'Я предпочитаю поэтапное обучение с четкими и понятными инструкциями.'
        },
        type: QuestionType.SCALE
      }
    ]
  },
  {
    id: 'ocean_e',
    title: {
      uk: 'Екстраверсія (Extraversion)',
      en: 'Extraversion',
      ru: 'Экстраверсия (Extraversion)'
    },
    description: {
      uk: 'Ваша товариськість, активність, схильність до пошуку вражень та позитивні емоції.',
      en: 'Your sociability, activity, sensation-seeking, and positive emotions.',
      ru: 'Ваша общительность, активность, склонность к поиску впечатлений и позитивные эмоции.'
    },
    questions: [
      {
        id: 'p_02',
        category: 'Personality',
        subCategory: {uk: 'Впевненість', en: 'Confidence', ru: 'Уверенность'},
        text: {
          uk: 'Я почуваюся впевнено в соціальних ситуаціях, навіть із малознайомими людьми.',
          en: 'I feel comfortable and confident in social situations, even with people I don\'t know well.',
          ru: 'Я чувствую себя уверенно в социальных ситуациях, даже с малознакомыми людьми.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_25',
        category: 'Personality',
        subCategory: {uk: 'Товариськість', en: 'Gregariousness', ru: 'Общительность'},
        text: {
          uk: 'Мені подобається часто знайомитися та спілкуватися з новими людьми.',
          en: 'I enjoy engaging with new people frequently.',
          ru: 'Мне нравится часто знакомиться и общаться с новыми людьми.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_06',
        category: 'Personality',
        subCategory: {uk: 'Комунікація', en: 'Communication', ru: 'Коммуникация'},
        text: {
          uk: 'Мені подобаються короткі бесіди та часті контакти з людьми протягом дня.',
          en: 'I enjoy quick chats and frequent check-ins with people throughout the day.',
          ru: 'Мне нравятся короткие беседы и частые контакты с людьми в течение дня.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_54',
        category: 'Personality',
        subCategory: {uk: 'Комунікація', en: 'Communication', ru: 'Коммуникация'},
        text: {
          uk: 'Під час зустрічей мені подобається активно обговорювати питання та обмінюватися думками.',
          en: 'During meetings, I like to actively discuss issues and exchange opinions.',
          ru: 'Во время встреч мне нравится активно обсуждать вопросы и обмениваться мнениями.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_60',
        category: 'Personality',
        subCategory: {uk: 'Динаміка', en: 'Energy', ru: 'Динамика'},
        text: {
          uk: 'У розмовах я швидко відповідаю і насолоджуюся високим темпом спілкування.',
          en: 'In conversations, I\'m quick to respond and enjoy a high pace of communication.',
          ru: 'В разговоре я быстро отвечаю и наслаждаюсь высоким темпом общения.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_601',
        category: 'Personality',
        subCategory: {uk: 'Зовнішнє мислення', en: 'External thinking', ru: 'Внешнее мышление'},
        text: {
          uk: 'Я часто обговорюю свої ідеї з іншими ще на етапі їх формування.',
          en: 'I often discuss my ideas with others while they are still being formed.',
          ru: 'Я часто обсуждаю свои идеи с другими еще на этапе их формирования.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_107',
        category: 'Personality',
        subCategory: {uk: 'Лідерство', en: 'Assertiveness', ru: 'Лидерство'},
        text: {
          uk: 'Я зазвичай беру на себе ініціативу в групових обговореннях або проєктах.',
          en: 'I usually take the lead in group discussions or projects.',
          ru: 'Я обычно беру на себя инициативу в групповых обсуждениях или проектах.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_17',
        category: 'Personality',
        subCategory: {uk: 'Позитивність', en: 'Positive emotions', ru: 'Позитивность'},
        text: {
          uk: 'Мені подобається ділитися своїм захопленням і радістю з іншими людьми.',
          en: 'I enjoy sharing my excitement and joy with other people.',
          ru: 'Мне нравится делиться своим восторгом и радостью с другими людьми.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_27',
        category: 'Personality',
        subCategory: {uk: 'Активність', en: 'Activity', ru: 'Активность'},
        text: {
          uk: 'Я віддаю перевагу активному соціальному життю над спокійним проведенням часу.',
          en: 'I prefer an active social life over quiet pastimes.',
          ru: 'Я предпочитаю активную социальную жизнь спокойному времяпрепровождению.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_44',
        category: 'Personality',
        subCategory: {uk: 'Автономність', en: 'Autonomy', ru: 'Автономность'},
        text: {
          uk: 'Я найбільш продуктивний у тихій, незалежній обстановці.',
          en: 'I am most productive in a quiet, independent setting.',
          ru: 'Я наиболее продуктивен в тихой, независимой обстановке.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_15',
        category: 'Personality',
        subCategory: {uk: 'Спостереження', en: 'Observation', ru: 'Наблюдение'},
        text: {
          uk: 'У великих компаніях я схильний більше слухати, ніж говорити.',
          en: 'In large groups, I tend to listen more than I speak.',
          ru: 'В больших компаниях я склонен больше слушать, чем говорить.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_31',
        category: 'Personality',
        subCategory: {uk: 'Стриманість', en: 'Reserve', ru: 'Сдержанность'},
        text: {
          uk: 'Я волію залишатися на позиції слухача, поки не вивчу ситуацію в групі.',
          en: 'I prefer to remain a listener until I have assessed the group situation.',
          ru: 'Я предпочитаю оставаться на позиции слушателя, пока не изучу ситуацию в группе.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_36',
        category: 'Personality',
        subCategory: {uk: 'Виснаження', en: 'Draining', ru: 'Истощение'},
        text: {
          uk: 'Тривале інтенсивне спілкування викликає у мене потребу побути наодинці.',
          en: 'Prolonged intense socialization makes me feel a need for solitude.',
          ru: 'Длительное интенсивное общение вызывает у меня потребность побыть наедине.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_91',
        category: 'Personality',
        subCategory: {uk: 'Відновлення', en: 'Recovery', ru: 'Восстановление'},
        text: {
          uk: 'Мій найкращий відпочинок — це час, проведений наодинці з собою.',
          en: 'My best rest is time spent alone with myself.',
          ru: 'Мой лучший отдых — это время, проведенное наедине с собой.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_45',
        category: 'Personality',
        subCategory: {uk: 'Присутність', en: 'Presence', ru: 'Присутствие'},
        text: {
          uk: 'На соціальних заходах я почуваюся комфортніше, не привертаючи зайвої уваги.',
          en: 'I feel more comfortable at social events when I don\'t draw unnecessary attention.',
          ru: 'На социальных мероприятиях я чувствую себя комфортнее, не привлекая лишнего внимания.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_56',
        category: 'Personality',
        subCategory: {uk: 'Експресія', en: 'Expression', ru: 'Экспрессия'},
        text: {
          uk: 'Людям зазвичай легко зрозуміти, що я відчуваю, через мою поведінку.',
          en: 'It is usually easy for people to tell how I am feeling from my behavior.',
          ru: 'Людям обычно легко понять, что я чувствую, по моему поведению.'
        },
        type: QuestionType.SCALE
      }
    ]
  },
  {
    id: 'ocean_a',
    title: {
      uk: 'Доброзичливість (Agreeableness)',
      en: 'Agreeableness',
      ru: 'Доброжелательность (Agreeableness)'
    },
    description: {
      uk: 'Ваша здатність до співпраці, довіри, емпатії та готовність іти на компроміс.',
      en: 'Your capacity for cooperation, trust, empathy, and willingness to compromise.',
      ru: 'Ваша способность к сотрудничеству, доверию, эмпатии и готовность идти на компромисс.'
    },
    questions: [
      {
        id: 'p_43',
        category: 'Personality',
        subCategory: {uk: 'Емпатія', en: 'Empathy', ru: 'Эмпатия'},
        text: {
          uk: 'Я легко співпереживаю емоціям інших людей.',
          en: 'I empathize easily with others\' emotions.',
          ru: 'Я легко сопереживаю эмоциям других людей.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_08',
        category: 'Personality',
        subCategory: {uk: 'Співчуття', en: 'Compassion', ru: 'Сострадание'},
        text: {
          uk: 'Мені важко залишатися байдужим, коли хтось поруч переживає сильні емоції.',
          en: 'I find it hard to remain indifferent when someone nearby is experiencing strong emotions.',
          ru: 'Мне трудно оставаться безразличным, когда кто-то рядом переживает сильные эмоции.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_19',
        category: 'Personality',
        subCategory: {uk: 'Альтруїзм', en: 'Altruism', ru: 'Альтруизм'},
        text: {
          uk: 'Я щиро насолоджуюся можливістю допомогти друзям у складні моменти.',
          en: 'I genuinely enjoy the chance to help friends during difficult times.',
          ru: 'Я искренне наслаждаюсь возможностью помочь друзьям в сложные моменты.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_18',
        category: 'Personality',
        subCategory: {uk: 'Гармонія', en: 'Harmony', ru: 'Гармония'},
        text: {
          uk: 'Прийнятність рішення для всіх учасників для мене важливіша за його суху логіку.',
          en: 'The acceptability of a decision for all participants is more important to me than its dry logic.',
          ru: 'Приемлемость решения для всех участников для меня важнее его сухой логики.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_11',
        category: 'Personality',
        subCategory: {uk: 'Поступливість', en: 'Compliance', ru: 'Уступчивость'},
        text: {
          uk: 'Я схильний уникати відкритої незгоди, щоб зберегти хороші стосунки.',
          en: 'I tend to avoid open disagreement to maintain good relationships.',
          ru: 'Я склонен избегать открытого несогласия, чтобы сохранить хорошие отношения.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_108',
        category: 'Personality',
        subCategory: {uk: 'Довіра', en: 'Trust', ru: 'Доверие'},
        text: {
          uk: 'Я схильний вірити, що більшість людей мають добрі наміри.',
          en: 'I tend to believe that most people have good intentions.',
          ru: 'Я склонен верить, что у большинства людей добрые намерения.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_21',
        category: 'Personality',
        subCategory: {uk: 'Кооперація', en: 'Cooperation', ru: 'Кооперация'},
        text: {
          uk: 'Спільне вирішення проблеми для мене завжди краще, ніж самостійний пошук виходу.',
          en: 'Solving a problem together is always better for me than looking for a way out on my own.',
          ru: 'Совместное решение проблемы для меня всегда лучше, чем самостоятельный поиск выхода.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_39',
        category: 'Personality',
        subCategory: {uk: 'Об\'єктивність', en: 'Objectivity', ru: 'Объективность'},
        text: {
          uk: 'Я приймаю рішення на основі фактів та логіки, навіть якщо це комусь не сподобається.',
          en: 'I make decisions based on facts and logic, even if it might displease someone.',
          ru: 'Я принимаю решения на основе фактов и логики, даже если это кому-то не понравится.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_34',
        category: 'Personality',
        subCategory: {uk: 'Прямота', en: 'Directness', ru: 'Прямота'},
        text: {
          uk: 'Для мене істина важливіша за делікатність у спілкуванні.',
          en: 'To me, the truth is more important than being delicate in communication.',
          ru: 'Для меня истина важнее деликатности в общении.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_52',
        category: 'Personality',
        subCategory: {uk: 'Прагматизм', en: 'Pragmatism', ru: 'Прагматизм'},
        text: {
          uk: 'Ефективність результату для мене пріоритетніша за емоційний комфорт команди.',
          en: 'The effectiveness of the result is more of a priority to me than the emotional comfort of the team.',
          ru: 'Эффективность результата для меня приоритетнее эмоционального комфорта команды.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_42',
        category: 'Personality',
        subCategory: {uk: 'Дистанція', en: 'Detachment', ru: 'Дистанция'},
        text: {
          uk: 'Я волію зберігати емоційну дистанцію, щоб залишатися об\'єктивним.',
          en: 'I prefer to maintain emotional distance to remain objective.',
          ru: 'Я предпочитаю сохранять эмоциональную дистанцию, чтобы оставаться объективным.'
        },
        type: QuestionType.SCALE
      }
    ]
  },
  {
    id: 'ocean_n',
    title: {
      uk: 'Нейротизм / Емоційна стабільність (Neuroticism)',
      en: 'Neuroticism / Emotional Stability',
      ru: 'Нейротизм / Эмоциональная устойчивость'
    },
    description: {
      uk: 'Ваша емоційна реактивність, схильність до тривоги та здатність зберігати спокій під тиском.',
      en: 'Your emotional reactivity, tendency toward anxiety, and ability to remain calm under pressure.',
      ru: 'Ваша эмоциональная реактивность, склонность к тревоге и способность сохранять спокойствие под давлением.'
    },
    questions: [
      {
        id: 'p_101',
        category: 'Personality',
        subCategory: {uk: 'Тривожність', en: 'Anxiety', ru: 'Тревожность'},
        text: {
          uk: 'Я часто хвилююся через події, які ще не відбулися.',
          en: 'I often worry about events that haven\'t happened yet.',
          ru: 'Я часто волнуюсь из-за событий, которые еще не произошли.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_102',
        category: 'Personality',
        subCategory: {uk: 'Реакція на стрес', en: 'Stress reaction', ru: 'Реакция на стресс'},
        text: {
          uk: 'Я легко втрачаю рівновагу в напружених або критичних ситуаціях.',
          en: 'I easily lose my balance in tense or critical situations.',
          ru: 'Я легко теряю равновесие в напряженных или критических ситуациях.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_103',
        category: 'Personality',
        subCategory: {uk: 'Мінливість', en: 'Mood swings', ru: 'Переменчивость'},
        text: {
          uk: 'Мій емоційний стан може різко змінитися без явної причини.',
          en: 'My emotional state can change abruptly without an obvious reason.',
          ru: 'Мое эмоциональное состояние может резко измениться без явной причины.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_104',
        category: 'Personality',
        subCategory: {uk: 'Вразливість', en: 'Vulnerability', ru: 'Уязвимость'},
        text: {
          uk: 'Під час суперечок мені важко контролювати своє хвилювання або роздратування.',
          en: 'During arguments, I find it hard to control my worry or irritation.',
          ru: 'Во время споров мне трудно контролировать свое волнение или раздражение.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_105',
        category: 'Personality',
        subCategory: {uk: 'Сприйняття критику', en: 'Sensitivity', ru: 'Критика'},
        text: {
          uk: 'Навіть конструктивна критика може зіпсувати мені настрій на тривалий час.',
          en: 'Even constructive criticism can ruin my mood for a long time.',
          ru: 'Даже конструктивная критика может испортить мне настроение на долгое время.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_109',
        category: 'Personality',
        subCategory: {uk: 'Соціальна тривога', en: 'Self-consciousness', ru: 'Социальная тревога'},
        text: {
          uk: 'Я часто переймаюся тим, яке враження справляю на оточуючих.',
          en: 'I often worry about the impression I make on others.',
          ru: 'Я часто беспокоюсь о том, какое впечатление произвожу на окружающих.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_106',
        category: 'Personality',
        subCategory: {uk: 'Песимізм', en: 'Pessimism', ru: 'Пессимизм'},
        text: {
          uk: 'Я схильний бачити можливі ризики та невдачі частіше, ніж позитивні перспективи.',
          en: 'I tend to see potential risks and failures more often than positive prospects.',
          ru: 'Я склонен видеть возможные риски и неудачи чаще, чем положительные перспективы.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_53',
        category: 'Personality',
        subCategory: {uk: 'Соціальний дискомфорт', en: 'Social discomfort', ru: 'Дискомфорт'},
        text: {
          uk: 'Необхідність спілкуватися з новими людьми часто викликає у мене внутрішню напругу.',
          en: 'The need to interact with new people often causes internal tension for me.',
          ru: 'Необходимость общаться с новыми людьми часто вызывает у меня внутреннее напряжение.'
        },
        type: QuestionType.SCALE
      }
    ]
  }
];
