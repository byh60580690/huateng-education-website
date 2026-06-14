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
  images: string[];
}

const honorCategories: HonorCategoryConfig[] = [
  {
    key: 'hk8',
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
  
  // 从 i18n 获取分类标签和学校列表
  const getHonorLabel = (key: HonorCategory) => t(`culture.honor.categories.${key}.label`);
  const getHonorSchools = (key: HonorCategory) => t(`culture.honor.categories.${key}.schools`, { returnObjects: true }) as string[];

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
      <section id="honor" className={`${styles.section} ${styles.honorSection}`}>
        <div className="container">
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
                {getHonorLabel(category.key)}
              </button>
            ))}
          </div>

          {/* Category Description */}
          {currentCategory && (
            <div className={styles.honorSchoolTags}>
              {getHonorSchools(currentCategory.key).map((school, idx, arr) => (
                <span key={idx}>
                  <span className={styles.honorSchoolName}>{school}</span>
                  {idx < arr.length - 1 && (
                    <span className={styles.honorSchoolDot}> · </span>
                  )}
                </span>
              ))}
            </div>
          )}

          {/* Honor Grid */}
          <div className={styles.honorGridWrapper}>
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
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className={`${styles.section} ${styles.gallerySection}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t('culture.gallery.title')}</h2>
            <p className={styles.sectionSubtitle}>{t('culture.gallery.subtitle')}</p>
          </div>
          <div className={styles.galleryGridWrapper}>
            <div className={styles.galleryGrid}>
              {galleryItems.map((item, idx) => (
                <div key={idx} className={styles.galleryItemWrapper}>
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
                      <div className={styles.galleryZoomIcon}>
                        <span className={styles.galleryZoomText}>查看详情</span>
                      </div>
                    </div>
                  </div>
                  <p className={styles.galleryCaption}>{item.caption}</p>
                </div>
              ))}
            </div>
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
