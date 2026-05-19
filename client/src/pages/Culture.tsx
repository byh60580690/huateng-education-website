import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Lightbox from '../components/Lightbox';
import styles from './Culture.module.css';

// 文化相册图片配置 - 将图片放在 public/images/culture/ 目录下
const galleryImages = [
  '/images/culture/1.png',
  '/images/culture/2.png',
  '/images/culture/3.png',
  '/images/culture/4.png',
  '/images/culture/5.png',
  '/images/culture/6.png',
  '/images/culture/7.png',
  '/images/culture/8.png',
];

export default function Culture() {
  const { t } = useTranslation();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const galleryItems = t('culture.gallery.items', { returnObjects: true }) as Array<{ caption: string }>;

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

      {/* Gallery Section */}
      <section className={`${styles.section} container`}>
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
                <img
                  src={galleryImages[idx]}
                  alt={item.caption}
                  className={styles.galleryImage}
                />
                <div className={styles.galleryOverlay}>
                  <div className={styles.galleryZoomIcon}>🔍</div>
                </div>
              </div>
              <p className={styles.galleryCaption}>{item.caption}</p>
            </div>
          ))}
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
