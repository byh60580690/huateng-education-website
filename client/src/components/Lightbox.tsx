import { useEffect, useCallback } from 'react';
import styles from './Lightbox.module.css';

interface LightboxProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({ images, currentIndex, isOpen, onClose, onPrev, onNext }: LightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const currentImage = images[currentIndex];
  const isPlaceholder = !currentImage || currentImage.startsWith('gradient:');

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        {isPlaceholder ? (
          <div
            className={styles.placeholder}
            style={{
              background: currentImage?.replace('gradient:', '') ||
                'linear-gradient(135deg, #1a3a5c, #2a5a8c)',
            }}
          >
            📷
          </div>
        ) : (
          <img
            className={styles.image}
            src={currentImage}
            alt={`Photo ${currentIndex + 1}`}
          />
        )}
      </div>

      <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
        ✕
      </button>

      <button
        className={`${styles.navBtn} ${styles.prevBtn}`}
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous"
      >
        ‹
      </button>

      <button
        className={`${styles.navBtn} ${styles.nextBtn}`}
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next"
      >
        ›
      </button>

      <div className={styles.counter}>
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}
