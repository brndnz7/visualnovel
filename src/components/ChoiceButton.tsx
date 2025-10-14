import React, { useState } from 'react';

interface Choice {
  text: string;
  next: string;
  effects?: Record<string, number>;
  condition?: string;
}

interface ChoiceButtonProps {
  choice: Choice;
  index: number;
  onChoice: (choice: Choice) => void;
}

export const ChoiceButton: React.FC<ChoiceButtonProps> = ({ choice, index, onChoice }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={() => onChoice(choice)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full overflow-hidden animate-slideUp"
      style={{
        minHeight: '70px',
        animationDelay: `${index * 100}ms`,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        borderRadius: '20px',
        background: isHovered ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.92)',
        border: '2px solid rgba(148, 163, 184, 0.4)',
        boxShadow: isHovered 
          ? '0 8px 30px rgba(0, 0, 0, 0.2)' 
          : '0 4px 15px rgba(0, 0, 0, 0.1)',
        transform: isHovered ? 'translateY(-3px) scale(1.01)' : 'translateY(0) scale(1)',
      }}
    >
      {/* Gradient subtil au survol */}
      {isHovered && (
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            background: 'linear-gradient(135deg, #64748b 0%, #94a3b8 100%)',
          }}
        />
      )}
      
      <div className="relative flex items-center justify-center h-full px-8 py-4">
        <p 
          className="text-gray-800 font-semibold text-lg md:text-xl text-center leading-relaxed"
          style={{
            transition: 'color 0.3s ease',
            color: isHovered ? '#334155' : '#1f2937',
          }}
        >
          {choice.text}
        </p>
      </div>
    </button>
  );
};
