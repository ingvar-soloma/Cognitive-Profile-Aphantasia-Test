import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Answer, QuestionType, UIStrings, Language } from '../types';
import { SURVEY_DATA } from '../constants';
import { Download, FileJson } from 'lucide-react';
// @ts-ignore
import { encode } from '@toon-format/toon';

interface ResultsProps {
  answers: Record<string, Answer>;
  onReset: () => void;
  ui: UIStrings;
  lang: Language;
}

export const Results: React.FC<ResultsProps> = ({ answers, onReset, ui, lang }) => {
  // Helper to calculate averages for the radar chart
  const calculateCategoryScore = (subCatKey: string) => {
    let total = 0;
    let count = 0;

    SURVEY_DATA.forEach(cat => {
      cat.questions.forEach(q => {
        let match = false;
        if (subCatKey === 'Visual' && q.id.startsWith('1_A')) match = true;
        if (subCatKey === 'Auditory' && q.id.startsWith('1_B')) match = true;
        if (subCatKey === 'Tactile' && q.id === '1_C_1') match = true;
        if (subCatKey === 'Gustatory' && q.id === '1_C_2') match = true;
        if (subCatKey === 'Olfactory' && q.id === '1_C_3') match = true;

        if (match && q.type === QuestionType.SCALE) {
          const val = answers[q.id]?.value;
          if (typeof val === 'number') {
            total += val;
            count++;
          }
        }
      });
    });

    return count > 0 ? parseFloat((total / count).toFixed(1)) : 0;
  };

  const labels: Record<string, Record<Language, string>> = {
    Visual: { uk: 'Візуальна', en: 'Visual', ru: 'Визуальная' },
    Auditory: { uk: 'Аудіальна', en: 'Auditory', ru: 'Аудиальная' },
    Tactile: { uk: 'Тактильна', en: 'Tactile', ru: 'Тактильная' },
    Gustatory: { uk: 'Смакова', en: 'Gustatory', ru: 'Вкусовая' },
    Olfactory: { uk: 'Нюхова', en: 'Olfactory', ru: 'Обонятельная' },
  };

  const radarData = [
    { key: 'Visual', subject: labels['Visual'][lang], A: calculateCategoryScore('Visual'), fullMark: 5 },
    { key: 'Auditory', subject: labels['Auditory'][lang], A: calculateCategoryScore('Auditory'), fullMark: 5 },
    { key: 'Tactile', subject: labels['Tactile'][lang], A: calculateCategoryScore('Tactile'), fullMark: 5 },
    { key: 'Gustatory', subject: labels['Gustatory'][lang], A: calculateCategoryScore('Gustatory'), fullMark: 5 },
    { key: 'Olfactory', subject: labels['Olfactory'][lang], A: calculateCategoryScore('Olfactory'), fullMark: 5 },
  ];

  // Prepare textual answers for display
  const textAnswers = (Object.values(answers) as Answer[]).filter(a => a.note && a.note.trim().length > 0);

  const downloadFile = (extension: string) => {
    let content = "";
    if (extension === 'toon') {
      content = encode(answers);
    } else {
      content = JSON.stringify(answers, null, 2);
    }

    const dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(content);
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `aphantasia_profile.${extension}`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const getProfileDescription = () => {
    const visualScore = calculateCategoryScore('Visual');
    if (visualScore <= 1.5) return ui.profileAphantasia;
    if (visualScore <= 3) return ui.profileHypophantasia;
    if (visualScore >= 4.5) return ui.profileHyperphantasia;
    return ui.profilePhantasia;
  };

  return (
    <div className="max-w-4xl mx-auto p-4 animate-fade-in">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden mb-8 transition-colors">
        <div className="bg-indigo-600 dark:bg-indigo-700 p-6 text-white text-center">
          <h2 className="text-3xl font-bold mb-2">{ui.resultsTitle}</h2>
          <p className="opacity-90">{getProfileDescription()}</p>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-8 items-center mb-10">
            <div className="w-full md:w-1/2 h-[300px]">
              <h3 className="text-center font-bold text-slate-700 dark:text-slate-200 mb-4">{ui.sensoryMap}</h3>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="#94a3b8" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 5]} stroke="#94a3b8" />
                  <Radar
                    name="Intensity"
                    dataKey="A"
                    stroke="#818cf8"
                    strokeWidth={3}
                    fill="#6366f1"
                    fillOpacity={0.4}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                    itemStyle={{ color: '#818cf8' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="w-full md:w-1/2">
               <h3 className="font-bold text-slate-700 dark:text-slate-200 mb-4 border-b dark:border-slate-700 pb-2">{ui.scoreDetails}</h3>
               <ul className="space-y-3">
                 {radarData.map((item) => (
                   <li key={item.key} className="flex items-center justify-between">
                     <span className="text-slate-600 dark:text-slate-400 font-medium">{item.subject}</span>
                     <div className="flex items-center gap-3">
                        <div className="w-32 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-indigo-500 rounded-full" 
                                style={{ width: `${(item.A / 5) * 100}%`}}
                            />
                        </div>
                        <span className="font-bold text-indigo-700 dark:text-indigo-400 w-8 text-right">{item.A}</span>
                     </div>
                   </li>
                 ))}
               </ul>
            </div>
          </div>

          <div className="border-t dark:border-slate-700 pt-8">
             <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-6">{ui.notesTitle}</h3>
             {textAnswers.length === 0 ? (
                 <p className="text-slate-400 dark:text-slate-500 italic">{ui.noNotes}</p>
             ) : (
                 <div className="grid gap-4 md:grid-cols-2">
                     {textAnswers.map((ans, idx) => {
                         const q = SURVEY_DATA.flatMap(c => c.questions).find(q => q.id === ans.questionId);
                         return (
                             <div key={idx} className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg border border-slate-100 dark:border-slate-700 text-sm">
                                 <p className="font-semibold text-slate-700 dark:text-slate-200 mb-1 line-clamp-2" title={q?.text[lang]}>{q?.text[lang]}</p>
                                 <p className="text-slate-600 dark:text-slate-400">{ans.note}</p>
                             </div>
                         )
                     })}
                 </div>
             )}
          </div>
        </div>
        
        <div className="bg-slate-50 dark:bg-slate-700/30 p-6 flex flex-wrap justify-center gap-4">
            <button 
                onClick={() => downloadFile('json')}
                className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-semibold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-600 hover:shadow-sm transition-all"
            >
                <FileJson className="w-4 h-4" />
                {ui.downloadJson}
            </button>
            <button 
                onClick={() => downloadFile('toon')}
                className="flex items-center gap-2 px-6 py-3 bg-amber-50 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700/50 text-amber-700 dark:text-amber-400 font-semibold rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/50 hover:shadow-sm transition-all"
            >
                <Download className="w-4 h-4" />
                {ui.saveToon}
            </button>
            <button 
                onClick={onReset}
                className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all"
            >
                {ui.retake}
            </button>
        </div>
      </div>
    </div>
  );
};