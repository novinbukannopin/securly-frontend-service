'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';

type ColorPickerProps = {
  onColorChange: (color: string) => void;
};

export default function ColorPicker({ onColorChange }: ColorPickerProps) {
  const [color, setColor] = useState('#000000');
  const [inputColor, setInputColor] = useState('#000000');

  const setSelectedColor = (newColor: string) => {
    if (/^#[0-9A-F]{6}$/i.test(newColor)) {
      setColor(newColor.toUpperCase());
      setInputColor(newColor.toUpperCase());
      onColorChange(newColor.toUpperCase());
    }
  };

  const colors = [
    '#000000',
    '#EF4444',
    '#F97316',
    '#EC4899',
    '#EAB308',
    '#22C55E',
    '#3B82F6',
    '#A855F7',
  ];

  return (
    <div className='w-full max-w-sm space-y-4'>
      <div className='space-y-2'>
        <label className='text-sm font-medium'>QR Code Color</label>
        <div className='flex items-center space-x-2'>
          <Input
            type='text'
            value={inputColor}
            onChange={(e) => {
              const newColor = e.target.value;
              setInputColor(newColor);
              if (/^#[0-9A-F]{6}$/i.test(newColor)) {
                setSelectedColor(newColor);
              }
            }}
            onBlur={() => setInputColor(color)}
            className='font-mono'
          />
          <input
            type='color'
            value={color}
            onChange={(e) => setSelectedColor(e.target.value)}
            className='h-10 w-10 cursor-pointer overflow-hidden rounded-full border-2'
          />
        </div>
        <div className='mt-2 flex space-x-2'>
          {colors.map((c) => (
            <button
              type={'button'}
              key={c}
              onClick={() => setSelectedColor(c)}
              className='h-5 w-5 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-offset-2'
              style={{ backgroundColor: c }}
              aria-label={`Select color ${c}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
