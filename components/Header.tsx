import React from 'react';
import { BrainCircuit, Moon, Sun, Download } from 'lucide-react';
import { Language } from '../types';

interface HeaderProps {
  appState: string;
  ui: any;
  language: Language;
  theme: 'light' | 'dark';
  progressPercent: number;
  onSetLanguage: (lang: Language) => void;
  onToggleTheme: () => void;
  onDownloadProgress: () => void;
  onGoToIntro: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  appState,
  ui,
  language,
  theme,
  progressPercent,
  onSetLanguage,
  onToggleTheme,
  onDownloadProgress,
  onGoToIntro,
}) => {
  return (
    <header className="bg-white dark:bg-slate-800 shadow-sm sticky top-0 z-10 border-b border-slate-200 dark:border-slate-700">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <button 
          className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg p-1" 
          onClick={onGoToIntro}
          aria-label="Go to Home"
        >
          <BrainCircuit className="w-8 h-8" />
          <span className="font-bold text-lg hidden sm:block">NeuroProfile</span>
        </button>
        
        <div className="flex items-center gap-4">
           {/* Theme Switcher */}
           <button
             onClick={onToggleTheme}
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
                      onClick={() => onSetLanguage(lang)}
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

          {appState === 'SURVEY' && (
              <button
                  onClick={onDownloadProgress}
                  className="ml-4 p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-900 transition-colors"
                  title={ui.resume}
                  aria-label="Save Progress"
              >
                  <Download className="w-5 h-5" />
              </button>
          )}

          {appState === 'SURVEY' && (
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
  );
};
