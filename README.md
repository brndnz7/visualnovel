# 🌸 Sweet Destiny

Un jeu narratif interactif de type "visual novel" / "dating sim" inspiré d'Amour Sucré.

## 🎮 Fonctionnalités

### ✅ Implémenté

- **Moteur narratif dynamique** : Scénario externalisé en JSON
- **Système de relations** : 3 personnages avec jauges d'affection (0-100)
- **Expressions des personnages** : 6 émotions par personnage (neutral, happy, sad, angry, surprised, love)
- **Système de flags/variables** : Conditions avancées pour débloquer des choix
- **Système d'énergie** : Régénération automatique (1 point/10min)
- **Personnalisation** : Nom et choix d'avatar (2 options)
- **Historique des dialogues** : Relire les conversations passées
- **Modes de jeu** :
  - **Skip Mode** : Passer rapidement le texte
  - **Auto Mode** : Avancement automatique
- **Navigation clavier** :
  - `Espace/Enter` : Avancer
  - `H` : Ouvrir l'historique
  - `S` : Toggle Skip Mode
  - `A` : Toggle Auto Mode
  - `1-5` : Sélectionner un choix
- **Sauvegarde automatique** : localStorage avec Zustand persist
- **Paramètres** :
  - Thème clair/sombre
  - Volumes (musique/effets)
  - Vitesse du texte
- **Boutique** : Achat de tickets (placeholder)
- **Publicité récompensée** : Gagner de l'énergie (simulation)

### 📁 Architecture

```
/src
  /components      # Composants UI réutilisables
  /screens         # Écrans du jeu
  /store           # Gestion d'état Zustand
  /data            # Données externalisées (JSON)
  /config          # Configuration du jeu
  /utils           # Utilitaires (audio, etc.)
  /hooks           # Custom hooks React
  /styles          # Styles CSS
```

## 🚀 Installation

```bash
# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev

# Build de production
npm run build

# Prévisualiser le build
npm run preview
```

## 🎨 Stack Technique

- **React 18** avec TypeScript
- **Zustand** pour la gestion d'état
- **Tailwind CSS** pour le styling
- **Howler.js** pour l'audio
- **Lucide React** pour les icônes
- **Vite** comme bundler

## 📝 Ajouter du Contenu

### Ajouter une scène

Éditez `src/data/story.json` :

```json
{
  "scenes": {
    "nouvelle_scene": {
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
          "text": "Répondre avec enthousiasme",
          "next": "scene_suivante",
          "effects": { "Mia": 5 },
          "condition": "Mia >= 50"
        }
      ]
    }
  }
}
```

### Ajouter un personnage

1. Ajoutez dans `src/data/characters.json`
2. Ajoutez dans le store : `relationships: { NouveauPerso: 50 }`

### Conditions avancées

- `"condition": "Mia > 60"` : Affection de Mia > 60
- `"condition": "flag:event_complete"` : Flag activé

## 🎯 Roadmap

- [ ] Système d'inventaire
- [ ] Multiples fins selon les relations
- [ ] Plus de scènes et personnages
- [ ] Vrai système de paiement (Stripe)
- [ ] API publicité récompensée
- [ ] Animations Live2D
- [ ] Musiques et sons personnalisés
- [ ] Mode plein écran
- [ ] Achievements/Trophées

## 📄 Licence

Projet personnel - Tous droits réservés

## 🤝 Contribution

Ce projet est à des fins éducatives. N'hésitez pas à forker et personnaliser !

