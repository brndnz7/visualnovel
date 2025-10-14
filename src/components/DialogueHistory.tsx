import React from 'react';
import { X } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

interface DialogueHistoryProps {
  onClose: () => void;
}

export const DialogueHistory: React.FC<DialogueHistoryProps> = ({ onClose }) => {
  const dialogueHistory = useGameStore((state) => state.dialogueHistory);
  const playerName = useGameStore((state) => state.playerName);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-gradient-to-br from-purple-900 to-indigo-900 w-full max-w-2xl h-[80vh] rounded-2xl border border-white/20 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <h2 className="text-3xl font-bold text-white text-shadow-lg">Historique des Dialogues</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <X size={24} className="text-white" />
          </button>
        </div>

        {/* Dialogue List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {dialogueHistory.length === 0 ? (
            <p className="text-white/70 text-center text-lg">Aucun dialogue enregistré pour le moment.</p>
          ) : (
            dialogueHistory.map((entry, index) => {
              const processedText = entry.dialogue.text.replace('{playerName}', playerName);
              const speakerName = entry.dialogue.speaker === 'Player' ? playerName : entry.dialogue.speaker;
              
              return (
                <div
                  key={index}
                  className="bg-black/30 backdrop-blur-md rounded-lg p-4 border border-white/10"
                >
                  {entry.dialogue.speaker !== 'Narrator' && (
                    <h4
                      className={`font-bold mb-2 ${
                        entry.dialogue.speaker === 'Player' ? 'text-pink-300' : 'text-cyan-300'
                      }`}
                    >
                      {speakerName}
                    </h4>
                  )}
                  <p className="text-white/90">{processedText}</p>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/20 flex justify-end">
          <button onClick={onClose} className="menu-button max-w-xs">
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

