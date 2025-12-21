import React from 'react';
import { BrainCircuit, CheckCircle, Upload, ChevronRight, Loader2, CornerDownRight } from 'lucide-react';
import { AVAILABLE_SURVEYS } from '../constants';
import { Language } from '../types';

interface IntroProps {
  ui: any;
  language: Language;
  activeSurveyId: string;
  onSetActiveSurveyId: (id: string) => void;
  onStartSurvey: () => void;
  onTriggerFileUpload: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading?: boolean;
  surveyProgress?: Record<string, { answered: number; total: number; percent: number }>;
}

export const Intro: React.FC<IntroProps> = ({
  ui,
  language,
  activeSurveyId,
  onSetActiveSurveyId,
  onStartSurvey,
  onTriggerFileUpload,
  fileInputRef,
  onFileUpload,
  isLoading = false,
  surveyProgress = {},
}) => {
  // Get current survey config to display correct scale
  const activeSurvey = AVAILABLE_SURVEYS.find(s => s.id === activeSurveyId);
  const scaleConfig = activeSurvey?.scaleConfig;
  
  const min = scaleConfig?.min ?? 1;
  const max = scaleConfig?.max ?? 5;
  const scaleNumbers = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  return (
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

      {/* Survey Selector */}
      <div className="w-full max-w-lg space-y-3 text-left">
         <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
             Select Test
         </span>
         <div className="grid grid-cols-1 gap-3">
             {AVAILABLE_SURVEYS.map(survey => {
                 const isSubTest = survey.id === 'sensory_only' || survey.id === 'processes_only' || survey.id === 'strategies_only';
                 const progress = surveyProgress[survey.id] || { answered: 0, total: 0, percent: 0 };
                 
                 return (
                     <button
                         key={survey.id}
                         onClick={() => onSetActiveSurveyId(survey.id)}
                         disabled={isLoading}
                         className={`p-4 rounded-xl border text-left transition-all relative group/btn ${
                             activeSurveyId === survey.id
                             ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 ring-1 ring-indigo-600'
                             : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 shadow-sm'
                         } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''} ${isSubTest ? 'ml-6 border-l-4 border-l-slate-300 dark:border-l-slate-600' : ''}`}
                     >
                         <div className="flex items-center justify-between mb-1">
                             <div className="flex items-center gap-2">
                                 {isSubTest && <CornerDownRight className="w-4 h-4 text-slate-400" />}
                                 <span className={`font-bold ${activeSurveyId === survey.id ? 'text-indigo-700 dark:text-indigo-400' : 'text-slate-900 dark:text-white'}`}>
                                     {survey.title[language].replace('↳ ', '')}
                                 </span>
                             </div>
                             <div className="flex items-center gap-2">
                                 {progress.percent > 0 && (
                                     <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                         progress.percent === 100 
                                         ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' 
                                         : 'bg-slate-100 text-slate-600 dark:bg-slate-700/50 dark:text-slate-400'
                                     }`}>
                                         {progress.percent === 100 ? ui.completed : `${progress.answered}/${progress.total}`}
                                     </span>
                                 )}
                                 {activeSurveyId === survey.id && <CheckCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
                             </div>
                         </div>
                         
                         <p className={`text-sm text-slate-600 dark:text-slate-400 pr-6 mb-2 ${isSubTest ? 'pl-6' : ''}`}>
                             {survey.description?.[language]}
                         </p>

                         {progress.percent > 0 && (
                              <div className={`mt-2 h-1 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden ${isSubTest ? 'ml-6' : ''}`}>
                                  <div 
                                      className={`h-full transition-all duration-500 ${progress.percent === 100 ? 'bg-emerald-500' : 'bg-indigo-500'}`}
                                      style={{ width: `${progress.percent}%` }}
                                  />
                              </div>
                         )}
                     </button>
                 );
             })}
         </div>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 max-w-lg w-full text-left space-y-3">
          <h3 className="font-bold text-slate-800 dark:text-slate-200 border-b dark:border-slate-700 pb-2 mb-2">{ui.howToRateTitle}</h3>
          <ul className="text-sm space-y-2 text-slate-600 dark:text-slate-400">
              {scaleNumbers.map(num => (
                  <li key={num} className="flex gap-2">
                      <span className="font-bold text-indigo-600 dark:text-indigo-400 w-4">{num}</span> 
                      {scaleConfig?.labels[num]?.[language] || (
                          // Fallback
                          num === 1 ? ui.scale1 :
                          num === 2 ? ui.scale2 :
                          num === 3 ? ui.scale3 :
                          num === 4 ? ui.scale4 :
                          num === 5 ? ui.scale5 : ''
                      )}
                  </li>
              ))}
          </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button
          onClick={onStartSurvey}
          disabled={isLoading}
          className={`group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-indigo-600 px-8 font-medium text-white transition-all duration-300 hover:bg-indigo-700 shadow-lg hover:shadow-indigo-500/30 w-full sm:w-auto ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
              {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
              ) : (
                  <>
                    <span className="mr-2">{ui.start}</span>
                    <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </>
              )}
          </button>
          
          <button
              onClick={onTriggerFileUpload}
              disabled={isLoading}
              className={`flex items-center justify-center gap-2 h-12 px-6 rounded-md bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm w-full sm:w-auto ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
              <Upload className="w-4 h-4" />
              {ui.resume}
          </button>
          <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept=".json,.toon" 
              onChange={onFileUpload} 
          />
      </div>
      
      <p className="text-xs text-slate-400 dark:text-slate-500">Supports Export/Import in JSON & TOON</p>
    </div>
  );
};