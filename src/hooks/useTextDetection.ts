'use client';

import { useState, useCallback } from 'react';
import { createWorker } from 'tesseract.js';
import type { TextRegion } from '@/types';
import { generateId } from '@/lib/utils';

export function useTextDetection() {
  const [detecting, setDetecting] = useState(false);

  const detectText = useCallback(async (imageUrl: string): Promise<TextRegion[]> => {
    setDetecting(true);
    try {
      const worker = await createWorker('eng');
      const { data } = await worker.recognize(imageUrl);
      await worker.terminate();

      const regions: TextRegion[] = [];
      const blocks = data.blocks || [];

      for (const block of blocks) {
        const paragraphs = block.paragraphs || [];
        for (const para of paragraphs) {
          const lines = para.lines || [];
          for (const line of lines) {
            const words = line.words || [];
            for (const word of words) {
              const bbox = word.bbox;
              if (!bbox) continue;
              regions.push({
                id: generateId(),
                text: word.text,
                bbox: { x: bbox.x0, y: bbox.y0, width: bbox.x1 - bbox.x0, height: bbox.y1 - bbox.y0 },
                selected: true,
                confidence: word.confidence || 0,
                language: 'en',
              });
            }
          }
        }
      }

      if (regions.length === 0 && data.text) {
        regions.push({
          id: generateId(),
          text: data.text.slice(0, 100),
          bbox: { x: 10, y: 10, width: 300, height: 50 },
          selected: true,
          confidence: 0.5,
          language: 'en',
        });
      }

      return regions;
    } catch (err) {
      console.error('OCR failed:', err);
      return [];
    } finally {
      setDetecting(false);
    }
  }, []);

  return { detectText, detecting };
}
