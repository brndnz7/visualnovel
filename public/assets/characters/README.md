# 👤 Personnages

## 📝 Instructions pour ajouter les sprites

Les fichiers PSD des personnages se trouvent dans le dossier `ressources/` :
- **Femme** : `ressources/Female Sprite by Sutemo/Female Sprite by Sutemo.psd`
- **Homme** : `ressources/Male Sprite by Sutemo/Male Sprite by Sutemo.psd`

### Pour les ajouter au jeu :

1. **Ouvrez les fichiers .PSD dans Photoshop** (ou GIMP)

2. **Exportez les sprites** en PNG :
   - Format : PNG transparent
   - Taille recommandée : 960x1920px (ou plus)
   - Nommage suggéré :
     - `female_neutral.png`, `female_happy.png`, etc.
     - `male_neutral.png`, `male_happy.png`, etc.

3. **Placez les fichiers exportés** dans ce dossier (`public/assets/characters/`)

4. **Mettez à jour** `src/data/characters.json` avec les chemins :
```json
{
  "Mia": {
    "name": "Mia",
    "images": {
      "neutral": "/assets/characters/female_neutral.png",
      "happy": "/assets/characters/female_happy.png",
      ...
    }
  }
}
```

## 🎨 Expressions à créer

Pour chaque personnage, créez 6 expressions :
- `neutral` - Expression neutre
- `happy` - Joyeux/Souriant
- `sad` - Triste
- `angry` - En colère
- `surprised` - Surpris
- `love` - Amoureux/Rougissant

## 🔄 Alternative

Si vous ne pouvez pas exporter les PSD, vous pouvez :
- Utiliser des sprites trouvés sur https://itch.io
- Utiliser des images d'anime temporaires
- Commander des sprites personnalisés

---

**Note** : En attendant, le jeu utilisera des URLs d'images externes comme placeholder.

