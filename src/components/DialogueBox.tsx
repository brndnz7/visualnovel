import React from 'react';
import { useTypewriter } from '../hooks/useTypewriter';
import charactersData from '../data/characters.json';

interface DialogueBoxProps {
  dialogue: {
    speaker: string;
    text: string;
  };
  onNext: () => void;
  textSpeed: number;
  playerName: string;
  isSkipMode?: boolean;
}

export const DialogueBox: React.FC<DialogueBoxProps> = ({
  dialogue,
  onNext,
  textSpeed,
  playerName,
  isSkipMode = false,
}) => {
  if (!dialogue) return null;

  const speakerInfo = charactersData[dialogue.speaker as keyof typeof charactersData] || { 
    name: dialogue.speaker 
  };
  
  const processedText = dialogue.text.replace('{playerName}', playerName);
  
  const { displayedText, isTyping, skipToEnd } = useTypewriter({
    text: processedText,
    speed: textSpeed,
    onComplete: isSkipMode ? onNext : undefined,
    skip: isSkipMode,
  });

  const handleClick = () => {
    if (isTyping) {
      skipToEnd();
    } else {
      onNext();
    }
  };

  return (
    <div
      className="absolute bottom-28 left-8 right-8 md:left-16 md:right-16 cursor-pointer z-20 animate-slideUp"
      onClick={handleClick}
      style={{
        minHeight: '160px',
        maxHeight: '30%',
      }}
    >
      {/* Boîte de dialogue moderne avec bordure neutre */}
      <div 
        className="relative w-full h-full rounded-3xl overflow-hidden backdrop-blur-sm"
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          border: '3px solid #cbd5e1',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
        }}
      >
        <div className="relative p-6 md:p-8 flex flex-col justify-between h-full min-h-[160px]">
          <div className="flex-1">
            {dialogue.speaker !== 'Narrator' && (
              <div className="mb-3 inline-block">
                <div 
                  className="px-5 py-2 rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, #64748b 0%, #94a3b8 100%)',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)',
                  }}
                >
                  <span className="font-bold text-base md:text-lg text-white">
                    {dialogue.speaker === 'Player' ? playerName : speakerInfo.name}
                  </span>
                </div>
              </div>
            )}
            <p 
              className="dialogue-text text-lg md:text-xl text-gray-800"
              style={{
                wordBreak: 'break-word',
                whiteSpace: 'pre-wrap',
              }}
            >
              {displayedText}
            </p>
          </div>

          {/* Indicateur de continuation - flèche simple */}
          {!isTyping && (
            <div className="flex items-center justify-end gap-2 mt-4">
              <span className="text-sm text-gray-500">Cliquer pour continuer</span>
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-500"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
