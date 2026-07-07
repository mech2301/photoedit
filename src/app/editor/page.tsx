'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Image as ImageIcon } from 'lucide-react';
import ImageCanvas from '@/components/editor/ImageCanvas';
import ControlPanel from '@/components/editor/ControlPanel';
import { useEditorStore } from '@/store/editor-store';
import { useTextDetection } from '@/hooks/useTextDetection';
import { downloadBlob } from '@/lib/utils';
import type { ActionType } from '@/types';

export default function EditorPage() {
  const router = useRouter();
  const { detectText } = useTextDetection();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showComparison, setShowComparison] = useState(false);
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null);

  const {
    originalImage,
    processedImage,
    textRegions,
    actionType,
    targetLanguage,
    matchFont,
    matchColor,
    matchSize,
    status,
    setOriginalImage,
    setTextRegions,
    toggleRegionSelection,
    updateRegionNewText,
    setActionType,
    setTargetLanguage,
    setMatchFont,
    setMatchColor,
    setMatchSize,
    setStatus,
    setProcessedImage,
    setProgress,
    setError,
    reset,
  } = useEditorStore();

  useEffect(() => {
    const stored = sessionStorage.getItem('editor-image');
    if (stored) {
      setOriginalImage(stored, 'upload-' + Date.now());
      setStatus('uploading');
      sessionStorage.removeItem('editor-image');
    } else {
      setStatus('idle');
    }
  }, [setOriginalImage, setStatus]);

  useEffect(() => {
    if (!originalImage || textRegions.length > 0) return;
    setStatus('detecting');
    detectText(originalImage).then((regions) => {
      if (regions.length > 0) {
        setTextRegions(regions);
        setStatus('idle');
      } else {
        setStatus('completed');
      }
    });
  }, [originalImage, textRegions.length, detectText, setTextRegions, setStatus]);

  const handleGenerate = useCallback(async () => {
    if (!originalImage) return;
    setStatus('processing');
    setProgress(0);

    // Simulate processing with progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((r) => setTimeout(r, 200));
      setProgress(i);
    }

    // Create processed image using canvas
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = originalImage;
    await new Promise((r) => { img.onload = r; });

    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(img, 0, 0);

    // For remove action, fill detected text regions with surrounding color
    if (actionType === 'remove') {
      const selected = textRegions.filter((r) => r.selected);
      const scaleX = img.width / 800;
      const scaleY = img.height / 600;
      for (const region of selected) {
        const x = region.bbox.x;
        const y = region.bbox.y;
        const w = region.bbox.width;
        const h = region.bbox.height;
        const imageData = ctx.getImageData(
          Math.max(0, x - 2),
          Math.max(0, y - 2),
          w + 4,
          h + 4
        );
        // Sample average color around edges
        let r = 0, g = 0, b = 0, count = 0;
        for (let py = 0; py < imageData.height; py++) {
          for (let px = 0; px < imageData.width; px++) {
            const edge =
              px < 3 || px >= imageData.width - 3 || py < 3 || py >= imageData.height - 3;
            if (edge) {
              const idx = (py * imageData.width + px) * 4;
              r += imageData.data[idx];
              g += imageData.data[idx + 1];
              b += imageData.data[idx + 2];
              count++;
            }
          }
        }
        if (count > 0) {
          ctx.fillStyle = `rgb(${Math.round(r / count)},${Math.round(g / count)},${Math.round(b / count)})`;
          ctx.fillRect(x, y, w, h);
        }
      }
    }

    // For replace/translate, fill and overlay text
    if (actionType === 'replace' || actionType === 'translate') {
      const selected = textRegions.filter((r) => r.selected && r.newText);
      for (const region of selected) {
        const x = region.bbox.x;
        const y = region.bbox.y;
        const w = region.bbox.width;
        const h = region.bbox.height;
        // Fill background
        const imageData = ctx.getImageData(Math.max(0, x - 2), Math.max(0, y - 2), w + 4, h + 4);
        let r = 0, g = 0, b = 0, count = 0;
        for (let py = 0; py < imageData.height; py++) {
          for (let px = 0; px < imageData.width; px++) {
            if (px < 3 || px >= imageData.width - 3 || py < 3 || py >= imageData.height - 3) {
              const idx = (py * imageData.width + px) * 4;
              r += imageData.data[idx];
              g += imageData.data[idx + 1];
              b += imageData.data[idx + 2];
              count++;
            }
          }
        }
        if (count > 0) {
          ctx.fillStyle = `rgb(${Math.round(r / count)},${Math.round(g / count)},${Math.round(b / count)})`;
          ctx.fillRect(x, y, w, h);
        }
        // Render new text
        const fontSize = Math.min(w / region.newText!.length * 1.5, h * 0.8);
        ctx.fillStyle = '#000000';
        ctx.font = `${Math.max(12, fontSize)}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(region.newText!, x + w / 2, y + h / 2);
      }
    }

    const dataUrl = canvas.toDataURL('image/png');
    setProcessedImage(dataUrl);
    setStatus('completed');
  }, [originalImage, textRegions, actionType, setStatus, setProgress, setProcessedImage]);

  const handleDownload = useCallback(() => {
    if (!processedImage) return;
    const link = document.createElement('a');
    link.download = `photext-edited-${Date.now()}.png`;
    link.href = processedImage;
    link.click();
  }, [processedImage]);

  const handleNewImage = () => {
    reset();
    router.push('/');
  };

  if (!originalImage) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8">
        <div className="rounded-full bg-muted p-6">
          <ImageIcon className="h-12 w-12 text-muted-foreground" />
        </div>
        <p className="text-lg font-medium">No image selected</p>
        <button
          onClick={() => router.push('/')}
          className="rounded-xl bg-primary px-6 py-3 text-sm font-medium text-white"
        >
          Upload an image
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      <div className="flex items-center justify-between border-b px-4 py-2">
        <div className="flex items-center gap-3">
          <button
            onClick={handleNewImage}
            className="rounded-lg p-1.5 hover:bg-muted"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <span className="text-sm font-medium">
            {status === 'detecting' && 'Detecting text...'}
            {status === 'processing' && 'Processing image...'}
            {status === 'completed' && 'Edit complete'}
            {status === 'idle' && `${textRegions.length} text regions detected`}
          </span>
        </div>
        {status === 'completed' && (
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showComparison}
              onChange={(e) => setShowComparison(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-primary"
            />
            Before / After
          </label>
        )}
      </div>

      <div className="flex flex-1 overflow-hidden">
        <ImageCanvas
          imageUrl={originalImage}
          regions={textRegions}
          selectedRegionId={selectedRegionId}
          onSelectRegion={setSelectedRegionId}
          processedImageUrl={processedImage}
          showComparison={showComparison}
        />
        <ControlPanel
          regions={textRegions}
          actionType={actionType}
          targetLanguage={targetLanguage}
          matchFont={matchFont}
          matchColor={matchColor}
          matchSize={matchSize}
          status={status}
          onActionChange={(a: ActionType) => setActionType(a)}
          onLanguageChange={setTargetLanguage}
          onToggleRegion={toggleRegionSelection}
          onUpdateText={updateRegionNewText}
          onMatchFontChange={setMatchFont}
          onMatchColorChange={setMatchColor}
          onMatchSizeChange={setMatchSize}
          onGenerate={handleGenerate}
          onDownload={handleDownload}
        />
      </div>
    </div>
  );
}
