export interface TextRegion {
  id: string;
  text: string;
  newText?: string;
  bbox: { x: number; y: number; width: number; height: number };
  selected: boolean;
  confidence: number;
  language: string;
  font?: { family: string; size: number; color: string; bold: boolean; italic: boolean };
}

export type ActionType = 'replace' | 'translate' | 'remove';
export type EditorStatus = 'idle' | 'uploading' | 'detecting' | 'processing' | 'completed' | 'error';

export interface Project {
  id: string;
  originalUrl: string;
  processedUrl: string | null;
  actionType: ActionType;
  status: string;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
}
