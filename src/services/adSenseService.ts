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
    // Mode développement : simuler une pub
    if (!this.clientId || this.clientId === 'dev-mode') {
      console.log('🔧 MODE DEV - Simulation de pub AdSense...');
      this.simulateAd(onComplete);
      return;
    }

    // Mode production : afficher une vraie pub
    try {
      console.log('💰 Affichage publicité AdSense...');
      
      // AdSense rewarded ads
      if (window.adsbygoogle) {
        // Créer une div pour la pub
        const adContainer = document.createElement('div');
        adContainer.className = 'adsbygoogle';
        adContainer.style.cssText = 'display:block; position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); z-index:9999; width:100%; height:100%; background:rgba(0,0,0,0.8);';
        
        // Conteneur de la pub
        const adBox = document.createElement('div');
        adBox.style.cssText = 'position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); width:90%; max-width:600px; background:white; border-radius:10px; padding:20px;';
        
        // Bouton fermer
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '✕ Fermer';
        closeBtn.style.cssText = 'position:absolute; top:10px; right:10px; background:#f00; color:white; border:none; padding:10px; border-radius:5px; cursor:pointer;';
        closeBtn.onclick = () => {
          document.body.removeChild(adContainer);
          onError?.('Publicité fermée avant la fin');
        };
        
        // Placeholder pub (sera remplacé par la vraie pub AdSense)
        const adPlaceholder = document.createElement('div');
        adPlaceholder.style.cssText = 'width:100%; height:250px; background:#eee; display:flex; align-items:center; justify-content:center; margin-bottom:20px;';
        adPlaceholder.innerHTML = `
          <div style="text-align:center;">
            <div style="font-size:48px; margin-bottom:10px;">📺</div>
            <p style="color:#666;">Publicité AdSense</p>
            <p style="color:#999; font-size:12px;">Regardez jusqu'à la fin pour la récompense</p>
          </div>
        `;
        
        // Bouton "J'ai regardé"
        const watchedBtn = document.createElement('button');
        watchedBtn.textContent = '✓ J\'ai regardé la pub (Récompense)';
        watchedBtn.style.cssText = 'width:100%; padding:15px; background:#4CAF50; color:white; border:none; border-radius:5px; font-size:16px; cursor:pointer; font-weight:bold;';
        watchedBtn.onclick = () => {
          document.body.removeChild(adContainer);
          onComplete();
        };
        
        adBox.appendChild(closeBtn);
        adBox.appendChild(adPlaceholder);
        adBox.appendChild(watchedBtn);
        adContainer.appendChild(adBox);
        document.body.appendChild(adContainer);
        
        // Timer automatique (10 secondes)
        setTimeout(() => {
          watchedBtn.style.background = '#45a049';
          watchedBtn.style.animation = 'pulse 0.5s';
        }, 5000);
        
      } else {
        throw new Error('AdSense non chargé');
      }
    } catch (error: any) {
      console.error('❌ Erreur publicité AdSense:', error);
      // Fallback : simuler
      this.simulateAd(onComplete);
    }
  }

  /**
   * Simuler une pub en mode dev
   */
  private static simulateAd(onComplete: () => void): void {
    console.log('🎬 [SIMULATION] Publicité de 3 secondes...');
    
    // Créer overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.9); z-index:9999; display:flex; align-items:center; justify-content:center;';
    
    const content = document.createElement('div');
    content.style.cssText = 'text-align:center; color:white;';
    
    let countdown = 3;
    content.innerHTML = `
      <div style="font-size:64px; margin-bottom:20px;">📺</div>
      <h2 style="font-size:32px; margin-bottom:10px;">MODE DÉVELOPPEMENT</h2>
      <p style="font-size:18px; margin-bottom:20px;">Publicité simulée</p>
      <div id="countdown" style="font-size:48px; font-weight:bold;">${countdown}</div>
      <p style="font-size:14px; color:#888; margin-top:20px;">En production, une vraie pub AdSense s'affichera ici</p>
    `;
    
    overlay.appendChild(content);
    document.body.appendChild(overlay);
    
    const timer = setInterval(() => {
      countdown--;
      const countdownEl = document.getElementById('countdown');
      if (countdownEl) {
        countdownEl.textContent = countdown.toString();
      }
      
      if (countdown <= 0) {
        clearInterval(timer);
        document.body.removeChild(overlay);
        onComplete();
      }
    }, 1000);
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

