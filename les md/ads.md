# 🎮 GUIDE CRAZYGAMES SDK - DISSONANCE

**Date** : 15 Octobre 2025  
**Version** : 1.0.0

---

## 📋 RÉSUMÉ

CrazyGames SDK est maintenant intégré dans le jeu pour afficher des publicités récompensées et générer des revenus.

---

## ✅ CE QUI A ÉTÉ FAIT

### 1. **Installation du SDK**
- ✅ SDK chargé via CDN dans `index.html`
- ✅ Service `CrazyGamesService` créé
- ✅ Mode développement avec simulation de pubs
- ✅ Bouton "Regarder une pub" intégré dans le HUD d'énergie

### 2. **Fichiers modifiés**

| Fichier | Modification |
|---------|-------------|
| `index.html` | Ajout du script SDK CrazyGames |
| `src/services/crazyGamesService.ts` | Service principal pour gérer les pubs |
| `src/components/AdRewardButton.tsx` | Bouton pour regarder les pubs |
| `src/components/EnergyHUD.tsx` | Intégration du bouton pub |
| `src/App.tsx` | Initialisation du SDK au démarrage |
| `src/vite-env.d.ts` | Types TypeScript pour CrazyGames |

### 3. **Fichiers supprimés**
- ❌ `src/services/unityAdsService.ts` (Unity Ads ne supporte pas WebGL)

---

## 🎯 COMMENT ÇA MARCHE

### **En mode développement (localhost)**
```
1. Joueur clique sur "Regarder une pub"
2. Service détecte localhost → Mode dev
3. Simulation de 3 secondes
4. +5 Énergie automatiquement
```

### **En production (sur CrazyGames ou ton site)**
```
1. Joueur clique sur "Regarder une pub"
2. SDK CrazyGames affiche une vraie pub vidéo
3. Joueur regarde la pub (15-30 secondes)
4. +5 Énergie après la pub
5. Tu gagnes de l'argent ! 💰
```

---

## 💰 REVENUS ESTIMÉS

### **CPM de CrazyGames**
- CPM moyen : **6-12$** (pour 1000 impressions)
- Fill rate : ~95%

### **Exemple de calcul**
**Scénario** : 10 000 joueurs/mois, chaque joueur regarde 2 pubs

```
10 000 joueurs × 2 pubs = 20 000 impressions
20 000 / 1000 = 20 CPM
20 CPM × 8$ (moyenne) = 160$ de revenus/mois
```

**Si tu es hébergé sur CrazyGames** :
- Ils prennent 30% de commission
- Tu gagnes 70% = **112$/mois** net

**Si tu héberges toi-même (Firebase)** :
- Tu gardes 100%
- **160$/mois** net

---

## 🚀 DÉPLOIEMENT SUR CRAZYGAMES

### **Étape 1 : Créer un compte développeur**
1. Va sur https://developer.crazygames.com
2. Inscris-toi gratuitement
3. Vérifie ton email

### **Étape 2 : Uploader ton jeu**
1. Build ton jeu :
   ```bash
   npm run build
   ```

2. Compresse le dossier `dist` en `.zip`

3. Upload sur CrazyGames :
   - Nom : **Dissonance**
   - Catégorie : **Adventure / Visual Novel**
   - Description : Ton pitch du jeu
   - Upload le fichier `.zip`

### **Étape 3 : Configuration**
1. Dans le dashboard CrazyGames, active les pubs récompensées
2. Teste le jeu dans leur preview
3. Soumets pour review

### **Étape 4 : Attendre la validation**
- Délai : 1-3 jours
- Une fois approuvé, ton jeu est live !
- Tu commences à gagner de l'argent

---

## 🔧 CONFIGURATION TECHNIQUE

### **Le SDK est déjà intégré !**

Tout est prêt, voici ce qui a été fait :

#### **1. Script SDK dans index.html**
```html
<script src="https://sdk.crazygames.com/crazygames-sdk-v3.js"></script>
```

#### **2. Service CrazyGames**
```typescript
// src/services/crazyGamesService.ts
CrazyGamesService.showRewardedAd(
  () => { /* Pub terminée */ },
  (error) => { /* Erreur */ }
);
```

#### **3. Bouton dans le jeu**
Le bouton apparaît dans le HUD d'énergie quand l'énergie < max.

---

## 🎮 FONCTIONNALITÉS BONUS

### **1. Analytics de gameplay**
```typescript
// Marquer le début d'une session
CrazyGamesService.gameplayStart();

// Marquer la fin (pause, menu, etc.)
CrazyGamesService.gameplayStop();
```

**Utilité** : CrazyGames track combien de temps les joueurs jouent → Meilleure visibilité sur la plateforme

### **2. Publicités mid-game**
```typescript
// Afficher une pub entre 2 épisodes
CrazyGamesService.showMidgameAd(() => {
  // Continuer le jeu après la pub
});
```

### **3. Invitation de joueurs**
```typescript
// Inviter des amis à jouer
CrazyGamesService.inviteLink();
```

---

## 🧪 TESTER EN LOCAL

### **1. Lancer le jeu**
```bash
npm run dev
```

### **2. Tester le bouton pub**
1. Joue jusqu'à ce que l'énergie descende
2. Clique sur le bouton "Regarder une pub"
3. Tu devrais voir dans la console :
   ```
   🔧 CrazyGames SDK - Mode Développement
   🎬 [MODE DEV] Simulation de publicité...
   ⏳ Attente de 3 secondes...
   ✅ [MODE DEV] Publicité terminée avec succès
   ```
4. L'énergie devrait augmenter de +5

### **3. Badge DEV**
Un petit badge violet "DEV" apparaît sur le bouton en mode développement.

---

## 📊 STATISTIQUES (Dashboard CrazyGames)

Une fois ton jeu live sur CrazyGames, tu auras accès à :

- **Revenus quotidiens/mensuels**
- **Nombre de joueurs**
- **Temps de jeu moyen**
- **Taux de clics sur les pubs**
- **CPM en temps réel**
- **Pays des joueurs**

---

## 🔄 ALTERNATIVES À CRAZYGAMES

Si tu ne veux pas être hébergé chez eux, tu peux :

### **Option 1 : Héberger sur Firebase + CrazyGames SDK**
- Upload sur Firebase Hosting
- Garde le SDK CrazyGames
- Problème : Moins de trafic (pas de découvrabilité)

### **Option 2 : Upload sur Poki**
- Meilleur CPM (8-15$)
- Mais très sélectifs
- Faut candidater et être accepté

### **Option 3 : Google AdSense**
- CPM plus bas (2-5$)
- Mais accepte tout le monde
- Plus facile à setup

---

## 💡 CONSEILS POUR MAXIMISER LES REVENUS

### **1. Positionner les pubs intelligemment**
✅ **Bon** : Entre les épisodes, quand l'énergie est vide  
❌ **Mauvais** : Au milieu d'une scène importante

### **2. Donner une bonne récompense**
- Actuellement : +5 énergie
- Optimal : +5 à +10 énergie (assez généreux pour que le joueur veuille regarder)

### **3. Optimiser le taux de conversion**
- Afficher le bouton de manière visible
- Expliquer clairement la récompense
- Ne pas spam le joueur avec trop de pubs

---

## 🐛 DÉPANNAGE

### **Problème : "CrazyGames SDK not loaded"**
**Solution** : Vérifie que le script est bien dans `index.html` :
```html
<script src="https://sdk.crazygames.com/crazygames-sdk-v3.js"></script>
```

### **Problème : Les pubs ne s'affichent pas en production**
**Causes possibles** :
1. Le jeu n'est pas hébergé sur CrazyGames → Les pubs marchent seulement sur leur domaine
2. Bloqueur de pub activé
3. SDK non initialisé

**Solution** : Teste sur https://developer.crazygames.com dans leur preview

### **Problème : Badge "DEV" apparaît en production**
**Solution** : Normal si tu testes sur localhost. Sur CrazyGames, il disparaîtra automatiquement.

---

## 📞 RESSOURCES

- **Documentation CrazyGames** : https://docs.crazygames.com/sdk/html5/
- **Developer Portal** : https://developer.crazygames.com
- **Support** : developer@crazygames.com
- **Discord CrazyGames** : https://discord.gg/crazygames

---

## ✅ CHECKLIST AVANT UPLOAD

- [ ] Build du jeu (`npm run build`)
- [ ] Teste que les pubs marchent en local
- [ ] Compresse `dist` en `.zip`
- [ ] Créé un compte CrazyGames
- [ ] Upload le jeu
- [ ] Configure les settings (nom, description, thumbnail)
- [ ] Active les pubs récompensées
- [ ] Teste dans leur preview
- [ ] Soumets pour review

---

## 🎉 PROCHAINES ÉTAPES

1. **Teste en local** : Vérifie que le bouton pub marche
2. **Build le jeu** : `npm run build`
3. **Upload sur CrazyGames** :