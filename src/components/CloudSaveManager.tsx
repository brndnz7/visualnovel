import React, { useState, useEffect } from 'react';
import { Save, Download, Trash2, Cloud, AlertCircle, X } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { SaveService, CloudSave } from '../services/saveService';
import { EPISODES } from '../data/episodeLoader';

interface CloudSaveManagerProps {
  mode: 'save' | 'load';
  onClose: () => void;
}

export const CloudSaveManager: React.FC<CloudSaveManagerProps> = ({ mode, onClose }) => {
  const user = useGameStore((s) => s.user);
  const currentSceneId = useGameStore((s) => s.currentSceneId);
  const relationships = useGameStore((s) => s.relationships);
  const flags = useGameStore((s) => s.flags);
  const coins = useGameStore((s) => s.coins);
  const energy = useGameStore((s) => s.energy);
  const playerName = useGameStore((s) => s.playerName);
  const customCharacter = useGameStore((s) => s.customCharacter);
  const dialogueHistory = useGameStore((s) => s.dialogueHistory);
  const phoneConversations = useGameStore((s) => s.phoneConversations);
  const setGameState = useGameStore((s) => s.setGameState);
  
  const [cloudSaves, setCloudSaves] = useState<CloudSave[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [saveName, setSaveName] = useState('');

  const TOTAL_SLOTS = 5;

  // Charger les sauvegardes cloud
  useEffect(() => {
    if (user) {
      loadCloudSaves();
    }
  }, [user]);

  const loadCloudSaves = async () => {
    if (!user) return;
    
    setLoading(true);
    setError('');
    
    try {
      const saves = await SaveService.getAllSaves(user.uid);
      console.log('Sauvegardes chargées:', saves);
      setCloudSaves(saves);
    } catch (err: any) {
      console.error('Erreur lors de la récupération des sauvegardes:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (slotNumber: number) => {
    if (!user) {
      setError('Vous devez être connecté pour sauvegarder en ligne');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Trouver l'épisode actuel
      let episodeTitle = '';
      for (const ep of EPISODES) {
        if (currentSceneId.startsWith(ep.id) || currentSceneId.includes(ep.id.replace('episode', 'ep'))) {
          episodeTitle = ep.title;
          break;
        }
      }

      const gameData = {
        currentSceneId,
        relationships,
        flags,
        coins,
        energy,
        playerName,
        customCharacter,
        dialogueHistory,
        phoneConversations,
      };

      const name = saveName.trim() || `Sauvegarde ${slotNumber + 1}`;

      await SaveService.saveGame(
        user.uid,
        slotNumber,
        name,
        gameData,
        episodeTitle || undefined,
        currentSceneId
      );

      await loadCloudSaves();
      setSelectedSlot(null);
      setSaveName('');
      
      useGameStore.getState().showNotification('Sauvegarde réussie !', 'success');
      
      // Fermer après 1 seconde
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLoad = async (slotNumber: number) => {
    if (!user) return;

    setLoading(true);
    setError('');

    try {
      const save = await SaveService.loadGame(user.uid, slotNumber);
      
      if (!save) {
        throw new Error('Sauvegarde introuvable');
      }

      // Charger les données dans le store
      const store = useGameStore.getState();
      if (save.gameData.currentSceneId) store.setCurrentScene(save.gameData.currentSceneId);
      if (save.gameData.relationships) {
        // Remplacer complètement les relations
        useGameStore.setState({ relationships: save.gameData.relationships });
      }
      if (save.gameData.flags) {
        Object.keys(save.gameData.flags).forEach(key => {
          store.setFlag(key, save.gameData.flags![key]);
        });
      }
      if (save.gameData.coins !== undefined) useGameStore.setState({ coins: save.gameData.coins });
      if (save.gameData.energy !== undefined) useGameStore.setState({ energy: save.gameData.energy });
      if (save.gameData.playerName) store.setPlayerName(save.gameData.playerName);
      if (save.gameData.customCharacter) store.setCustomCharacter(save.gameData.customCharacter);
      if (save.gameData.dialogueHistory) useGameStore.setState({ dialogueHistory: save.gameData.dialogueHistory });
      if (save.gameData.phoneConversations) useGameStore.setState({ phoneConversations: save.gameData.phoneConversations });

      useGameStore.getState().showNotification('Sauvegarde chargée !', 'success');
      
      // Retourner au jeu
      setGameState('Playing');
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slotNumber: number) => {
    if (!user) return;

    setLoading(true);
    setError('');

    try {
      await SaveService.deleteSave(user.uid, slotNumber);
      await loadCloudSaves();
      
      useGameStore.getState().showNotification('Sauvegarde supprimée', 'info');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getSaveForSlot = (slotNumber: number): CloudSave | undefined => {
    return cloudSaves.find(save => save.slotNumber === slotNumber);
  };

  if (!user) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
        <div 
          className="rounded-3xl p-8 max-w-md w-full mx-4 backdrop-blur-xl border-2"
          style={{
            background: 'rgba(0, 0, 0, 0.8)',
            borderColor: 'rgba(236, 72, 153, 0.5)',
          }}
        >
          <div className="flex items-center gap-3 text-yellow-400 mb-4">
            <AlertCircle size={32} />
            <h2 className="text-2xl font-bold text-white">Connexion requise</h2>
          </div>
          <p className="text-white/80 mb-6">
            Vous devez être connecté pour utiliser les sauvegardes en ligne.
          </p>
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl font-semibold text-white transition-all hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
            }}
          >
            Fermer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div 
        className="rounded-3xl p-8 max-w-4xl w-full my-8 backdrop-blur-xl border-2"
        style={{
          background: 'rgba(0, 0, 0, 0.85)',
          borderColor: 'rgba(236, 72, 153, 0.5)',
          boxShadow: '0 10px 40px rgba(236, 72, 153, 0.4)',
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 
              className="text-5xl font-bold text-white flex items-center gap-3"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            >
              <Cloud size={48} className="text-pink-400" />
              {mode === 'save' ? 'Sauvegarder' : 'Charger'}
            </h1>
            <p className="text-white/70 mt-2">
              Connecté en tant que <span className="font-semibold text-white">{user.displayName}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
          >
            <X size={24} className="text-white" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 rounded-xl bg-red-500/20 border border-red-500/50 text-red-200">
            {error}
          </div>
        )}

        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
            <p className="mt-4 text-white/70">Chargement...</p>
          </div>
        )}

        {!loading && (
          <div className="grid grid-cols-1 gap-4">
            {Array.from({ length: TOTAL_SLOTS }, (_, index) => {
              const save = getSaveForSlot(index);
              const isEmpty = !save;

              return (
                <div
                  key={index}
                  className="p-6 rounded-2xl border-2 transition-all backdrop-blur-md"
                  style={{
                    background: selectedSlot === index 
                      ? 'rgba(236, 72, 153, 0.15)' 
                      : 'rgba(255, 255, 255, 0.05)',
                    borderColor: selectedSlot === index 
                      ? 'rgba(236, 72, 153, 0.7)' 
                      : 'rgba(255, 255, 255, 0.2)',
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl font-bold text-white">Slot {index + 1}</span>
                        {isEmpty ? (
                          <span className="text-sm text-white/50">Vide</span>
                        ) : (
                          <span className="text-sm px-3 py-1 rounded-full bg-green-500/30 text-green-300 border border-green-500/50">
                            Utilisé
                          </span>
                        )}
                      </div>

                      {!isEmpty && save && (
                        <div className="space-y-1 text-sm text-white/80">
                          <p className="font-semibold text-white text-lg">{save.saveName}</p>
                          {save.episodeTitle && (
                            <p className="text-pink-300">{save.episodeTitle}</p>
                          )}
                          <p>Sauvegardé le {new Date(save.timestamp).toLocaleString('fr-FR')}</p>
                        </div>
                      )}

                      {mode === 'save' && selectedSlot === index && (
                        <input
                          type="text"
                          value={saveName}
                          onChange={(e) => setSaveName(e.target.value)}
                          placeholder="Nom de la sauvegarde (optionnel)"
                          className="mt-3 w-full px-4 py-2 rounded-xl border-2 bg-white/10 text-white placeholder-white/50 focus:outline-none"
                          style={{
                            borderColor: 'rgba(236, 72, 153, 0.5)',
                          }}
                        />
                      )}
                    </div>

                    <div className="flex gap-2">
                      {mode === 'save' ? (
                        selectedSlot === index ? (
                          <button
                            onClick={() => handleSave(index)}
                            disabled={loading}
                            className="px-6 py-3 rounded-xl font-semibold text-white transition-all hover:scale-105"
                            style={{
                              background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
                              boxShadow: '0 4px 15px rgba(236, 72, 153, 0.3)',
                            }}
                          >
                            <Save size={20} className="inline mr-2" />
                            Confirmer
                          </button>
                        ) : (
                          <button
                            onClick={() => setSelectedSlot(index)}
                            className="px-6 py-3 rounded-xl font-semibold text-white border-2 transition-all hover:scale-105"
                            style={{
                              borderColor: 'rgba(236, 72, 153, 0.5)',
                              background: 'rgba(236, 72, 153, 0.1)',
                            }}
                          >
                            {isEmpty ? 'Sauvegarder ici' : 'Écraser'}
                          </button>
                        )
                      ) : (
                        !isEmpty && (
                          <button
                            onClick={() => handleLoad(index)}
                            disabled={loading}
                            className="px-6 py-3 rounded-xl font-semibold text-white transition-all hover:scale-105"
                            style={{
                              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                              boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)',
                            }}
                          >
                            <Download size={20} className="inline mr-2" />
                            Charger
                          </button>
                        )
                      )}

                      {!isEmpty && (
                        <button
                          onClick={() => handleDelete(index)}
                          disabled={loading}
                          className="px-4 py-3 rounded-xl text-red-300 border-2 border-red-500/50 hover:bg-red-500/20 transition-all"
                        >
                          <Trash2 size={20} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
