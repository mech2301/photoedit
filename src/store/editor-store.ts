'use client';

import { create } from 'zustand';
import type { TextRegion, ActionType, EditorStatus } from '@/types';

interface EditorState {
  originalImage: string | null;
  processedImage: string | null;
  imageId: string | null;
  textRegions: TextRegion[];
  actionType: ActionType;
  targetLanguage: string;
  matchFont: boolean;
  matchColor: boolean;
  matchSize: boolean;
  status: EditorStatus;
  progress: number;
  error: string | null;
  setOriginalImage: (url: string, id: string) => void;
  setTextRegions: (regions: TextRegion[]) => void;
  toggleRegionSelection: (id: string) => void;
  updateRegionNewText: (id: string, newText: string) => void;
  setActionType: (action: ActionType) => void;
  setTargetLanguage: (lang: string) => void;
  setMatchFont: (match: boolean) => void;
  setMatchColor: (match: boolean) => void;
  setMatchSize: (match: boolean) => void;
  setStatus: (status: EditorStatus) => void;
  setProgress: (progress: number) => void;
  setProcessedImage: (url: string) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState = {
  originalImage: null,
  processedImage: null,
  imageId: null,
  textRegions: [],
  actionType: 'replace' as ActionType,
  targetLanguage: 'es',
  matchFont: true,
  matchColor: true,
  matchSize: true,
  status: 'idle' as EditorStatus,
  progress: 0,
  error: null,
};

export const useEditorStore = create<EditorState>((set) => ({
  ...initialState,
  setOriginalImage: (url, id) => set({ originalImage: url, imageId: id }),
  setTextRegions: (regions) =>
    set({ textRegions: regions.map((r) => ({ ...r, selected: true })) }),
  toggleRegionSelection: (id) =>
    set((state) => ({
      textRegions: state.textRegions.map((r) =>
        r.id === id ? { ...r, selected: !r.selected } : r
      ),
    })),
  updateRegionNewText: (id, newText) =>
    set((state) => ({
      textRegions: state.textRegions.map((r) =>
        r.id === id ? { ...r, newText } : r
      ),
    })),
  setActionType: (action) => set({ actionType: action }),
  setTargetLanguage: (lang) => set({ targetLanguage: lang }),
  setMatchFont: (match) => set({ matchFont: match }),
  setMatchColor: (match) => set({ matchColor: match }),
  setMatchSize: (match) => set({ matchSize: match }),
  setStatus: (status) => set({ status }),
  setProgress: (progress) => set({ progress }),
  setProcessedImage: (url) => set({ processedImage: url }),
  setError: (error) => set({ error }),
  reset: () => set(initialState),
}));
