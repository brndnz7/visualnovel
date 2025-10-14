import React from 'react';
import { ChevronsRight, Play, Pause, History } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

interface GameControlsProps {
  onShowHistory: () => void;
}

export const GameControls: React.FC<GameControlsProps> = ({ onShowHistory }) => {
  const isSkipMode = useGameStore((state) => state.isSkipMode);
  const isAutoMode = useGameStore((state) => state.isAutoMode);
  const toggleSkipMode = useGameStore((state) => state.toggleSkipMode);
  const toggleAutoMode = useGameStore((state) => state.toggleAutoMode);

  const ControlButton = ({ 
    onClick, 
    isActive, 
    icon: Icon, 
    label, 
    title 
  }: { 
    onClick: () => void; 
    isActive?: boolean; 
    icon: any; 
    label: string; 
    title: string;
  }) => (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-3 rounded-xl transition-all hover:scale-105 font-semibold"
      style={{
        background: isActive 
          ? 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)' 
          : 'rgba(255, 255, 255, 0.9)',
        color: isActive ? 'white' : '#6b7280',
        border: isActive ? 'none' : '2px solid rgba(236, 72, 153, 0.2)',
        boxShadow: isActive 
          ? '0 4px 15px rgba(236, 72, 153, 0.3)' 
          : '0 2px 10px rgba(0, 0, 0, 0.05)',
      }}
      title={title}
    >
      <Icon size={18} />
      <span className="text-sm hidden md:inline">{label}</span>
    </button>
  );

  return (
    <div className="absolute bottom-6 right-6 flex gap-3 z-10">
      <ControlButton
        onClick={toggleSkipMode}
        isActive={isSkipMode}
        icon={ChevronsRight}
        label="Skip"
        title="Mode Skip (S)"
      />
      
      <ControlButton
        onClick={toggleAutoMode}
        isActive={isAutoMode}
        icon={isAutoMode ? Pause : Play}
        label="Auto"
        title="Mode Auto (A)"
      />
      
      <ControlButton
        onClick={onShowHistory}
        icon={History}
        label="Log"
        title="Historique (H)"
      />
    </div>
  );
};
