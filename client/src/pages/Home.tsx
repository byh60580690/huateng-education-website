import { useTranslation } from 'react-i18next';
import styles from './Home.module.css';

const serviceIcons = ['👨‍🏫', '🏛️', '📋', '🏆'];
const serviceKeys = ['team', 'resources', 'plan', 'rate'] as const;

export default function Home() {
  const { t } = useTranslation();

  const historyItems = t('home.history.items', { returnObjects: true }) as Array<{
    year: string;
    title: string;
    description: string;
  }>;

  const newsItems = t('home.news.items', { returnObjects: true }) as Array<{
    date: string;
    title: string;
    summary: string;
  }>;

  return (
    <div>
      {/* Banner */}
      <section className={styles.banner}>
        <div className={styles.bannerContent}>
          <h1 className={styles.bannerTitle}>{t('home.banner.title')}</h1>
          <p className={styles.bannerSubtitle}>{t('home.banner.subtitle')}</p>
          <a href="#intro" className={styles.bannerCta}>
            {t('home.banner.cta')}
          </a>
        </div>
      </section>

      {/* Intro */}
      <section id="intro" className={`${styles.section} container`}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{t('home.intro.title')}</h2>
        </div>
        <p className={styles.introDescription}>{t('home.intro.description')}</p>
        <div className={styles.servicesGrid}>
          {serviceKeys.map((key, idx) => (
            <div key={key} className={styles.serviceCard}>
              <div className={styles.serviceIcon}>{serviceIcons[idx]}</div>
              <h3 className={styles.serviceTitle}>
                {t(`home.intro.services.${key}.title`)}
              </h3>
              <p className={styles.serviceDescription}>
                {t(`home.intro.services.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* History */}
      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t('home.history.title')}</h2>
            <p className={styles.sectionSubtitle}>{t('home.history.subtitle')}</p>
          </div>
          <div className={styles.timeline}>
            {historyItems.map((item) => (
              <div key={item.year} className={styles.timelineItem}>
                <div className={styles.timelineDot} />
                <div className={styles.timelineContent}>
                  <span className={styles.timelineYear}>{item.year}</span>
                  <h3 className={styles.timelineTitle}>{item.title}</h3>
                  <p className={styles.timelineDescription}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      <section className={`${styles.section} container`}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{t('home.news.title')}</h2>
          <p className={styles.sectionSubtitle}>{t('home.news.subtitle')}</p>
        </div>
        <div className={styles.newsGrid}>
          {newsItems.map((item) => (
            <article key={item.date} className={styles.newsCard}>
              <div className={styles.newsCardImage} />
              <div className={styles.newsCardBody}>
                <span className={styles.newsDate}>{item.date}</span>
                <h3 className={styles.newsTitle}>{item.title}</h3>
                <p className={styles.newsSummary}>{item.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}