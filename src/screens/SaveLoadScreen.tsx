import React, { useState, useEffect } from 'react';
import { ChevronLeft, Save, Trash2, Clock } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { SaveManager, SaveSlot } from '../utils/saveManager';
import { GAME_CONFIG } from '../config/game';

interface SaveLoadScreenProps {
  mode: 'save' | 'load';
}

export const SaveLoadScreen: React.FC<SaveLoadScreenProps> = ({ mode }) => {
  const setGameState = useGameStore((s) => s.setGameState);
  const gameState = useGameStore((s) => s);
  const [saves, setSaves] = useState<(SaveSlot | null)[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState<number | null>(null);

  useEffect(() => {
    loadSaves();
  }, []);

  const loadSaves = () => {
    setSaves(SaveManager.getAllSaves());
  };

  const handleSave = (slotId: number) => {
    const success = SaveManager.saveSave(slotId, {
      playerName: gameState.playerName,
      playerAvatar: gameState.playerAvatar,
      currentSceneId: gameState.currentSceneId,
      relationships: gameState.relationships,
      energy: gameState.energy,
      flags: gameState.flags,
      playtime: 0, // TODO: implémenter le tracking du temps de jeu
    });

    if (success) {
      loadSaves();
      setGameState('Playing');
    }
  };

  const handleLoad = (save: SaveSlot) => {
    useGameStore.setState({
      playerName: save.playerName,
      playerAvatar: save.playerAvatar,
      currentSceneId: save.currentSceneId,
      relationships: save.relationships,
      energy: save.energy,
      flags: save.flags,
      gameState: 'Playing',
    });
  };

  const handleDelete = (slotId: number) => {
    SaveManager.deleteSave(slotId);
    loadSaves();
    setShowConfirmDelete(null);
  };

  return (
    <div
      className="w-full h-full flex flex-col p-8 bg-cover bg-center overflow-y-auto"
      style={{
        backgroundImage: 'url(/assets/ui/Background.jpg)',
      }}
    >
      {/* En-tête */}
      <div className="flex items-center justify-between mb-8 animate-slideUp">
        <button
          onClick={() => setGameState(mode === 'save' ? 'Playing' : 'MainMenu')}
          className="flex items-center gap-2 px-6 py-3 bg-black/60 hover:bg-black/80 backdrop-blur-md rounded-full border border-white/30 transition-all hover:scale-105"
        >
          <ChevronLeft size={24} className="text-white" />
          <span className="text-white font-bold text-shadow">Retour</span>
        </button>

        <h1 className="text-5xl font-bold text-white text-shadow-lg">
          {mode === 'save' ? 'Sauvegarder' : 'Charger'}
        </h1>

        <div className="w-32"></div>
      </div>

      {/* Liste des sauvegardes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto w-full">
        {saves.map((save, index) => (
          <div
            key={index}
            className="relative animate-slideUp cursor-pointer group"
            style={{
              animationDelay: `${index * 50}ms`,
            }}
          >
            <div
              className="relative overflow-hidden rounded-2xl border-4 border-white/30 shadow-2xl transition-all duration-300 hover:scale-105 hover:border-white/50 p-6"
              style={{
                backgroundImage: 'url(/assets/ui/CharacterContainer.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '200px',
                backgroundColor: save ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.8)',
              }}
              onClick={() => {
                if (mode === 'save') {
                  handleSave(index);
                } else if (save) {
                  handleLoad(save);
                }
              }}
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white text-shadow-lg">
                    Slot {index + 1}
                  </h3>
                  {save && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowConfirmDelete(index);
                      }}
                      className="p-2 bg-red-500/80 hover:bg-red-600 rounded-full transition-all hover:scale-110"
                    >
                      <Trash2 size={20} className="text-white" />
                    </button>
                  )}
                </div>

                {save ? (
                  <div className="space-y-2">
                    <p className="text-xl text-pink-300 font-semibold text-shadow">
                      {save.playerName}
                    </p>
                    <div className="flex items-center gap-2 text-white/80 text-sm">
                      <Clock size={16} />
                      <span>{SaveManager.formatTimestamp(save.timestamp)}</span>
                    </div>
                    <div className="mt-3 p-3 bg-black/60 rounded-lg border border-white/20">
                      <p className="text-sm text-white/90">
                        Scène: {save.currentSceneId}
                      </p>
                      <p className="text-sm text-white/70 mt-1">
                        Énergie: {save.energy}/{GAME_CONFIG.ENERGY_MAX}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8">
                    <Save size={48} className="text-white/30 mb-4" />
                    <p className="text-white/50 text-lg">
                      {mode === 'save' ? 'Slot vide - Cliquez pour sauvegarder' : 'Slot vide'}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Confirmation de suppression */}
            {showConfirmDelete === index && (
              <div
                className="absolute inset-0 z-20 flex items-center justify-center bg-black/90 rounded-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center p-6">
                  <h4 className="text-2xl font-bold text-white mb-4">
                    Supprimer cette sauvegarde ?
                  </h4>
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={() => setShowConfirmDelete(null)}
                      className="px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg text-white font-bold transition-all"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-white font-bold transition-all"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};


