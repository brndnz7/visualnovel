// Service de sauvegarde en ligne (Firestore)
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { GameState } from '../store/gameStore';

export interface CloudSave {
  id: string;
  userId: string;
  slotNumber: number;
  saveName: string;
  gameData: Partial<GameState>;
  timestamp: Date;
  episodeTitle?: string;
  sceneTitle?: string;
}

export class SaveService {
  private static COLLECTION_NAME = 'saves';

  /**
   * Sauvegarder une partie dans le cloud
   */
  static async saveGame(
    userId: string,
    slotNumber: number,
    saveName: string,
    gameData: Partial<GameState>,
    episodeTitle?: string,
    sceneTitle?: string
  ): Promise<void> {
    try {
      const saveId = `${userId}_slot_${slotNumber}`;
      const saveRef = doc(db, this.COLLECTION_NAME, saveId);

      const saveData: Omit<CloudSave, 'id'> = {
        userId,
        slotNumber,
        saveName,
        gameData,
        timestamp: new Date(),
        episodeTitle,
        sceneTitle
      };

      await setDoc(saveRef, {
        ...saveData,
        timestamp: Timestamp.fromDate(saveData.timestamp)
      });
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      throw new Error('Impossible de sauvegarder la partie');
    }
  }

  /**
   * Charger une sauvegarde depuis le cloud
   */
  static async loadGame(userId: string, slotNumber: number): Promise<CloudSave | null> {
    try {
      const saveId = `${userId}_slot_${slotNumber}`;
      const saveRef = doc(db, this.COLLECTION_NAME, saveId);
      const saveSnap = await getDoc(saveRef);

      if (saveSnap.exists()) {
        const data = saveSnap.data();
        return {
          id: saveSnap.id,
          userId: data.userId,
          slotNumber: data.slotNumber,
          saveName: data.saveName,
          gameData: data.gameData,
          timestamp: data.timestamp.toDate(),
          episodeTitle: data.episodeTitle,
          sceneTitle: data.sceneTitle
        };
      }

      return null;
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
      throw new Error('Impossible de charger la sauvegarde');
    }
  }

  /**
   * Récupérer toutes les sauvegardes d'un utilisateur
   */
  static async getUserSaves(userId: string): Promise<CloudSave[]> {
    try {
      const savesRef = collection(db, this.COLLECTION_NAME);
      const q = query(
        savesRef, 
        where('userId', '==', userId),
        orderBy('timestamp', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const saves: CloudSave[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        saves.push({
          id: doc.id,
          userId: data.userId,
          slotNumber: data.slotNumber,
          saveName: data.saveName,
          gameData: data.gameData,
          timestamp: data.timestamp.toDate(),
          episodeTitle: data.episodeTitle,
          sceneTitle: data.sceneTitle
        });
      });

      return saves;
    } catch (error) {
      console.error('Erreur lors de la récupération des sauvegardes:', error);
      throw new Error('Impossible de récupérer les sauvegardes');
    }
  }

  /**
   * Supprimer une sauvegarde
   */
  static async deleteSave(userId: string, slotNumber: number): Promise<void> {
    try {
      const saveId = `${userId}_slot_${slotNumber}`;
      const saveRef = doc(db, this.COLLECTION_NAME, saveId);
      await deleteDoc(saveRef);
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      throw new Error('Impossible de supprimer la sauvegarde');
    }
  }

  /**
   * Vérifier si un slot est utilisé
   */
  static async isSlotUsed(userId: string, slotNumber: number): Promise<boolean> {
    try {
      const save = await this.loadGame(userId, slotNumber);
      return save !== null;
    } catch (error) {
      return false;
    }
  }
}

