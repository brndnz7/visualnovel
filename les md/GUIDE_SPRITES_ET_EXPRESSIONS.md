# 👤 Guide des Sprites et Expressions

## 📋 Table des Sprites Disponibles

### 🎭 Personnages du Jeu

#### Mia (Female Sprite) - 11 Expressions

| Expression | Fichier | Utilisation | Émotion |
|------------|---------|-------------|---------|
| `neutral` | `female-normal.png` | État par défaut | Calme, neutre |
| `happy` | `female-smile.png` | Joyeuse | Contente, souriante |
| `sad` | `female-sad.png` | Triste | Déprimée, déçue |
| `angry` | `female-angry.png` | En colère | Fâchée, irritée |
| `surprised` | `female-shocked.png` | Surprise | Choquée, étonnée |
| `love` | `female-delighted.png` | Amoureuse | Ravie, épanouie |
| `laugh` | `female-laugh.png` | Rire | Hilarité, joie |
| `annoyed` | `female-annoyed.png` | Agacée | Embêtée, irritée |
| `sleepy` | `female-sleepy.png` | Fatiguée | Endormie, lasse |
| `smug` | `female-smug.png` | Satisfaite | Fière, confiante |
| `smile2` | `female-smile2.png` | Sourire doux | Gentille, douce |

#### Alex (Male Sprite) - 10 Expressions

| Expression | Fichier | Utilisation | Émotion |
|------------|---------|-------------|---------|
| `neutral` | `male-normal.png` | État par défaut | Calme, neutre |
| `happy` | `male-smile1.png` | Joyeux | Content, souriant |
| `sad` | `male-sad.png` | Triste | Déprimé, déçu |
| `angry` | `male-angry1.png` | En colère | Fâché, irrité |
| `surprised` | `male-surprised.png` | Surpris | Choqué, étonné |
| `love` | `male-smile3.png` | Amoureux | Ravi, épanoui |
| `laugh` | `male-laugh.png` | Rire | Hilarité, joie |
| `smirk` | `male-smirk.png` | Sourire narquois | Moqueur, taquin |
| `angry2` | `male-angry2.png` | Très en colère | Furieux (alt) |
| `smile2` | `male-smile2.png` | Sourire doux | Gentil, doux |

#### Julien (Male Sprite Variante) - 10 Expressions

Utilise les mêmes fichiers que Alex mais avec un mapping légèrement différent :

| Expression | Fichier | Utilisation | Émotion |
|------------|---------|-------------|---------|
| `neutral` | `male-normal.png` | État par défaut | Calme, neutre |
| `happy` | `male-smile2.png` | Joyeux | Content (variante) |
| `sad` | `male-sad.png` | Triste | Déprimé, déçu |
| `angry` | `male-angry2.png` | En colère | Fâché (variante) |
| `surprised` | `male-surprised.png` | Surpris | Choqué, étonné |
| `love` | `male-smile3.png` | Amoureux | Ravi, épanoui |
| `laugh` | `male-laugh.png` | Rire | Hilarité, joie |
| `smirk` | `male-smirk.png` | Sourire narquois | Moqueur, taquin |

---

## 💡 Comment Utiliser les Expressions

### Dans story.json

#### Exemple Simple
```json
{
  "speaker": "Mia",
  "text": "Salut {playerName} !",
  "position": "left",
  "expression": "happy"
}
```

#### Dialogue avec Changement d'Expression
```json
{
  "dialogues": [
    {
      "speaker": "Mia",
      "text": "Oh non, j'ai oublié mes devoirs !",
      "position": "left",
      "expression": "shocked"
    },
    {
      "speaker": "Alex",
      "text": "Ne t'inquiète pas, je peux t'aider.",
      "position": "right",
      "expression": "happy"
    },
    {
      "speaker": "Mia",
      "text": "Vraiment ? Merci beaucoup !",
      "position": "left",
      "expression": "love"
    }
  ]
}
```

---

## 🎬 Scénarios d'Utilisation

### Conversation Joyeuse
```json
{
  "speaker": "Mia",
  "expression": "happy",
  "text": "C'était super la fête hier !"
}
```
→ Utilise `female-smile.png`

### Moment Dramatique
```json
{
  "speaker": "Alex",
  "expression": "angry",
  "text": "Comment as-tu pu faire ça ?!"
}
```
→ Utilise `male-angry1.png`

### Scène Romantique
```json
{
  "speaker": "Mia",
  "expression": "love",
  "text": "Je... je suis si heureuse d'être avec toi."
}
```
→ Utilise `female-delighted.png`

### Moment Comique
```json
{
  "speaker": "Julien",
  "expression": "smirk",
  "text": "Tu pensais vraiment que j'allais tomber dans le piège ?"
}
```
→ Utilise `male-smirk.png`

### Révélation Choquante
```json
{
  "speaker": "Mia",
  "expression": "surprised",
  "text": "QUOI ?! Tu es sérieux là ?!"
}
```
→ Utilise `female-shocked.png`

---

## 🎨 Palette Émotionnelle

### Émotions Positives
- **happy** - Joie générale
- **laugh** - Grande joie, hilarité
- **love** - Affection, amour
- **smile2** - Douceur, tendresse
- **smug** - Satisfaction, fierté

### Émotions Négatives
- **sad** - Tristesse
- **angry** - Colère modérée
- **angry2** - Colère intense (Alex uniquement)
- **annoyed** - Agacement (Mia uniquement)

### Émotions Neutres/Autres
- **neutral** - État par défaut
- **surprised** - Étonnement
- **sleepy** - Fatigue (Mia uniquement)
- **smirk** - Ironie (Male uniquement)

---

## 🎯 Conseils d'Utilisation

### 1. Varier les Expressions

❌ **À Éviter** :
```json
{
  "speaker": "Mia",
  "expression": "neutral",
  "text": "Je suis si heureuse !"
}
```

✅ **Mieux** :
```json
{
  "speaker": "Mia",
  "expression": "love",
  "text": "Je suis si heureuse !"
}
```

### 2. Cohérence Émotionnelle

❌ **Incohérent** :
```json
{
  "speaker": "Alex",
  "expression": "happy",
  "text": "Je suis vraiment en colère contre toi !"
}
```

✅ **Cohérent** :
```json
{
  "speaker": "Alex",
  "expression": "angry",
  "text": "Je suis vraiment en colère contre toi !"
}
```

### 3. Progression Naturelle

✅ **Bon** :
```json
[
  {
    "speaker": "Mia",
    "expression": "neutral",
    "text": "J'ai quelque chose à te dire..."
  },
  {
    "speaker": "Mia",
    "expression": "sad",
    "text": "Je dois partir..."
  },
  {
    "speaker": "Player",
    "text": "Attends ! Ne pars pas !"
  },
  {
    "speaker": "Mia",
    "expression": "surprised",
    "text": "Tu... tu veux que je reste ?"
  },
  {
    "speaker": "Mia",
    "expression": "love",
    "text": "Alors je reste avec toi."
  }
]
```

---

## 📊 Tableau de Référence Rapide

### Mia
```
Basique    : neutral, happy, sad, angry
Romance    : love, smile2
Humour     : laugh, smug
Dramatique : surprised, annoyed, sleepy
```

### Alex/Julien
```
Basique    : neutral, happy, sad, angry
Romance    : love, smile2
Humeur     : laugh, smirk, surprised
Variante   : angry2, smile1/smile2
```

---

## 🎮 Exemples Complets de Scènes

### Scène 1 : Rencontre
```json
{
  "scene_meet": {
    "background": "hallway",
    "dialogues": [
      {
        "speaker": "Narrator",
        "text": "Vous croisez Mia dans le couloir."
      },
      {
        "speaker": "Mia",
        "text": "Oh ! Salut !",
        "position": "left",
        "expression": "surprised"
      },
      {
        "speaker": "Player",
        "text": "Salut Mia !"
      },
      {
        "speaker": "Mia",
        "text": "Je suis contente de te voir !",
        "position": "left",
        "expression": "happy"
      }
    ],
    "choices": [
      {
        "text": "Moi aussi !",
        "next": "scene_2",
        "effects": { "Mia": 5 }
      }
    ]
  }
}
```

### Scène 2 : Conflit
```json
{
  "scene_conflict": {
    "background": "classroom",
    "dialogues": [
      {
        "speaker": "Alex",
        "text": "Tu aurais dû me le dire !",
        "position": "right",
        "expression": "angry"
      },
      {
        "speaker": "Mia",
        "text": "Je... je suis désolée...",
        "position": "left",
        "expression": "sad"
      },
      {
        "speaker": "Alex",
        "text": "C'était important pour moi.",
        "position": "right",
        "expression": "sad"
      }
    ],
    "choices": [
      {
        "text": "Calmons-nous tous...",
        "next": "scene_peace",
        "effects": { "Alex": 3, "Mia": 3 }
      },
      {
        "text": "Alex a raison, Mia.",
        "next": "scene_side_alex",
        "effects": { "Alex": 5, "Mia": -3 }
      }
    ]
  }
}
```

### Scène 3 : Romance
```json
{
  "scene_romance": {
    "background": "park",
    "dialogues": [
      {
        "speaker": "Mia",
        "text": "C'est magnifique ici...",
        "position": "left",
        "expression": "neutral"
      },
      {
        "speaker": "Player",
        "text": "Oui, mais pas autant que toi."
      },
      {
        "speaker": "Mia",
        "text": "...!",
        "position": "left",
        "expression": "surprised"
      },
      {
        "speaker": "Mia",
        "text": "Tu es vraiment...",
        "position": "left",
        "expression": "love"
      }
    ],
    "choices": [
      {
        "text": "Prendre sa main",
        "next": "scene_romantic_end",
        "effects": { "Mia": 15 }
      }
    ]
  }
}
```

---

## 🎭 Expressions par Situation

### Situations Sociales
- Rencontre : `neutral` → `happy` ou `surprised`
- Discussion : `neutral`, `happy`
- Blague : `laugh`, `smug`, `smirk`

### Situations Émotionnelles
- Révélation : `surprised` → `shocked`
- Dispute : `annoyed` → `angry`
- Réconciliation : `sad` → `smile2` → `happy`

### Situations Romantiques
- Compliment reçu : `surprised` → `love`
- Déclaration : `neutral` → `love`
- Moment tendre : `smile2`, `love`

---

## 💾 Fichiers de Référence

### Emplacement
```
public/assets/characters/
├── female-normal.png
├── female-smile.png
├── female-smile2.png
├── female-sad.png
├── female-angry.png
├── female-shocked.png
├── female-delighted.png
├── female-laugh.png
├── female-annoyed.png
├── female-sleepy.png
├── female-smug.png
├── male-normal.png
├── male-smile1.png
├── male-smile2.png
├── male-smile3.png
├── male-sad.png
├── male-angry1.png
├── male-angry2.png
├── male-surprised.png
├── male-laugh.png
└── male-smirk.png
```

### Configuration
Voir `src/data/characters.json` pour le mapping complet.

---

**🎨 Utilisez ces expressions pour créer des scènes vivantes et émotionnelles ! 🎭**

