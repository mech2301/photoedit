'use client';

import { useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Upload } from 'lucide-react';

const features = [
  { title: 'Smart AI Editing', description: 'Expand image boundaries or modify local content based on prompts.' },
  { title: 'Seamless Text Editing', description: 'Edit text in images like editing a document, automatically matching fonts.' },
  { title: 'Works on Web and Mobile', description: 'Access our site via your mobile phone anywhere & anytime.' },
];

export default function AIEditorPage() {
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
        <h1 className="text-4xl font-bold md:text-5xl">AI Image Editor</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          AI retouching, Image text editing, Object replacement/removal, style transfer, watermark removal, ID photos, and more.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-2xl">
        <div
          onClick={() => fileInputRef.current?.click()}
          className="cursor-pointer rounded-2xl border-2 border-dashed border-primary/30 bg-gradient-to-b from-primary/5 to-transparent p-12 text-center transition-all hover:border-primary/50"
        >
          <div className="rounded-full bg-primary/10 p-4 mx-auto w-fit">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          <p className="mt-4 text-lg font-medium">Drag and drop an image here or</p>
          <button
            type="button"
            className="mt-4 rounded-xl bg-primary px-8 py-3 text-sm font-medium text-white hover:bg-primary-dark"
          >
            Open Image
          </button>
          <div className="mt-4 flex justify-center gap-2">
            {['JPG', 'PNG', 'JPEG', 'WEBP', 'BMP', 'PDF'].map((fmt) => (
              <span key={fmt} className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                {fmt}
              </span>
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
        <h2 className="text-center text-2xl font-bold">How to Edit Image with AI?</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { step: '1', title: 'Upload Image', desc: 'Select an image to upload and enter the AI Image Editor.' },
            { step: '2', title: 'Edit with AI', desc: 'Enter your editing requirements in the AI chat box, and AI will automatically edit the image for you.' },
            { step: '3', title: 'Save Image', desc: 'After editing, click the download button to save your edited image.' },
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

      <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <div key={f.title} className="rounded-xl border p-6">
            <h3 className="font-semibold">{f.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{f.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
