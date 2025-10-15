// Service d'authentification
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';

export class AuthService {
  /**
   * Connexion avec Google
   */
  static async signInWithGoogle(): Promise<User> {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (error: any) {
      console.error('Erreur lors de la connexion Google:', error);
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  /**
   * Connexion avec email/mot de passe
   */
  static async signInWithEmail(email: string, password: string): Promise<User> {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (error: any) {
      console.error('Erreur lors de la connexion email:', error);
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  /**
   * Inscription avec email/mot de passe
   */
  static async signUpWithEmail(email: string, password: string, displayName: string): Promise<User> {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Mettre à jour le profil avec le nom
      if (result.user) {
        await updateProfile(result.user, { displayName });
      }
      
      return result.user;
    } catch (error: any) {
      console.error('Erreur lors de l\'inscription:', error);
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  /**
   * Déconnexion
   */
  static async signOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error: any) {
      console.error('Erreur lors de la déconnexion:', error);
      throw new Error('Erreur lors de la déconnexion');
    }
  }

  /**
   * Obtenir l'utilisateur actuel
   */
  static getCurrentUser(): User | null {
    return auth.currentUser;
  }

  /**
   * Observer les changements d'état d'authentification
   */
  static onAuthStateChange(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(auth, callback);
  }

  /**
   * Traduire les codes d'erreur Firebase en messages lisibles
   */
  private static getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'Cette adresse email est déjà utilisée';
      case 'auth/invalid-email':
        return 'Adresse email invalide';
      case 'auth/operation-not-allowed':
        return 'Opération non autorisée';
      case 'auth/weak-password':
        return 'Le mot de passe doit contenir au moins 6 caractères';
      case 'auth/user-disabled':
        return 'Ce compte a été désactivé';
      case 'auth/user-not-found':
        return 'Aucun compte trouvé avec cet email';
      case 'auth/wrong-password':
        return 'Mot de passe incorrect';
      case 'auth/popup-closed-by-user':
        return 'Connexion annulée';
      case 'auth/cancelled-popup-request':
        return 'Connexion annulée';
      case 'auth/popup-blocked':
        return 'La popup a été bloquée par le navigateur';
      default:
        return 'Une erreur est survenue lors de l\'authentification';
    }
  }
}

