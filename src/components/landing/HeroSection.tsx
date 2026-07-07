'use client';

import { useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Upload } from 'lucide-react';
import { SUPPORTED_FORMATS } from '@/lib/constants';

export default function HeroSection() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        sessionStorage.setItem('editor-image', dataUrl);
        router.push('/editor');
      };
      reader.readAsDataURL(file);
    },
    [router]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      const items = e.clipboardData?.items;
      for (const item of items) {
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile();
          if (file) handleFile(file);
        }
      }
    },
    [handleFile]
  );

  return (
    <section
      className="relative overflow-hidden py-16 md:py-24"
      onPaste={handlePaste}
    >
      <div className="gradient-shadow-left pointer-events-none absolute inset-y-0 left-0 w-64" />
      <div className="gradient-shadow-right pointer-events-none absolute inset-y-0 right-0 w-64" />

      <div className="mx-auto max-w-4xl px-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          Edit Text in Image Online
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          The Easiest way to Edit Text in Image, Click Text in Image to Edit it,
          without needing PS skills.
        </p>

        <div className="mx-auto mt-8 max-w-2xl">
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => fileInputRef.current?.click()}
            className="cursor-pointer rounded-2xl border-2 border-dashed border-primary/30 bg-gradient-to-b from-primary/5 to-transparent p-12 transition-all hover:border-primary/50 hover:from-primary/10"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="rounded-full bg-primary/10 p-4">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="text-lg font-medium">
                  Drag and drop an image here
                </p>
                <p className="mt-1 text-sm text-muted-foreground">or</p>
              </div>
              <button
                type="button"
                className="rounded-xl bg-primary px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
              >
                Open Image
              </button>
              <div className="flex gap-2">
                {SUPPORTED_FORMATS.map((fmt) => (
                  <span
                    key={fmt}
                    className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                  >
                    {fmt}
                  </span>
                ))}
              </div>
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
    </section>
  );
}
