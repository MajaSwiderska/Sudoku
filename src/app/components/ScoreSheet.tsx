import React from 'react';
import { Trophy, Star, Zap, Target } from 'lucide-react';
import type { Difficulty } from '../utils/sudoku';

interface ScoreSheetProps {
  currentDifficulty: Difficulty;
  gamesPlayed: number;
  gamesCompleted: number;
  bestTimes: Record<Difficulty, number | null>;
}

export function ScoreSheet({
  currentDifficulty,
  gamesPlayed,
  gamesCompleted,
  bestTimes,
}: ScoreSheetProps) {
  const formatBestTime = (seconds: number | null) => {
    if (seconds === null) return '--:--';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full space-y-4">
      {/* Stats Cards */}
      <div className="bg-card rounded-2xl p-6 shadow-lg space-y-4 border-2 border-primary/20">
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-6 h-6 text-primary fill-primary" />
          <h3 className="text-primary">Your Stats</h3>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-secondary/50 rounded-xl p-4 text-center">
            <div className="flex justify-center mb-2">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <div className="text-2xl font-bold text-primary">{gamesPlayed}</div>
            <div className="text-xs text-foreground/60">Games Played</div>
          </div>

          <div className="bg-secondary/50 rounded-xl p-4 text-center">
            <div className="flex justify-center mb-2">
              <Trophy className="w-5 h-5 text-primary" />
            </div>
            <div className="text-2xl font-bold text-primary">{gamesCompleted}</div>
            <div className="text-xs text-foreground/60">Completed</div>
          </div>
        </div>
      </div>

      {/* Best Times */}
      <div className="bg-card rounded-2xl p-6 shadow-lg space-y-4 border-2 border-primary/20">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-6 h-6 text-primary fill-primary" />
          <h3 className="text-primary">Best Times</h3>
        </div>

        <div className="space-y-3">
          {(['easy', 'medium', 'hard'] as const).map((level) => (
            <div
              key={level}
              className={`
                flex items-center justify-between p-3 rounded-xl
                transition-all duration-200
                ${
                  currentDifficulty === level
                    ? 'bg-primary/20 ring-2 ring-primary'
                    : 'bg-secondary/50'
                }
              `}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`
                    w-2 h-2 rounded-full
                    ${currentDifficulty === level ? 'bg-primary' : 'bg-muted-foreground'}
                  `}
                />
                <span className="font-medium capitalize text-foreground">
                  {level}
                </span>
              </div>
              <span className="font-mono text-primary font-bold">
                {formatBestTime(bestTimes[level])}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Cute motivational message */}
      <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-4 text-center border-2 border-primary/20">
        <p className="text-sm text-foreground/70">
          ✨ Keep solving puzzles! ✨
        </p>
      </div>
    </div>
  );
}