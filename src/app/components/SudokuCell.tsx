import React from 'react';

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

