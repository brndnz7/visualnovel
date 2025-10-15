/**
 * Service pour gérer les publicités CrazyGames
 * Documentation: https://docs.crazygames.com/sdk/html5/
 */

// Déclaration des types pour CrazyGames SDK
declare global {
  interface Window {
    CrazyGames?: {
      SDK: {
        init: () => Promise<void>;
        ad: {
          requestAd: (type: 'rewarded' | 'midgame', callbacks: {
            adFinished?: () => void;
            adError?: (error: any) => void;
            adStarted?: () => void;
          }) => void;
        };
        game: {
          gameplayStart: () => void;
          gameplayStop: () => void;
          inviteLink: (options: { roomId: string }) => void;
        };
      };
    };
  }
}

export class CrazyGamesService {
  private static isInitialized: boolean = false;
  private static isDevMode: boolean = true;

  /**
   * Initialiser CrazyGames SDK
   */
  static async initialize(): Promise<void> {
    try {
      // Vérifier si on est en mode développement (localhost)
      this.isDevMode = window.location.hostname === 'localhost' || 
                       window.location.hostname === '127.0.0.1';

      if (this.isDevMode) {
        console.log('🔧 CrazyGames SDK - Mode Développement');
        console.log('ℹ️ Les pubs seront simulées localement');
        this.isInitialized = true;
        return;
      }

      // Initialiser le SDK en production
      if (window.CrazyGames) {
        await window.CrazyGames.SDK.init();
      } else {
        throw new Error('CrazyGames SDK not loaded');
      }
      
      console.log('✅ CrazyGames SDK initialisé avec succès');
      this.isInitialized = true;
    } catch (error) {
      console.error('❌ Erreur initialisation CrazyGames SDK:', error);
      console.log('🔧 Fallback en mode développement');
      this.isDevMode = true;
      this.isInitialized = true;
    }
  }

  /**
   * Afficher une publicité récompensée
   * @param onComplete - Fonction appelée quand la pub est terminée avec succès
   * @param onError - Fonction appelée en cas d'erreur
   */
  static showRewardedAd(
    onComplete: () => void,
    onError?: (error: string) => void
  ): void {
    if (!this.isInitialized) {
      console.warn('⚠️ CrazyGames SDK non initialisé');
      this.simulateAd(onComplete, onError);
      return;
    }

    // Mode développement : simuler une pub
    if (this.isDevMode) {
      this.simulateAd(onComplete, onError);
      return;
    }

    // Mode production : afficher une vraie pub
    try {
      console.log('🎬 Affichage de la publicité CrazyGames...');
      
      if (!window.CrazyGames) {
        throw new Error('CrazyGames SDK not available');
      }
      
      window.CrazyGames.SDK.ad.requestAd('rewarded', {
        adFinished: () => {
          console.log('✅ Publicité terminée avec succès');
          onComplete();
        },
        adError: (error) => {
          console.error('❌ Erreur publicité:', error);
          onError?.(`Impossible d'afficher la publicité: ${error.message}`);
        },
        adStarted: () => {
          console.log('▶️ Publicité démarrée');
        },
      });
    } catch (error: any) {
      console.error('❌ Erreur lors de la demande de publicité:', error);
      onError?.(error.message || 'Erreur inconnue');
    }
  }

  /**
   * Afficher une publicité mid-game (pause le jeu)
   * @param onComplete - Fonction appelée après la pub
   */
  static showMidgameAd(onComplete?: () => void): void {
    if (!this.isInitialized || this.isDevMode) {
      console.log('🔧 Mode dev - Midgame ad simulée');
      setTimeout(() => onComplete?.(), 1000);
      return;
    }

    try {
      if (!window.CrazyGames) {
        throw new Error('CrazyGames SDK not available');
      }
      
      window.CrazyGames.SDK.ad.requestAd('midgame', {
        adFinished: () => {
          console.log('✅ Midgame ad terminée');
          onComplete?.();
        },
        adError: (error) => {
          console.error('❌ Erreur midgame ad:', error);
          onComplete?.();
        },
        adStarted: () => {
          console.log('▶️ Midgame ad démarrée');
        },
      });
    } catch (error) {
      console.error('❌ Erreur midgame ad:', error);
      onComplete?.();
    }
  }

  /**
   * Simuler une publicité en mode développement
   */
  private static simulateAd(
    onComplete: () => void,
    onError?: (error: string) => void
  ): void {
    console.log('🎬 [MODE DEV] Simulation de publicité...');
    console.log('⏳ Attente de 3 secondes...');
    
    // Simuler un délai de pub
    setTimeout(() => {
      // 95% de succès, 5% d'échec pour tester les deux cas
      const success = Math.random() > 0.05;
      
      if (success) {
        console.log('✅ [MODE DEV] Publicité terminée avec succès');
        onComplete();
      } else {
        console.log('❌ [MODE DEV] Simulation d\'échec de publicité');
        onError?.('Publicité non disponible (simulation)');
      }
    }, 3000);
  }

  /**
   * Marquer le jeu comme ayant commencé (pour analytics)
   */
  static gameplayStart(): void {
    if (!this.isDevMode && window.CrazyGames) {
      try {
        window.CrazyGames.SDK.game.gameplayStart();
        console.log('📊 Gameplay started');
      } catch (error) {
        console.error('Erreur gameplayStart:', error);
      }
    }
  }

  /**
   * Marquer le jeu comme étant en pause (pour analytics)
   */
  static gameplayStop(): void {
    if (!this.isDevMode && window.CrazyGames) {
      try {
        window.CrazyGames.SDK.game.gameplayStop();
        console.log('📊 Gameplay stopped');
      } catch (error) {
        console.error('Erreur gameplayStop:', error);
      }
    }
  }

  /**
   * Inviter le joueur à évaluer le jeu
   */
  static inviteLink(): void {
    if (!this.isDevMode && window.CrazyGames) {
      try {
        window.CrazyGames.SDK.game.inviteLink({
          roomId: 'dissonance-vn',
        });
      } catch (error) {
        console.error('Erreur inviteLink:', error);
      }
    }
  }

  /**
   * Vérifier si on est en mode dev
   */
  static isInDevMode(): boolean {
    return this.isDevMode;
  }

  /**
   * Vérifier si le SDK est prêt
   */
  static isReady(): boolean {
    return this.isInitialized;
  }
}

