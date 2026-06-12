import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Business.module.css';

type ServiceMode = 'online' | 'offline';

const onlineServiceIcons = ['💬', '📊', '📝', '📡'];
const offlineServiceIcons = ['🤝', '✍️', '🎤', '🏫'];
const advantageIcons = ['⚡', '🌐', '🔒'];
const directionIcons = ['🎓', '📚', '🏛️'];

export default function Business() {
  const { t } = useTranslation();
  const [activeMode, setActiveMode] = useState<ServiceMode>('online');

  const onlineSteps = t('business.online.process.steps', { returnObjects: true }) as Array<{ label: string }>;
  const offlineSteps = t('business.offline.process.steps', { returnObjects: true }) as Array<{ label: string }>;
  const onlineServices = t('business.online.services', { returnObjects: true }) as Array<{ title: string; desc: string }>;
  const offlineServices = t('business.offline.services', { returnObjects: true }) as Array<{ title: string; desc: string }>;
  const onlineAdvantages = t('business.online.advantages', { returnObjects: true }) as Array<{ title: string; desc: string }>;
  const offlineAdvantages = t('business.offline.advantages', { returnObjects: true }) as Array<{ title: string; desc: string }>;
  const directions = t('business.directions.items', { returnObjects: true }) as Array<{ title: string; target: string; desc: string }>;

  const steps = activeMode === 'online' ? onlineSteps : offlineSteps;
  const services = activeMode === 'online' ? onlineServices : offlineServices;
  const serviceIcons = activeMode === 'online' ? onlineServiceIcons : offlineServiceIcons;
  const advantages = activeMode === 'online' ? onlineAdvantages : offlineAdvantages;

  return (
    <div>
      {/* Hero Banner */}
      <section className={styles.heroBanner}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{t('business.hero.title')}</h1>
          <p className={styles.heroSubtitle}>{t('business.hero.subtitle')}</p>
        </div>
      </section>

      {/* Service Mode Section */}
      <section id="service-mode" className={`${styles.section} container`}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{t('business.serviceMode.title')}</h2>
          <p className={styles.sectionSubtitle}>{t('business.serviceMode.subtitle')}</p>
        </div>

        {/* Mode Tabs */}
        <div className={styles.modeTabs}>
          <button
            className={`${styles.modeTab} ${activeMode === 'online' ? styles.modeTabActive : ''}`}
            onClick={() => setActiveMode('online')}
          >
            {t('business.serviceMode.online')}
          </button>
          <button
            className={`${styles.modeTab} ${activeMode === 'offline' ? styles.modeTabActive : ''}`}
            onClick={() => setActiveMode('offline')}
          >
            {t('business.serviceMode.offline')}
          </button>
        </div>

        {/* Service Content */}
        <div key={activeMode} className={styles.serviceContent}>
          <p className={styles.serviceIntro}>
            {t(`business.${activeMode}.intro`)}
          </p>

          {/* Process */}
          <h3 className={styles.processTitle}>{t(`business.${activeMode}.process.title`)}</h3>
          <div className={styles.processSteps}>
            {steps.map((step, idx) => (
              <div key={idx} className={styles.processStep}>
                <div className={styles.stepNumber}>{idx + 1}</div>
                <span className={styles.stepLabel}>{step.label}</span>
              </div>
            ))}
          </div>

          {/* Service Cards */}
          <h3 className={styles.cardsTitle}>{t(`business.${activeMode}.servicesTitle`)}</h3>
          <div className={styles.cardsGrid}>
            {services.map((svc, idx) => (
              <div key={idx} className={styles.serviceCard}>
                <div className={styles.cardIcon}>{serviceIcons[idx]}</div>
                <h4 className={styles.cardTitle}>{svc.title}</h4>
                <p className={styles.cardDesc}>{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={`${styles.sectionTitle} ${styles.sectionTitleLight}`}>
              {t(`business.${activeMode}.advantagesTitle`)}
            </h2>
            <p className={styles.sectionSubtitleLight}>
              {t(`business.${activeMode}.advantagesSubtitle`)}
            </p>
          </div>
          <div className={styles.advantagesGrid}>
            {advantages.map((adv, idx) => (
              <div key={idx} className={styles.advantageItem}>
                <span className={styles.advantageIcon}>{advantageIcons[idx]}</span>
                <div>
                  <h4 className={styles.advantageTitle}>{adv.title}</h4>
                  <p className={styles.advantageDesc}>{adv.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Study Directions */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t('business.directions.title')}</h2>
            <p className={styles.sectionSubtitle}>{t('business.directions.subtitle')}</p>
          </div>
          <div className={styles.directionsGrid}>
            {directions.map((dir, idx) => (
              <div key={idx} className={styles.directionCard}>
                <div className={styles.directionIcon}>{directionIcons[idx]}</div>
                <h3 className={styles.directionTitle}>{dir.title}</h3>
                <p className={styles.directionTarget}>{dir.target}</p>
                <p className={styles.directionDesc}>{dir.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
