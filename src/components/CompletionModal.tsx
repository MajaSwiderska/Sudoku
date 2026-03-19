import React from 'react';
import { Trophy, Clock } from 'lucide-react';
import { formatTime, type Difficulty } from '../utils/sudoku';

interface CompletionModalProps {
  isOpen: boolean;
  time: number;
  difficulty: Difficulty;
  onNewGame: () => void;
}

export function CompletionModal({
  isOpen,
  time,
  difficulty,
  onNewGame,
}: CompletionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-card rounded-3xl p-8 shadow-2xl max-w-md w-full border-4 border-primary animate-in zoom-in duration-300">
        <div className="text-center space-y-6">
          {/* Trophy Icon */}
          <div className="flex justify-center">
            <div className="p-6 bg-primary rounded-full shadow-xl animate-bounce">
              <Trophy className="w-16 h-16 text-primary-foreground" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-4xl text-primary">
            🎉 Congratulations! 🎉
          </h2>

          {/* Message */}
          <p className="text-lg text-foreground">
            You've completed the{' '}
            <span className="font-bold text-primary">
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </span>{' '}
            puzzle!
          </p>

          {/* Time */}
          <div className="flex items-center justify-center gap-3 bg-secondary rounded-2xl p-5 border-2 border-primary/20">
            <Clock className="w-6 h-6 text-primary" />
            <span className="text-3xl font-mono font-bold text-primary">
              {formatTime(time)}
            </span>
          </div>

          {/* Button */}
          <button
            onClick={onNewGame}
            className="w-full py-4 px-6 bg-primary text-primary-foreground rounded-2xl hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 hover:scale-105 font-bold text-lg"
          >
            ✨ Play Again ✨
          </button>
        </div>
      </div>
    </div>
  );
}