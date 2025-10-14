# 📂 Structure Complète du Projet Sweet Destiny

## 🌳 Arborescence

```
GG BG 2/
│
├── 📄 index.html                 # Point d'entrée HTML
├── 📄 package.json               # Dépendances et scripts
├── 📄 tsconfig.json              # Configuration TypeScript
├── 📄 tsconfig.node.json         # Config TS pour Vite
├── 📄 vite.config.ts             # Configuration Vite
├── 📄 tailwind.config.js         # Configuration Tailwind CSS
├── 📄 postcss.config.js          # Configuration PostCSS
├── 📄 .gitignore                 # Fichiers à ignorer par Git
├── 📄 README.md                  # Documentation principale
├── 📄 CHANGELOG.md               # Historique des changements
├── 📄 GUIDE_UTILISATION.md       # Guide utilisateur complet
├── 📄 STRUCTURE_PROJET.md        # Ce fichier
├── 📄 script.old.tsx             # Ancien code (backup)
│
└── 📁 src/
    ├── 📄 App.tsx                # Composant principal
    ├── 📄 main.tsx               # Point d'entrée React
    │
    ├── 📁 components/            # Composants UI réutilisables
    │   ├── CharacterPortrait.tsx  # Portrait des personnages
    │   ├── ChoiceButton.tsx       # Boutons de choix
    │   ├── DialogueBox.tsx        # Boîte de dialogue
    │   ├── DialogueHistory.tsx    # Historique des dialogues
    │   ├── EnergyHUD.tsx          # HUD d'énergie
    │   ├── GameControls.tsx       # Contrôles (Skip/Auto/History)
    │   ├── Notification.tsx       # Système de notifications
    │   ├── RelationshipHUD.tsx    # HUD des relations
    │   └── SceneBackground.tsx    # Arrière-plans
    │
    ├── 📁 screens/               # Écrans du jeu
    │   ├── MainMenu.tsx           # Menu principal
    │   ├── NamingScreen.tsx       # Choix du nom
    │   ├── CustomizationScreen.tsx # Choix de l'avatar
    │   ├── GameScene.tsx          # Écran de jeu principal
    │   ├── SettingsScreen.tsx     # Écran des paramètres
    │   └── ShopScreen.tsx         # Boutique
    │
    ├── 📁 store/                 # Gestion d'état
    │   └── gameStore.ts           # Store Zustand principal
    │
    ├── 📁 data/                  # Données du jeu (JSON)
    │   ├── story.json             # Scénario complet
    │   ├── characters.json        # Personnages + expressions
    │   ├── avatars.json           # Avatars du joueur
    │   └── backgrounds.json       # Arrière-plans
    │
    ├── 📁 config/                # Configuration
    │   └── game.ts                # Constantes et types
    │
    ├── 📁 utils/                 # Utilitaires
    │   └── audio.ts               # Gestionnaire audio
    │
    ├── 📁 hooks/                 # Custom React Hooks
    │   └── useTypewriter.ts       # Hook effet machine à écrire
    │
    └── 📁 styles/                # Styles
        └── global.css             # Styles globaux + animations
```

---

## 📊 Détail des Fichiers

### 🏠 Racine du Projet

#### `index.html`
- Point d'entrée HTML5
- Charge `src/main.tsx`
- Meta tags pour SEO

#### `package.json`
- Dépendances :
  - `react` ^18.2.0
  - `react-dom` ^18.2.0
  - `zustand` ^4.4.1
  - `howler` ^2.2.3
  - `lucide-react` ^0.294.0
- Scripts :
  - `npm run dev` - Serveur de développement
  - `npm run build` - Build de production
  - `npm run preview` - Prévisualiser le build

#### Configuration TypeScript
- `tsconfig.json` : Config principale (strict mode)
- `tsconfig.node.json` : Config pour Vite

#### Configuration Build
- `vite.config.ts` : Bundler ultra-rapide
- `tailwind.config.js` : Utility-first CSS
- `postcss.config.js` : Autoprefixer

---

### 📁 src/

#### `App.tsx` ⭐
Composant racine qui :
- Gère le routing entre écrans
- Applique le thème (clair/sombre)
- Lance la régénération d'énergie
- Affiche les notifications

#### `main.tsx`
- Point d'entrée React
- Mount l'app sur `#root`
- Strict mode activé

---

### 📁 src/components/

Composants réutilisables et modulaires :

#### `CharacterPortrait.tsx`
- Affiche les portraits des personnages
- Support de 6 expressions
- Animations d'entrée (slideInLeft/Right)
- Highlight du personnage actif
- Gère aussi l'avatar du joueur

#### `DialogueBox.tsx`
- Boîte de dialogue principale
- Effet machine à écrire
- Support du nom du joueur `{playerName}`
- Click pour avancer

#### `DialogueHistory.tsx`
- Modal d'historique
- Liste scrollable
- Fermeture avec bouton ou `Échap`
- Affiche les 100 derniers dialogues

#### `ChoiceButton.tsx`
- Boutons de choix stylisés
- Animation d'apparition échelonnée
- Support des choix conditionnels

#### `EnergyHUD.tsx`
- Affiche l'énergie actuelle
- Timer de rechargement
- Boutons pub et boutique
- Mise à jour en temps réel

#### `RelationshipHUD.tsx`
- Jauges d'affection en haut à droite
- Icônes cœur colorés
- Affichage pour chaque personnage

#### `GameControls.tsx`
- 3 boutons de contrôle :
  - Skip Mode
  - Auto Mode
  - Historique
- États actifs visuels

#### `Notification.tsx`
- Toast notifications
- 4 types : info, success, warning, error
- Auto-dismiss après 3s
- Animation d'entrée

#### `SceneBackground.tsx`
- Gère les arrière-plans
- Transition en fondu
- Overlay sombre pour lisibilité

---

### 📁 src/screens/

Les différents écrans du jeu :

#### `MainMenu.tsx`
- Titre animé "Sweet Destiny"
- 3 boutons : Nouvelle Partie, Continuer, Paramètres
- Lance la musique
- Background animé

#### `NamingScreen.tsx`
- Input pour le nom du joueur
- Validation (max 15 caractères)
- Transition vers CustomizationScreen

#### `CustomizationScreen.tsx`
- Choix entre 2 avatars
- Preview des images
- Hover effects
- Transition vers le jeu

#### `GameScene.tsx` ⭐
Le cœur du jeu :
- Affiche le background
- Gère les personnages à l'écran
- Système de dialogue
- Gestion des choix
- Navigation clavier complète
- Support Skip/Auto
- Filtrage des choix conditionnels

#### `SettingsScreen.tsx`
- Toggle thème clair/sombre
- Sliders de volume (musique/SFX)
- Slider vitesse du texte
- Bouton recommencer avec confirmation

#### `ShopScreen.tsx`
- Affichage des pièces
- 2 packs de tickets
- Simulation d'achat

---

### 📁 src/store/

#### `gameStore.ts` 🧠
Store Zustand centralisé avec :

**État** :
- `gameState` : Écran actuel
- `playerName`, `playerAvatar` : Info joueur
- `currentSceneId` : Scène actuelle
- `relationships` : Jauges d'affection
- `flags` : Variables conditionnelles
- `energy`, `lastEnergyUse` : Système d'énergie
- `dialogueHistory` : Historique
- `isSkipMode`, `isAutoMode` : Modes de jeu
- `settings` : Configuration
- `notification` : Notification actuelle

**Actions** (20+) :
- Navigation : `setGameState`, `startGame`, `continueGame`
- Personnalisation : `setPlayerName`, `setPlayerAvatar`
- Gameplay : `makeChoice`, `useEnergy`, `rechargeEnergy`
- Flags : `setFlag`, `getFlag`, `checkCondition`
- Historique : `addToHistory`, `clearHistory`
- Modes : `toggleSkipMode`, `toggleAutoMode`
- UI : `showNotification`, `clearNotification`
- Paramètres : `updateSettings`, `resetGameProgress`

---

### 📁 src/data/

Toutes les données en JSON (facile à éditer) :

#### `story.json`
Structure du scénario :
```json
{
  "start": "scene_1",
  "scenes": {
    "scene_id": {
      "background": "classroom",
      "dialogues": [...],
      "choices": [...]
    }
  }
}
```

#### `characters.json`
Personnages avec 6 expressions chacun :
```json
{
  "Mia": {
    "name": "Mia",
    "images": {
      "neutral": "url...",
      "happy": "url...",
      ...
    }
  }
}
```

#### `avatars.json`
Avatars disponibles pour le joueur

#### `backgrounds.json`
Mapping ID → URL des arrière-plans

---

### 📁 src/config/

#### `game.ts`
Constantes et types :
- `GAME_CONFIG` : Version, énergie max, temps de recharge
- `LOCAL_STORAGE_KEY` : Clé de sauvegarde
- Types : `GameState`, `NotificationType`, `CharacterExpression`

---

### 📁 src/utils/

#### `audio.ts`
Gestionnaire audio avec Howler.js :
- `sounds` : Objets Howl pour tous les sons
- `AudioManager` : Classe avec méthodes utilitaires
  - `playMusic()` / `stopMusic()`
  - `play(soundName)`
  - `updateVolume()`
  - etc.

---

### 📁 src/hooks/

#### `useTypewriter.ts`
Custom hook pour l'effet machine à écrire :
- Paramètres : texte, vitesse, callback
- Support du skip
- Retourne : displayedText, isTyping, skipToEnd()

---

### 📁 src/styles/

#### `global.css`
- Import des fonts (Poppins, Quicksand)
- Classes utilitaires personnalisées
- Animations CSS (@keyframes)
- Classes Tailwind avec @apply
- Support du thème sombre

---

## 🔄 Flux de l'Application

```
1. index.html
   └─> main.tsx
       └─> App.tsx
           ├─> MainMenu
           │   └─> [Nouvelle Partie]
           │       ├─> NamingScreen
           │       └─> CustomizationScreen
           │           └─> GameScene ⭐
           │               ├─> SceneBackground
           │               ├─> CharacterPortrait (×N)
           │               ├─> DialogueBox
           │               ├─> ChoiceButton (×N)
           │               ├─> RelationshipHUD
           │               ├─> EnergyHUD
           │               ├─> GameControls
           │               └─> [DialogueHistory]
           │
           ├─> SettingsScreen
           └─> ShopScreen
```

---

## 🎨 Technologies Utilisées

| Techno | Usage |
|--------|-------|
| **React 18** | UI et composants |
| **TypeScript** | Typage statique |
| **Zustand** | État global |
| **Howler.js** | Audio |
| **Tailwind CSS** | Styles |
| **Vite** | Build tool |
| **Lucide React** | Icônes |

---

## 📈 Statistiques

- **25+ fichiers** organisés
- **~1500 lignes** de code
- **10 composants** réutilisables
- **6 écrans** différents
- **20+ actions** dans le store
- **Sauvegarde automatique**
- **Navigation clavier complète**
- **Responsive design**

---

## 🚀 Prochaines Étapes

Pour aller plus loin :
1. Ajouter plus de scènes dans `story.json`
2. Créer de vraies images pour les personnages
3. Intégrer de vrais fichiers audio
4. Ajouter un système d'inventaire
5. Implémenter les fins multiples
6. Ajouter un système d'achievements

---

**Projet prêt pour le développement ! 🎉**

