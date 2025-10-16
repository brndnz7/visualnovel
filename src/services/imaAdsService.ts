/**
 * Service pour gérer les publicités vidéo Google IMA (Interactive Media Ads)
 * Les meilleures pubs vidéo pour le web !
 */

declare global {
  interface Window {
    google?: {
      ima: {
        AdDisplayContainer: any;
        AdsLoader: any;
        AdsManagerLoadedEvent: any;
        AdsRequest: any;
        AdErrorEvent: any;
        AdEvent: any;
        ImaSdkSettings: any;
        ViewMode: any;
        AdsRenderingSettings: any;
      };
    };
  }
}

export class ImaAdsService {
  private static isInitialized: boolean = false;
  private static adDisplayContainer: any = null;
  private static adsLoader: any = null;
  private static adsManager: any = null;
  private static videoElement: HTMLVideoElement | null = null;

  /**
   * Initialiser Google IMA SDK
   */
  static initialize(): void {
    if (this.isInitialized) {
      console.log('🎬 IMA SDK déjà initialisé');
      return;
    }

    if (!window.google || !window.google.ima) {
      console.error('❌ Google IMA SDK non chargé !');
      return;
    }

    console.log('🎬 Initialisation Google IMA SDK...');
    this.isInitialized = true;
  }

  /**
   * Afficher une publicité vidéo récompensée
   * @param onComplete - Fonction appelée quand la pub est terminée
   * @param onError - Fonction appelée en cas d'erreur
   */
  static showRewardedVideoAd(
    onComplete: () => void,
    onError?: (error: string) => void
  ): void {
    if (!window.google || !window.google.ima) {
      console.error('❌ IMA SDK non disponible');
      onError?.('SDK non disponible');
      return;
    }

    console.log('🎬 Affichage publicité vidéo IMA...');

    try {
      // Créer l'overlay complet
      const overlay = document.createElement('div');
      overlay.id = 'ima-ad-overlay';
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.98);
        z-index: 999999;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      `;

      // Conteneur de la pub
      const adWrapper = document.createElement('div');
      adWrapper.style.cssText = `
        position: relative;
        width: 90%;
        max-width: 854px;
        background: #000;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
      `;

      // Header
      const header = document.createElement('div');
      header.style.cssText = `
        background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%);
        padding: 15px 20px;
        color: white;
        text-align: center;
        font-weight: bold;
        font-size: 18px;
      `;
      header.innerHTML = '🎬 Publicité vidéo - +5 ⚡ Énergie';

      // Conteneur vidéo
      const videoContainer = document.createElement('div');
      videoContainer.id = 'ima-video-container';
      videoContainer.style.cssText = `
        position: relative;
        width: 100%;
        padding-top: 56.25%; /* 16:9 aspect ratio */
        background: #000;
      `;

      // Élément vidéo
      const video = document.createElement('video');
      video.id = 'ima-video-player';
      video.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      `;
      video.autoplay = false;
      video.controls = false;
      this.videoElement = video;

      // Conteneur pour les pubs IMA
      const imaAdContainer = document.createElement('div');
      imaAdContainer.id = 'ima-ad-container';
      imaAdContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
      `;

      videoContainer.appendChild(video);
      videoContainer.appendChild(imaAdContainer);

      // Bouton fermer (désactivé au début)
      const closeBtn = document.createElement('button');
      closeBtn.innerHTML = '✕';
      closeBtn.disabled = true;
      closeBtn.style.cssText = `
        position: absolute;
        top: 15px;
        right: 15px;
        width: 50px;
        height: 50px;
        background: rgba(255, 255, 255, 0.2);
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        font-size: 28px;
        color: #fff;
        cursor: not-allowed;
        z-index: 20;
        opacity: 0.5;
        transition: all 0.3s;
      `;

      // Timer
      const timerDiv = document.createElement('div');
      timerDiv.style.cssText = `
        background: rgba(0, 0, 0, 0.8);
        padding: 15px 25px;
        border-radius: 15px;
        margin-top: 20px;
        color: white;
        text-align: center;
        font-size: 16px;
      `;
      timerDiv.innerHTML = '⏱️ Regardez la publicité jusqu\'à la fin...';

      // Assemblage
      adWrapper.appendChild(closeBtn);
      adWrapper.appendChild(header);
      adWrapper.appendChild(videoContainer);
      overlay.appendChild(adWrapper);
      overlay.appendChild(timerDiv);
      document.body.appendChild(overlay);

      // Initialiser IMA
      const ima = window.google.ima;
      
      // Créer AdDisplayContainer
      this.adDisplayContainer = new ima.AdDisplayContainer(
        imaAdContainer,
        video
      );

      // Créer AdsLoader
      this.adsLoader = new ima.AdsLoader(this.adDisplayContainer);

      // Événements
      this.adsLoader.addEventListener(
        ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
        (event: any) => this.onAdsManagerLoaded(event, onComplete, timerDiv, closeBtn, overlay, onError),
        false
      );

      this.adsLoader.addEventListener(
        ima.AdErrorEvent.Type.AD_ERROR,
        (event: any) => {
          console.error('❌ Erreur pub IMA:', event.getError());
          document.body.removeChild(overlay);
          onError?.(event.getError()?.getMessage() || 'Erreur de chargement');
        },
        false
      );

      // Créer la requête de pub
      const adsRequest = new ima.AdsRequest();
      
      // VAST Tag URL - Google IMA Sample (remplacer par ton propre tag)
      adsRequest.adTagUrl = 'https://pubads.g.doubleclick.net/gampad/ads?' +
        'iu=/21775744923/external/single_ad_samples&' +
        'sz=640x480&' +
        'cust_params=sample_ct%3Dlinear&' +
        'ciu_szs=300x250%2C728x90&' +
        'gdfp_req=1&' +
        'output=vast&' +
        'unviewed_position_start=1&' +
        'env=vp&' +
        'impl=s&' +
        'correlator=';

      // Dimensions
      adsRequest.linearAdSlotWidth = 854;
      adsRequest.linearAdSlotHeight = 480;
      adsRequest.nonLinearAdSlotWidth = 854;
      adsRequest.nonLinearAdSlotHeight = 480;

      // Initialiser le conteneur
      this.adDisplayContainer.initialize();

      // Demander les pubs
      this.adsLoader.requestAds(adsRequest);

    } catch (error: any) {
      console.error('❌ Erreur IMA:', error);
      onError?.(error.message || 'Erreur lors du chargement de la publicité');
    }
  }

  /**
   * Callback quand le manager de pubs est chargé
   */
  private static onAdsManagerLoaded(
    event: any,
    onComplete: () => void,
    timerDiv: HTMLElement,
    closeBtn: HTMLButtonElement,
    overlay: HTMLElement,
    onError?: (error: string) => void
  ): void {
    const ima = window.google!.ima;
    const adsRenderingSettings = new ima.AdsRenderingSettings();
    adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;

    // Obtenir le manager
    this.adsManager = event.getAdsManager(
      this.videoElement,
      adsRenderingSettings
    );

    // Événements du manager
    this.adsManager.addEventListener(
      ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
      () => {
        console.log('🎬 Pub démarrée');
        timerDiv.innerHTML = '⏱️ Publicité en cours...';
      }
    );

    this.adsManager.addEventListener(
      ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
      () => {
        console.log('✅ Pub terminée');
      }
    );

    this.adsManager.addEventListener(
      ima.AdEvent.Type.ALL_ADS_COMPLETED,
      () => {
        console.log('✅ Toutes les pubs terminées');
        timerDiv.innerHTML = '<strong style="color: #10b981;">✓ Publicité terminée ! Réclamez votre récompense</strong>';
        
        // Activer le bouton
        closeBtn.disabled = false;
        closeBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #34d399 100%)';
        closeBtn.style.cursor = 'pointer';
        closeBtn.style.opacity = '1';
        closeBtn.innerHTML = '✓';
        closeBtn.onclick = () => {
          this.cleanup();
          document.body.removeChild(overlay);
          onComplete();
        };
        
        // Auto-close après 3 secondes
        setTimeout(() => {
          if (document.body.contains(overlay)) {
            this.cleanup();
            document.body.removeChild(overlay);
            onComplete();
          }
        }, 3000);
      }
    );

    this.adsManager.addEventListener(
      ima.AdErrorEvent.Type.AD_ERROR,
      (event: any) => {
        console.error('❌ Erreur manager:', event.getError());
        this.cleanup();
        document.body.removeChild(overlay);
        onError?.(event.getError()?.getMessage() || 'Erreur de lecture');
      }
    );

    // Démarrer les pubs
    try {
      this.adsManager.init(854, 480, ima.ViewMode.NORMAL);
      this.adsManager.start();
    } catch (error: any) {
      console.error('❌ Erreur start:', error);
      this.cleanup();
      document.body.removeChild(overlay);
      onError?.(error.message);
    }
  }

  /**
   * Nettoyer les ressources
   */
  private static cleanup(): void {
    if (this.adsManager) {
      this.adsManager.destroy();
      this.adsManager = null;
    }
    if (this.adsLoader) {
      this.adsLoader.destroy();
      this.adsLoader = null;
    }
    if (this.adDisplayContainer) {
      this.adDisplayContainer.destroy();
      this.adDisplayContainer = null;
    }
    this.videoElement = null;
  }

  /**
   * Vérifier si IMA est prêt
   */
  static isReady(): boolean {
    return this.isInitialized && !!window.google?.ima;
  }
}

