import React, { useState, useMemo, useRef } from 'react';
import { SURVEY_DATA } from './constants';
import { Answer, Question } from './types';
import { QuestionCard } from './components/QuestionCard';
import { Results } from './components/Results';
import { BrainCircuit, ChevronRight, ChevronLeft, CheckCircle, Upload } from 'lucide-react';

enum AppState {
  INTRO = 'INTRO',
  SURVEY = 'SURVEY',
  RESULTS = 'RESULTS',
}

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.INTRO);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeCategory = SURVEY_DATA[currentCategoryIndex];
  
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
    if (currentCategoryIndex < SURVEY_DATA.length - 1) {
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
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
              try {
                  const loadedAnswers = JSON.parse(event.target?.result as string);
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
                  console.error("Error parsing JSON", error);
                  alert("Не вдалося прочитати файл. Переконайтеся, що це правильний JSON, збережений раніше.");
              }
          };
          reader.readAsText(file);
      }
  };

  const triggerFileUpload = () => {
      fileInputRef.current?.click();
  };

  if (appState === AppState.RESULTS) {
    return <Results answers={answers} onReset={resetSurvey} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-600">
            <BrainCircuit className="w-8 h-8" />
            <span className="font-bold text-lg hidden sm:block">NeuroProfile</span>
          </div>
          {appState === AppState.SURVEY && (
            <div className="flex items-center gap-4 flex-1 justify-end max-w-md">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{progressPercent}% Завершено</span>
                <div className="w-24 sm:w-48 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-indigo-500 transition-all duration-500 ease-out"
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-4 md:p-8">
        {appState === AppState.INTRO ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 animate-fade-in-up">
            <div className="bg-indigo-100 p-6 rounded-full text-indigo-600 mb-4">
                <BrainCircuit className="w-16 h-16" />
            </div>
            <div>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                Оцінка Когнітивного Профілю
                </h1>
                <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Дізнайтеся більше про те, як працює ваша уява, пам'ять та мислення. 
                Тест допоможе виявити ознаки афантазії, гіперфантазії та визначити ваші стратегії мислення.
                </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 max-w-lg w-full text-left space-y-3">
                <h3 className="font-bold text-slate-800 border-b pb-2 mb-2">Як оцінювати (Шкала 1-5):</h3>
                <ul className="text-sm space-y-2 text-slate-600">
                    <li className="flex gap-2"><span className="font-bold text-indigo-600 w-4">1</span> Повна відсутність (Афантазія). Лише "знання".</li>
                    <li className="flex gap-2"><span className="font-bold text-indigo-600 w-4">2</span> Дуже слабко, рівень ідеї.</li>
                    <li className="flex gap-2"><span className="font-bold text-indigo-600 w-4">3</span> Нечітко, силует, відчуття.</li>
                    <li className="flex gap-2"><span className="font-bold text-indigo-600 w-4">4</span> Досить чітко (як сон).</li>
                    <li className="flex gap-2"><span className="font-bold text-indigo-600 w-4">5</span> Гіперреалістично (як наяву).</li>
                </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <button
                onClick={() => setAppState(AppState.SURVEY)}
                className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-indigo-600 px-8 font-medium text-white transition-all duration-300 hover:bg-indigo-700 shadow-lg hover:shadow-indigo-500/30"
                >
                    <span className="mr-2">Почати тест</span>
                    <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
                
                <button
                    onClick={triggerFileUpload}
                    className="flex items-center justify-center gap-2 h-12 px-6 rounded-md bg-white border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-all shadow-sm"
                >
                    <Upload className="w-4 h-4" />
                    Завантажити відповіді
                </button>
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept=".json" 
                    onChange={handleFileUpload} 
                />
            </div>
          </div>
        ) : (
          <div className="animate-fade-in">
            {/* Category Header */}
            <div className="mb-8">
              <span className="text-indigo-600 font-bold uppercase tracking-wider text-sm mb-1 block">Частина {currentCategoryIndex + 1} з {SURVEY_DATA.length}</span>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">{activeCategory.title}</h2>
              <p className="text-slate-600 text-lg">{activeCategory.description}</p>
            </div>

            {/* Questions List */}
            <div className="space-y-2">
              {activeCategory.questions.map((q) => (
                <QuestionCard
                  key={q.id}
                  question={q}
                  answer={answers[q.id]}
                  onAnswerChange={(val, note) => handleAnswerChange(q.id, val, note)}
                />
              ))}
            </div>

            {/* Navigation Footer */}
            <div className="flex items-center justify-between pt-8 mt-8 border-t border-slate-200">
                <button
                    onClick={prevCategory}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                        currentCategoryIndex === 0 
                        ? 'text-slate-400 cursor-not-allowed' 
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                    disabled={currentCategoryIndex === 0}
                >
                    <ChevronLeft className="w-5 h-5" />
                    Назад
                </button>

                <button
                    onClick={nextCategory}
                    className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all hover:translate-y-[-1px]"
                >
                    {currentCategoryIndex === SURVEY_DATA.length - 1 ? 'Завершити' : 'Далі'}
                    {currentCategoryIndex === SURVEY_DATA.length - 1 ? <CheckCircle className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;