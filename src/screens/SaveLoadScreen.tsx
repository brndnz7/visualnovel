import React, { useState, useEffect } from 'react';
import { X, Save, Trash2, Clock } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { SaveManager, SaveSlot } from '../utils/saveManager';

interface SaveLoadScreenProps {
  mode: 'save' | 'load';
}

export const SaveLoadScreen: React.FC<SaveLoadScreenProps> = ({ mode }) => {
  const setGameState = useGameStore((s) => s.setGameState);
  const gameState = useGameStore((s) => s);
  const [saves, setSaves] = useState<(SaveSlot | null)[]>([]);
  const [showConfirmDelete, setShowConfirmDelete] = useState<number | null>(null);
  const [hoveredSlot, setHoveredSlot] = useState<number | null>(null);

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
      customCharacter: gameState.customCharacter,
      currentSceneId: gameState.currentSceneId,
      relationships: gameState.relationships,
      energy: gameState.energy,
      flags: gameState.flags,
      playtime: 0,
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
      customCharacter: save.customCharacter || null,
      currentSceneId: save.currentSceneId,
      relationships: save.relationships,
      energy: save.energy,
      flags: save.flags,
      gameState: 'Playing',
    });
    // Recharger l'énergie après chargement
    useGameStore.getState().rechargeEnergy();
  };

  const handleDelete = (slotId: number) => {
    SaveManager.deleteSave(slotId);
    loadSaves();
    setShowConfirmDelete(null);
  };

  return (
    <div
      className="w-full h-full flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: 'url("/assets/backgrounds/Cafeteria 4.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay sombre */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Bouton fermer */}
      <button
        onClick={() => setGameState(mode === 'save' ? 'Playing' : 'MainMenu')}
        className="absolute top-6 right-6 z-20 p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white transition-all"
      >
        <X size={24} />
      </button>

      {/* Contenu principal */}
      <div className="relative z-10 w-full max-w-6xl px-6 py-8 overflow-y-auto max-h-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className="text-6xl md:text-7xl font-bold text-white mb-4"
            style={{
              fontFamily: "'Quicksand', sans-serif",
              textShadow: '0 4px 20px rgba(0,0,0,0.8)',
            }}
          >
            {mode === 'save' ? 'Sauvegarder' : 'Charger'}
          </h1>
          <div
            className="h-1 w-48 mx-auto rounded-full bg-gradient-to-r from-transparent via-pink-500 to-transparent"
            style={{ boxShadow: '0 2px 10px rgba(236, 72, 153, 0.5)' }}
          />
          <p className="text-white/80 mt-4 text-lg">
            {mode === 'save' ? 'Choisissez un slot pour sauvegarder' : 'Sélectionnez une sauvegarde à charger'}
          </p>
        </div>

        {/* Grille des sauvegardes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {saves.map((save, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredSlot(index)}
              onMouseLeave={() => setHoveredSlot(null)}
              className={`relative p-6 rounded-2xl backdrop-blur-md border-2 transition-all duration-300 cursor-pointer ${
                hoveredSlot === index
                  ? 'scale-105 border-white shadow-2xl'
                  : 'border-white/30 hover:border-white/50'
              }`}
              style={{
                background: hoveredSlot === index
                  ? 'rgba(255, 255, 255, 0.15)'
                  : 'rgba(0, 0, 0, 0.4)',
                minHeight: '220px',
              }}
              onClick={() => {
                if (mode === 'save') {
                  handleSave(index);
                } else if (save) {
                  handleLoad(save);
                }
              }}
            >
              {/* Header du slot */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-pink-500 to-purple-500">
                    <Save size={20} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Slot {index + 1}</h3>
                </div>
                {save && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowConfirmDelete(index);
                    }}
                    className="p-2 bg-red-500/80 hover:bg-red-600 rounded-lg transition-all hover:scale-110"
                  >
                    <Trash2 size={18} className="text-white" />
                  </button>
                )}
              </div>

              {/* Contenu du slot */}
              {save ? (
                <div className="space-y-3">
                  <p className="text-2xl text-white font-bold">{save.playerName}</p>
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <Clock size={16} />
                    <span>{SaveManager.formatTimestamp(save.timestamp)}</span>
                  </div>
                  <div className="p-4 bg-white/10 rounded-xl border border-white/30">
                    <p className="text-sm text-white/90 mb-2">
                      <span className="font-semibold">Scène:</span> {save.currentSceneId}
                    </p>
                    <p className="text-sm text-white/90">
                      <span className="font-semibold">Énergie:</span> {save.energy}
                    </p>
                  </div>
                  {hoveredSlot === index && (
                    <div className="mt-4 text-center">
                      <span className="text-sm text-white/90 font-semibold">
                        {mode === 'save' ? '💾 Cliquez pour écraser' : '📂 Cliquez pour charger'}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <Save size={48} className="text-white/30 mb-4" />
                  <p className="text-white/60 text-lg text-center">
                    {mode === 'save' ? 'Slot vide\nCliquez pour sauvegarder' : 'Slot vide'}
                  </p>
                </div>
              )}

              {/* Confirmation de suppression */}
              {showConfirmDelete === index && (
                <div
                  className="absolute inset-0 z-20 flex items-center justify-center bg-black/95 rounded-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="text-center p-6">
                    <h4 className="text-2xl font-bold text-white mb-6">
                      Supprimer cette sauvegarde ?
                    </h4>
                    <div className="flex gap-4 justify-center">
                      <button
                        onClick={() => setShowConfirmDelete(null)}
                        className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-xl text-white font-semibold transition-all"
                      >
                        Annuler
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-xl text-white font-semibold transition-all"
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
    </div>
  );
};
