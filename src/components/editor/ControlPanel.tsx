'use client';

import type { TextRegion, ActionType } from '@/types';

interface ControlPanelProps {
  regions: TextRegion[];
  actionType: ActionType;
  targetLanguage: string;
  matchFont: boolean;
  matchColor: boolean;
  matchSize: boolean;
  status: string;
  onActionChange: (action: ActionType) => void;
  onLanguageChange: (lang: string) => void;
  onToggleRegion: (id: string) => void;
  onUpdateText: (id: string, text: string) => void;
  onMatchFontChange: (v: boolean) => void;
  onMatchColorChange: (v: boolean) => void;
  onMatchSizeChange: (v: boolean) => void;
  onGenerate: () => void;
  onDownload: () => void;
}

const LANGUAGES = [
  { code: 'es', label: 'Spanish' },
  { code: 'fr', label: 'French' },
  { code: 'de', label: 'German' },
  { code: 'it', label: 'Italian' },
  { code: 'pt', label: 'Portuguese' },
  { code: 'ru', label: 'Russian' },
  { code: 'ja', label: 'Japanese' },
  { code: 'ko', label: 'Korean' },
  { code: 'zh', label: 'Chinese' },
  { code: 'hi', label: 'Hindi' },
  { code: 'ar', label: 'Arabic' },
  { code: 'en', label: 'English' },
];

const actions: ActionType[] = ['replace', 'translate', 'remove'];
const actionLabels: Record<ActionType, string> = {
  replace: 'Replace Text',
  translate: 'Translate',
  remove: 'Remove Text',
};

export default function ControlPanel({
  regions,
  actionType,
  targetLanguage,
  matchFont,
  matchColor,
  matchSize,
  status,
  onActionChange,
  onLanguageChange,
  onToggleRegion,
  onUpdateText,
  onMatchFontChange,
  onMatchSizeChange,
  onMatchColorChange,
  onGenerate,
  onDownload,
}: ControlPanelProps) {
  const selectedCount = regions.filter((r) => r.selected).length;

  return (
    <div className="flex w-80 flex-col border-l bg-white">
      <div className="border-b p-4">
        <div className="flex gap-1 rounded-lg bg-muted p-1">
          {actions.map((action) => (
            <button
              key={action}
              onClick={() => onActionChange(action)}
              className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                actionType === action
                  ? 'bg-white text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {actionLabels[action]}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="mb-3 text-sm font-medium">Detected Text</h3>
        {regions.length === 0 ? (
          <p className="text-sm text-muted-foreground">No text detected yet.</p>
        ) : (
          <div className="space-y-3">
            {regions.map((region) => (
              <div
                key={region.id}
                className={`rounded-lg border p-3 transition-colors ${
                  region.selected ? 'border-primary/30 bg-primary/5' : 'border-border opacity-60'
                }`}
              >
                <label className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    checked={region.selected}
                    onChange={() => onToggleRegion(region.id)}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-primary"
                  />
                  <div className="flex-1">
                    <p className="text-xs font-medium text-muted-foreground">Original:</p>
                    <p className="text-sm">{region.text}</p>
                    {(actionType === 'replace' || actionType === 'translate') && (
                      <div className="mt-2">
                        <p className="text-xs font-medium text-muted-foreground">
                          {actionType === 'translate' ? 'Translation:' : 'Replace with:'}
                        </p>
                        <input
                          type="text"
                          value={region.newText || ''}
                          onChange={(e) => onUpdateText(region.id, e.target.value)}
                          placeholder={
                            actionType === 'translate'
                              ? 'Auto-translated...'
                              : 'Type new text...'
                          }
                          className="mt-1 w-full rounded-md border px-2 py-1 text-sm outline-none focus:border-primary"
                        />
                      </div>
                    )}
                  </div>
                </label>
              </div>
            ))}
          </div>
        )}

        {actionType === 'translate' && (
          <div className="mt-4">
            <label className="text-sm font-medium">Target Language</label>
            <select
              value={targetLanguage}
              onChange={(e) => onLanguageChange(e.target.value)}
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="mt-4 space-y-2">
          <h3 className="text-sm font-medium">Options</h3>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={matchFont}
              onChange={(e) => onMatchFontChange(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-primary"
            />
            Match original font
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={matchColor}
              onChange={(e) => onMatchColorChange(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-primary"
            />
            Match original color
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={matchSize}
              onChange={(e) => onMatchSizeChange(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-primary"
            />
            Match original size
          </label>
        </div>
      </div>

      <div className="border-t p-4">
        <button
          onClick={onGenerate}
          disabled={
            status === 'processing' || status === 'detecting' || selectedCount === 0
          }
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-medium text-white transition-colors hover:bg-primary-dark disabled:opacity-50"
        >
          {status === 'processing' || status === 'detecting' ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Processing...
            </>
          ) : (
            <>
              <span>✨</span> Generate
            </>
          )}
        </button>
        <button
          onClick={onDownload}
          disabled={status !== 'completed'}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border py-3 text-sm font-medium transition-colors hover:bg-muted disabled:opacity-50"
        >
          <span>⬇️</span> Download
        </button>
      </div>
    </div>
  );
}
