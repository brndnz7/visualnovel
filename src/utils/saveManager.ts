import { GAME_CONFIG } from '../config/game';
import { CustomCharacter } from '../types/characterCreator';

export interface SaveSlot {
  id: number;
  playerName: string;
  playerAvatar: string;
  customCharacter?: CustomCharacter | null;
  currentSceneId: string;
  relationships: Record<string, number>;
  energy: number;
  flags: Record<string, boolean | number | string>;
  timestamp: number;
  playtime: number;
}

const MAX_SAVES = 10;
const SAVE_KEY_PREFIX = 'sweetDestiny_save_';

export class SaveManager {
  static getSaveKey(slotId: number): string {
    return `${SAVE_KEY_PREFIX}${slotId}_v${GAME_CONFIG.VERSION}`;
  }

  static getAllSaves(): (SaveSlot | null)[] {
    const saves: (SaveSlot | null)[] = [];
    for (let i = 0; i < MAX_SAVES; i++) {
      const save = this.loadSave(i);
      saves.push(save);
    }
    return saves;
  }

  static loadSave(slotId: number): SaveSlot | null {
    try {
      const key = this.getSaveKey(slotId);
      const data = localStorage.getItem(key);
      if (!data) return null;
      return JSON.parse(data) as SaveSlot;
    } catch (error) {
      console.error(`Erreur lors du chargement de la sauvegarde ${slotId}:`, error);
      return null;
    }
  }

  static saveSave(slotId: number, saveData: Omit<SaveSlot, 'id' | 'timestamp'>): boolean {
    try {
      const key = this.getSaveKey(slotId);
      const fullSaveData: SaveSlot = {
        ...saveData,
        id: slotId,
        timestamp: Date.now(),
      };
      localStorage.setItem(key, JSON.stringify(fullSaveData));
      return true;
    } catch (error) {
      console.error(`Erreur lors de la sauvegarde dans le slot ${slotId}:`, error);
      return false;
    }
  }

  static deleteSave(slotId: number): boolean {
    try {
      const key = this.getSaveKey(slotId);
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Erreur lors de la suppression de la sauvegarde ${slotId}:`, error);
      return false;
    }
  }

  static getFirstEmptySlot(): number | null {
    for (let i = 0; i < MAX_SAVES; i++) {
      if (!this.loadSave(i)) {
        return i;
      }
    }
    return null;
  }

  static formatTimestamp(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  static formatPlaytime(playtime: number): string {
    const hours = Math.floor(playtime / 3600);
    const minutes = Math.floor((playtime % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}min`;
    }
    return `${minutes}min`;
  }
}


