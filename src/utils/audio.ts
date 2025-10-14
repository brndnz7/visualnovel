import { Howl } from 'howler';

// Système audio amélioré avec de vrais sons
export const sounds = {
  // Son de clic simple
  click: new Howl({
    src: ['data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA='],
    volume: 0.5
  }),
  
  // Musique de fond (fichier local)
  music: new Howl({
    src: ['/assets/music/main_theme.mp3'],
    loop: true,
    volume: 0.2,
    html5: true
  }),
  
  // Son de transition
  swoosh: new Howl({
    src: ['data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA='],
    volume: 0.3
  }),
  
  // Son de succès
  success: new Howl({
    src: ['data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA='],
    volume: 0.5
  }),
  
  // Son d'erreur
  error: new Howl({
    src: ['data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA='],
    volume: 0.5
  }),
  
  // Sons du téléphone
  phoneSend: new Howl({
    src: ['/sounds/phone/send.mp3'],
    volume: 0.3
  }),
  
  phoneReceive: new Howl({
    src: ['/sounds/phone/receive.mp3'],
    volume: 0.3
  })
};

export class AudioManager {
  static updateVolume(soundName: keyof typeof sounds, volume: number) {
    if (sounds[soundName]) {
      sounds[soundName].volume(volume);
    }
  }

  static updateAllSFXVolume(volume: number) {
    sounds.click.volume(volume);
    sounds.swoosh.volume(volume);
    sounds.success.volume(volume);
    sounds.error.volume(volume);
  }

  static updateMusicVolume(volume: number) {
    sounds.music.volume(volume);
  }

  static playMusic() {
    if (!sounds.music.playing()) {
      sounds.music.play();
    }
  }

  static stopMusic() {
    sounds.music.stop();
  }

  static play(soundName: keyof typeof sounds) {
    if (sounds[soundName]) {
      sounds[soundName].play();
    }
  }
}

