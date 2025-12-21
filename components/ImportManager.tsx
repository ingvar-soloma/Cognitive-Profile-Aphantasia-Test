import React, { useState, useMemo } from 'react';
import { Profile, Answer, UIStrings, Language } from '../types';
import { X, Check, AlertCircle, ArrowRight, User, Plus, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { AVAILABLE_SURVEYS } from '../constants';
import { ProfileService } from '../services/ProfileService';

interface ImportManagerProps {
  profiles: Profile[];
  newAnswers: Record<string, Answer>;
  onImport: (profileId: string | null, answers: Record<string, Answer>) => void;
  onCancel: () => void;
  ui: UIStrings;
  lang: Language;
}

export const ImportManager: React.FC<ImportManagerProps> = ({
  profiles,
  newAnswers,
  onImport,
  onCancel,
  ui,
  lang
}) => {
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(profiles[0]?.id || null);
  const [showAllDiffs, setShowAllDiffs] = useState(false);

  const selectedProfile = useMemo(() => 
    selectedProfileId ? profiles.find(p => p.id === selectedProfileId) : null, 
    [profiles, selectedProfileId]
  );

  const profilesWithSimilarity = useMemo(() => {
    const filledNewAnswersKeys = Object.keys(newAnswers).filter(id => {
      const ans = newAnswers[id];
      return ans && (ans.value !== undefined && ans.value !== null && ans.value !== '' || (ans.note && ans.note.trim() !== ''));
    });
    const totalFilled = filledNewAnswersKeys.length;

    return profiles.map(p => {
      let matches = 0;
      filledNewAnswersKeys.forEach(qId => {
        const oldAns = p.answers[qId];
        const newAns = newAnswers[qId];
        if (oldAns && newAns && oldAns.value === newAns.value && oldAns.note === newAns.note) {
          matches++;
        }
      });
      
      const similarity = totalFilled > 0 ? Math.round((matches / totalFilled) * 100) : 0;
      return { ...p, similarity };
    }).sort((a, b) => b.similarity - a.similarity);
  }, [profiles, newAnswers]);

  const comparison = useMemo(() => {
    // If "New Profile" is selected, comparison is "everything is new" but we usually show 
    // comparison against target. For a new profile, we'll just show what's being imported.
    const diff: { questionText: string, oldVal: any, newVal: any, id: string }[] = [];
    const allQuestions = AVAILABLE_SURVEYS.flatMap(s => s.categories.flatMap(c => c.questions));

    Object.keys(newAnswers).forEach(qId => {
      const q = allQuestions.find(curr => curr.id === qId);
      const oldAns = selectedProfile?.answers[qId];
      const newAns = newAnswers[qId];

      if (newAns.value !== oldAns?.value || newAns.note !== oldAns?.note) {
        diff.push({
          id: qId,
          questionText: q?.text[lang] || qId,
          oldVal: oldAns?.value ?? '—',
          newVal: newAns.value ?? '—'
        });
      }
    });

    return diff;
  }, [selectedProfile, newAnswers, lang]);

  const handleConfirm = () => {
    onImport(selectedProfileId, newAnswers);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border border-slate-200 dark:border-slate-700">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg text-indigo-600 dark:text-indigo-400">
              <Check className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">{ui.importAnswers}</h2>
          </div>
          <button onClick={onCancel} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          {/* Profile Selector */}
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wider">
              {ui.selectProfileToImport}
            </label>
            <div className="grid gap-2">
              {/* Option: Create New Profile */}
              <button
                onClick={() => setSelectedProfileId(null)}
                className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                  selectedProfileId === null
                    ? 'bg-emerald-50 border-emerald-500 dark:bg-emerald-900/20 ring-1 ring-emerald-500'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-emerald-300 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-lg ${selectedProfileId === null ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                    <Plus className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-slate-700 dark:text-slate-200">{ui.createNewProfile}</span>
                </div>
                {selectedProfileId === null && <Check className="w-4 h-4 text-emerald-600" />}
              </button>

              <div className="h-px bg-slate-100 dark:bg-slate-700 my-1" />

              {profilesWithSimilarity.map(p => (
                <button
                  key={p.id}
                  onClick={() => setSelectedProfileId(p.id)}
                  className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                    selectedProfileId === p.id
                      ? 'bg-indigo-50 border-indigo-500 dark:bg-indigo-900/20 ring-1 ring-indigo-500'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-indigo-300 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className={`p-1.5 rounded-lg ${selectedProfileId === p.id ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-400'}`}>
                      <User className="w-5 h-5" />
                    </div>
                    <div className="text-left flex-1 min-w-0">
                      <div className="font-semibold text-slate-700 dark:text-slate-200 truncate">{p.name}</div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1.5">
                        {p.type && <span>{ProfileService.getProfileTypeLabel(p.type, lang)}</span>}
                        {p.type && <span className="w-1 h-1 bg-slate-300 rounded-full" />}
                        <span>{new Date(p.lastUpdated).toLocaleDateString(lang)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    <div className="text-right">
                      <div className="text-[10px] uppercase font-bold text-slate-400 leading-none mb-1">{ui.similarity}</div>
                      <div className={`text-sm font-bold ${p.similarity > 80 ? 'text-emerald-500' : p.similarity > 50 ? 'text-amber-500' : 'text-slate-400'}`}>
                        {p.similarity}%
                      </div>
                    </div>
                    {selectedProfileId === p.id && <Check className="w-5 h-5 text-indigo-600" />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Comparison */}
          {comparison.length > 0 ? (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  {ui.compareAnswers}
                </label>
                <span className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-2.5 py-1 rounded-full flex items-center gap-1 font-extrabold tracking-tight">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {ui.importSummary.replace('{count}', comparison.length.toString())}
                </span>
              </div>
              <div className="border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden divide-y divide-slate-100 dark:divide-slate-700 shadow-sm">
                {(showAllDiffs ? comparison : comparison.slice(0, 5)).map(item => (
                  <div key={item.id} className="p-4 bg-slate-50 dark:bg-slate-900/30">
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
                      <Info className="w-3 h-3" />
                      {item.questionText}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex-1">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5 ml-1">{ui.existingValue}</span>
                        <div className="px-3 py-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 shadow-sm min-h-[38px] flex items-center">{item.oldVal}</div>
                      </div>
                      <div className="mt-6">
                        <ArrowRight className="w-4 h-4 text-indigo-300" />
                      </div>
                      <div className="flex-1">
                        <span className="text-[10px] uppercase font-bold text-indigo-400 block mb-1.5 ml-1">{ui.newValue}</span>
                        <div className="px-3 py-2 bg-indigo-50 dark:bg-indigo-900/40 rounded-xl border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 font-bold shadow-sm min-h-[38px] flex items-center">{item.newVal}</div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {comparison.length > 5 && (
                  <button
                    onClick={() => setShowAllDiffs(!showAllDiffs)}
                    className="w-full p-3 text-center text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-900/50 transition-colors flex items-center justify-center gap-2"
                  >
                    {showAllDiffs ? (
                      <><ChevronUp className="w-4 h-4" /> Show less</>
                    ) : (
                      <><ChevronDown className="w-4 h-4" /> Show all {comparison.length} differences</>
                    )}
                  </button>
                )}
              </div>
            </div>
          ) : (
             <div className="p-10 text-center bg-slate-50 dark:bg-slate-900/30 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700 text-slate-400 flex flex-col items-center gap-2">
               <Check className="w-8 h-8 text-emerald-500/50 mb-2" />
               <p className="font-semibold">No differences found.</p>
               <p className="text-xs opacity-70">The imported file matches the selected profile exactly.</p>
             </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 flex gap-4">
          <button
            onClick={onCancel}
            className="flex-1 px-6 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-bold rounded-xl hover:bg-white dark:hover:bg-slate-700 transition-all shadow-sm"
          >
            {ui.close}
          </button>
          <button
            onClick={handleConfirm}
            className="flex-[2] px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-xl shadow-indigo-200 dark:shadow-none transition-all active:scale-[0.98]"
          >
            {ui.confirmImport}
          </button>
        </div>
      </div>
    </div>
  );
};
