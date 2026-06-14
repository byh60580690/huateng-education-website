import { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './Navbar.module.css';

const languages = [
  { code: 'zh-CN', key: 'language.zhCN' },
  { code: 'zh-TW', key: 'language.zhTW' },
  { code: 'en', key: 'language.en' },
] as const;

const navItems = [
  { path: '/', key: 'nav.home' },
  { path: '/about', key: 'nav.about' },
  { path: '/business', key: 'nav.business' },
  { path: '/culture', key: 'nav.culture' },
  { path: '/cooperation', key: 'nav.cooperation' },
] as const;

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Close language dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
    setLangOpen(false);
  };

  const currentLangKey = languages.find(l => l.code === i18n.language)?.key ?? 'language.zhCN';

  return (
    <nav className={styles.navbar} role="navigation" aria-label="Main navigation">
      <div className={styles.navInner}>
        <NavLink to="/" className={styles.logo} aria-label="华腾教育 - 返回首页">
          <img
            src="/华腾集团logo.png?v=2"
            alt="华腾教育 Logo"
            className={styles.logoImg}
          />
        </NavLink>

        <button
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
        </button>

        <div className={`${styles.navMenu} ${menuOpen ? styles.navMenuOpen : ''}`}>
          <div className={styles.navLinks}>
            {navItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                }
              >
                {t(item.key)}
              </NavLink>
            ))}
          </div>

          <div className={styles.langSwitcher} ref={langRef}>
            <button
              className={styles.langButton}
              onClick={() => setLangOpen(prev => !prev)}
              aria-haspopup="listbox"
              aria-expanded={langOpen}
            >
              {t(currentLangKey)}
              <span className={`${styles.langArrow} ${langOpen ? styles.langArrowOpen : ''}`}>
                ▼
              </span>
            </button>
            <div
              className={`${styles.langDropdown} ${langOpen ? styles.langDropdownOpen : ''}`}
              role="listbox"
              aria-label={t('language.label')}
            >
              {languages.map(lang => (
                <button
                  key={lang.code}
                  className={`${styles.langOption} ${
                    i18n.language === lang.code ? styles.langOptionActive : ''
                  }`}
                  onClick={() => handleLanguageChange(lang.code)}
                  role="option"
                  aria-selected={i18n.language === lang.code}
                >
                  {t(lang.key)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
