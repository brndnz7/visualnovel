// Types pour le système de téléphone

export interface PhoneMessage {
  id: string;
  sender: 'player' | string; // 'player' ou nom du personnage
  text: string;
  timestamp?: number;
  media?: string; // Chemin vers une image
  emoji?: string; // Emoji à afficher
}

export interface PhoneConversation {
  id: string;
  contactId: string;
  contactName: string;
  contactIcon: string;
  messages: PhoneMessage[];
  unread?: number;
}

export interface PhoneContact {
  id: string;
  name: string;
  icon: string;
}

export const PHONE_CONTACTS: PhoneContact[] = [
  {
    id: 'mia',
    name: 'Mia',
    icon: '/phone/icons/vanessa.png',
  },
  {
    id: 'alex',
    name: 'Alex',
    icon: '/phone/icons/avery.png',
  },
  {
    id: 'julien',
    name: 'Julien',
    icon: '/phone/icons/avery.png',
  },
];

