import React from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, ArrowDownCircle } from 'lucide-react';
import { QuestionCard } from './QuestionCard';
import { LocalizedCategoryData, Answer, LocalizedScaleConfig } from '@/types';

interface SurveyProps {
  ui: any;
  currentCategoryIndex: number;
  totalCategories: number;
  activeCategory: LocalizedCategoryData;
  answers: Record<string, Answer>;
  onAnswerChange: (questionId: string, value: string | number | null, note: string) => void;
  onPrevCategory: () => void;
  onNextCategory: () => void;
  isLoading?: boolean;
  scaleConfig?: LocalizedScaleConfig;
  isQuestionAnswered: (q: any, ans: Answer | undefined) => boolean;
  showUnansweredIndicators?: boolean;
}

const SkeletonLoader = () => (
    <div className="animate-pulse space-y-8">
        <div className="mb-8">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-24 mb-2"></div>
            <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3"></div>
        </div>
        <div className="space-y-6">
            {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                    <div className="flex gap-4 mb-4">
                        <div className="h-6 w-20 bg-slate-200 dark:bg-slate-700 rounded"></div>
                        <div className="flex-1 space-y-2">
                            <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
                            <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-2/3"></div>
                        </div>
                    </div>
                    <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
                </div>
            ))}
        </div>
    </div>
);

export const Survey: React.FC<SurveyProps> = ({
  ui,
  currentCategoryIndex,
  totalCategories,
  activeCategory,
  answers,
  onAnswerChange,
  onPrevCategory,
  onNextCategory,
  isLoading = false,
  scaleConfig,
  isQuestionAnswered,
  showUnansweredIndicators = false
}) => {
  const unansweredIds = React.useMemo(() => {
    if (!activeCategory) return [];
    return activeCategory.questions
      .filter(q => !isQuestionAnswered(q, answers[q.id]))
      .map(q => q.id);
  }, [activeCategory, answers, isQuestionAnswered]);

  const scrollToFirstUnanswered = () => {
    if (unansweredIds.length > 0) {
      const el = document.getElementById(`question-${unansweredIds[0]}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };
  if (isLoading || !activeCategory) {
      return <SkeletonLoader />;
  }

  return (
    <div className="animate-fade-in">
      {/* Category Header */}
      <div className="mb-8">
        <span className="text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider text-sm mb-1 block">
            {ui.part} {currentCategoryIndex + 1} {ui.of} {totalCategories}
        </span>
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
            onAnswerChange={(val, note) => onAnswerChange(q.id, val, note)}
            ui={ui}
            scaleConfig={scaleConfig}
            isUnanswered={showUnansweredIndicators && unansweredIds.includes(q.id)}
          />
        ))}
      </div>

       {/* Navigation Footer */}
       <div className="flex items-center justify-between pt-8 mt-8 border-t border-slate-200 dark:border-slate-700">
          <button
              onClick={onPrevCategory}
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
              onClick={onNextCategory}
              className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 shadow-lg shadow-indigo-200 dark:shadow-none transition-all hover:translate-y-[-1px]"
          >
              {currentCategoryIndex === totalCategories - 1 ? ui.finish : ui.next}
              {currentCategoryIndex === totalCategories - 1 ? <CheckCircle className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
       </div>

       {/* Floating Scroll Button */}
       {unansweredIds.length > 0 && (
         <button
           onClick={scrollToFirstUnanswered}
           className="fixed bottom-6 right-6 z-40 bg-indigo-600 text-white p-3 rounded-full shadow-2xl hover:bg-indigo-700 transition-all transform hover:scale-110 flex items-center gap-2 group"
           title={ui.scrollToUnanswered}
         >
           <ArrowDownCircle className="w-6 h-6" />
           <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 text-sm font-bold whitespace-nowrap">
             {ui.scrollToUnanswered} ({unansweredIds.length})
           </span>
         </button>
       )}
     </div>
  );
};