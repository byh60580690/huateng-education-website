import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Lightbox from '../components/Lightbox';
import styles from './Culture.module.css';

const galleryGradients = [
  'linear-gradient(135deg, #1a3a5c, #2a5a8c)',
  'linear-gradient(135deg, #2a5a8c, #3a7abc)',
  'linear-gradient(135deg, #0d1f33, #1a3a5c)',
  'linear-gradient(135deg, #c9a84c, #e0c878)',
  'linear-gradient(135deg, #1a3a5c, #c9a84c)',
  'linear-gradient(135deg, #2a7a5a, #3aaa7a)',
  'linear-gradient(135deg, #a88a30, #c9a84c)',
  'linear-gradient(135deg, #234b73, #2a5a8c)',
];

const galleryIcons = ['🎓', '🏆', '🤝', '🎉', '📚', '🌏', '💼', '⭐'];

export default function Culture() {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const galleryItems = t('culture.gallery.items', { returnObjects: true }) as Array<{ caption: string }>;

  const galleryImages = galleryGradients.map((g) => `gradient:${g}`);

  const handlePlayVideo = () => {
    setIsPlaying(true);
    // In production, videoRef.current?.play() would be called
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const prevImage = () => {
    setLightboxIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div>
      {/* Hero Banner */}
      <section className={styles.heroBanner}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{t('culture.hero.title')}</h1>
          <p className={styles.heroSubtitle}>{t('culture.hero.subtitle')}</p>
        </div>
      </section>

      {/* Video Section */}
      <section className={`${styles.section} container`}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{t('culture.video.title')}</h2>
          <p className={styles.sectionSubtitle}>{t('culture.video.subtitle')}</p>
        </div>
        <div className={styles.videoWrapper}>
          <div className={styles.videoContainer}>
            {!isPlaying ? (
              <div className={styles.videoPlaceholder} onClick={handlePlayVideo}>
                <div className={styles.playButton}>
                  <span className={styles.playIcon}>▶</span>
                </div>
                <span className={styles.videoLabel}>{t('culture.video.playLabel')}</span>
              </div>
            ) : (
              <video
                ref={videoRef}
                className={styles.videoPlayer}
                controls
                autoPlay
              >
                {/* Video source placeholder - replace with actual video URL */}
                <source src="" type="video/mp4" />
                {t('culture.video.unsupported')}
              </video>
            )}
          </div>
          <p className={styles.videoDesc}>{t('culture.video.description')}</p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t('culture.gallery.title')}</h2>
            <p className={styles.sectionSubtitle}>{t('culture.gallery.subtitle')}</p>
          </div>
          <div className={styles.galleryGrid}>
            {galleryItems.map((item, idx) => (
              <div key={idx}>
                <div
                  className={styles.galleryItem}
                  onClick={() => openLightbox(idx)}
                >
                  <div
                    className={styles.galleryPlaceholder}
                    style={{ background: galleryGradients[idx % galleryGradients.length] }}
                  >
                    {galleryIcons[idx % galleryIcons.length]}
                  </div>
                  <div className={styles.galleryOverlay}>
                    <div className={styles.galleryZoomIcon}>🔍</div>
                  </div>
                </div>
                <p className={styles.galleryCaption}>{item.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        images={galleryImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onPrev={prevImage}
        onNext={nextImage}
      />
    </div>
  );
}
