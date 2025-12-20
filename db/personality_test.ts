import {CategoryData, QuestionType} from '../types';

export const PERSONALITY_CATEGORIES: CategoryData[] = [
  {
    id: 'mbti_ei',
    title: {
      uk: 'Екстраверсія (E) — Інтроверсія (I)',
      en: 'Extraversion (E) — Introversion (I)',
      ru: 'Экстраверсия (E) — Интроверсия (I)'
    },
    description: {
      uk: 'Оцініть свій спосіб мислення та взаємодії зі світом.',
      en: 'Evaluate your way of thinking and interacting with the world.',
      ru: 'Оцените свой способ мышления и взаимодействия с миром.'
    },
    questions: [
      {
        id: 'p_02',
        category: 'Personality',
        subCategory: {uk: 'E/I', en: 'E/I', ru: 'E/I'},
        text: {
          uk: 'Я почуваюся комфортно та впевнено в соціальних ситуаціях, навіть із людьми, яких погано знаю.',
          en: 'I feel comfortable and confident in social situations, even with people I don\'t know well.',
          ru: 'Я чувствую себя комфортно и уверенно в социальных ситуациях, даже с людьми, которых плохо знаю.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_06',
        category: 'Personality',
        subCategory: {uk: 'E/I', en: 'E/I', ru: 'E/I'},
        text: {
          uk: 'Мені подобаються короткі бесіди та часті контакти з колегами протягом робочого дня.',
          en: 'I enjoy quick chats and frequent check-ins with colleagues throughout the workday.',
          ru: 'Мне нравятся короткие беседы и частые контакты с коллегами в течение рабочего дня.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_09',
        category: 'Personality',
        subCategory: {uk: 'E/I', en: 'E/I', ru: 'E/I'},
        text: {
          uk: 'Я відчуваю піднесення, коли можу логічно вирішувати складні проблеми.',
          en: 'I feel invigorated when I can solve complex problems logically.',
          ru: 'Я чувствую воодушевление, когда могу логически решать сложные проблемы.'
        },
        type: QuestionType.SCALE
      },
      {
      id: 'p_091',
      category: 'Personality',
      subCategory: {uk: 'Соціальність', en: 'Social', ru: 'Социальность'},
      text: {
        uk: 'Я почуваюся найбільш розслаблено, коли можу насолодитися власною компанією.',
        en: 'I feel most relaxed when I can enjoy my own company.',
        ru: 'Я чувствую себя наиболее расслабленно, когда могу насладиться собственной компанией.'
      },
      type: QuestionType.SCALE
    },
      {
        id: 'p_15',
        category: 'Personality',
        subCategory: {uk: 'E/I', en: 'E/I', ru: 'E/I'},
        text: {
          uk: 'У компаніях я зазвичай чекаю, поки інші почнуть розмову першими.',
        en: 'I usually wait for others to initiate conversations in social settings.',
        ru: 'В компаниях я обычно жду, пока другие начнут разговор первыми.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_25',
        category: 'Personality',
        subCategory: {uk: 'E/I', en: 'E/I', ru: 'E/I'},
        text: {
          uk: 'Мені подобається часто спілкуватися з новими людьми.',
          en: 'I enjoy engaging with new people frequently.',
          ru: 'Мне нравится часто общаться с новыми людьми.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_36',
        category: 'Personality',
        subCategory: {uk: 'E/I', en: 'E/I', ru: 'E/I'},
        text: {
        uk: 'Я часто почуваюся виснаженим після спілкування і потребує часу наодинці, щоб відновити сили.',
        en: 'I often feel drained after socializing and need time alone to recharge.',
        ru: 'Я часто чувствую себя истощенным после общения и нуждаюсь во времени наедине, чтобы восстановить силы.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_44',
        category: 'Personality',
        subCategory: {uk: 'E/I', en: 'E/I', ru: 'E/I'},
        text: {
          uk: 'Я найкраще працюю в середовищі, де можу працювати тихо та незалежно.',
        en: 'I excel in environments where I can work quietly and independently.',
        ru: 'Я лучше всего работаю в среде, где могу работать тихо и независимо.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_53',
        category: 'Personality',
        subCategory: {uk: 'E/I', en: 'E/I', ru: 'E/I'},
        text: {
          uk: 'Знайомство з новими людьми часто викликає у мене тривогу або стрес.',
        en: 'Meeting new people often makes me feel anxious or stressed.',
        ru: 'Знакомство с новыми людьми часто вызывает у меня тревогу или стресс.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_60',
        category: 'Personality',
        subCategory: {uk: 'E/I', en: 'E/I', ru: 'E/I'},
        text: {
          uk: 'У розмові я швидко відповідаю і насолоджуюся динамічним обміном думками.',
        en: 'In conversations, I\'m quick to respond and enjoy rapid exchanges.',
        ru: 'В разговоре я быстро отвечаю и наслаждаюсь динамичным обменом мнениями.'
        },
        type: QuestionType.SCALE
      }
    ]
  },
  {
    id: 'mbti_sn',
    title: {
      uk: 'Сенсорика (S) — Інтуїція (N)',
      en: 'Sensing (S) — Intuition (N)',
      ru: 'Сенсорика (S) — Интуиция (N)'
    },
    description: {
      uk: 'Як ви збираєте інформацію: через конкретні факти чи через ідеї та можливості.',
      en: 'How you gather information: through concrete facts or ideas and possibilities.',
      ru: 'Как вы собираете информацию: через конкретные факты или через идеи и возможности.'
    },
    questions: [
      {
        id: 'p_14',
        category: 'Personality',
        subCategory: {uk: 'S/N', en: 'S/N', ru: 'S/N'},
        text: {
        uk: 'Мені подобається ризикувати та досліджувати незвідані сфери для пошуку нових рішень.',
        en: 'I enjoy taking chances and exploring uncharted territories to discover new solutions.',
        ru: 'Мне нравится рисковать и исследовать неизведанные сферы для поиска новых решений.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_16',
        category: 'Personality',
        subCategory: {uk: 'S/N', en: 'S/N', ru: 'S/N'},
        text: {
          uk: 'Я схильний дотримуватися перевірених методів і надійних рутинних справ.',
          en: 'I tend to stick to proven methods and reliable routines.',
        ru: 'Я склонен придерживаться проверенных методов и надежных рутинных дел.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_29',
        category: 'Personality',
        subCategory: {uk: 'S/N', en: 'S/N', ru: 'S/N'},
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
        subCategory: {uk: 'S/N', en: 'S/N', ru: 'S/N'},
        text: {
          uk: 'Вирішуючи проблеми, я спочатку розглядаю існуючі умови та обмеження.',
        en: 'When solving problems, I start by considering the existing conditions and constraints.',
        ru: 'Решая проблемы, я сначала рассматриваю существующие условия и ограничения.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_32',
        category: 'Personality',
        subCategory: {uk: 'S/N', en: 'S/N', ru: 'S/N'},
        text: {
          uk: 'Мене захоплюють складні, детальні та інноваційні ідеї.',
          en: 'I\'m fascinated by complex, detailed and innovative ideas.',
        ru: 'Меня восхищают сложные, детальные и инновационные идеи.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_46',
        category: 'Personality',
        subCategory: {uk: 'S/N', en: 'S/N', ru: 'S/N'},
        text: {
          uk: 'Мені подобається знаходити глибші сенси в інформації.',
          en: 'I enjoy finding deeper meanings in information.',
          ru: 'Мне нравится находить глубокие смыслы в информации.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_48',
        category: 'Personality',
        subCategory: {uk: 'S/N', en: 'S/N', ru: 'S/N'},
        text: {
          uk: 'Я ціную практичність більше, ніж експериментальні ідеї.',
          en: 'I value practicality over experimental ideas.',
          ru: 'Я ценю практичность выше экспериментальных идей.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_55',
        category: 'Personality',
        subCategory: {uk: 'S/N', en: 'S/N', ru: 'S/N'},
        text: {
          uk: 'Вивчаючи щось нове, я люблю починати з теорії та загальних концепцій.',
        en: 'When learning something new, I like to start with the theory and general concepts.',
        ru: 'Изучая что-то новое, я люблю начинать с теории и общих концепций.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_58',
        category: 'Personality',
        subCategory: {uk: 'S/N', en: 'S/N', ru: 'S/N'},
        text: {
          uk: 'Я часто пояснюю свої ідеї за допомогою метафор або гіпотез.',
          en: 'I often explain my ideas using metaphors or hypothetical scenarios.',
        ru: 'Я часто объясняю свои идеи с помощью метафор или гипотетез.'
        },
        type: QuestionType.SCALE
      }
    ]
  },
  {
    id: 'mbti_tf',
    title: {
      uk: 'Логіка (T) — Етика/Почуття (F)',
      en: 'Thinking (T) — Feeling (F)',
      ru: 'Логика (T) — Этика/Чувства (F)'
    },
    description: {
      uk: 'Як ви приймаєте рішення: об\'єктивно та логічно чи базуючись на цінностях та почуттях.',
      en: 'How you make decisions: objectively and logically or based on values and feelings.',
      ru: 'Как вы принимаете решения: объективно и логично или основываясь на ценностях и чувствах.'
    },
    questions: [
      {
        id: 'p_07',
        category: 'Personality',
        subCategory: {uk: 'T/F', en: 'T/F', ru: 'T/F'},
        text: {
          uk: 'Я відчуваю піднесення, коли можу логічно вирішувати складні проблеми.',
          en: 'I feel invigorated when I can solve complex problems logically.',
          ru: 'Я чувствую воодушевление при логическом решении задач.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_08',
        category: 'Personality',
        subCategory: {uk: 'T/F', en: 'T/F', ru: 'T/F'},
        text: {
          uk: 'Мені важко залишатися осторонь, коли інші переживають емоційне потрясіння.',
        en: 'I find it challenging to remain detached when others are experiencing emotional distress.',
        ru: 'Мне трудно оставаться в стороне, когда другие переживают эмоциональное потрясение.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_11',
        category: 'Personality',
        subCategory: {uk: 'T/F', en: 'T/F', ru: 'T/F'},
        text: {
          uk: 'Я відчуваю тривогу, коли не погоджуюся з людьми.',
          en: 'I get anxious when I disagree with people.',
          ru: 'Я чувствую тревогу, когда не соглашаюсь с людьми.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_13',
        category: 'Personality',
        subCategory: {uk: 'T/F', en: 'T/F', ru: 'T/F'},
        text: {
          uk: 'Я схильний уникати суперечок з іншими, навіть якщо маю іншу думку.',
        en: 'I tend to avoid arguing with others, even when I have a different opinion.',
        ru: 'Я склонен избегать споров с другими, даже если у меня другое мнение.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_18',
        category: 'Personality',
        subCategory: {uk: 'T/F', en: 'T/F', ru: 'T/F'},
        text: {
          uk: 'Я вважаю цінним слухати інших і визнавати їхні почуття.',
        en: 'I find value in listening and validating the feelings of others.',
          ru: 'Я считаю ценным слушать других и признавать их чувства.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_34',
        category: 'Personality',
        subCategory: {uk: 'T/F', en: 'T/F', ru: 'T/F'},
        text: {
        uk: 'Для мене важливіше бути правим, ніж подобатися іншим через те, що я кажу.',
        en: 'I prefer being correct over being liked for what I say.',
        ru: 'Для меня важнее быть правым, чем нравиться другим из-за того, что я говорю.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_38',
        category: 'Personality',
        subCategory: {uk: 'T/F', en: 'T/F', ru: 'T/F'},
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
        subCategory: {uk: 'T/F', en: 'T/F', ru: 'T/F'},
        text: {
        uk: 'Я приймаю рішення на основі того, що є логічним, а не того, що здається правильним за відчуттями.',
        en: 'I make decisions based on what makes sense rather than what feels right.',
        ru: 'Я принимаю решения на основе того, что логично, а не того, что кажется правильным по ощущениям.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_52',
        category: 'Personality',
        subCategory: {uk: 'T/F', en: 'T/F', ru: 'T/F'},
        text: {
          uk: 'Я віддаю перевагу ефективності, навіть якщо це може зачепити чиїсь почуття.',
          en: 'I favor effectiveness even if it could hurts someone\'s feelings.',
          ru: 'Я предпочитаю эффективность, даже если это может задеть чьи-то чувства.'
        },
        type: QuestionType.SCALE
      }
    ]
  },
  {
    id: 'mbti_jp',
    title: {
      uk: 'Раціональність (J) — Ірраціональність (P)',
      en: 'Judging (J) — Perceiving (P)',
      ru: 'Рациональность (J) — Иррациональность (P)'
    },
    description: {
      uk: 'Як ви організовуєте свій час: через планування та структуру чи через гнучкість та спонтанність.',
      en: 'How you organize your time: through planning and structure or flexibility and spontaneity.',
      ru: 'Как вы организовываете свое время: через планирование и структуру или гибкость и спонтанность.'
    },
    questions: [
      {
        id: 'p_01',
        category: 'Personality',
        subCategory: {uk: 'J/P', en: 'J/P', ru: 'J/P'},
        text: {
          uk: 'Я найкраще працюю під тиском і часто виконую завдання в останню хвилину.',
        en: 'I work best under pressure and often complete tasks at the last minute.',
        ru: 'Я лучше всего работаю под давлением и часто выполняю задачи в последнюю минуту.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_03',
        category: 'Personality',
        subCategory: {uk: 'J/P', en: 'J/P', ru: 'J/P'},
        text: {
        uk: 'Я знаходжу натхнення та креативність у відкритих підходах, а не в детальному плануванні.',
        en: 'I find inspiration and creativity in open-ended approaches rather than a detailed plan.',
        ru: 'Я нахожу вдохновение и креативность в открытых подходах, а не в детальном планировании.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_05',
        category: 'Personality',
        subCategory: {uk: 'J/P', en: 'J/P', ru: 'J/P'},
        text: {
        uk: 'Я отримую задоволення від досягнення поставлених цілей шляхом систематичного планування.',
        en: 'I find joy in achieving set goals through systematic planning.',
        ru: 'Я получаю удовольствие от достижения поставленных целей путем систематического планирования.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_24',
        category: 'Personality',
        subCategory: {uk: 'J/P', en: 'J/P', ru: 'J/P'},
        text: {
        uk: 'Я почуваюся спокійно, коли все заплановано і знаходиться на своїх місцях.',
        en: 'I feel calm when everything is scheduled and in its place.',
        ru: 'Я чувствую себя спокойно, когда все запланировано и находится на своих местах.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_28',
        category: 'Personality',
        subCategory: {uk: 'J/P', en: 'J/P', ru: 'J/P'},
        text: {
          uk: 'Зазвичай я завершую завдання задовго до дедлайну.',
          en: 'I usually complete tasks well before deadlines.',
          ru: 'Обычно я завершаю задачи задолго до дедлайна.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_37',
        category: 'Personality',
        subCategory: {uk: 'J/P', en: 'J/P', ru: 'J/P'},
        text: {
          uk: 'Я вважаю, що несподівані зміни роблять дні цікавішими.',
          en: 'I think unexpected changes make my days interesting.',
          ru: 'Я считаю, что неожиданные изменения делают дни интереснее.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_40',
        category: 'Personality',
        subCategory: {uk: 'J/P', en: 'J/P', ru: 'J/P'},
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
        subCategory: {uk: 'J/P', en: 'J/P', ru: 'J/P'},
        text: {
          uk: 'Зазвичай я складаю плани на кілька днів наперед.',
          en: 'I usually make plans days in advance.',
          ru: 'Обычно я составляю планы на несколько дней вперед.'
        },
        type: QuestionType.SCALE
      },
      {
        id: 'p_57',
        category: 'Personality',
        subCategory: {uk: 'J/P', en: 'J/P', ru: 'J/P'},
        text: {
          uk: 'Я вважаю, що надмірне планування позбавляє життя задоволення.',
          en: 'I find that too much planning takes the fun out of life.',
          ru: 'Я считаю, что избыточное планирование лишает жизнь удовольствия.'
        },
        type: QuestionType.SCALE
      }
    ]
  },
  {
    id: '?',
    title: {
      uk: '?',
      en: '?',
      ru: '?'
    },
    description: {
      uk: '?',
      en: '?',
      ru: '?'
    },
    questions: [
    {
      id: 'p_41',
      category: 'Personality',
      subCategory: {uk: 'Креативність', en: 'Creativity', ru: 'Креативность'},
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
      subCategory: {uk: 'Емпатія', en: 'Empathy', ru: 'Эмпатия'},
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
      subCategory: {uk: 'Емпатія', en: 'Empathy', ru: 'Эмпатия'},
      text: {
        uk: 'Я легко співпереживаю емоціям інших людей.',
        en: 'I empathize easily with others\' emotions.',
        ru: 'Я легко сопереживаю эмоциям других людей.'
      },
      type: QuestionType.SCALE
    },
    {
      id: 'p_45',
      category: 'Personality',
      subCategory: {uk: 'Соціальність', en: 'Social', ru: 'Социальность'},
      text: {
        uk: 'На соціальних заходах я волію залишатися в тіні.',
        en: 'I prefer to stay in the background during social events.',
        ru: 'На социальных мероприятиях я предпочитаю оставаться в тени.'
      },
      type: QuestionType.SCALE
    },
    {
      id: 'p_47',
      category: 'Personality',
      subCategory: {uk: 'Робочий стиль', en: 'Work style', ru: 'Рабочий стиль'},
      text: {
        uk: 'Я волію працювати в творчому середовищі, а не в такому, де є чіткі інструкції та обов\'язки.',
        en: 'I prefer working in a creative environment over one with clear guidelines and responsibilities.',
        ru: 'Я предпочитаю работать в творческой среде, а не в такой, где есть четкие инструкции и обязанности.'
      },
      type: QuestionType.SCALE
    },
    {
      id: 'p_50',
      category: 'Personality',
      subCategory: {uk: 'Інтуїція', en: 'Intuition', ru: 'Интуиция'},
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
      subCategory: {uk: 'Планування', en: 'Planning', ru: 'Планирование'},
      text: {
        uk: 'Працюючи над груповим проєктом, я закликаю до встановлення чітких ролей і дедлайнів із самого початку.',
        en: 'When working on a group project, I encourage setting clear roles and deadlines from the beginning.',
        ru: 'Работая над групповым проектом, я призываю к установлению четких ролей и дедлайнов с самого начала.'
      },
      type: QuestionType.SCALE
    },
    {
      id: 'p_54',
      category: 'Personality',
      subCategory: {uk: 'Комунікація', en: 'Communication', ru: 'Коммуникация'},
      text: {
        uk: 'Під час зустрічей мені подобається відкрито обговорювати питання та обмінюватися ідеями з іншими.',
        en: 'During meetings, I like to discuss issues openly and exchange ideas with others.',
        ru: 'Во время встреч мне нравится открыто обсуждать вопросы и обмениваться идеями с другими.'
      },
      type: QuestionType.SCALE
    },
    {
      id: 'p_56',
      category: 'Personality',
      subCategory: {uk: 'Емоції', en: 'Emotions', ru: 'Эмоции'},
      text: {
        uk: 'Я схильний відкрито виражати свої емоції.',
        en: 'I tend to express my emotions openly.',
        ru: 'Я склонен открыто выражать свои эмоции.'
      },
      type: QuestionType.SCALE
    },
    {
      id: 'p_59',
      category: 'Personality',
      subCategory: {uk: 'Креативність', en: 'Creativity', ru: 'Креативность'},
      text: {
        uk: 'Я віддаю перевагу дослідженню нових можливостей і рішень, не дотримуючись суворого плану.',
        en: 'I prefer exploring new possibilities and solutions without sticking to a strict plan.',
        ru: 'Я предпочитаю исследование новых возможностей и решений, не следуя строгому плану.'
      },
      type: QuestionType.SCALE
    },
    {
      id: 'p_17',
      category: 'Personality',
      subCategory: {uk: 'Емоції', en: 'Emotions', ru: 'Эмоции'},
      text: {
        uk: 'Мені подобається ділитися своїм захопленням і щастям з іншими.',
        en: 'I enjoy sharing my excitement and happiness with others.',
        ru: 'Мне нравится делиться своим восторгом и счастьем с другими.'
      },
      type: QuestionType.SCALE
    },
    {
      id: 'p_19',
      category: 'Personality',
      subCategory: {uk: 'Підтримка', en: 'Support', ru: 'Поддержка'},
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
      subCategory: {uk: 'Креативність', en: 'Creativity', ru: 'Креативность'},
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
      subCategory: {uk: 'Кооперація', en: 'Cooperation', ru: 'Кооперация'},
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
      subCategory: {uk: 'Традиції', en: 'Tradition', ru: 'Традиции'},
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
      subCategory: {uk: 'Робочий стиль', en: 'Work style', ru: 'Рабочий стиль'},
      text: {
        uk: 'Мені подобається розділяти роботу та особисте життя.',
        en: 'I like to keep my work and personal life separate.',
        ru: 'Мне нравится разделять работу и личную жизнь.'
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
      id: 'p_27',
      category: 'Personality',
      subCategory: {uk: 'Соціальність', en: 'Social', ru: 'Социальность'},
      text: {
        uk: 'Я віддаю перевагу соціальній активності над індивідуальною.',
        en: 'I prefer social activities over individual ones.',
        ru: 'Я предпочитаю социальную активность индивидуальной.'
      },
      type: QuestionType.SCALE
    },
    {
      id: 'p_31',
      category: 'Personality',
      subCategory: {uk: 'Соціальність', en: 'Social', ru: 'Социальность'},
      text: {
        uk: 'У групових розмовах я волію слухати, а не брати на себе ініціативу.',
        en: 'I like to listen rather than take the lead in group conversations.',
        ru: 'В групповых разговорах я предпочитаю слушать, а не брать на себя инициативу.'
      },
      type: QuestionType.SCALE
    },
    {
      id: 'p_33',
      category: 'Personality',
      subCategory: {uk: 'Інтуїція', en: 'Intuition', ru: 'Интуиция'},
      text: {
        uk: 'Я ціную інноваційний проєкт, який зазнав невдачі, більше, ніж той, що став успішним завдяки дотриманню традицій.',
        en: 'I appreciate an innovative project that fails over one that succeeds by sticking to tradition.',
        ru: 'Я ценю инновационный проект, потерпевший неудачу, больше, чем тот, который стал успешным благодаря следованию традициям.'
      },
      type: QuestionType.SCALE
    },
    {
      id: 'p_35',
      category: 'Personality',
      subCategory: {uk: 'Навчання', en: 'Learning', ru: 'Обучение'},
      text: {
        uk: 'Я віддаю перевагу структурованому підходу під час вивчення чогось нового, дотримуючись чіткого плану та вказівок.',
        en: 'I prefer a structured approach when learning something new, following a clear plan and guidelines.',
        ru: 'Я предпочитаю структурированный подход при изучении чего-то нового, следуя четкому плану и указаниям.'
      },
      type: QuestionType.SCALE
    },
    {
      id: 'p_04',
      category: 'Personality',
      subCategory: {uk: 'Сприйняття', en: 'Perception', ru: 'Восприятие'},
      text: {
        uk: 'Я ціную фільми з чіткими темами та ідеями, а не ті, що залишають простір для інтерпретації.',
        en: 'I appreciate movies with clear themes and messages rather than those open to interpretation.',
        ru: 'Я ценю фильмы с четкими темами и идеями, а не те, что оставляют пространство для интерпретации.'
      },
      type: QuestionType.SCALE
    },
    {
      id: 'p_10',
      category: 'Personality',
      subCategory: {uk: 'Принципи', en: 'Principles', ru: 'Принципы'},
      text: {
        uk: 'Я вважаю, що помилки повинні мати наслідки.',
        en: 'I think mistakes should have consequences.',
        ru: 'Я считаю, что ошибки должны иметь последствия.'
      },
      type: QuestionType.SCALE
    },
    {
      id: 'p_12',
      category: 'Personality',
      subCategory: {uk: 'Робочий стиль', en: 'Work style', ru: 'Рабочий стиль'},
      text: {
        uk: 'Мені подобається адреналін і зосередженість, які з\'являються під час роботи під тиском.',
        en: 'I enjoy the adrenaline and focus that come when working under pressure.',
        ru: 'Мне нравится адреналин и сосредоточенность, которые появляются при работе под давлением.'
      },
      type: QuestionType.SCALE
    },
      {
        id: '?',
        category: 'Personality',
        subCategory: {uk: 'Робочий стиль', en: 'Work style', ru: 'Рабочий стиль'},
        text: {
          uk: 'Я отримую задоволення від досягнення поставлених цілей шляхом систематичного планування.',
          en: 'I find joy in achieving set goals through systematic planning.',
          ru: 'Я получаю удовольствие от достижения поставленных целей путем систематического планирования.'
        },
        type: QuestionType.SCALE
      },
      ]
    }
];