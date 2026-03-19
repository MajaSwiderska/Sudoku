import React from 'react';
import { RotateCcw, Moon, Sun, Timer, Sparkles } from 'lucide-react';
import { formatTime, type Difficulty } from '../utils/sudoku';

interface GameControlsProps {
  difficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onNewGame: () => void;
  time: number;
  isDark: boolean;
  onThemeToggle: () => void;
}

export function GameControls({
  difficulty,
  onDifficultyChange,
  onNewGame,
  time,
  isDark,
  onThemeToggle,
}: GameControlsProps) {
  return (
    <div className="w-full space-y-6">
      {/* Header with title, timer, and theme toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl sm:text-6xl text-primary flex items-center gap-2">
            <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 fill-primary" />
            Pink Sudoku
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Timer */}
          <div className="flex items-center gap-2 px-4 py-2.5 bg-card rounded-full shadow-lg border-2 border-primary/20">
            <Timer className="w-5 h-5 text-primary" />
            <span className="font-mono text-xl font-bold text-primary">
              {formatTime(time)}
            </span>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={onThemeToggle}
            className="p-3 rounded-full bg-card hover:bg-accent transition-all duration-200 shadow-lg hover:shadow-xl border-2 border-primary/20 hover:scale-105 active:scale-95"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-6 h-6 text-primary" />
            ) : (
              <Moon className="w-6 h-6 text-primary" />
            )}
          </button>
        </div>
      </div>

      {/* Difficulty and New Game Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-3 bg-card rounded-2xl p-5 shadow-lg border-2 border-primary/20">
        {/* Difficulty Buttons */}
        <div className="flex gap-2 flex-1">
          {(['easy', 'medium', 'hard'] as const).map((level) => (
            <button
              key={level}
              onClick={() => onDifficultyChange(level)}
              className={`
                flex-1 px-5 py-3 rounded-xl font-medium
                transition-all duration-200
                ${
                  difficulty === level
                    ? 'bg-primary text-primary-foreground shadow-lg scale-105 ring-2 ring-primary/50'
                    : 'bg-secondary text-secondary-foreground hover:bg-accent hover:scale-102'
                }
              `}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>

        {/* New Game Button */}
        <button
          onClick={onNewGame}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
        >
          <RotateCcw className="w-5 h-5" />
          <span className="font-medium">New Game</span>
        </button>
      </div>
    </div>
  );
}
