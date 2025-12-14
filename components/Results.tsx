import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { Answer, Question, QuestionType } from '../types';
import { SURVEY_DATA } from '../constants';
import { Download } from 'lucide-react';

interface ResultsProps {
  answers: Record<string, Answer>;
  onReset: () => void;
}

export const Results: React.FC<ResultsProps> = ({ answers, onReset }) => {
  // Helper to calculate averages for the radar chart
  const calculateCategoryScore = (subCat: string) => {
    let total = 0;
    let count = 0;

    SURVEY_DATA.forEach(cat => {
      cat.questions.forEach(q => {
        if (q.subCategory?.includes(subCat) && q.type === QuestionType.SCALE) {
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

  const radarData = [
    { subject: 'Візуальна', A: calculateCategoryScore('Візуальна'), fullMark: 5 },
    { subject: 'Аудіальна', A: calculateCategoryScore('Аудіальна'), fullMark: 5 },
    { subject: 'Тактильна', A: calculateCategoryScore('Тактильна'), fullMark: 5 },
    { subject: 'Смакова', A: calculateCategoryScore('Смакова'), fullMark: 5 },
    { subject: 'Нюхова', A: calculateCategoryScore('Нюхова'), fullMark: 5 },
  ];

  // Prepare textual answers for display
  const textAnswers = Object.values(answers).filter(a => a.note && a.note.trim().length > 0);

  const downloadResults = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(answers, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", "aphantasia_profile.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const getProfileDescription = () => {
    const visualScore = calculateCategoryScore('Візуальна');
    if (visualScore <= 1.5) return "Ваш профіль вказує на Афантазію (відсутність візуальної уяви). Ви, ймовірно, спираєтесь на семантичну пам'ять та логічні концепти.";
    if (visualScore <= 3) return "У вас середній рівень уяви. Образи можуть бути нечіткими або тьмяними (Гіпофантазія).";
    if (visualScore >= 4.5) return "Ваш профіль вказує на Гіперфантазію. Ваша уява надзвичайно яскрава та деталізована.";
    return "Ви маєте типовий рівень візуальної уяви (Фантазія). Ви можете візуалізувати, але розумієте різницю з реальністю.";
  };

  return (
    <div className="max-w-4xl mx-auto p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
        <div className="bg-indigo-600 p-6 text-white text-center">
          <h2 className="text-3xl font-bold mb-2">Ваш Когнітивний Профіль</h2>
          <p className="opacity-90">{getProfileDescription()}</p>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-8 items-center mb-10">
            <div className="w-full md:w-1/2 h-[300px]">
              <h3 className="text-center font-bold text-slate-700 mb-4">Сенсорна Карта</h3>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 5]} />
                  <Radar
                    name="Intensity"
                    dataKey="A"
                    stroke="#4f46e5"
                    strokeWidth={3}
                    fill="#6366f1"
                    fillOpacity={0.4}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="w-full md:w-1/2">
               <h3 className="font-bold text-slate-700 mb-4 border-b pb-2">Деталі Балів (1-5)</h3>
               <ul className="space-y-3">
                 {radarData.map((item) => (
                   <li key={item.subject} className="flex items-center justify-between">
                     <span className="text-slate-600 font-medium">{item.subject}</span>
                     <div className="flex items-center gap-3">
                        <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-indigo-500 rounded-full" 
                                style={{ width: `${(item.A / 5) * 100}%`}}
                            />
                        </div>
                        <span className="font-bold text-indigo-700 w-8 text-right">{item.A}</span>
                     </div>
                   </li>
                 ))}
               </ul>
            </div>
          </div>

          <div className="border-t pt-8">
             <h3 className="text-xl font-bold text-slate-800 mb-6">Ваші Текстові Нотатки</h3>
             {textAnswers.length === 0 ? (
                 <p className="text-slate-400 italic">Ви не залишили текстових коментарів.</p>
             ) : (
                 <div className="grid gap-4 md:grid-cols-2">
                     {textAnswers.map((ans, idx) => {
                         const q = SURVEY_DATA.flatMap(c => c.questions).find(q => q.id === ans.questionId);
                         return (
                             <div key={idx} className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-sm">
                                 <p className="font-semibold text-slate-700 mb-1 line-clamp-2" title={q?.text}>{q?.text}</p>
                                 <p className="text-slate-600">{ans.note}</p>
                             </div>
                         )
                     })}
                 </div>
             )}
          </div>
        </div>
        
        <div className="bg-slate-50 p-6 flex justify-center gap-4">
            <button 
                onClick={downloadResults}
                className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 hover:shadow-sm transition-all"
            >
                <Download className="w-4 h-4" />
                Зберегти JSON
            </button>
            <button 
                onClick={onReset}
                className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all"
            >
                Пройти знову
            </button>
        </div>
      </div>
    </div>
  );
};