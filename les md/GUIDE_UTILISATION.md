# 📖 Guide d'Utilisation - Sweet Destiny

## 🎮 Comment Jouer

### Démarrage Rapide

1. **Installation**
   ```bash
   npm install
   npm run dev
   ```
   Le jeu s'ouvrira automatiquement dans votre navigateur.

2. **Menu Principal**
   - **Nouvelle Partie** : Commence une nouvelle aventure
   - **Continuer** : Reprend votre sauvegarde
   - **Paramètres** : Ajuste les réglages du jeu

### Contrôles

#### 🖱️ Souris/Tactile
- **Cliquer** sur le dialogue pour avancer
- **Cliquer** sur un choix pour le sélectionner
- **Cliquer** sur les boutons de contrôle en bas à droite

#### ⌨️ Clavier
| Touche | Action |
|--------|--------|
| `Espace` | Avancer dans le dialogue |
| `Enter` | Avancer / Valider |
| `H` | Ouvrir l'historique des dialogues |
| `S` | Activer/Désactiver le Skip Mode |
| `A` | Activer/Désactiver l'Auto Mode |
| `1-5` | Sélectionner le choix correspondant |
| `Échap` | Fermer les menus |

### 🎯 Système de Jeu

#### Énergie (Tickets)
- Vous avez **5 points d'énergie maximum**
- Chaque choix consomme **1 point**
- Régénération : **1 point toutes les 10 minutes**
- Pour recharger rapidement :
  - 📺 Regarder une pub (+1 ticket)
  - 🛒 Acheter dans la boutique

#### Relations
- Vos choix influencent les **jauges d'affection** (0-100)
- Visible en haut à droite pendant le jeu
- 3 personnages : **Mia**, **Alex**, **Julien**
- Certains choix ne sont débloqués qu'avec une affection suffisante

#### Expressions des Personnages
Les personnages affichent 6 émotions différentes :
- 😐 **Neutral** : État normal
- 😊 **Happy** : Joyeux
- 😢 **Sad** : Triste
- 😠 **Angry** : En colère
- 😲 **Surprised** : Surpris
- 😍 **Love** : Amoureux

### 🎛️ Modes de Jeu

#### Skip Mode (⏩)
- Passe le texte **instantanément**
- Idéal pour relire une partie déjà vue
- **Activation** : Bouton ou touche `S`
- Bouton devient rose quand actif

#### Auto Mode (▶️)
- Le dialogue **avance automatiquement**
- Délai de 2 secondes entre chaque texte
- **Activation** : Bouton ou touche `A`
- Bouton devient cyan quand actif
- S'arrête aux choix

#### Historique (📜)
- Affiche tous les dialogues passés
- **Activation** : Bouton ou touche `H`
- Limite : 100 derniers dialogues
- Permet de relire sans repasser les scènes

### ⚙️ Paramètres

#### Thème
- **Clair** 🌞 : Interface lumineuse
- **Sombre** 🌙 : Interface dark mode

#### Audio
- **Volume Musique** : 0-100%
- **Volume Effets** : 0-100%
- Sons joués :
  - Clic sur choix
  - Notification de relation
  - Transition de scène

#### Vitesse du Texte
- Réglage de 10 à 100
- Affecte l'effet machine à écrire

#### Recommencer
- Efface **toute votre sauvegarde**
- Demande une confirmation

### 🛒 Boutique

Deux packs disponibles :
- **Pack de 5 tickets** : 100 pièces
- **Pack de 15 tickets** : 250 pièces

*(Note : Actuellement en simulation, pas de vrai paiement)*

---

## 🧑‍💻 Pour les Développeurs

### Ajouter une Scène

**Fichier** : `src/data/story.json`

```json
{
  "scenes": {
    "ma_nouvelle_scene": {
      "background": "classroom",
      "dialogues": [
        {
          "speaker": "Mia",
          "text": "Salut {playerName} !",
          "position": "left",
          "expression": "happy"
        },
        {
          "speaker": "Player",
          "text": "Salut Mia !"
        }
      ],
      "choices": [
        {
          "text": "Lui proposer de sortir",
          "next": "date_mia",
          "effects": { "Mia": 10 },
          "condition": "Mia >= 60"
        },
        {
          "text": "Discuter normalement",
          "next": "casual_talk"
        }
      ]
    }
  }
}
```

#### Propriétés des Dialogues
- `speaker` : `"Narrator"`, `"Player"`, ou nom du personnage
- `text` : Le texte à afficher (utilisez `{playerName}` pour le nom du joueur)
- `position` : `"left"` ou `"right"` (pour les personnages)
- `expression` : `"neutral"`, `"happy"`, `"sad"`, `"angry"`, `"surprised"`, `"love"`

#### Propriétés des Choix
- `text` : Le texte du bouton
- `next` : ID de la scène suivante
- `effects` : Objet `{ "Personnage": +/-valeur }`
- `condition` : Condition pour débloquer le choix (optionnel)

### Conditions Disponibles

```json
// Basé sur les relations
"condition": "Mia > 60"      // Mia affection > 60
"condition": "Alex >= 50"    // Alex affection >= 50
"condition": "Julien < 30"   // Julien affection < 30

// Basé sur les flags
"condition": "flag:event_complete"  // Le flag doit être true
```

#### Définir un Flag

Dans le code TypeScript :
```typescript
import { useGameStore } from './store/gameStore';

// Définir un flag
useGameStore.getState().setFlag('event_complete', true);

// Lire un flag
const flag = useGameStore.getState().getFlag('event_complete');
```

### Ajouter un Personnage

1. **Ajouter dans `src/data/characters.json`**
```json
{
  "Sarah": {
    "name": "Sarah",
    "images": {
      "neutral": "url...",
      "happy": "url...",
      "sad": "url...",
      "angry": "url...",
      "surprised": "url...",
      "love": "url..."
    }
  }
}
```

2. **Initialiser dans le store** (`src/store/gameStore.ts`)
```typescript
relationships: { 
  Mia: 50, 
  Alex: 50, 
  Julien: 50,
  Sarah: 50  // Ajouter ici
}
```

### Ajouter un Arrière-plan

**Fichier** : `src/data/backgrounds.json`
```json
{
  "beach": "https://url-de-limage.jpg"
}
```

Puis utilisez dans le scénario :
```json
{
  "scene_plage": {
    "background": "beach",
    ...
  }
}
```

### Structure d'un Avatar

**Fichier** : `src/data/avatars.json`
```json
{
  "player_f_2": {
    "id": "player_f_2",
    "gender": "female",
    "image": "https://url..."
  }
}
```

---

## 🎨 Personnalisation

### Modifier les Couleurs

**Fichier** : `tailwind.config.js`
```js
theme: {
  extend: {
    colors: {
      'primary': '#FF69B4',
      'secondary': '#00CED1',
    }
  }
}
```

### Modifier la Vitesse de Régénération

**Fichier** : `src/config/game.ts`
```typescript
export const GAME_CONFIG = {
  ENERGY_MAX: 5,
  ENERGY_RECHARGE_MINUTES: 10,  // Modifier ici
  ...
}
```

### Changer la Musique

**Fichier** : `src/utils/audio.ts`
```typescript
music: new Howl({
  src: ['URL_DE_VOTRE_MUSIQUE.mp3'],
  loop: true,
  volume: 0.2,
  html5: true
}),
```

---

## 🐛 Dépannage

### Le jeu ne se lance pas
```bash
# Réinstaller les dépendances
rm -rf node_modules
npm install
npm run dev
```

### Les images ne s'affichent pas
- Vérifiez que les URLs dans les fichiers JSON sont valides
- Les images doivent permettre le CORS

### La sauvegarde ne fonctionne pas
- Vérifiez que le localStorage n'est pas désactivé
- Essayez en navigation privée
- Vider le cache : `localStorage.clear()`

### Les sons ne marchent pas
- Vérifiez que votre navigateur autorise l'autoplay
- Cliquez une fois sur la page pour activer l'audio

---

## 📞 Support

Pour toute question ou problème :
1. Consultez le README.md
2. Vérifiez le CHANGELOG.md
3. Regardez les commentaires dans le code source

Bon jeu ! 🎮✨

