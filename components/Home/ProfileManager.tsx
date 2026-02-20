import React, { useState } from 'react';
import { Profile, UIStrings, Language, ProfileType } from '@/types';
import { User, Plus, Trash2, UserCircle, Download } from 'lucide-react';
import { ProfileService } from '@/services/ProfileService';
import { AVAILABLE_SURVEYS } from '@/constants';

interface ProfileManagerProps {
  profiles: Profile[];
  activeProfileId: string | null;
  onSelect: (id: string) => void;
  onCreate: (name: string) => void;
  onDelete: (id: string) => void;
  onRename: (id: string, newName: string) => void;
  ui: UIStrings;
  lang: Language;
}

export const ProfileManager: React.FC<ProfileManagerProps> = ({
  profiles,
  activeProfileId,
  onSelect,
  onCreate,
  onDelete,
  onRename,
  ui,
  lang,
}) => {
  const [newName, setNewName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [selectedProfileForDownload, setSelectedProfileForDownload] = useState<string | null>(null);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim()) {
      onCreate(newName.trim());
      setNewName('');
    }
  };

  const handleStartEdit = (e: React.MouseEvent, id: string, currentName: string) => {
    e.stopPropagation();
    setEditingId(id);
    setEditValue(currentName);
  };

  const handleSaveEdit = (id: string) => {
    if (editValue.trim()) {
      onRename(id, editValue.trim());
    }
    setEditingId(null);
  };

  const handleEditKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter') {
      handleSaveEdit(id);
    } else if (e.key === 'Escape') {
      setEditingId(null);
    }
  };

  const getProfileTypeLabel = (type?: ProfileType) => ProfileService.getProfileTypeLabel(type, lang);

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onSelect(id);
    }
  };

  const handleDownloadClick = (e: React.MouseEvent, profileId: string) => {
    e.stopPropagation();
    setSelectedProfileForDownload(profileId);
    setShowDownloadModal(true);
  };

  const handleDownloadConfirm = (surveyId: string) => {
    if (!selectedProfileForDownload) return;
    
    const profile = profiles.find(p => p.id === selectedProfileForDownload);
    if (!profile) return;

    const survey = AVAILABLE_SURVEYS.find(s => s.id === surveyId);
    if (!survey) return;

    // Prepare content
    let content = `Profile: ${profile.name}\n`;
    content += `Date: ${new Date(profile.lastUpdated).toLocaleDateString()}\n`;
    content += `Test: ${survey.title['en']}\n\n`; // Using English title as requested

    survey.categories.forEach(cat => {
        content += `--- ${cat.title['en']} ---\n\n`;
        cat.questions.forEach(q => {
            const answer = profile.answers[q.id];
            content += `Q: ${q.text['en']}\n`;
            if (answer) {
                content += `Answer: ${answer.value}\n`;
                if (answer.note) {
                    content += `Note: ${answer.note}\n`;
                }
            } else {
                content += `Answer: [No Answer]\n`;
            }
            content += `\n`;
        });
    });

    const dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(content);
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${profile.name}_${surveyId}_answers.txt`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();

    setShowDownloadModal(false);
    setSelectedProfileForDownload(null);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden mb-6">
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 flex items-center gap-2">
        <UserCircle className="w-5 h-5 text-indigo-500" />
        <h3 className="font-bold text-slate-700 dark:text-slate-200">{ui.manageProfiles}</h3>
      </div>

      <div className="p-4">
        {profiles.length > 0 ? (
          <div className="grid gap-2 mb-4">
            {profiles.map((profile) => (
              <div
                key={profile.id}
                className={`flex items-center justify-between p-3 rounded-xl transition-all border ${
                  activeProfileId === profile.id
                    ? 'bg-indigo-50 border-indigo-200 dark:bg-indigo-900/30 dark:border-indigo-800'
                    : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 hover:border-indigo-100 dark:hover:border-indigo-900 shadow-sm'
                }`}
              >
                <div 
                  className="flex-1 cursor-pointer flex items-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg p-1 overflow-hidden" 
                  onClick={() => onSelect(profile.id)}
                  onKeyDown={(e) => handleKeyDown(e, profile.id)}
                  role="button"
                  tabIndex={0}
                  aria-pressed={activeProfileId === profile.id}
                >
                  <div className={`w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center ${
                    activeProfileId === profile.id ? 'bg-indigo-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'
                  }`}>
                    <User className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    {editingId === profile.id ? (
                      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onKeyDown={(e) => handleEditKeyDown(e, profile.id)}
                          onBlur={() => handleSaveEdit(profile.id)}
                          autoFocus
                          className="w-full bg-white dark:bg-slate-700 border border-indigo-500 rounded px-2 py-1 text-sm font-semibold text-slate-700 dark:text-slate-200 focus:outline-none"
                        />
                      </div>
                    ) : (
                      <div 
                        className="font-semibold text-slate-700 dark:text-slate-200 text-left cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 flex flex-wrap items-center gap-x-2 outline-none focus-visible:underline group"
                        onClick={(e) => handleStartEdit(e, profile.id, profile.name)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            handleStartEdit(e as any, profile.id, profile.name);
                          }
                        }}
                        role="button"
                        tabIndex={0}
                        title="Click to rename"
                      >
                        <span className="truncate max-w-full">{profile.name}</span>
                        {profile.type && (
                          <span className="text-slate-400 font-normal text-xs whitespace-nowrap">
                            — {getProfileTypeLabel(profile.type)}
                          </span>
                        )}
                      </div>
                    )}
                    <div className="text-[10px] text-slate-400 text-left mt-0.5">
                      {new Date(profile.lastUpdated).toLocaleDateString(lang)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                  <button
                    onClick={(e) => handleDownloadClick(e, profile.id)}
                    className="p-2 text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-all"
                    title={ui.downloadQuestions}
                    aria-label={ui.downloadQuestions}
                  >
                    <Download className="w-4 h-4" />
                  </button>

                  {activeProfileId === profile.id ? (
                    <span className="text-[10px] font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-tighter px-2 py-1 bg-indigo-100 dark:bg-indigo-900/40 rounded-md whitespace-nowrap">
                      {ui.activeProfile}
                    </span>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(profile.id);
                      }}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                      title={ui.deleteProfile}
                      aria-label={ui.deleteProfile}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-slate-400 italic text-sm">
            {ui.noProfiles}
          </div>
        )}

        <form onSubmit={handleCreate} className="flex gap-2">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder={ui.profileName}
            className="flex-1 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            required
          />
          <button
            type="submit"
            disabled={!newName.trim()}
            className="bg-indigo-600 text-white p-2 rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
            aria-label={ui.createProfile}
          >
            <Plus className="w-5 h-5" />
          </button>
        </form>
      </div>

      {/* Download Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
              <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200">{ui.selectTestToDownload}</h3>
              <button onClick={() => setShowDownloadModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                &times;
              </button>
            </div>
            <div className="p-4 max-h-[60vh] overflow-y-auto">
              <div className="grid gap-2">
                {AVAILABLE_SURVEYS.map(survey => (
                  <button
                    key={survey.id}
                    onClick={() => handleDownloadConfirm(survey.id)}
                    className="text-left p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:border-indigo-200 dark:hover:border-indigo-800 transition-all"
                  >
                    <div className="font-semibold text-slate-800 dark:text-slate-200">{survey.title[lang]}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">{survey.description?.[lang]}</div>
                  </button>
                ))}
              </div>
            </div>
            <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-right">
              <button 
                onClick={() => setShowDownloadModal(false)}
                className="px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                {ui.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};