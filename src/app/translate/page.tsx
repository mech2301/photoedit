'use client';

import { useCallback, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, Languages } from 'lucide-react';

const targetLanguages = [
  'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese',
  'Russian', 'Japanese', 'Korean', 'Chinese', 'Hindi', 'Arabic',
];

export default function TranslatePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [targetLang, setTargetLang] = useState('Spanish');

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        sessionStorage.setItem('editor-image', e.target?.result as string);
        sessionStorage.setItem('editor-translate-lang', targetLang);
        router.push('/editor');
      };
      reader.readAsDataURL(file);
    },
    [router, targetLang]
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold md:text-5xl">Image Translator</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Translate text in images while keeping the original layout and style.
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-md">
        <label className="text-sm font-medium">Target Language</label>
        <select
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
          className="mt-1 w-full rounded-lg border px-4 py-3 text-sm outline-none focus:border-primary"
        >
          {targetLanguages.map((lang) => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
      </div>

      <div className="mx-auto mt-6 max-w-2xl">
        <div
          onClick={() => fileInputRef.current?.click()}
          className="cursor-pointer rounded-2xl border-2 border-dashed border-primary/30 bg-gradient-to-b from-primary/5 to-transparent p-12 text-center transition-all hover:border-primary/50"
        >
          <div className="mx-auto w-fit rounded-full bg-primary/10 p-4">
            <Languages className="h-8 w-8 text-primary" />
          </div>
          <p className="mt-4 text-lg font-medium">Upload an image to translate</p>
          <button
            type="button"
            className="mt-4 rounded-xl bg-primary px-8 py-3 text-sm font-medium text-white hover:bg-primary-dark"
          >
            Open Image
          </button>
          <div className="mt-4 flex justify-center gap-2">
            {['JPG', 'PNG', 'JPEG', 'WEBP', 'PDF'].map((fmt) => (
              <span key={fmt} className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">{fmt}</span>
            ))}
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
      </div>
    </div>
  );
}
