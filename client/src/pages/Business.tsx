import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Business.module.css';

type ServiceCategory = 'k12' | 'tutoring' | 'associate' | 'bachelor' | 'master' | 'phd';

interface ServiceCategoryConfig {
  key: ServiceCategory;
  label: string;
  tagline: string;
}

const serviceCategories: ServiceCategoryConfig[] = [
  { key: 'k12', label: '香港中小学申请(K1-S6)', tagline: '公立 | 私立 | 国际 | 寄宿学校 全类型覆盖' },
  { key: 'tutoring', label: '国际课程辅导', tagline: 'A-Level/DSE/IGCSE 专业培训' },
  { key: 'associate', label: '副学士/高级文凭申请', tagline: '升学新路径 直通大学' },
  { key: 'bachelor', label: '香港大学升学(本科)', tagline: '港八大及海外名校申请' },
  { key: 'master', label: '香港硕士申请', tagline: '授课式/研究式 全面规划' },
  { key: 'phd', label: '博士申请', tagline: '研究型&授课型 导师匹配' },
];

// K12申请类型列表
const k12ApplicationTypes = [
  '公立小一至中六插班申请：教育局统一派位+扣门位申请',
  '知名私立学校申请：面试辅导+文书准备+入学评估',
  '国际学校(IB/A-Level/AP)：双语/全英教学环境',
  '香港寄宿学校：全英沉浸环境，直通港八大及海外名校',
  '境外监护服务：未成年学生在港学习生活全程照护',
];

// 重点合作中小学
const k12PartnerSchools = [
  {
    name: '香港复临学校',
    features: 'K12寄宿制 | 无债券费用 | 美国AP课程认证',
    image: '/images/business/school_1.jpg',
  },
  {
    name: '汉鼎书院',
    features: 'IB+剑桥双课程体系 | 老牌国际体系 | K1至中六级',
    image: '/images/business/school_2.jpg',
  },
  {
    name: '伦敦卓越书院',
    features: 'A-Level国际高中体系 | 直通港八大 | 英国课程体系',
    image: '/images/business/school_3.jpg',
  },
];

// 国际课程辅导类别
const tutoringCourses = [
  {
    title: 'A-Level课程',
    content: '数学、进阶数学、物理、化学、经济、会计、商务',
  },
  {
    title: 'DSE香港中学文凭',
    content: '中文、英文、数学、公民与社会发展、理科及商科辅导、冲刺提分',
  },
  {
    title: 'IGCSE基础课程',
    content: '国际高中衔接课程，顺利度过A-Level/IB体系',
  },
  {
    title: '英国外教一对一',
    content: '口语强化、雅思/托福备考、面试模拟辅导',
  },
];

// 全流程服务
const serviceProcess = [
  '入学评估',
  '选校策划',
  '面试辅导',
  '文书撰写',
  '笔试准备',
  '签证办理',
  '住宿安排',
  '学业跟进',
];

export default function Business() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('k12');

  return (
    <div>
      {/* Hero Banner */}
      <section className={styles.heroBanner}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{t('business.hero.title')}</h1>
          <p className={styles.heroSubtitle}>{t('business.hero.subtitle')}</p>
        </div>
      </section>

      {/* Service Categories */}
      <section className={`${styles.section} ${styles.categoriesSection}`}>
        <div className="container">
          {/* Category Tabs */}
          <div className={styles.categoryTabs}>
            {serviceCategories.map((category) => (
              <button
                key={category.key}
                className={`${styles.categoryTab} ${activeCategory === category.key ? styles.categoryTabActive : ''}`}
                onClick={() => setActiveCategory(category.key)}
              >
                <span className={styles.categoryTabLabel}>{category.label}</span>
                <span className={styles.categoryTabTagline}>{category.tagline}</span>
              </button>
            ))}
          </div>

          {/* K12 Section */}
          {activeCategory === 'k12' && (
            <div className={styles.k12Section}>
              {/* 上部分：左右布局 */}
              <div className={styles.k12TopSection}>
                {/* 左侧：申请类型全覆盖 */}
                <div className={styles.k12LeftPanel}>
                  <h3 className={styles.panelTitle}>
                    <span className={styles.panelTitleIcon}>✦</span>
                    申请类型全覆盖
                  </h3>
                  <div className={styles.applicationList}>
                    {k12ApplicationTypes.map((item, idx) => (
                      <div key={idx} className={styles.applicationItem}>
                        <span className={styles.checkIcon}>✓</span>
                        <span className={styles.applicationText}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 右侧：重点合作中小学 */}
                <div className={styles.k12RightPanel}>
                  <h3 className={styles.panelTitle}>
                    <span className={styles.panelTitleIcon}>✦</span>
                    重点合作中小学
                    <span className={styles.panelBadge}>官方院校授权代表</span>
                  </h3>
                  <div className={styles.partnerSchoolsGrid}>
                    {k12PartnerSchools.map((school, idx) => (
                      <div key={idx} className={styles.partnerSchoolCard}>
                        <div className={styles.schoolImageWrapper}>
                          <div className={styles.schoolImagePlaceholder}>
                            <span>图片位</span>
                          </div>
                        </div>
                        <div className={styles.schoolInfo}>
                          <h4 className={styles.schoolName}>{school.name}</h4>
                          <p className={styles.schoolFeatures}>{school.features}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 下部分：国际课程辅导 */}
              <div className={styles.k12BottomSection}>
                <h3 className={styles.panelTitle}>
                  <span className={styles.panelTitleIcon}>✦</span>
                  国际课程辅导(A-Level/DSE/IGCSE)
                </h3>
                <div className={styles.tutoringGrid}>
                  {tutoringCourses.map((course, idx) => (
                    <div key={idx} className={styles.tutoringCard}>
                      <h4 className={styles.tutoringTitle}>{course.title}</h4>
                      <p className={styles.tutoringContent}>{course.content}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 最下方：全流程配套服务 */}
              <div className={styles.processFlowSection}>
                <h4 className={styles.processFlowTitle}>全流程配套服务</h4>
                <div className={styles.processFlowSteps}>
                  {serviceProcess.map((step, idx) => (
                    <div key={idx} className={styles.processFlowStep}>
                      <span className={styles.processFlowNumber}>{idx + 1}</span>
                      <span className={styles.processFlowText}>{step}</span>
                      {idx < serviceProcess.length - 1 && (
                        <span className={styles.processFlowArrow}>→</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 其他板块占位 */}
          {activeCategory !== 'k12' && (
            <div className={styles.placeholderSection}>
              <div className={styles.placeholderContent}>
                <span className={styles.placeholderIcon}>📋</span>
                <p className={styles.placeholderText}>内容整理中，敬请期待...</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
