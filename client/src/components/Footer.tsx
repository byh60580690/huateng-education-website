import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './Footer.module.css';

const navItems = [
  { path: '/', key: 'nav.home' },
  { path: '/about', key: 'nav.about' },
  { path: '/business', key: 'nav.business' },
  { path: '/culture', key: 'nav.culture' },
  { path: '/cooperation', key: 'nav.cooperation' },
] as const;

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        {/* 集团简介 */}
        <div className={styles.footerSection}>
          <div className={styles.brandName}>{t('footer.name')}</div>
          <p className={styles.brandDescription}>{t('footer.description')}</p>
        </div>

        {/* 联系方式 */}
        <div className={styles.footerSection}>
          <h3>{t('footer.contact')}</h3>
          <div className={styles.contactList}>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>📞</span>
              <span>{t('footer.phoneMainland')}</span>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>📱</span>
              <span>{t('footer.phoneHongKong')}</span>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>✉️</span>
              <span>{t('footer.email')}</span>
            </div>
          </div>
        </div>

        {/* 快速链接 */}
        <div className={styles.footerSection}>
          <h3>{t('footer.links')}</h3>
          <div className={styles.linkList}>
            {navItems.map(item => (
              <NavLink key={item.path} to={item.path} className={styles.footerLink}>
                {t(item.key)}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {/* 版权声明 */}
      <div className={styles.copyright}>
        <div className="container">{t('footer.copyright')}</div>
      </div>
    </footer>
  );
}
