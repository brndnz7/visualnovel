import React, { useState, useEffect } from 'react';
import { Save, Download, Trash2, Cloud, AlertCircle } from 'lucide-react';
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
      const saves = await SaveService.getUserSaves(user.uid);
      setCloudSaves(saves);
    } catch (err: any) {
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

    const name = saveName.trim() || `Sauvegarde ${slotNumber + 1}`;
    setLoading(true);
    setError('');

    try {
      // Trouver l'épisode actuel
      const currentEpisode = EPISODES.find(ep => 
        currentSceneId.includes(ep.id.replace('episode', 'ep'))
      );

      const gameData = {
        currentSceneId,
        relationships,
        flags,
        coins,
        energy,
        playerName,
        customCharacter,
        dialogueHistory,
        phoneConversations
      };

      await SaveService.saveGame(
        user.uid,
        slotNumber,
        name,
        gameData,
        currentEpisode?.title,
        currentSceneId
      );

      await loadCloudSaves();
      setSaveName('');
      setSelectedSlot(null);
      
      useGameStore.getState().showNotification('Partie sauvegardée !', 'success');
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
        setError('Aucune sauvegarde trouvée');
        return;
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
      
      useGameStore.getState().showNotification('Partie chargée !', 'success');
      setGameState('Playing');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slotNumber: number) => {
    if (!user) return;
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette sauvegarde ?')) return;

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
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4">
          <div className="flex items-center gap-3 text-amber-600 mb-4">
            <AlertCircle size={32} />
            <h2 className="text-2xl font-bold">Connexion requise</h2>
          </div>
          <p className="text-gray-700 mb-6">
            Vous devez être connecté pour utiliser les sauvegardes en ligne.
          </p>
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl font-semibold text-white"
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl p-8 max-w-4xl w-full my-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-3">
              <Cloud size={40} className="text-indigo-500" />
              {mode === 'save' ? 'Sauvegarder' : 'Charger'}
            </h1>
            <p className="text-gray-600 mt-2">
              Connecté en tant que <span className="font-semibold">{user.displayName}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 rounded-xl bg-red-100 border border-red-300 text-red-700">
            {error}
          </div>
        )}

        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
            <p className="mt-4 text-gray-600">Chargement...</p>
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
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    selectedSlot === index
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 bg-gray-50 hover:border-indigo-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl font-bold text-gray-800">Slot {index + 1}</span>
                        {isEmpty ? (
                          <span className="text-sm text-gray-400">Vide</span>
                        ) : (
                          <span className="text-sm px-3 py-1 rounded-full bg-green-100 text-green-700">
                            Utilisé
                          </span>
                        )}
                      </div>

                      {!isEmpty && save && (
                        <div className="space-y-1 text-sm text-gray-600">
                          <p className="font-semibold text-gray-800">{save.saveName}</p>
                          {save.episodeTitle && (
                            <p className="text-indigo-600">{save.episodeTitle}</p>
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
                          className="mt-3 w-full px-4 py-2 rounded-xl border-2 border-indigo-200 focus:border-indigo-500 focus:outline-none"
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
                              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                            }}
                          >
                            <Save size={20} className="inline mr-2" />
                            Confirmer
                          </button>
                        ) : (
                          <button
                            onClick={() => setSelectedSlot(index)}
                            className="px-6 py-3 rounded-xl font-semibold text-indigo-600 border-2 border-indigo-300 hover:bg-indigo-50 transition-all"
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
                          className="px-4 py-3 rounded-xl text-red-600 border-2 border-red-300 hover:bg-red-50 transition-all"
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

