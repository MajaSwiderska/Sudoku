import React from 'react';
import { Delete } from 'lucide-react';

interface NumberPadProps {
  onNumberClick: (num: number | null) => void;
  disabled: boolean;
}

export function NumberPad({ onNumberClick, disabled }: NumberPadProps) {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="grid grid-cols-5 gap-3 bg-card rounded-2xl p-5 shadow-lg border-2 border-primary/20">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => onNumberClick(num)}
            disabled={disabled}
            className={`
              aspect-square rounded-xl
              flex items-center justify-center
              text-2xl font-bold
              transition-all duration-200
              ${
                disabled
                  ? 'bg-muted text-muted-foreground cursor-not-allowed'
                  : 'bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground shadow-md hover:shadow-xl active:scale-95 hover:scale-105'
              }
            `}
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => onNumberClick(null)}
          disabled={disabled}
          className={`
            aspect-square rounded-xl
            flex items-center justify-center
            transition-all duration-200
            ${
              disabled
                ? 'bg-muted text-muted-foreground cursor-not-allowed'
                : 'bg-destructive text-destructive-foreground hover:opacity-90 shadow-md hover:shadow-xl active:scale-95 hover:scale-105'
            }
          `}
        >
          <Delete className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
}