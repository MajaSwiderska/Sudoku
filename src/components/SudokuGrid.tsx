import React from 'react';
import { SudokuCell } from './SudokuCell';
import type { SudokuGrid as GridType } from '../utils/sudoku';
import { isValidPlacement } from '../utils/sudoku';

interface SudokuGridProps {
  grid: GridType;
  initialGrid: GridType;
  selectedCell: { row: number; col: number } | null;
  onCellClick: (row: number, col: number) => void;
}

export function SudokuGrid({
  grid,
  initialGrid,
  selectedCell,
  onCellClick,
}: SudokuGridProps) {
  const isHighlighted = (row: number, col: number): boolean => {
    if (!selectedCell) return false;
    
    // Same row, column, or 3x3 box
    const sameRow = row === selectedCell.row;
    const sameCol = col === selectedCell.col;
    const sameBox =
      Math.floor(row / 3) === Math.floor(selectedCell.row / 3) &&
      Math.floor(col / 3) === Math.floor(selectedCell.col / 3);
    
    return sameRow || sameCol || sameBox;
  };

  const isInvalid = (row: number, col: number): boolean => {
    const value = grid[row][col];
    if (!value) return false;
    
    // Temporarily remove the value to check if it's valid
    const tempGrid = grid.map(r => [...r]);
    tempGrid[row][col] = null;
    
    return !isValidPlacement(tempGrid, row, col, value);
  };

  return (
    <div className="inline-block bg-[var(--grid-border)] p-[4px] rounded-2xl shadow-2xl">
      <div className="grid grid-cols-9 gap-0 bg-[var(--cell-bg)] rounded-xl overflow-hidden">
        {grid.map((row, rowIndex) =>
          row.map((_, colIndex) => (
            <SudokuCell
              key={`${rowIndex}-${colIndex}`}
              value={grid[rowIndex][colIndex]}
              isInitial={initialGrid[rowIndex][colIndex] !== null}
              isSelected={
                selectedCell?.row === rowIndex && selectedCell?.col === colIndex
              }
              isHighlighted={isHighlighted(rowIndex, colIndex)}
              isInvalid={isInvalid(rowIndex, colIndex)}
              onClick={() => onCellClick(rowIndex, colIndex)}
              row={rowIndex}
              col={colIndex}
            />
          ))
        )}
      </div>
    </div>
  );
}