import React, { useEffect, useState } from 'react';
import { ProfileService } from '@/services/ProfileService';
import { UIStrings, Language } from '@/types';
import { Users, Search, Calendar, ChevronRight } from 'lucide-react';

interface AdminDashboardProps {
  ui: UIStrings;
  lang: Language;
  onViewResult: (answers: any) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ ui, lang, onViewResult }) => {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const load = async () => {
      const data = await ProfileService.fetchAllResults();
      setResults(data);
      setLoading(false);
    };
    load();
  }, []);

  const filteredResults = results.filter(r => 
    (r.username?.toLowerCase().includes(search.toLowerCase())) ||
    (r.first_name?.toLowerCase().includes(search.toLowerCase())) ||
    (r.telegram_id?.includes(search))
  );

  if (loading) return (
    <div className="flex items-center justify-center p-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-indigo-100 dark:border-indigo-900/30 mb-8 animate-fade-in">
      <div className="bg-indigo-600 p-6 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Users className="w-6 h-6" />
          <h2 className="text-xl font-bold">Admin Dashboard: All Users ({results.length})</h2>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-300" />
          <input 
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 bg-indigo-500/30 border border-indigo-400/30 rounded-lg text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm w-48 sm:w-64"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4 font-semibold">User</th>
              <th className="px-6 py-4 font-semibold">Test Type</th>
              <th className="px-6 py-4 font-semibold">Date</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {filteredResults.map((res) => (
              <tr key={res.telegram_id + res.created_at} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {res.photo_url ? (
                      <img src={res.photo_url} className="w-8 h-8 rounded-full" alt="" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase">
                        {res.first_name?.[0]}
                      </div>
                    )}
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">{res.first_name} {res.last_name}</div>
                      <div className="text-xs text-slate-500">@{res.username || res.telegram_id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-xs font-medium text-slate-600 dark:text-slate-300">
                    {res.test_type}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(res.created_at).toLocaleDateString(lang === 'uk' ? 'uk-UA' : 'en-US')}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => onViewResult(res)}
                    className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-bold text-sm hover:underline"
                  >
                    View Details
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {filteredResults.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-400 italic">
                  No users found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
