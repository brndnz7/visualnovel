# 🎨 Intégration des Ressources - Sweet Destiny

## ✅ Ressources Intégrées

### 🖼️ Backgrounds (Arrière-plans)
Tous les backgrounds ont été copiés et intégrés :
- ✅ **Classroom** - Salle de classe
- ✅ **Hallway** - Couloir d'école
- ✅ **Cafe** - Cafétéria
- ✅ **Campus** - Extérieur (rue printemps)
- ✅ **Library** - Bibliothèque (salon)
- ✅ **Park** - Parc (rue été)

**Emplacement** : `public/assets/backgrounds/`  
**Source** : Noraneko Backgrounds Pack 1, 2 & 3

### 🎵 Musique
3 musiques intégrées :
- ✅ **main_theme.mp3** - Thème principal (Hope)
- ✅ **menu.mp3** - Menu (Beanfeast)
- ✅ **dramatic.mp3** - Scènes dramatiques

**Emplacement** : `public/assets/music/`  
**Source** : BGM Pack 1 MP3

### 📦 Fichiers Mis à Jour
- ✅ `src/data/backgrounds.json` - Chemins vers les backgrounds locaux
- ✅ `src/utils/audio.ts` - Musique locale

---

## ⚠️ À Faire : Sprites des Personnages

### Problème
Les sprites des personnages sont en format **PSD** (Photoshop) et ne peuvent pas être utilisés directement.

**Fichiers PSD disponibles** :
- `ressources/Female Sprite by Sutemo/Female Sprite by Sutemo.psd`
- `ressources/Male Sprite by Sutemo/Male Sprite by Sutemo.psd`

### 🛠️ Solution : Exporter les Sprites

#### Option 1 : Photoshop
1. Ouvrir le fichier PSD
2. Aller dans **Fichier > Exportation > Export as PNG**
3. Cocher "Transparent"
4. Sauvegarder dans `public/assets/characters/`

#### Option 2 : GIMP (Gratuit)
1. Télécharger GIMP : https://www.gimp.org/
2. Ouvrir le PSD
3. **Fichier > Exporter sous** → PNG
4. Sauvegarder dans `public/assets/characters/`

#### Option 3 : Service en Ligne
- https://www.photopea.com/ (éditeur Photoshop en ligne gratuit)
- Ouvrir le PSD
- Exporter en PNG

### 📋 Sprites à Créer

Pour **chaque personnage** (Mia, Alex, Julien), créez **6 expressions** :

| Expression | Nom du fichier | Description |
|------------|----------------|-------------|
| Neutral | `mia_neutral.png` | Expression normale |
| Happy | `mia_happy.png` | Souriant, joyeux |
| Sad | `mia_sad.png` | Triste |
| Angry | `mia_angry.png` | En colère, fâché |
| Surprised | `mia_surprised.png` | Surpris, choqué |
| Love | `mia_love.png` | Amoureux, rougissant |

**Total à créer** : 18 images (3 personnages × 6 expressions)

### 🔄 Mettre à Jour le Code

Une fois les sprites exportés, mettez à jour `src/data/characters.json` :

```json
{
  "Mia": {
    "name": "Mia",
    "images": {
      "neutral": "/assets/characters/mia_neutral.png",
      "happy": "/assets/characters/mia_happy.png",
      "sad": "/assets/characters/mia_sad.png",
      "angry": "/assets/characters/mia_angry.png",
      "surprised": "/assets/characters/mia_surprised.png",
      "love": "/assets/characters/mia_love.png"
    }
  },
  "Alex": {
    "name": "Alex",
    "images": {
      "neutral": "/assets/characters/alex_neutral.png",
      "happy": "/assets/characters/alex_happy.png",
      "sad": "/assets/characters/alex_sad.png",
      "angry": "/assets/characters/alex_angry.png",
      "surprised": "/assets/characters/alex_surprised.png",
      "love": "/assets/characters/alex_love.png"
    }
  },
  "Julien": {
    "name": "Julien",
    "images": {
      "neutral": "/assets/characters/julien_neutral.png",
      "happy": "/assets/characters/julien_happy.png",
      "sad": "/assets/characters/julien_sad.png",
      "angry": "/assets/characters/julien_angry.png",
      "surprised": "/assets/characters/julien_surprised.png",
      "love": "/assets/characters/julien_love.png"
    }
  }
}
```

---

## 🎯 Ressources Disponibles Non Utilisées

### Plus de Backgrounds
Vous avez accès à **98 backgrounds** supplémentaires dans :
- `ressources/Noraneko_Background_Pack_1/`
- `ressources/Noraneko_Backgrounds_Pack_2/`
- `ressources/Noraneko_Backgrounds_Pack_3/`
- `ressources/Noraneko_Backgrounds_Shrine/`

**Exemples disponibles** :
- Chambres (jour/nuit)
- Rues (printemps/été/automne avec pluie/nuit)
- Temples/Sanctuaires
- Restaurants
- Trains
- Appartements
- Onsen
- Bus stops
- Ruelles

**Pour les ajouter** :
1. Copier l'image dans `public/assets/backgrounds/`
2. Ajouter dans `src/data/backgrounds.json`
3. Utiliser dans `src/data/story.json`

### Plus de Musiques
Vous avez **8 musiques** supplémentaires :
- `dramatic_boi_v2.mp3` à `v5.mp3`
- `frozen_winter.mp3`
- `woo_scary.mp3`
- `bonus1.mp3`

**Pour les ajouter** :
1. Copier dans `public/assets/music/`
2. Créer un nouveau `Howl` dans `src/utils/audio.ts`

---

## 📊 Résumé

| Ressource | Intégré | À Faire |
|-----------|---------|---------|
| Backgrounds | ✅ 6/98 | Ajouter plus si besoin |
| Musique | ✅ 3/8 | Ajouter plus si besoin |
| Sprites Personnages | ❌ 0/18 | **Exporter les PSD** |
| Sprites Joueur | ❌ 0/2 | **Exporter les PSD** |

---

## 🚀 Prochaines Étapes

1. **Exporter les sprites** depuis les fichiers PSD
2. **Placer les PNG** dans `public/assets/characters/`
3. **Mettre à jour** `src/data/characters.json`
4. **Mettre à jour** `src/data/avatars.json` pour les avatars du joueur
5. **Tester** le jeu avec les vraies ressources

---

## 💡 Astuce

En attendant d'avoir les sprites, le jeu **fonctionne déjà** avec :
- ✅ Backgrounds locaux (magnifiques !)
- ✅ Musique locale
- ⚠️ Sprites temporaires (URLs externes)

**Le jeu est jouable immédiatement !** 🎮

