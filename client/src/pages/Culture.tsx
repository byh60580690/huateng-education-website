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

// 荣誉墙分类配置
type HonorCategory = 'hk8' | 'hkQuality' | 'singapore' | 'overseas';

interface HonorCategoryConfig {
  key: HonorCategory;
  label: string;
  description: string;
  images: string[];
}

const honorCategories: HonorCategoryConfig[] = [
  {
    key: 'hk8',
    label: '香港八大名校录取',
    description: '港大HKU · 中大CUHK · 科大HKUST · 城大CityU · 理大PolyU · 浸会HKBU',
    images: [
      // HKU: 3张
      '/images/honor/honor_hku_1.jpg',
      '/images/honor/honor_hku_2.jpg',
      '/images/honor/honor_hku_3.jpg',
      // CUHK: 2张
      '/images/honor/honor_cuhk_1.jpg',
      '/images/honor/honor_cuhk_2.jpg',
      // HKUST: 1张
      '/images/honor/honor_hkust_1.jpg',
      // City: 5张
      '/images/honor/honor_city_1.jpg',
      '/images/honor/honor_city_2.jpg',
      '/images/honor/honor_city_3.jpg',
      '/images/honor/honor_city_4.jpg',
      '/images/honor/honor_city_5.jpg',
      // Poly: 2张
      '/images/honor/honor_poly_1.jpg',
      '/images/honor/honor_poly_2.jpg',
      // HKBU: 5张
      '/images/honor/honor_hkbu_1.jpg',
      '/images/honor/honor_hkbu_2.jpg',
      '/images/honor/honor_hkbu_3.jpg',
      '/images/honor/honor_hkbu_4.jpg',
      '/images/honor/honor_hkbu_5.jpg',
    ],
  },
  {
    key: 'hkQuality',
    label: '香港优质院校录取',
    description: '高科院THEi · 都会大学 · 恒生大学 · 东华学院 · 树仁大学',
    images: [
      // THEi: 3张
      '/images/honor/honor_thei_1.jpg',
      '/images/honor/honor_thei_2.jpg',
      '/images/honor/honor_thei_3.jpg',
      // MU: 3张
      '/images/honor/honor_mu_1.jpg',
      '/images/honor/honor_mu_2.jpg',
      '/images/honor/honor_mu_3.jpg',
      // HS: 4张
      '/images/honor/honor_hs_1.jpg',
      '/images/honor/honor_hs_2.jpg',
      '/images/honor/honor_hs_3.jpg',
      '/images/honor/honor_hs_4.jpg',
      // TWC: 1张
      '/images/honor/honor_twc_1.jpg',
      // HKCHC: 1张
      '/images/honor/honor_hkchc_1.jpg',
    ],
  },
  {
    key: 'singapore',
    label: '新加坡名校录取',
    description: '新加坡国立大学NUS · 南洋理工NTU · 新加坡管理大学SMU',
    images: [
      // NUS: 5张
      '/images/honor/honor_nus_1.jpg',
      '/images/honor/honor_nus_2.jpg',
      '/images/honor/honor_nus_3.jpg',
      '/images/honor/honor_nus_4.jpg',
      '/images/honor/honor_nus_5.jpg',
    ],
  },
  {
    key: 'overseas',
    label: '海外名校录取',
    description: '美国TOP50名校 · 英国G5 · 澳洲八大 · 加拿大名校',
    images: [
      // Stanford: 1张
      '/images/honor/honor_stanford_1.jpg',
      // Brown: 1张
      '/images/honor/honor_brown_1.jpg',
      // Columbia: 1张
      '/images/honor/honor_columbia_1.jpg',
      // Penn: 1张
      '/images/honor/honor_penn_1.jpg',
      // Emory: 1张
      '/images/honor/honor_emory_1.jpg',
    ],
  },
];

export default function Culture() {
  const { t } = useTranslation();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeHonorCategory, setActiveHonorCategory] = useState<HonorCategory>('hk8');

  const galleryItems = t('culture.gallery.items', { returnObjects: true }) as Array<{ caption: string }>;

  const currentCategory = honorCategories.find(c => c.key === activeHonorCategory);

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

      {/* Honor Wall Section */}
      <section id="honor" className={`${styles.section} container`}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{t('culture.honor.title')}</h2>
          <p className={styles.sectionSubtitle}>{t('culture.honor.subtitle')}</p>
        </div>
        
        {/* Category Tabs */}
        <div className={styles.honorTabs}>
          {honorCategories.map((category) => (
            <button
              key={category.key}
              className={`${styles.honorTab} ${activeHonorCategory === category.key ? styles.honorTabActive : ''}`}
              onClick={() => setActiveHonorCategory(category.key)}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Category Description */}
        {currentCategory && (
          <div className={styles.honorCategoryDesc}>
            {currentCategory.description}
          </div>
        )}

        {/* Honor Grid */}
        <div className={styles.honorGrid}>
          {currentCategory?.images.map((src, idx) => (
            <div key={idx} className={styles.honorItem}>
              <img
                src={src}
                alt={`荣誉证书 ${idx + 1}`}
                className={styles.honorImage}
              />
            </div>
          ))}
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
