import React, { useState, useEffect, useCallback } from 'react';
import { SudokuGrid } from './components/SudokuGrid';
import { GameControls } from './components/GameControl';
import { NumberPad } from './components/NumberPad';
import { CompletionModal } from './components/CompletionModal';
import { ScoreSheet } from './components/ScoreSheet';
import { Heart } from 'lucide-react';
import {
  generatePuzzle,
  isPuzzleComplete,
  type SudokuGrid as GridType,
  type Difficulty,
} from './utils/sudoku';

export default function App() {
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [grid, setGrid] = useState<GridType>([]);
  const [initialGrid, setInitialGrid] = useState<GridType>([]);
  const [solution, setSolution] = useState<GridType>([]);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  
  // Stats
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [gamesCompleted, setGamesCompleted] = useState(0);
  const [bestTimes, setBestTimes] = useState<Record<Difficulty, number | null>>({
    easy: null,
    medium: null,
    hard: null,
  });

  // Initialize game
  const initializeGame = useCallback((diff: Difficulty) => {
    const { puzzle, solution: sol } = generatePuzzle(diff);
    setGrid(puzzle);
    setInitialGrid(puzzle);
    setSolution(sol);
    setSelectedCell(null);
    setTime(0);
    setIsRunning(true);
    setShowCompletion(false);
    setGamesPlayed(prev => prev + 1);
  }, []);

  // Initialize on mount
  useEffect(() => {
    initializeGame(difficulty);
  }, [initializeGame, difficulty]);

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((t) => t + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  // Check for completion
  useEffect(() => {
    if (grid.length > 0 && solution.length > 0 && isPuzzleComplete(grid, solution)) {
      setIsRunning(false);
      setShowCompletion(true);
      setGamesCompleted(prev => prev + 1);

      // Update best time
      setBestTimes(prev => {
        const currentBest = prev[difficulty];
        if (currentBest === null || time < currentBest) {
          return { ...prev, [difficulty]: time };
        }
        return prev;
      });
    }
  }, [grid, solution, difficulty, time]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedCell) return;

      const { row, col } = selectedCell;

      // Can't modify initial cells
      if (initialGrid[row]?.[col] !== null) return;

      // Number keys
      if (e.key >= '1' && e.key <= '9') {
        e.preventDefault();
        const num = parseInt(e.key);
        const newGrid = grid.map((r) => [...r]);
        newGrid[row][col] = num;
        setGrid(newGrid);
      }

      // Backspace or Delete
      if (e.key === 'Backspace' || e.key === 'Delete') {
        e.preventDefault();
        const newGrid = grid.map((r) => [...r]);
        newGrid[row][col] = null;
        setGrid(newGrid);
      }

      // Arrow keys
      if (e.key.startsWith('Arrow')) {
        e.preventDefault();
        let newRow = row;
        let newCol = col;

        switch (e.key) {
          case 'ArrowUp':
            newRow = Math.max(0, row - 1);
            break;
          case 'ArrowDown':
            newRow = Math.min(8, row + 1);
            break;
          case 'ArrowLeft':
            newCol = Math.max(0, col - 1);
            break;
          case 'ArrowRight':
            newCol = Math.min(8, col + 1);
            break;
        }

        setSelectedCell({ row: newRow, col: newCol });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCell, grid, initialGrid]);

  // Theme toggle
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleCellClick = (row: number, col: number) => {
    setSelectedCell({ row, col });
  };

  const handleNumberClick = (num: number | null) => {
    if (!selectedCell) return;

    const { row, col } = selectedCell;
    
    // Can't modify initial cells
    if (initialGrid[row][col] !== null) return;

    const newGrid = grid.map((r) => [...r]);
    newGrid[row][col] = num;
    setGrid(newGrid);
  };

  const handleNewGame = () => {
    initializeGame(difficulty);
  };

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    initializeGame(newDifficulty);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-start p-4 sm:p-8 transition-colors duration-300">
      <div className="w-full max-w-7xl space-y-6 sm:space-y-8">
        {/* Controls */}
        <GameControls
          difficulty={difficulty}
          onDifficultyChange={handleDifficultyChange}
          onNewGame={handleNewGame}
          time={time}
          isDark={isDark}
          onThemeToggle={() => setIsDark(!isDark)}
        />

        {/* Main Game Area - Grid and Score Sheet Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
          {/* Left side - Grid */}
          <div className="flex flex-col items-center gap-6">
            <div className="flex justify-center scale-90 sm:scale-100 lg:scale-110">
              {grid.length > 0 && (
                <SudokuGrid
                  grid={grid}
                  initialGrid={initialGrid}
                  selectedCell={selectedCell}
                  onCellClick={handleCellClick}
                />
              )}
            </div>

            {/* Number Pad */}
            <NumberPad
              onNumberClick={handleNumberClick}
              disabled={
                !selectedCell || 
                (selectedCell && initialGrid[selectedCell.row]?.[selectedCell.col] !== null) || 
                false
              }
            />
          </div>

          {/* Right side - Score Sheet */}
          <div className="lg:sticky lg:top-8">
            <ScoreSheet
              currentDifficulty={difficulty}
              gamesPlayed={gamesPlayed}
              gamesCompleted={gamesCompleted}
              bestTimes={bestTimes}
            />
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-card rounded-2xl p-6 shadow-lg border-2 border-primary/20">
          <div className="flex items-center gap-2 mb-3">
            <Heart className="w-5 h-5 text-primary fill-primary" />
            <h3 className="text-primary">How to Play</h3>
          </div>
          <ul className="space-y-2 text-sm text-foreground/80">
            <li>• Click on any empty cell to select it</li>
            <li>• Press numbers 1-9 to fill in cells or use the number pad</li>
            <li>• Press Backspace/Delete to clear a cell</li>
            <li>• Use arrow keys to navigate between cells</li>
            <li>• Each row, column, and 3×3 box must contain numbers 1-9</li>
            <li>• Invalid entries are highlighted in red</li>
          </ul>
        </div>
      </div>

      {/* Completion Modal */}
      <CompletionModal
        isOpen={showCompletion}
        time={time}
        difficulty={difficulty}
        onNewGame={handleNewGame}
      />
    </div>
  );
}