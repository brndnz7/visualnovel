import React, { useState, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  onLoad?: () => void;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  priority = false,
  onLoad,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!src) return;

    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setLoaded(true);
      if (onLoad) onLoad();
    };
    
    img.onerror = () => {
      setError(true);
    };

    // Précharger si prioritaire
    if (priority) {
      img.loading = 'eager';
    }

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, priority, onLoad]);

  if (error) {
    return (
      <div className={`${className} bg-gray-800 flex items-center justify-center`}>
        <p className="text-white/50 text-sm">Image introuvable</p>
      </div>
    );
  }

  return (
    <>
      {/* Placeholder pendant le chargement */}
      {!loaded && (
        <div 
          className={`${className} bg-gradient-to-br from-purple-900/30 to-pink-900/30 animate-pulse`}
        />
      )}
      
      {/* Image réelle */}
      <img
        src={src}
        alt={alt}
        className={`${className} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        loading={priority ? 'eager' : 'lazy'}
        style={{
          ...(loaded ? {} : { position: 'absolute', visibility: 'hidden' })
        }}
      />
    </>
  );
};

