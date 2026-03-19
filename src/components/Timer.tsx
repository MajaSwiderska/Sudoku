@'
import React from 'react';

interface TimerProps {
  time: number;
}

export function Timer({ time }: TimerProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="font-mono text-xl font-bold text-primary">
      {formatTime(time)}
    </div>
  );
}
'@ | Out-File -FilePath src\components\Timer.tsx -Encoding UTF8