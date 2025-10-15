/**
 * Service pour gérer les publicités Google AdSense
 * Fonctionne sur n'importe quel hébergement (Firebase, Netlify, etc.)
 */

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

export class AdSenseService {
  private static isInitialized: boolean = false;
  private static clientId: string = '';

  /**
   * Initialiser Google AdSense
   * @param clientId - Ton ID AdSense (ca-pub-XXXXXXXXXXXXXXXX)
   */
  static initialize(clientId: string): void {
    this.clientId = clientId;
    this.isInitialized = true;
    
    console.log('💰 Google AdSense initialisé:', clientId);
  }

  /**
   * Afficher une publicité récompensée
   * @param onComplete - Fonction appelée quand la pub est terminée
   * @param onError - Fonction appelée en cas d'erreur
   */
  static showRewardedAd(
    onComplete: () => void,
    onError?: (error: string) => void
  ): void {
    console.log('💰 Affichage publicité AdSense RÉELLE...');
    
    try {
      // Créer l'overlay de pub
      const adContainer = document.createElement('div');
      adContainer.id = 'ad-reward-container';
      adContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        z-index: 99999;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s;
      `;
      
      // Conteneur principal
      const adBox = document.createElement('div');
      adBox.style.cssText = `
        position: relative;
        width: 90%;
        max-width: 728px;
        background: white;
        border-radius: 20px;
        padding: 30px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
      `;
      
      // Header
      const header = document.createElement('div');
      header.style.cssText = 'text-align: center; margin-bottom: 20px;';
      header.innerHTML = `
        <h2 style="font-size: 24px; color: #333; margin: 0 0 10px 0;">📺 Publicité</h2>
        <p style="color: #666; margin: 0; font-size: 14px;">Regardez cette publicité pour recevoir +5 énergie</p>
      `;
      
      // Zone de pub AdSense
      const adSlot = document.createElement('div');
      adSlot.className = 'adsbygoogle';
      adSlot.style.cssText = `
        display: block;
        width: 100%;
        min-height: 280px;
        margin: 20px 0;
        background: #f5f5f5;
        border-radius: 10px;
      `;
      adSlot.setAttribute('data-ad-client', this.clientId);
      adSlot.setAttribute('data-ad-slot', '1234567890'); // À remplacer par ton vrai slot ID
      adSlot.setAttribute('data-ad-format', 'auto');
      adSlot.setAttribute('data-full-width-responsive', 'true');
      
      // Timer et progression
      let countdown = 10;
      const timerDiv = document.createElement('div');
      timerDiv.style.cssText = `
        text-align: center;
        margin: 20px 0;
        font-size: 16px;
        color: #666;
      `;
      timerDiv.innerHTML = `Récompense disponible dans <strong id="countdown">${countdown}</strong> secondes...`;
      
      // Bouton de récompense (désactivé au début)
      const rewardBtn = document.createElement('button');
      rewardBtn.textContent = '✓ Réclamer la récompense (+5 ⚡)';
      rewardBtn.disabled = true;
      rewardBtn.style.cssText = `
        width: 100%;
        padding: 15px;
        background: #ccc;
        color: white;
        border: none;
        border-radius: 10px;
        font-size: 18px;
        font-weight: bold;
        cursor: not-allowed;
        transition: all 0.3s;
      `;
      
      // Bouton fermer
      const closeBtn = document.createElement('button');
      closeBtn.innerHTML = '✕';
      closeBtn.style.cssText = `
        position: absolute;
        top: 15px;
        right: 15px;
        width: 40px;
        height: 40px;
        background: rgba(0,0,0,0.1);
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        color: #666;
        transition: all 0.2s;
      `;
      closeBtn.onmouseover = () => closeBtn.style.background = 'rgba(0,0,0,0.2)';
      closeBtn.onmouseout = () => closeBtn.style.background = 'rgba(0,0,0,0.1)';
      closeBtn.onclick = () => {
        document.body.removeChild(adContainer);
        onError?.('Publicité fermée avant la fin');
      };
      
      // Assemblage
      adBox.appendChild(closeBtn);
      adBox.appendChild(header);
      adBox.appendChild(adSlot);
      adBox.appendChild(timerDiv);
      adBox.appendChild(rewardBtn);
      adContainer.appendChild(adBox);
      document.body.appendChild(adContainer);
      
      // Charger la pub AdSense
      try {
        if (window.adsbygoogle) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (e) {
        console.log('AdSense push error:', e);
      }
      
      // Timer de countdown
      const timer = setInterval(() => {
        countdown--;
        const countdownEl = document.getElementById('countdown');
        if (countdownEl) {
          countdownEl.textContent = countdown.toString();
        }
        
        if (countdown <= 0) {
          clearInterval(timer);
          // Activer le bouton de récompense
          rewardBtn.disabled = false;
          rewardBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #34d399 100%)';
          rewardBtn.style.cursor = 'pointer';
          rewardBtn.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.4)';
          timerDiv.innerHTML = '<strong style="color: #10b981;">✓ Publicité terminée !</strong>';
          
          rewardBtn.onclick = () => {
            document.body.removeChild(adContainer);
            onComplete();
          };
          
          // Animation pulse
          rewardBtn.style.animation = 'pulse 1s infinite';
        }
      }, 1000);
      
    } catch (error: any) {
      console.error('❌ Erreur publicité:', error);
      onError?.(error.message || 'Erreur lors du chargement de la publicité');
    }
  }


  /**
   * Vérifier si AdSense est prêt
   */
  static isReady(): boolean {
    return this.isInitialized;
  }

  /**
   * Obtenir le client ID
   */
  static getClientId(): string {
    return this.clientId;
  }
}

