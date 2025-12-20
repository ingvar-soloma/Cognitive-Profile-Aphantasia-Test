import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Answer, LocalizedCategoryData, Language, SurveyDefinition, LocalizedScaleConfig } from './types';
import { SurveyService } from './services/SurveyService';
import { Results } from './components/Results';
import { Header } from './components/Header';
import { Intro } from './components/Intro';
import { Survey } from './components/Survey';
import { UI_TRANSLATIONS } from './translations';
// @ts-ignore - Assuming the package is available via importmap
import { decode } from '@toon-format/toon';

enum AppState {
  INTRO = 'INTRO',
  SURVEY = 'SURVEY',
  RESULTS = 'RESULTS',
}

const LOCAL_STORAGE_KEY = 'neuroprofile_survey_state';

type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.INTRO);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof navigator === 'undefined') return 'uk';
    const lang = navigator.language.toLowerCase();
    if (lang.includes('ru')) return 'ru';
    if (lang.includes('en')) return 'en';
    return 'uk';
  });
  const [theme, setTheme] = useState<Theme>(() => {
    if (globalThis.window !== undefined && globalThis.matchMedia?.('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });
  
  const [activeSurveyId, setActiveSurveyId] = useState<string>('full_aphantasia_profile'); // ID за замовчуванням
  const [currentSurvey, setCurrentSurvey] = useState<SurveyDefinition | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>('');
  
  // Initialize User ID
  useEffect(() => {
      let storedUserId = localStorage.getItem('neuroprofile_user_id');
      if (!storedUserId) {
          storedUserId = 'user_' + Math.random().toString(36).slice(2, 11) + '_' + Date.now().toString(36);
          localStorage.setItem('neuroprofile_user_id', storedUserId);
      }
      setUserId(storedUserId);
  }, []);

  // Fetch Survey Data (Simulation of DB call)
  useEffect(() => {
    // Only fetch if we are starting the survey or if we need to preload data
    // For now, we fetch when activeSurveyId changes, but we don't block UI unless we are entering SURVEY mode
    SurveyService.getSurveyById(activeSurveyId)
      .then((data) => {
        if (data) {
          setCurrentSurvey(data);
        }
      });
  }, [activeSurveyId]);

  const handleStartSurvey = () => {
      setIsLoading(true);
      // Simulate loading delay or wait for data if not ready
      SurveyService.getSurveyById(activeSurveyId)
          .then((data) => {
              if (data) {
                  setCurrentSurvey(data);
                  setAppState(AppState.SURVEY);
              }
          })
          .finally(() => setIsLoading(false));
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle Theme Logic
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Auto-Save & Restore Logic
  useEffect(() => {
    // Check for saved state on mount
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_' + activeSurveyId);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.answers && Object.keys(parsed.answers).length > 0) {
            setAnswers(parsed.answers);
            if (parsed.currentCategoryIndex >= 0) setCurrentCategoryIndex(parsed.currentCategoryIndex);
            if (parsed.appState) setAppState(parsed.appState);
        }
      } catch (e) {
        console.error("Failed to restore state", e);
      }
    } else {
        // Reset if no saved state for this survey
        setAnswers({});
        setCurrentCategoryIndex(0);
        setAppState(AppState.INTRO);
    }
  }, [activeSurveyId]);

  useEffect(() => {
    // Save state whenever it changes
    if (Object.keys(answers).length > 0) {
        const stateToSave = {
            answers,
            currentCategoryIndex,
            appState,
            userId, 
            surveyId: activeSurveyId,
            updatedAt: new Date().toISOString()
        };
        localStorage.setItem(LOCAL_STORAGE_KEY + '_' + activeSurveyId, JSON.stringify(stateToSave));
    }
  }, [answers, currentCategoryIndex, appState, activeSurveyId, userId]);

  useEffect(() => {
      // Warn on exit if in survey
      const handleBeforeUnload = (e: BeforeUnloadEvent) => {
          if (appState === AppState.SURVEY && Object.keys(answers).length > 0) {
              e.preventDefault();
          }
      };

      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [appState, answers]);

  // Derive Localized Data
  const localizedCategories: LocalizedCategoryData[] = useMemo(() => {
    if (!currentSurvey) return [];

    const localizeQuestion = (q: any) => ({
        id: q.id,
        category: q.category,
        type: q.type,
        text: q.text[language],
        placeholder: q.placeholder ? q.placeholder[language] : undefined,
        subCategory: q.subCategory ? q.subCategory[language] : undefined,
        hint: q.hint ? q.hint[language] : undefined,
      options: q.options?.map((opt: any) => ({
          value: opt.value,
          label: opt.label[language]
        }))
    });

    const localizeCategory = (cat: any) => ({
      id: cat.id,
      title: cat.title[language],
      description: cat.description[language],
      questions: cat.questions.map(localizeQuestion)
    });

    return currentSurvey.categories.map(localizeCategory);
  }, [language, currentSurvey]);

  const localizedScaleConfig: LocalizedScaleConfig | undefined = useMemo(() => {
    if (!currentSurvey || !currentSurvey.scaleConfig) return undefined;
    
    const labels: Record<number, string> = {};
    Object.entries(currentSurvey.scaleConfig.labels).forEach(([key, val]) => {
        labels[Number(key)] = val[language];
    });

    return {
        min: currentSurvey.scaleConfig.min,
        max: currentSurvey.scaleConfig.max,
        labels
    };
  }, [language, currentSurvey]);

  const ui = UI_TRANSLATIONS[language];
  const activeCategory = localizedCategories[currentCategoryIndex];
  
  // Progress Calculation
  const totalQuestions = useMemo(() => currentSurvey ? currentSurvey.categories.reduce((acc, cat) => acc + cat.questions.length, 0) : 0, [currentSurvey]);
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  const handleAnswerChange = (questionId: string, value: string | number | null, note: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: { questionId, value, note },
    }));
  };

  const nextCategory = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (currentCategoryIndex < localizedCategories.length - 1) {
      setCurrentCategoryIndex((prev) => prev + 1);
    } else {
      setAppState(AppState.RESULTS);
    }
  };

  const prevCategory = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex((prev) => prev - 1);
    } else {
      setAppState(AppState.INTRO);
    }
  };

  const resetSurvey = () => {
    setAnswers({});
    setCurrentCategoryIndex(0);
    setAppState(AppState.INTRO);
    localStorage.removeItem(LOCAL_STORAGE_KEY + '_' + activeSurveyId);
  };

  const downloadProgress = () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(answers, null, 2));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", `neuroprofile_${userId}_${activeSurveyId}_${new Date().toISOString().slice(0,10)}.json`);
      document.body.appendChild(downloadAnchorNode); // required for firefox
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
              const content = event.target?.result as string;
              if (!content) return;

              let loadedAnswers = null;

              // Attempt to parse based on extension or content
              const isToon = file.name.endsWith('.toon');

              try {
                  if (isToon) {
                     loadedAnswers = decode(content);
                  } else {
                     // Try JSON
                     loadedAnswers = JSON.parse(content);
                  }

                  if (loadedAnswers && typeof loadedAnswers === 'object') {
                      setAnswers(loadedAnswers);
                      setAppState(AppState.SURVEY);
                      setCurrentCategoryIndex(0);
                      // Clear input value to allow re-uploading the same file if needed
                      if (fileInputRef.current) {
                          fileInputRef.current.value = '';
                      }
                  }
              } catch (error) {
                  console.error("Error parsing file", error);
                // Fallback: if JSON parse failed, maybe it was a TOON file named incorrectly or vice versa
                  try {
                      if (!isToon) {
                          loadedAnswers = decode(content);
                          if (loadedAnswers) {
                               setAnswers(loadedAnswers);
                               setAppState(AppState.SURVEY);
                               setCurrentCategoryIndex(0);
                               return;
                          }
                      }
                  } catch(e) {
                    alert("Error reading file");
                  }

              }
          };
          reader.readAsText(file);
      }
  };

  const triggerFileUpload = () => {
      fileInputRef.current?.click();
  };

  if (appState === AppState.RESULTS) {
    return <Results answers={answers} onReset={resetSurvey} ui={ui} lang={language} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 pb-20 font-sans transition-colors duration-300">
      <Header 
        appState={appState}
        ui={ui}
        language={language}
        theme={theme}
        progressPercent={progressPercent}
        onSetLanguage={setLanguage}
        onToggleTheme={toggleTheme}
        onDownloadProgress={downloadProgress}
        onGoToIntro={() => setAppState(AppState.INTRO)}
      />

      <main className="max-w-3xl mx-auto p-4 md:p-8">
        {appState === AppState.INTRO ? (
          <Intro 
            ui={ui}
            language={language}
            activeSurveyId={activeSurveyId}
            onSetActiveSurveyId={setActiveSurveyId}
            onStartSurvey={handleStartSurvey}
            onTriggerFileUpload={triggerFileUpload}
            fileInputRef={fileInputRef}
            onFileUpload={handleFileUpload}
            isLoading={isLoading}
          />
        ) : (
          <Survey 
            ui={ui}
            currentCategoryIndex={currentCategoryIndex}
            totalCategories={localizedCategories.length}
            activeCategory={activeCategory}
            answers={answers}
            onAnswerChange={handleAnswerChange}
            onPrevCategory={prevCategory}
            onNextCategory={nextCategory}
            isLoading={isLoading}
            scaleConfig={localizedScaleConfig}
          />
        )}
      </main>
    </div>
  );
};

export default App;