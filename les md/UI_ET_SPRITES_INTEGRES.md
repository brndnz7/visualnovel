# 🎮 INTÉGRATION CRAZYGAMES SDK - DISSONANCE

**Date** : 15 Octobre 2025  
**Version** : 1.0.0

---

## 📋 RÉSUMÉ

Ce document explique comment CrazyGames SDK a été intégré dans le jeu **Dissonance** pour afficher des publicités récompensées et générer des revenus.

---

## ❓ POURQUOI CRAZYGAMES ?

### **Unity Ads ne fonctionne PAS pour les jeux web React**
- Unity Ads est **uniquement pour iOS/Android**
- Unity Ads WebGL nécessite **Unity Engine** (pas compatible avec React/Vite)

### **CrazyGames est LA solution pour les jeux web**
- ✅ SDK JavaScript natif (compatible React/Vite)
- ✅ CPM excellent : **6-12$** (vs AdSense 2-5$)
- ✅ Pubs vidéo récompensées parfaites pour l'énergie
- ✅ 50M+ joueurs/mois si publié sur leur plateforme
- ✅ Documentation claire et support actif

---

## 📦 FICHIERS MODIFIÉS/CRÉÉS

### **Nouveaux fichiers**
1. `src/services/crazyGamesService.ts` - Service pour gérer les pubs CrazyGames
2. `src/components/AdRewardButton.tsx` - Bouton pour regarder une pub

### **Fichiers modifiés**
1. `index.html` - Ajout du script SDK CrazyGames
2. `src/App.tsx` - Initialisation du SDK au démarrage
3. `src/components/EnergyHUD.tsx` - Intégration du bouton pub
4. `src/vite-env.d.ts` - Types TypeScript pour CrazyGames

### **Fichiers supprimés**
1. `src/services/unityAdsService.ts` - Remplacé par CrazyGames

---

## 🔧 CONFIGURATION TECHNIQUE

### **1. SDK Chargé dans `index.html`**

```html
<!-- CrazyGames SDK -->
<script src="https://sdk.crazygames.com/crazygames-sdk-v3.js"></script>
```

### **2. Service CrazyGames (`src/services/crazyGamesService.ts`)**

```typescript
export class CrazyGamesService {
  // Initialisation automatique
  static async initialize(): Promise<void>
  
  // Afficher une pub récompensée (pour l'énergie)
  static showRewardedAd(onComplete: () => void, onError?: (error: string) => void): void
  
  // Afficher une pub mid-game (pause le jeu)
  static showMidgameAd(onComplete?: () => void): void
  
  // Analytics
  static gameplayStart(): void
  static gameplayStop(): void
  
  // Vérifications
  static isInDevMode(): boolean
  static isReady(): boolean
}
```

### **3. Composant Bouton Pub (`src/components/AdRewardButton.tsx`)**

```typescript
<AdRewardButton 
  energyReward={5}  // Nombre d'énergie donnée après la pub
  disabled={false}
/>
```

### **4. Intégration dans `EnergyHUD`**

```typescript
{/* Bouton Publicité CrazyGames */}
{energy < GAME_CONFIG.ENERGY_MAX && (
  <div className="pl-2 border-l-2 border-white/30">
    <AdRewardButton energyReward={5} />
  </div>
)}
```

---

## 🎯 FONCTIONNEMENT

### **Mode Développement (localhost)**

1. Détection automatique si `localhost` ou `127.0.0.1`
2. Les pubs sont **simulées** (attente de 3 secondes)
3. Badge "DEV" affiché sur le bouton
4. Logs dans la console :
   ```
   🔧 CrazyGames SDK - Mode Développement
   🎬 [MODE DEV] Simulation de publicité...
   ✅ [MODE DEV] Publicité terminée avec succès
   ```

### **Mode Production (déployé)**

1. Le SDK CrazyGames se charge automatiquement
2. Vraies pubs affichées aux joueurs
3. Récompense donnée après visionnage complet
4. Logs dans la console :
   ```
   ✅ CrazyGames SDK initialisé avec succès
   🎬 Affichage de la publicité CrazyGames...
   ✅ Publicité terminée avec succès
   ```

---

## 💰 MONÉTISATION

### **Revenus Estimés**

| Trafic/mois | Pubs/joueur | CPM | Revenus/mois |
|-------------|-------------|-----|--------------|
| 1 000 joueurs | 2 pubs | 8$ | **16$** |
| 5 000 joueurs | 2 pubs | 8$ | **80$** |
| 10 000 joueurs | 2 pubs | 8$ | **160$** |
| 50 000 joueurs | 2 pubs | 10$ | **1 000$** |

### **Optimisations pour maximiser les revenus**

1. **Pubs récompensées** (CPM plus élevé)
2. **Placement stratégique** (quand le joueur a besoin d'énergie)
3. **Pas de spam** (max 1 pub toutes les 10-15 min par joueur)

---

## 🚀 PROCHAINES ÉTAPES

### **1. Créer un compte CrazyGames Developer**

1. Aller sur https://developer.crazygames.com
2. Créer un compte
3. Créer un nouveau jeu "Dissonance"
4. Récupérer le **Game ID**

### **2. Tester en local**

```bash
# Lancer le dev server
npm run dev

# Jouer jusqu'à manquer d'énergie
# Cliquer sur le bouton "Regarder une pub"
# Vérifier que la pub se simule et donne +5 énergie
```

### **3. Build et déploiement**

```bash
# Build de production
npm run build

# Option A : Déployer sur Firebase
firebase deploy

# Option B : Uploader sur CrazyGames
# 1. Zipper le dossier dist/
# 2. Uploader sur CrazyGames Developer Portal
# 3. Attendre validation (1-3 jours)
```

### **4. Une fois accepté sur CrazyGames**

Tu auras accès à :
- **Analytics** : Nombre de joueurs, temps de jeu, etc.
- **Revenue Dashboard** : Revenus par jour/mois
- **Découvrabilité** : Ton jeu sera dans leur catalogue (50M+ joueurs/mois)
- **Trafic gratuit** : Ils t'envoient des joueurs gratuitement

---

## 📊 ANALYTICS (Optionnel)

### **Marquer le début du gameplay**

```typescript
import { CrazyGamesService } from '../services/crazyGamesService';

// Quand le joueur démarre le jeu
CrazyGamesService.gameplayStart();
```

### **Marquer la fin du gameplay**

```typescript
// Quand le joueur met en pause ou quitte
CrazyGamesService.gameplayStop();
```

### **Pubs mid-game** (pendant les transitions d'épisodes)

```typescript
// Exemple : entre Episode 2 et Episode 3
CrazyGamesService.showMidgameAd(() => {
  console.log('Pub mid-game terminée, on continue !');
  // Charger l'épisode suivant
});
```

---

## 🐛 RÉSOLUTION DE PROBLÈMES

### **Le bouton pub n'apparaît pas**

**Vérifier :**
1. L'énergie est-elle < 10 ? (Le bouton ne s'affiche que si énergie < max)
2. Le SDK est-il chargé ? Regarder dans la console :
   ```
   🎮 CrazyGames SDK prêt
   ```

### **Erreur "CrazyGames SDK not available"**

**Solution** : Le script SDK n'est pas chargé dans `index.html`

**Vérifier** :
```html
<script src="https://sdk.crazygames.com/crazygames-sdk-v3.js"></script>
```

### **La pub ne donne pas d'énergie**

**Vérifier :**
1. Console logs : La pub s'est-elle terminée avec succès ?
2. Le callback `onComplete` est-il appelé ?
3. Regarder le code dans `AdRewardButton.tsx` :
   ```typescript
   CrazyGamesService.showRewardedAd(
     () => {
       // Donner l'énergie
       for (let i = 0; i < energyReward; i++) {
         setTimeout(() => {
           rechargeEnergy();
         }, i * 100);
       }
       showNotification(`+${energyReward} Énergie !`, 'success');
     }
   );
   ```

---

## 📚 RESSOURCES

### **Documentation Officielle**
- CrazyGames SDK : https://docs.crazygames.com/sdk/html5/
- Developer Portal : https://developer.crazygames.com

### **Support**
- Discord CrazyGames : https://discord.gg/crazygames
- Email : developers@crazygames.com

### **Exemples de jeux**
- Voir d'autres jeux sur https://www.crazygames