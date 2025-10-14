// Types pour le créateur de personnage
export type Gender = 'female' | 'male';

export interface CustomCharacter {
  gender: Gender;
  base: number;
  hair: { style: number; color: number };
  eyes: { style: number; color: number };
  eyebrows: number;
  mouth: number;
  top: { style: number; color: number };
  bottom: { style: number; color: number };
  accessories?: number; // Pour lunettes, écouteurs, etc.
}

export const CHARACTER_CREATOR_OPTIONS = {
  female: {
    bases: 5,
    hairStyles: 5,
    hairColors: 15,
    eyeStyles: 3,
    eyeColors: 10,
    eyebrows: 5,
    mouths: 5,
    topStyles: 5,
    topColors: 6,
    bottomStyles: 3,
    bottomColors: 6,
  },
  male: {
    bases: 1, // Un seul base body
    hairStyles: 12, // 1 (0001s) + 7 (0002s) + 4 (0005s) = 12 styles
    hairColors: 5, // Brown, Silver, Red, Dark, Blond
    expressions: 11, // Normal, Smile 1-3, Laugh, Surprised, Smirk, Angry 1-2, Sad, sweat
    outfits: 18, // 18 tenues différentes
    accessories: 4, // Lunettes Circle, Black, Écouteurs x2
  },
};

export const DEFAULT_CHARACTER: CustomCharacter = {
  gender: 'female',
  base: 1,
  hair: { style: 1, color: 1 },
  eyes: { style: 1, color: 1 },
  eyebrows: 1,
  mouth: 1,
  top: { style: 1, color: 1 },
  bottom: { style: 1, color: 1 },
  accessories: 0,
};

export const DEFAULT_MALE_CHARACTER: CustomCharacter = {
  gender: 'male',
  base: 1, // Base-Body obligatoire
  hair: { style: 1, color: 1 }, // Première coiffure, couleur Brown
  eyes: { style: 1, color: 1 }, // Pas utilisé pour les hommes
  eyebrows: 1,
  mouth: 10, // Expression "Normal" par défaut
  top: { style: 1, color: 1 }, // Premier outfit
  bottom: { style: 1, color: 1 }, // Pas utilisé pour les hommes
  accessories: 0, // Pas d'accessoires par défaut
};

