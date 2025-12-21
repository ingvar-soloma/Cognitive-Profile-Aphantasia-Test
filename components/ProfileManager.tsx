import React, { useState } from 'react';
import { Profile, UIStrings, Language, ProfileType } from '../types';
import { User, Plus, Trash2, UserCircle } from 'lucide-react';
import { ProfileService } from '../services/ProfileService';

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
    </div>
  );
};
