import { useTranslation } from 'react-i18next';
import styles from './About.module.css';

const philosophyItems = [
  { icon: '🎯', key: 'education' },
  { icon: '🚀', key: 'strategy' },
  { icon: '👥', key: 'management' },
] as const;

const valueItems = [
  { icon: '🏅', key: 'professional' },
  { icon: '🤝', key: 'integrity' },
  { icon: '💡', key: 'innovation' },
  { icon: '⭐', key: 'excellence' },
] as const;

const teamAvatarStyles = [styles.avatarBg1, styles.avatarBg2, styles.avatarBg3] as const;

export default function About() {
  const { t } = useTranslation();

  const teamMembers = t('about.team.members', { returnObjects: true }) as Array<{
    name: string;
    role: string;
    bio: string;
    initial: string;
  }>;

  const partners = t('about.partners.list', { returnObjects: true }) as Array<{
    name: string;
  }>;

  return (
    <div>
      {/* Hero Banner */}
      <section className={styles.heroBanner}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{t('about.hero.title')}</h1>
          <p className={styles.heroSubtitle}>{t('about.hero.subtitle')}</p>
        </div>
      </section>

      {/* Background Intro */}
      <section className={`${styles.section} container`}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{t('about.background.title')}</h2>
        </div>
        <p className={styles.introText}>{t('about.background.description')}</p>
      </section>

      {/* Vision & Mission */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t('about.visionMission.title')}</h2>
          </div>
          <p className={styles.visionIntro}>{t('about.visionMission.intro')}</p>
          <div className={styles.philosophyGrid}>
            <div className={styles.philosophyCard}>
              <div className={styles.philosophyIcon}>🔭</div>
              <h3 className={styles.philosophyCardTitle}>{t('about.visionMission.vision.title')}</h3>
              <p className={styles.philosophyCardDesc}>{t('about.visionMission.vision.description')}</p>
            </div>
            <div className={styles.philosophyCard}>
              <div className={styles.philosophyIcon}>🎯</div>
              <h3 className={styles.philosophyCardTitle}>{t('about.visionMission.mission.title')}</h3>
              <p className={styles.philosophyCardDesc}>{t('about.visionMission.mission.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={`${styles.sectionTitle} ${styles.sectionTitleLight}`}>
              {t('about.values.title')}
            </h2>
            <p className={styles.sectionSubtitleLight}>{t('about.values.subtitle')}</p>
          </div>
          <div className={styles.valuesGrid}>
            {valueItems.map((item) => (
              <div key={item.key} className={styles.valueItem}>
                <div className={styles.valueIcon}>{item.icon}</div>
                <h3 className={styles.valueTitle}>
                  {t(`about.values.items.${item.key}.title`)}
                </h3>
                <p className={styles.valueDesc}>
                  {t(`about.values.items.${item.key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy: Education, Strategy, Management */}
      <section className={`${styles.section}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t('about.philosophy.title')}</h2>
            <p className={styles.sectionSubtitle}>{t('about.philosophy.subtitle')}</p>
          </div>
          <div className={styles.philosophyGrid}>
            {philosophyItems.map((item) => (
              <div key={item.key} className={styles.philosophyCard}>
                <div className={styles.philosophyIcon}>{item.icon}</div>
                <h3 className={styles.philosophyCardTitle}>
                  {t(`about.philosophy.items.${item.key}.title`)}
                </h3>
                <p className={styles.philosophyCardDesc}>
                  {t(`about.philosophy.items.${item.key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Management Team */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t('about.team.title')}</h2>
            <p className={styles.sectionSubtitle}>{t('about.team.subtitle')}</p>
          </div>
          <div className={styles.teamList}>
            {teamMembers.map((member, idx) => (
              <div key={member.name} className={styles.teamMember}>
                <div className={`${styles.teamAvatar} ${teamAvatarStyles[idx % 3]}`}>
                  {member.initial}
                </div>
                <div className={styles.teamInfo}>
                  <h3 className={styles.teamName}>{member.name}</h3>
                  <p className={styles.teamRole}>{member.role}</p>
                  <p className={styles.teamBio}>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className={`${styles.section}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t('about.partners.title')}</h2>
            <p className={styles.sectionSubtitle}>{t('about.partners.subtitle')}</p>
          </div>
          <div className={styles.partnersGrid}>
            {partners.map((partner) => (
              <div key={partner.name} className={styles.partnerCard}>
                <span className={styles.partnerName}>{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
