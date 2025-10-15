/**
 * Précharge les images critiques pour améliorer les performances
 */

const preloadedImages = new Set<string>();

export class ImagePreloader {
  /**
   * Précharge une seule image
   */
  static preloadImage(src: string): Promise<void> {
    if (preloadedImages.has(src)) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      
      img.onload = () => {
        preloadedImages.add(src);
        resolve();
      };
      
      img.onerror = () => {
        console.warn(`Failed to preload image: ${src}`);
        reject();
      };
    });
  }

  /**
   * Précharge plusieurs images en parallèle
   */
  static async preloadImages(sources: string[]): Promise<void> {
    const promises = sources.map(src => this.preloadImage(src).catch(() => {}));
    await Promise.all(promises);
  }

  /**
   * Précharge les images essentielles du jeu
   */
  static async preloadEssentials(): Promise<void> {
    const essentialImages = [
      '/backgrounds/bedroom_morning.jpg',
      '/backgrounds/school_entrance.jpg',
      '/backgrounds/classroom.jpg',
      '/backgrounds/cafeteria.jpg',
      '/backgrounds/school_hallway.jpg',
    ];

    await this.preloadImages(essentialImages);
  }

  /**
   * Précharge les sprites d'un personnage
   */
  static async preloadCharacter(characterId: string): Promise<void> {
    const expressions = ['neutral', 'happy', 'sad', 'angry', 'surprised'];
    const sprites = expressions.map(exp => 
      `/characters/${characterId}/${characterId}_${exp}.png`
    );
    
    await this.preloadImages(sprites);
  }

  /**
   * Vide le cache de préchargement
   */
  static clearCache(): void {
    preloadedImages.clear();
  }
}

