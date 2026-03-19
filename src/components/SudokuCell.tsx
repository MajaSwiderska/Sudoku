import React from 'react';
import { cn } from '../utils/utils';

interface SudokuCellProps {
    value: number | null;
    isInitial: boolean;
    isSelected: boolean;
    isHighlighted: boolean;
    isInvalid: boolean;
    onClick: () => void;
    row: number;
    col: number;
}

export function SudokuCell({
    value,
    isInitial,
    isSelected,
    isHighlighted,
    isInvalid,
    onClick,
    row,
    col,
}: SudokuCellProps) {
  const getBorderClasses = () => {
    const classes = [];
    
    // Right border (every 3 columns)
    if ((col + 1) % 3 === 0 && col !== 8) {
      classes.push('border-r-2 border-[var(--grid-border)]');
    }
    
    // Bottom border (every 3 rows)
    if ((row + 1) % 3 === 0 && row !== 8) {
      classes.push('border-b-2 border-[var(--grid-border)]');
    }
    
    return classes.join(' ');
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        // Base styles
        "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16",
        "flex items-center justify-center",
        "text-xl sm:text-2xl font-bold",
        "transition-all duration-150",
        "focus:outline-none",
        
        // Border styles
        "border border-[var(--grid-border-light)]",
        getBorderClasses(),
        
        // Background colors based on state
        isSelected && "bg-[var(--cell-selected)]",
        !isSelected && isHighlighted && "bg-[var(--cell-highlight)]",
        !isSelected && !isHighlighted && "bg-[var(--cell-bg)]",
        
        // Hover effect (but not on selected cells)
        !isSelected && "hover:bg-[var(--cell-hover)]",
        
        // Invalid cells
        isInvalid && "bg-[var(--cell-invalid)]",
        
        // Text colors
        isInitial ? "text-[var(--cell-number-initial)]" : "text-[var(--cell-number)]",
        !value && "text-transparent"
      )}
    >
      {value}
    </button>
  );
}