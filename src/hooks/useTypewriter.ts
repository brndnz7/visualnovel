import { useState, useEffect, useRef } from 'react';

interface UseTypewriterProps {
  text: string;
  speed: number;
  onComplete?: () => void;
  skip?: boolean;
}

export const useTypewriter = ({ text, speed, onComplete, skip }: UseTypewriterProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    // Si mode skip activé, afficher tout de suite
    if (skip) {
      setDisplayedText(text);
      setIsTyping(false);
      if (onComplete) onComplete();
      return;
    }

    // Reset
    setDisplayedText('');
    setIsTyping(true);
    currentIndexRef.current = 0;

    const intervalId = setInterval(() => {
      if (currentIndexRef.current < text.length) {
        const newText = text.substring(0, currentIndexRef.current + 1);
        setDisplayedText(newText);
        currentIndexRef.current++;
      } else {
        clearInterval(intervalId);
        setIsTyping(false);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => {
      clearInterval(intervalId);
    };
  }, [text, speed, onComplete, skip]);

  const skipToEnd = () => {
    setDisplayedText(text);
    setIsTyping(false);
  };

  return { displayedText, isTyping, skipToEnd };
};

