# 🚀 Démarrage Rapide - Sweet Destiny v1.0.0

## ⚡ Installation et Lancement (5 minutes)

### 1️⃣ Installer les Dépendances

Ouvrez un terminal dans le dossier du projet et exécutez :

```bash
npm install
```

Cette commande va installer :
- React 18
- Zustand (gestion d'état)
- Howler.js (audio)
- Tailwind CSS
- Lucide React (icônes)
- TypeScript
- Vite

⏱️ Temps estimé : 2-3 minutes

### 2️⃣ Lancer le Serveur de Développement

```bash
npm run dev
```

Le jeu s'ouvrira automatiquement dans votre navigateur à l'adresse :
**http://localhost:5173**

✅ C'est tout ! Le jeu est prêt à jouer !

---

## 🎮 Premiers Pas

1. **Menu Principal** : Cliquez sur "Nouvelle Partie"
2. **Nom** : Entrez votre prénom
3. **Avatar** : Choisissez votre apparence
4. **Jeu** : Cliquez pour avancer, faites des choix !

### Raccourcis Clavier Utiles

- `Espace` : Avancer
- `H` : Historique
- `S` : Mode Skip
- `A` : Mode Auto
- `1-5` : Sélectionner un choix

---

## 📝 Éditer le Scénario

Le scénario est dans un fichier JSON facilement modifiable :

**Fichier** : `src/data/story.json`

### Exemple Simple

```json
{
  "ma_scene": {
    "background": "classroom",
    "dialogues": [
      {
        "speaker": "Mia",
        "text": "Salut {playerName} !",
        "position": "left",
        "expression": "happy"
      }
    ],
    "choices": [
      {
        "text": "Lui dire bonjour",
        "next": "scene_suivante",
        "effects": { "Mia": 5 }
      }
    ]
  }
}
```

### Changer la Scène de Départ

Dans `story.json`, modifiez :
```json
{
  "start": "scene_1"  ← Changez cette valeur
}
```

---

## 🎨 Personnaliser le Jeu

### Changer les Couleurs

**Fichier** : `src/styles/global.css`

Cherchez les classes et modifiez :
- `.menu-button` : Boutons du menu
- `.choice-button` : Boutons de choix
- Etc.

### Modifier l'Énergie

**Fichier** : `src/config/game.ts`

```typescript
export const GAME_CONFIG = {
  ENERGY_MAX: 5,              ← Maximum d'énergie
  ENERGY_RECHARGE_MINUTES: 10 ← Minutes pour recharger 1 point
}
```

### Ajouter un Personnage

1. **Ajoutez dans** `src/data/characters.json`
```json
{
  "Sophie": {
    "name": "Sophie",
    "images": {
      "neutral": "url_de_limage.jpg",
      "happy": "url_de_limage.jpg",
      ...
    }
  }
}
```

2. **Initialisez dans** `src/store/gameStore.ts`
```typescript
relationships: { 
  Mia: 50, 
  Alex: 50, 
  Julien: 50,
  Sophie: 50  ← Ajoutez ici
}
```

---

## 🏗️ Build de Production

Quand vous êtes prêt à déployer :

```bash
npm run build
```

Les fichiers optimisés seront dans le dossier `dist/`

Pour tester le build :
```bash
npm run preview
```

---

## 📚 Documentation Complète

| Document | Description |
|----------|-------------|
| `README.md` | Vue d'ensemble et installation |
| `GUIDE_UTILISATION.md` | Guide utilisateur complet |
| `CHANGELOG.md` | Nouveautés de la v1.0.0 |
| `STRUCTURE_PROJET.md` | Architecture détaillée |

---

## 🛠️ Commandes Utiles

```bash
# Développement
npm run dev           # Lancer le serveur de dev
npm run build         # Build de production
npm run preview       # Prévisualiser le build

# Nettoyage
rm -rf node_modules   # Supprimer les dépendances
npm install           # Réinstaller
```

---

## ❓ Problèmes Courants

### Le jeu ne se lance pas

**Solution** :
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Erreur TypeScript

**Solution** : Vérifiez que tous les fichiers `.ts`/`.tsx` n'ont pas d'erreurs
```bash
npm run build
```
Corrigez les erreurs affichées

### Les images ne s'affichent pas

**Cause** : URLs externes cassées

**Solution** : Remplacez les URLs dans :
- `src/data/characters.json`
- `src/data/avatars.json`
- `src/data/backgrounds.json`

### Pas de son

**Cause** : Le navigateur bloque l'autoplay

**Solution** : Cliquez une fois sur la page pour activer l'audio

---

## 🎯 Prochaines Étapes

### Débutant
1. ✏️ Modifier le texte dans `story.json`
2. 🎨 Changer les couleurs dans `global.css`
3. 📸 Remplacer les images des personnages

### Intermédiaire
4. ➕ Ajouter de nouvelles scènes
5. 👤 Créer un nouveau personnage
6. 🎵 Changer la musique

### Avancé
7. 🔧 Modifier le gameplay dans `gameStore.ts`
8. 🎨 Créer de nouveaux composants
9. 🚀 Déployer sur Vercel/Netlify

---

## 🌟 Ressources

- **React** : https://react.dev
- **Zustand** : https://docs.pmnd.rs/zustand
- **Tailwind CSS** : https://tailwindcss.com
- **Vite** : https://vitejs.dev

---

## 💡 Astuces de Développement

1. **Hot Reload** : Vite recharge automatiquement quand vous modifiez un fichier
2. **DevTools** : Installez React DevTools pour débugger
3. **Console** : Ouvrez la console (F12) pour voir les erreurs
4. **Sauvegarde** : La sauvegarde est dans le localStorage du navigateur

---

**Bon développement ! 🎮✨**

Des questions ? Consultez `GUIDE_UTILISATION.md` pour plus de détails !

