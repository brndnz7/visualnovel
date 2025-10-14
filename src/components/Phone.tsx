import React, { useState, useEffect, useRef } from 'react';
import { X, ArrowLeft, Send } from 'lucide-react';
import { PhoneConversation, PhoneMessage } from '../types/phone';
import { useGameStore } from '../store/gameStore';
import { AudioManager } from '../utils/audio';

interface PhoneProps {
  onClose: () => void;
  conversationId?: string;
}

export const Phone: React.FC<PhoneProps> = ({ onClose, conversationId }) => {
  const [view, setView] = useState<'list' | 'conversation'>('list');
  const [activeConversation, setActiveConversation] = useState<PhoneConversation | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const conversations = useGameStore((s) => s.phoneConversations);
  const addPhoneMessage = useGameStore((s) => s.addPhoneMessage);
  const markConversationRead = useGameStore((s) => s.markConversationRead);

  // Réponses rapides prédéfinies
  const quickReplies = [
    "D'accord",
    "Haha",
    "Génial !",
    "Je t'aime",
    "À plus tard",
    "Merci !",
  ];

  // Auto-ouvrir une conversation si conversationId est fourni
  useEffect(() => {
    if (conversationId && conversations) {
      const conv = conversations.find((c) => c.id === conversationId);
      if (conv) {
        openConversation(conv);
      }
    }
  }, [conversationId, conversations]);

  // Auto-scroll vers le bas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.messages]);

  const openConversation = (conversation: PhoneConversation) => {
    setActiveConversation(conversation);
    setView('conversation');
    if (conversation.unread && conversation.unread > 0) {
      markConversationRead(conversation.id);
    }
  };

  const sendMessage = (text?: string) => {
    const messageText = text || messageInput.trim();
    if (!messageText || !activeConversation) return;

    const newMessage: PhoneMessage = {
      id: `msg_${Date.now()}`,
      sender: 'player',
      text: messageText,
      timestamp: Date.now(),
    };

    addPhoneMessage(activeConversation.id, newMessage);
    setMessageInput('');
    setShowQuickReplies(false); // Masquer les réponses rapides après envoi
    AudioManager.play('phoneSend');

    // Simuler une réponse après 2-3 secondes
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setShowQuickReplies(true); // Réafficher les réponses rapides
      // Ici, on pourrait ajouter une logique pour des réponses automatiques
    }, 2500);
  };

  const sendQuickReply = (reply: string) => {
    sendMessage(reply);
  };

  const renderMessageBubble = (message: PhoneMessage, index: number) => {
    const isPlayer = message.sender === 'player';
    
    return (
      <div
        key={message.id || index}
        className={`flex ${isPlayer ? 'justify-end' : 'justify-start'} mb-3 animate-slideUp`}
        style={{ animationDelay: `${index * 50}ms` }}
      >
        <div
          className={`max-w-[70%] px-4 py-3 rounded-2xl ${
            isPlayer ? 'rounded-br-sm' : 'rounded-bl-sm'
          }`}
          style={{
            backgroundImage: isPlayer 
              ? 'url(/phone/player_bubble.png)'
              : 'url(/phone/character_bubble.png)',
            backgroundSize: '100% 100%',
            backgroundColor: isPlayer ? '#007AFF' : '#E5E5EA',
            color: isPlayer ? 'white' : '#000',
          }}
        >
          {message.media && (
            <img
              src={message.media}
              alt="Media"
              className="w-full rounded-lg mb-2"
            />
          )}
          <p className="text-sm leading-relaxed">{message.text}</p>
          {message.emoji && (
            <div className="mt-2 text-2xl">{message.emoji}</div>
          )}
        </div>
      </div>
    );
  };

  const renderConversationView = () => {
    if (!activeConversation) return null;

    return (
      <div className="h-full flex flex-col">
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{
            backgroundImage: 'url(/phone/header.png)',
            backgroundSize: 'cover',
            backgroundColor: '#F7F7F7',
          }}
        >
          <button
            onClick={() => setView('list')}
            className="p-2 hover:bg-black/10 rounded-full transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-700" />
          </button>
          <div className="flex items-center gap-3">
            <img
              src={activeConversation.contactIcon}
              alt={activeConversation.contactName}
              className="w-8 h-8 rounded-full"
            />
            <span className="font-semibold text-gray-800">
              {activeConversation.contactName}
            </span>
          </div>
          <div className="w-8" />
        </div>

        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto px-4 py-4"
          style={{
            backgroundImage: 'url(/phone/screen.png)',
            backgroundSize: 'cover',
            backgroundColor: '#FFFFFF',
          }}
        >
          {activeConversation.messages.map((msg, idx) => renderMessageBubble(msg, idx))}
          {isTyping && (
            <div className="flex justify-start mb-3">
              <div
                className="px-4 py-3 rounded-2xl rounded-bl-sm bg-gray-200"
                style={{ backgroundColor: '#E5E5EA' }}
              >
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        {showQuickReplies && !isTyping && (
          <div className="px-4 py-2 bg-white border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {quickReplies.map((reply, idx) => (
                <button
                  key={idx}
                  onClick={() => sendQuickReply(reply)}
                  className="px-3 py-1 text-sm rounded-full border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 bg-gray-100">
          <div className="flex gap-2">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Message..."
              className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
              style={{ backgroundColor: 'white' }}
            />
            <button
              onClick={() => sendMessage()}
              disabled={!messageInput.trim()}
              className="p-2 rounded-full transition-all"
              style={{
                backgroundColor: messageInput.trim() ? '#007AFF' : '#E5E5EA',
                color: messageInput.trim() ? 'white' : '#999',
              }}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderConversationList = () => {
    if (!conversations || conversations.length === 0) {
      return (
        <div className="h-full flex items-center justify-center">
          <p className="text-gray-500">Aucune conversation</p>
        </div>
      );
    }

    return (
      <div className="h-full flex flex-col">
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{
            backgroundImage: 'url(/phone/header.png)',
            backgroundSize: 'cover',
            backgroundColor: '#F7F7F7',
          }}
        >
          <h2 className="text-xl font-bold text-gray-800">Messages</h2>
        </div>

        {/* Conversations list */}
        <div
          className="flex-1 overflow-y-auto"
          style={{
            backgroundImage: 'url(/phone/screen.png)',
            backgroundSize: 'cover',
            backgroundColor: '#FFFFFF',
          }}
        >
          {conversations.map((conv) => {
            const lastMessage = conv.messages[conv.messages.length - 1];
            return (
              <button
                key={conv.id}
                onClick={() => openConversation(conv)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors border-b border-gray-200"
              >
                <img
                  src={conv.contactIcon}
                  alt={conv.contactName}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1 text-left">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-gray-800">
                      {conv.contactName}
                    </span>
                    {conv.unread && conv.unread > 0 && (
                      <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                  {lastMessage && (
                    <p className="text-sm text-gray-600 truncate">
                      {lastMessage.sender === 'player' ? 'Vous: ' : ''}
                      {lastMessage.text}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
      {/* Phone Frame - Agrandi */}
      <div
        className="relative"
        style={{
          width: '450px',
          height: '800px',
        }}
      >
        {/* Phone Base Image */}
        <img
          src="/phone/base.png"
          alt="Phone"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10"
        />

        {/* Screen Content - Mieux cadré pour voir tout le contenu */}
        <div
          className="absolute"
          style={{
            top: '85px',
            left: '35px',
            right: '35px',
            bottom: '85px',
            overflow: 'hidden',
            borderRadius: '18px',
          }}
        >
          {view === 'list' ? renderConversationList() : renderConversationView()}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 z-20 p-3 rounded-full transition-all hover:scale-110"
          style={{
            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)',
          }}
        >
          <X size={24} className="text-white" />
        </button>
      </div>
    </div>
  );
};

