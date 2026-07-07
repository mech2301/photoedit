'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { fabric } from 'fabric';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import type { TextRegion } from '@/types';

interface ImageCanvasProps {
  imageUrl: string;
  regions: TextRegion[];
  selectedRegionId: string | null;
  onSelectRegion: (id: string | null) => void;
  processedImageUrl?: string | null;
  showComparison?: boolean;
}

export default function ImageCanvas({
  imageUrl,
  regions,
  selectedRegionId,
  onSelectRegion,
  processedImageUrl,
  showComparison,
}: ImageCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const [zoom, setZoom] = useState(1);

  const updateZoom = useCallback(
    (newZoom: number) => {
      const z = Math.max(0.1, Math.min(5, newZoom));
      setZoom(z);
      if (fabricRef.current) {
        fabricRef.current.setZoom(z);
        fabricRef.current.renderAll();
      }
    },
    []
  );

  useEffect(() => {
    if (!canvasRef.current || !imageUrl) return;

    const container = containerRef.current;
    if (!container) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: container.clientWidth,
      height: container.clientHeight,
      selection: false,
      backgroundColor: '#f3f4f6',
    });
    fabricRef.current = canvas;

    fabric.Image.fromURL(imageUrl, (img) => {
      const maxW = container.clientWidth - 40;
      const maxH = container.clientHeight - 40;
      const scale = Math.min(maxW / img.width!, maxH / img.height!, 1);
      img.set({ scaleX: scale, scaleY: scale, left: 20, top: 20 });
      canvas.setWidth(img.width! * scale + 40);
      canvas.setHeight(img.height! * scale + 40);
      canvas.add(img);
      canvas.renderAll();
    });

    return () => {
      canvas.dispose();
      fabricRef.current = null;
    };
  }, [imageUrl]);

  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas) return;

    const existing = canvas.getObjects().filter((o) => o.data?.isRegion);
    existing.forEach((o) => canvas.remove(o));

    regions.forEach((region) => {
      const img = canvas.getObjects()[0] as fabric.Image;
      if (!img) return;
      const scaleX = img.scaleX || 1;
      const scaleY = img.scaleY || 1;
      const left = img.left || 0;
      const top = img.top || 0;

      const rect = new fabric.Rect({
        left: left + region.bbox.x * scaleX,
        top: top + region.bbox.y * scaleY,
        width: region.bbox.width * scaleX,
        height: region.bbox.height * scaleY,
        fill: 'rgba(99, 102, 241, 0.15)',
        stroke: region.id === selectedRegionId ? '#6366f1' : 'rgba(99, 102, 241, 0.5)',
        strokeWidth: region.id === selectedRegionId ? 2 : 1,
        selectable: false,
        evented: true,
        data: { isRegion: true, regionId: region.id },
      });

      rect.on('mousedown', () => onSelectRegion(region.id));
      canvas.add(rect);
    });

    canvas.renderAll();
  }, [regions, selectedRegionId, onSelectRegion]);

  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas) return;

    const processed = canvas.getObjects().filter((o) => o.data?.isProcessed);
    processed.forEach((o) => canvas.remove(o));

    if (processedImageUrl && showComparison) {
      const img = canvas.getObjects()[0] as fabric.Image;
      if (!img) return;

      fabric.Image.fromURL(processedImageUrl, (processedImg) => {
        processedImg.set({
          left: img.left,
          top: img.top,
          scaleX: img.scaleX,
          scaleY: img.scaleY,
          data: { isProcessed: true },
        });
        canvas.add(processedImg);
        canvas.renderAll();
      });
    }

    canvas.renderAll();
  }, [processedImageUrl, showComparison]);

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b px-4 py-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => updateZoom(zoom - 0.1)}
            className="rounded-lg p-1.5 hover:bg-muted"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <span className="text-sm font-medium">{Math.round(zoom * 100)}%</span>
          <button
            onClick={() => updateZoom(zoom + 0.1)}
            className="rounded-lg p-1.5 hover:bg-muted"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
        </div>
        <button
          onClick={() => { updateZoom(1); if (fabricRef.current) { const img = fabricRef.current.getObjects()[0]; if (img) { img.set({ left: 20, top: 20 }); fabricRef.current.renderAll(); } } }}
          className="rounded-lg p-1.5 hover:bg-muted"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>
      <div ref={containerRef} className="flex-1 overflow-auto bg-gray-100 p-4">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
