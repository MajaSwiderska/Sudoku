// Sudoku generation and validation utilities

export type SudokuGrid = (number | null)[][];
export type Difficulty = 'easy' | 'medium' | 'hard';

// Check if placing a number is valid
export function isValidPlacement(
  grid: SudokuGrid,
  row: number,
  col: number,
  num: number
): boolean {
  // Check row
  for (let x = 0; x < 9; x++) {
    if (grid[row][x] === num) return false;
  }

  // Check column
  for (let x = 0; x < 9; x++) {
    if (grid[x][col] === num) return false;
  }

  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[boxRow + i][boxCol + j] === num) return false;
    }
  }

  return true;
}

// Solve sudoku using backtracking
function solveSudoku(grid: SudokuGrid): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === null) {
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        // Shuffle for randomness
        for (let i = numbers.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }

        for (const num of numbers) {
          if (isValidPlacement(grid, row, col, num)) {
            grid[row][col] = num;
            if (solveSudoku(grid)) return true;
            grid[row][col] = null;
          }
        }
        return false;
      }
    }
  }
  return true;
}

// Generate a complete solved sudoku
function generateSolvedSudoku(): SudokuGrid {
  const grid: SudokuGrid = Array(9)
    .fill(null)
    .map(() => Array(9).fill(null));
  solveSudoku(grid);
  return grid;
}

// Remove cells to create puzzle
function removeNumbers(grid: SudokuGrid, difficulty: Difficulty): SudokuGrid {
  const puzzle = grid.map(row => [...row]);
  
  const cellsToRemove = {
    easy: 35,
    medium: 45,
    hard: 55
  }[difficulty];

  let removed = 0;
  while (removed < cellsToRemove) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    
    if (puzzle[row][col] !== null) {
      puzzle[row][col] = null;
      removed++;
    }
  }

  return puzzle;
}

// Generate a new puzzle
export function generatePuzzle(difficulty: Difficulty): {
  puzzle: SudokuGrid;
  solution: SudokuGrid;
} {
  const solution = generateSolvedSudoku();
  const puzzle = removeNumbers(solution, difficulty);
  
  return { puzzle, solution };
}

// Check if the current grid state is valid
export function isGridValid(grid: SudokuGrid): boolean {
  // Check all rows
  for (let row = 0; row < 9; row++) {
    const seen = new Set<number>();
    for (let col = 0; col < 9; col++) {
      const num = grid[row][col];
      if (num !== null) {
        if (seen.has(num)) return false;
        seen.add(num);
      }
    }
  }

  // Check all columns
  for (let col = 0; col < 9; col++) {
    const seen = new Set<number>();
    for (let row = 0; row < 9; row++) {
      const num = grid[row][col];
      if (num !== null) {
        if (seen.has(num)) return false;
        seen.add(num);
      }
    }
  }

  // Check all 3x3 boxes
  for (let boxRow = 0; boxRow < 9; boxRow += 3) {
    for (let boxCol = 0; boxCol < 9; boxCol += 3) {
      const seen = new Set<number>();
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const num = grid[boxRow + i][boxCol + j];
          if (num !== null) {
            if (seen.has(num)) return false;
            seen.add(num);
          }
        }
      }
    }
  }

  return true;
}

// Check if puzzle is complete and correct
export function isPuzzleComplete(grid: SudokuGrid, solution: SudokuGrid): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] !== solution[row][col]) return false;
    }
  }
  return true;
}

// Format time in MM:SS
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}