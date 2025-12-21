import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Answer, LocalizedCategoryData, Language, SurveyDefinition, LocalizedScaleConfig, Profile, QuestionType } from './types';
import { SurveyService } from './services/SurveyService';
import { Results } from './components/Results';
import { Header } from './components/Header';
import { Intro } from './components/Intro';
import { Survey } from './components/Survey';
import { ProfileManager } from './components/ProfileManager';
import { ImportManager } from './components/ImportManager';
import { UI_TRANSLATIONS } from './translations';
import { AVAILABLE_SURVEYS } from './constants';
import { ProfileService } from './services/ProfileService';
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
  
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [activeProfileId, setActiveProfileId] = useState<string | null>(null);
  
  const [importingAnswers, setImportingAnswers] = useState<Record<string, Answer> | null>(null);
  
  // Initialize
  useEffect(() => {
      let storedUserId = localStorage.getItem('neuroprofile_user_id');
      if (!storedUserId) {
          storedUserId = 'user_' + Math.random().toString(36).slice(2, 11) + '_' + Date.now().toString(36);
          localStorage.setItem('neuroprofile_user_id', storedUserId);
      }

      // Load profiles
      const loadedProfiles = ProfileService.getProfiles();
      setProfiles(loadedProfiles);
      
      const storedProfileId = localStorage.getItem('neuroprofile_active_profile_id');
      if (storedProfileId && loadedProfiles.some(p => p.id === storedProfileId)) {
          setActiveProfileId(storedProfileId);
      } else if (loadedProfiles.length > 0) {
          setActiveProfileId(loadedProfiles[0].id);
      }
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

  // Load answers from active profile
  useEffect(() => {
     if (activeProfileId) {
         const profile = profiles.find(p => p.id === activeProfileId);
         if (profile) {
             setAnswers(profile.answers);
             localStorage.setItem('neuroprofile_active_profile_id', activeProfileId);
         }
     }
  }, [activeProfileId]);

  useEffect(() => {
    // Save state whenever it changes
    if (activeProfileId && Object.keys(answers).length > 0) {
        ProfileService.updateProfile(activeProfileId, answers);
    }
  }, [answers, activeProfileId]);

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
  const activeProfile = useMemo(() => profiles.find(p => p.id === activeProfileId), [profiles, activeProfileId]);

  const isQuestionAnswered = (q: any, ans: Answer | undefined) => {
    if (!ans) return false;
    if (q.type === QuestionType.SCALE) return typeof ans.value === 'number';
    if (q.type === QuestionType.CHOICE) return typeof ans.value === 'string' && ans.value !== '';
    if (q.type === QuestionType.TEXT) return typeof ans.note === 'string' && ans.note.trim() !== '';
    return false;
  };

  const surveyProgress = useMemo(() => {
    const progress: Record<string, { answered: number; total: number; percent: number }> = {};
    if (!activeProfile) return progress;

    AVAILABLE_SURVEYS.forEach(survey => {
      const questions = survey.categories.flatMap(c => c.questions);
      const total = questions.length;
      const answered = questions.filter(q => isQuestionAnswered(q, activeProfile.answers[q.id])).length;
      progress[survey.id] = {
        answered,
        total,
        percent: total > 0 ? Math.round((answered / total) * 100) : 0
      };
    });
    
    return progress;
  }, [activeProfile, profiles]);

  const currentSurveyQuestions = useMemo(() => currentSurvey ? currentSurvey.categories.flatMap(c => c.questions) : [], [currentSurvey]);
  
  const totalQuestions = currentSurveyQuestions.length;
  const answeredCountInCurrentSurvey = useMemo(() => {
    return currentSurveyQuestions.filter(q => isQuestionAnswered(q, answers[q.id])).length;
  }, [currentSurveyQuestions, answers]);
  
  const progressPercent = totalQuestions > 0 ? Math.round((answeredCountInCurrentSurvey / totalQuestions) * 100) : 0;

  const handleAnswerChange = (questionId: string, value: string | number | null, note: string) => {
    setAnswers((prev) => {
      const newAnswers = {
        ...prev,
        [questionId]: { questionId, value, note },
      };
      
      // Update profile immediately
      if (activeProfileId) {
          ProfileService.updateProfile(activeProfileId, newAnswers);
          setProfiles(ProfileService.getProfiles());
      }
      
      return newAnswers;
    });
  };

  const handleCreateProfile = (name: string) => {
    const newProfile = ProfileService.createProfile(name, activeSurveyId);
    setProfiles(ProfileService.getProfiles());
    setActiveProfileId(newProfile.id);
  };

  const handleDeleteProfile = (id: string) => {
    ProfileService.deleteProfile(id);
    const updatedProfiles = ProfileService.getProfiles();
    setProfiles(updatedProfiles);
    if (activeProfileId === id) {
        setActiveProfileId(updatedProfiles.length > 0 ? updatedProfiles[0].id : null);
    }
  };

  const handleSelectProfile = (id: string) => {
    setActiveProfileId(id);
  };

  const handleRenameProfile = (id: string, newName: string) => {
    ProfileService.renameProfile(id, newName);
    setProfiles(ProfileService.getProfiles());
  };

  const handleRetake = () => {
    if (activeProfile) {
      const baseName = activeProfile.name.split(' (Retake')[0];
      const retakes = profiles.filter(p => p.name.startsWith(baseName)).length;
      const newName = `${baseName} (Retake ${retakes})`;
      const newProfile = ProfileService.createProfile(newName, activeSurveyId);
      setProfiles(ProfileService.getProfiles());
      setActiveProfileId(newProfile.id);
      setAppState(AppState.INTRO);
    }
  };

  const nextCategory = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (currentCategoryIndex < localizedCategories.length - 1) {
      setCurrentCategoryIndex((prev) => prev + 1);
    } else {
      setAppState(AppState.RESULTS);
      if (activeProfileId) {
          ProfileService.updateProfile(activeProfileId, answers);
          setProfiles(ProfileService.getProfiles());
      }
    }
  };

  const handleApplyImport = (profileId: string | null, loadedAnswers: Record<string, Answer>) => {
    let targetId = profileId;
    
    if (!profileId) {
      // Create new profile
      const newProfile = ProfileService.createProfile(ui.importedProfile, activeSurveyId);
      targetId = newProfile.id;
    }

    if (targetId) {
      ProfileService.updateProfile(targetId, loadedAnswers);
      setProfiles(ProfileService.getProfiles());
      if (targetId === activeProfileId) {
        setAnswers(loadedAnswers);
      } else {
        setActiveProfileId(targetId);
        setAnswers(loadedAnswers);
      }
    }
    
    setImportingAnswers(null);
    setAppState(AppState.SURVEY);
    setCurrentCategoryIndex(0);
  };

  const prevCategory = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex((prev) => prev - 1);
    } else {
      setAppState(AppState.INTRO);
    }
  };

  const downloadProgress = () => {
      const profileName = activeProfile?.name || 'anonymous';
      const typeLabel = ProfileService.getProfileTypeLabel(activeProfile?.type, language) || 'unknown';
      const filename = `${profileName}_${typeLabel}_${activeSurveyId}_${new Date().toISOString().slice(0,10)}.json`;

      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(answers, null, 2));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", filename);
      document.body.appendChild(downloadAnchorNode); 
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
                      setImportingAnswers(loadedAnswers);
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
                               setImportingAnswers(loadedAnswers);
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
    const profileName = activeProfile?.name || 'anonymous';
    const typeLabel = ProfileService.getProfileTypeLabel(activeProfile?.type, language) || 'unknown';
    const filenamePrefix = `${profileName}_${typeLabel}`;

    return <Results 
      answers={answers} 
      onReset={handleRetake} 
      onGoHome={() => setAppState(AppState.INTRO)}
      ui={ui} 
      lang={language} 
      filenamePrefix={filenamePrefix} 
    />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 pb-20 font-sans transition-colors duration-300">
      <Header 
        appState={appState}
        ui={ui}
        language={language}
        theme={theme}
        progressPercent={progressPercent}
        activeProfileName={activeProfile?.name}
        onSetLanguage={setLanguage}
        onToggleTheme={toggleTheme}
        onDownloadProgress={downloadProgress}
        onGoToIntro={() => setAppState(AppState.INTRO)}
      />

      <main className="max-w-3xl mx-auto p-4 md:p-8">
        {appState === AppState.INTRO ? (
          <>
            <ProfileManager 
              profiles={profiles}
              activeProfileId={activeProfileId}
              onSelect={handleSelectProfile}
              onCreate={handleCreateProfile}
              onDelete={handleDeleteProfile}
              onRename={handleRenameProfile}
              ui={ui}
              lang={language}
            />
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
              surveyProgress={surveyProgress}
            />
          </>
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
            isQuestionAnswered={isQuestionAnswered}
            showUnansweredIndicators={true}
          />
        )}
      </main>

      {importingAnswers && (
        <ImportManager 
          profiles={profiles}
          newAnswers={importingAnswers}
          onImport={handleApplyImport}
          onCancel={() => setImportingAnswers(null)}
          ui={ui}
          lang={language}
        />
      )}
    </div>
  );
};

export default App;