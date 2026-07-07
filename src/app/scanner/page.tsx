'use client';

import { useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Scan } from 'lucide-react';

export default function ScannerPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        sessionStorage.setItem('editor-image', e.target?.result as string);
        router.push('/editor');
      };
      reader.readAsDataURL(file);
    },
    [router]
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold md:text-5xl">Convert Photo to Scanned Document Online</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Turn your photos into scanned documents. No printer or scanner needed.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-2xl">
        <div
          onClick={() => fileInputRef.current?.click()}
          className="cursor-pointer rounded-2xl border-2 border-dashed border-primary/30 bg-gradient-to-b from-primary/5 to-transparent p-12 text-center transition-all hover:border-primary/50"
        >
          <div className="mx-auto w-fit rounded-full bg-primary/10 p-4">
            <Scan className="h-8 w-8 text-primary" />
          </div>
          <p className="mt-4 text-lg font-medium">Upload a photo to scan</p>
          <button
            type="button"
            className="mt-4 rounded-xl bg-primary px-8 py-3 text-sm font-medium text-white hover:bg-primary-dark"
          >
            Open Image
          </button>
          <div className="mt-4 flex justify-center gap-2">
            {['JPG', 'PNG', 'JPEG', 'WEBP'].map((fmt) => (
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

      <div className="mt-20">
        <h2 className="text-center text-2xl font-bold">How to Scan a Photo?</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { step: '1', title: 'Upload Photo', desc: 'Select the photo you want to convert to a scanned document.' },
            { step: '2', title: 'Adjust Points', desc: 'Drag the corner points to select the document area in your photo.' },
            { step: '3', title: 'Download', desc: 'Save your scanned document as PNG or PDF.' },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                {item.step}
              </div>
              <h3 className="mt-4 font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
