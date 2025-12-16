import React, { useState, useMemo, useRef, useEffect } from 'react';
import { SURVEY_DATA } from './constants';
import { Answer, LocalizedCategoryData, Language } from './types';
import { QuestionCard } from './components/QuestionCard';
import { Results } from './components/Results';
import { UI_TRANSLATIONS } from './translations';
import { BrainCircuit, ChevronRight, ChevronLeft, CheckCircle, Upload, Moon, Sun, Download } from 'lucide-react';
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
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });
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
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
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
    }
  }, []);

  useEffect(() => {
    // Save state whenever it changes
    if (Object.keys(answers).length > 0) {
        const stateToSave = {
            answers,
            currentCategoryIndex,
            appState
        };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
    }
  }, [answers, currentCategoryIndex, appState]);

  useEffect(() => {
      // Warn on exit if in survey
      const handleBeforeUnload = (e: BeforeUnloadEvent) => {
          if (appState === AppState.SURVEY && Object.keys(answers).length > 0) {
              e.preventDefault();
              e.returnValue = ''; // Required for Chrome
          }
      };

      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [appState, answers]);

  // Derive Localized Data
  const localizedCategories: LocalizedCategoryData[] = useMemo(() => {
    return SURVEY_DATA.map(cat => ({
      id: cat.id,
      title: cat.title[language],
      description: cat.description[language],
      questions: cat.questions.map(q => ({
        id: q.id,
        category: q.category,
        type: q.type,
        text: q.text[language],
        placeholder: q.placeholder ? q.placeholder[language] : undefined,
        subCategory: q.subCategory ? q.subCategory[language] : undefined,
        hint: q.hint ? q.hint[language] : undefined,
        options: q.options?.map(opt => ({
          value: opt.value,
          label: opt.label[language]
        }))
      }))
    }));
  }, [language]);

  const ui = UI_TRANSLATIONS[language];
  const activeCategory = localizedCategories[currentCategoryIndex];
  
  // Progress Calculation
  const totalQuestions = useMemo(() => SURVEY_DATA.reduce((acc, cat) => acc + cat.questions.length, 0), []);
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
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  const downloadProgress = () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(answers, null, 2));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", `neuroprofile_answers_${new Date().toISOString().slice(0,10)}.json`);
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
                  } catch(e) {}
                  
                  alert("Не вдалося прочитати файл. (Error reading file)");
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
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm sticky top-0 z-10 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 cursor-pointer" onClick={() => setAppState(AppState.INTRO)}>
            <BrainCircuit className="w-8 h-8" />
            <span className="font-bold text-lg hidden sm:block">NeuroProfile</span>
          </div>
          
          <div className="flex items-center gap-4">
             {/* Theme Switcher */}
             <button
               onClick={toggleTheme}
               className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
               aria-label="Toggle Theme"
             >
               {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
             </button>

             {/* Language Switcher */}
             <div className="flex bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
                {(['uk', 'en', 'ru'] as Language[]).map(lang => (
                    <button
                        key={lang}
                        onClick={() => setLanguage(lang)}
                        className={`px-3 py-1 rounded-md text-sm font-bold transition-all ${
                            language === lang 
                            ? 'bg-white dark:bg-slate-600 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                        }`}
                    >
                        {lang.toUpperCase()}
                    </button>
                ))}
             </div>


            
            {appState === AppState.SURVEY && (
                <button
                    onClick={downloadProgress}
                    className="ml-4 p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-900 transition-colors"
                    title={ui.resume} // Reusing 'resume' or we could add 'save' key, but for now reuse or just icon
                    aria-label="Save Progress"
                >
                    <Download className="w-5 h-5" />
                </button>
            )}

            {appState === AppState.SURVEY && (
                <div className="hidden sm:flex flex-col w-32 items-end ml-4">
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{progressPercent}% {ui.progress}</span>
                    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden mt-1">
                        <div 
                            className="h-full bg-indigo-500 transition-all duration-500 ease-out"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-4 md:p-8">
        {appState === AppState.INTRO ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 animate-fade-in-up">
            <div className="bg-indigo-100 dark:bg-indigo-900/30 p-6 rounded-full text-indigo-600 dark:text-indigo-400 mb-4">
                <BrainCircuit className="w-16 h-16" />
            </div>
            <div>
                <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
                {ui.title}
                </h1>
                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                {ui.description}
                </p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 max-w-lg w-full text-left space-y-3">
                <h3 className="font-bold text-slate-800 dark:text-slate-200 border-b dark:border-slate-700 pb-2 mb-2">{ui.howToRateTitle}</h3>
                <ul className="text-sm space-y-2 text-slate-600 dark:text-slate-400">
                    <li className="flex gap-2"><span className="font-bold text-indigo-600 dark:text-indigo-400 w-4">1</span> {ui.scale1}</li>
                    <li className="flex gap-2"><span className="font-bold text-indigo-600 dark:text-indigo-400 w-4">2</span> {ui.scale2}</li>
                    <li className="flex gap-2"><span className="font-bold text-indigo-600 dark:text-indigo-400 w-4">3</span> {ui.scale3}</li>
                    <li className="flex gap-2"><span className="font-bold text-indigo-600 dark:text-indigo-400 w-4">4</span> {ui.scale4}</li>
                    <li className="flex gap-2"><span className="font-bold text-indigo-600 dark:text-indigo-400 w-4">5</span> {ui.scale5}</li>
                </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <button
                onClick={() => setAppState(AppState.SURVEY)}
                className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-indigo-600 px-8 font-medium text-white transition-all duration-300 hover:bg-indigo-700 shadow-lg hover:shadow-indigo-500/30 w-full sm:w-auto"
                >
                    <span className="mr-2">{ui.start}</span>
                    <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
                
                <button
                    onClick={triggerFileUpload}
                    className="flex items-center justify-center gap-2 h-12 px-6 rounded-md bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm w-full sm:w-auto"
                >
                    <Upload className="w-4 h-4" />
                    {ui.resume}
                </button>
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept=".json,.toon" 
                    onChange={handleFileUpload} 
                />
            </div>
            
            <p className="text-xs text-slate-400 dark:text-slate-500">Supports Export/Import in JSON & TOON</p>
          </div>
        ) : (
          <div className="animate-fade-in">
            {/* Category Header */}
            <div className="mb-8">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider text-sm mb-1 block">{ui.part} {currentCategoryIndex + 1} {ui.of} {localizedCategories.length}</span>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{activeCategory.title}</h2>
              <p className="text-slate-600 dark:text-slate-300 text-lg">{activeCategory.description}</p>
            </div>

            {/* Questions List */}
            <div className="space-y-2">
              {activeCategory.questions.map((q) => (
                <QuestionCard
                  key={q.id}
                  question={q}
                  answer={answers[q.id]}
                  onAnswerChange={(val, note) => handleAnswerChange(q.id, val, note)}
                  ui={ui}
                />
              ))}
            </div>

            {/* Navigation Footer */}
            <div className="flex items-center justify-between pt-8 mt-8 border-t border-slate-200 dark:border-slate-700">
                <button
                    onClick={prevCategory}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                        currentCategoryIndex === 0 
                        ? 'text-slate-400 dark:text-slate-600 cursor-not-allowed' 
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                    disabled={currentCategoryIndex === 0}
                >
                    <ChevronLeft className="w-5 h-5" />
                    {ui.back}
                </button>

                <button
                    onClick={nextCategory}
                    className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 shadow-lg shadow-indigo-200 dark:shadow-none transition-all hover:translate-y-[-1px]"
                >
                    {currentCategoryIndex === localizedCategories.length - 1 ? ui.finish : ui.next}
                    {currentCategoryIndex === localizedCategories.length - 1 ? <CheckCircle className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;