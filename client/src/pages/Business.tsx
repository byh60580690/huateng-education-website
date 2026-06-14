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

// ====== 国际课程辅导板块 ======

// A-Level课程数据
const alevelData = {
  subjects: '数学Mathematics，进阶数学Further Mathematics，物理Physics，化学Chemistry，生物Biology，经济Economics，会计Accounting，商务Business Studies，心理Psychology，地理Geography，法律Law',
  teachingModes: [
    { label: '一对一私人订制', desc: '个性化学习方案' },
    { label: '小班制精品教学(2-4人)', desc: '互动性强' },
  ],
  features: [
    '根据学生水平制定个性化学习计划',
    '针对薄弱环节重点突破',
  ],
  examPrep: [
    '历年真题精讲',
    '考试技巧训练',
    '模拟考试评估',
  ],
};

// DSE课程数据
const dseData = {
  coreSubjects: [
    { name: '中国语文', desc: '阅读理解，写作训练，口语考核，校本评估' },
    { name: '英国语文', desc: '阅读，写作，听力，口语及综合运用' },
    { name: '数学', desc: '必修+延伸部分(M1微积分与统计/M2代数与微积分)' },
    { name: '公民与社会发展', desc: '社会议题分析，数据分析' },
  ],
  electiveSubjects: '物理，化学，生物，经济，中国历史，地理等',
  guarantee: ['入学评估', '制定方案', '每周跟进', '月度检测', '考前冲刺'],
};

// IGCSE课程数据
const igcseData = {
  positioning: '国际初中/高中衔接课程，为A-Level或IB学习打基础',
  subjects: '英语，数学，物理，化学，生物，经济，商务',
  advantages: [
    '帮助内地学生平稳过渡到国际课程体系',
    '提前适应英语教学环境',
  ],
  targetAudience: '计划就读国际学校及海外高中的初中生',
};

// 英语外教数据
const englishData = {
  services: [
    { name: '英语口语强化', desc: '母语外教一对一，纠正发音，提升流利度' },
    { name: '雅思IELTS备考', desc: '听说读写四项专项训练，目标6.5-7.5分' },
    { name: '托福TOEFL备考', desc: '阅读，听力，口语，写作模拟训练' },
    { name: '入学面试辅导', desc: '模拟真实面试场景，提升自信应变能力' },
    { name: '学术英语写作', desc: '论文写作指导，学术词汇积累，批判性思维训练' },
  ],
};

// 底部特色
const tutoringHighlights = [
  { title: '名师团队', desc: '香港/英国/美国名校毕业教师' },
  { title: '灵活排课', desc: '线上课程，时间灵活安排' },
  { title: '成果保证', desc: '90%+学生成绩提升一个等级以上' },
];

// ====== 副学士/高级文凭板块 ======

// 什么是副学士
const associateIntro = [
  '副学士(Associate Degree)和高级文凭(Higher Diploma)是香港政府认可的专上教育资格',
  '学制2年，完成后再衔接本科大三',
  '2+2=4年获得香港本科',
  '与本科直申毕业生获得的学士学位完全相同，学位证书无任何区别',
  '毕业证书由衔接的本科院校颁发，含金量一致',
];

// 可衔接本科院校
const associateUniversities = {
  hk8: ['港大HKU', '中大CUHK', '科大HKUST', '城大CityU', '理大PolyU', '浸会HKBU', '教大EdUHK', '岭大Lingnan'],
  others: ['都会大学', '恒生大学', '东华学院', '高等教育科技学院THEi', '珠海学院', '树仁大学'],
};

// 适合人群
const associateTargetGroups = [
  { label: '高考失利学生', desc: '本科线以下也有机会入读优质院校' },
  { label: '中专/职专毕业生', desc: '无需高考成绩，凭在校成绩申请' },
  { label: '想低成本留港者', desc: '副学位学费仅约港币5-7万/年，远低于本科' },
  { label: '内地大专/专科生', desc: '可申请副学士重新开始，衔接更好的本科' },
];

// 常见副学位院校
const associateColleges = [
  '香港大学附属学院(HKU SPACE)',
  '香港中文大学专业进修学院(CUSCS)',
  '香港理工大学高等教育学院(HKCC)',
  '香港浸会大学国际学院(HKBU CIE)',
];

// 我们的服务
const associateServices = [
  { title: '免费评估', desc: '入学资格，匹配合适的院校与专业' },
  { title: '申请文书撰写', desc: '个人陈述PS，推荐信，学习计划' },
  { title: '面试辅导', desc: '一对一模拟面试，提升录取率' },
  { title: '签证办理', desc: '学生签证申请全流程代办' },
  { title: '衔接规划', desc: '副学位期间规划本科衔接方向与准备' },
  { title: '住宿安排', desc: '协助安排学生宿舍或租房' },
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
                          <img
                            src={school.image}
                            alt={school.name}
                            className={styles.schoolImage}
                          />
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

          {/* 国际课程辅导板块 */}
          {activeCategory === 'tutoring' && (
            <div className={styles.tutoringSection}>
              {/* 上部分：左右布局 - A-Level 和 DSE */}
              <div className={styles.tutoringTopRow}>
                {/* 左上：A-Level课程辅导 */}
                <div className={styles.tutoringPanel}>
                  <h3 className={styles.panelTitle}>
                    <span className={styles.panelTitleIcon}>✦</span>
                    A-Level课程辅导
                  </h3>
                  <div className={styles.tutoringPanelContent}>
                    <div className={styles.tutoringBlock}>
                      <h4 className={styles.blockTitle}>开设科目(全科目覆盖)</h4>
                      <p className={styles.blockText}>{alevelData.subjects}</p>
                    </div>
                    <div className={styles.tutoringBlock}>
                      <h4 className={styles.blockTitle}>教学模式</h4>
                      <div className={styles.modeList}>
                        {alevelData.teachingModes.map((mode, idx) => (
                          <div key={idx} className={styles.modeItem}>
                            <span className={styles.modeDot}>●</span>
                            <span className={styles.modeText}>{mode.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className={styles.tutoringBlock}>
                      <h4 className={styles.blockTitle}>教学特色</h4>
                      <ul className={styles.featureList}>
                        {alevelData.features.map((feature, idx) => (
                          <li key={idx} className={styles.featureItem}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                    <div className={styles.tutoringBlock}>
                      <h4 className={styles.blockTitle}>考试冲刺</h4>
                      <div className={styles.examTags}>
                        {alevelData.examPrep.map((item, idx) => (
                          <span key={idx} className={styles.examTag}>{item}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 右上：DSE香港中学文凭考试 */}
                <div className={styles.tutoringPanel}>
                  <h3 className={styles.panelTitle}>
                    <span className={styles.panelTitleIcon}>✦</span>
                    DSE香港中学文凭考试
                  </h3>
                  <div className={styles.tutoringPanelContent}>
                    <div className={styles.tutoringBlock}>
                      <h4 className={styles.blockTitle}>核心科目辅导</h4>
                      <div className={styles.dseSubjects}>
                        {dseData.coreSubjects.map((subject, idx) => (
                          <div key={idx} className={styles.dseSubjectItem}>
                            <span className={styles.dseSubjectName}>{subject.name}</span>
                            <span className={styles.dseSubjectDesc}>{subject.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className={styles.tutoringBlock}>
                      <h4 className={styles.blockTitle}>选修科目</h4>
                      <p className={styles.blockText}>{dseData.electiveSubjects}</p>
                    </div>
                    <div className={styles.tutoringBlock}>
                      <h4 className={styles.blockTitle}>提分保障</h4>
                      <div className={styles.guaranteeFlow}>
                        {dseData.guarantee.map((step, idx) => (
                          <span key={idx} className={styles.guaranteeStep}>
                            {step}
                            {idx < dseData.guarantee.length - 1 && <span className={styles.flowArrow}>→</span>}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 下部分：左右布局 - IGCSE 和 英语外教 */}
              <div className={styles.tutoringBottomRow}>
                {/* 左下：IGCSE基础课程 */}
                <div className={styles.tutoringPanel}>
                  <h3 className={styles.panelTitle}>
                    <span className={styles.panelTitleIcon}>✦</span>
                    IGCSE基础课程
                  </h3>
                  <div className={styles.tutoringPanelContent}>
                    <div className={styles.tutoringBlock}>
                      <h4 className={styles.blockTitle}>课程定位</h4>
                      <p className={styles.blockText}>{igcseData.positioning}</p>
                    </div>
                    <div className={styles.tutoringBlock}>
                      <h4 className={styles.blockTitle}>开设科目</h4>
                      <p className={styles.blockText}>{igcseData.subjects}</p>
                    </div>
                    <div className={styles.tutoringBlock}>
                      <h4 className={styles.blockTitle}>教学优势</h4>
                      <ul className={styles.featureList}>
                        {igcseData.advantages.map((adv, idx) => (
                          <li key={idx} className={styles.featureItem}>{adv}</li>
                        ))}
                      </ul>
                    </div>
                    <div className={styles.tutoringBlock}>
                      <h4 className={styles.blockTitle}>适用人群</h4>
                      <p className={styles.blockText}>{igcseData.targetAudience}</p>
                    </div>
                  </div>
                </div>

                {/* 右下：英语外教一对一 */}
                <div className={styles.tutoringPanel}>
                  <h3 className={styles.panelTitle}>
                    <span className={styles.panelTitleIcon}>✦</span>
                    英语外教一对一 · 语言与面试
                  </h3>
                  <div className={styles.tutoringPanelContent}>
                    <div className={styles.englishServices}>
                      {englishData.services.map((service, idx) => (
                        <div key={idx} className={styles.englishServiceItem}>
                          <span className={styles.serviceName}>{service.name}</span>
                          <span className={styles.serviceDesc}>{service.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 底部特色 */}
              <div className={styles.tutoringHighlights}>
                {tutoringHighlights.map((item, idx) => (
                  <div key={idx} className={styles.highlightCard}>
                    <h4 className={styles.highlightTitle}>{item.title}</h4>
                    <p className={styles.highlightDesc}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 副学士/高级文凭申请板块 */}
          {activeCategory === 'associate' && (
            <div className={styles.associateSection}>
              {/* 上部分：什么是副学士 */}
              <div className={styles.associateTopSection}>
                <h3 className={styles.panelTitle}>
                  <span className={styles.panelTitleIcon}>✦</span>
                  什么是副学士/高级文凭？
                </h3>
                <div className={styles.associateIntroGrid}>
                  {associateIntro.map((item, idx) => (
                    <div key={idx} className={styles.associateIntroItem}>
                      <span className={styles.associateIntroNumber}>{idx + 1}</span>
                      <span className={styles.associateIntroText}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 中部分：左右布局 */}
              <div className={styles.associateMiddleSection}>
                {/* 左侧：可衔接本科院校 */}
                <div className={styles.associateLeftPanel}>
                  <h4 className={styles.subPanelTitle}>可衔接本科院校</h4>
                  <div className={styles.universitiesBlock}>
                    <div className={styles.universitiesCategory}>
                      <span className={styles.categoryLabel}>港八大</span>
                      <div className={styles.universitiesList}>
                        {associateUniversities.hk8.join(' · ')}
                      </div>
                    </div>
                    <div className={styles.universitiesCategory}>
                      <span className={styles.categoryLabel}>其他院校</span>
                      <div className={styles.universitiesList}>
                        {associateUniversities.others.join(' · ')}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 右侧：适合人群 */}
                <div className={styles.associateRightPanel}>
                  <h4 className={styles.subPanelTitle}>适合人群</h4>
                  <div className={styles.targetGroupsGrid}>
                    {associateTargetGroups.map((group, idx) => (
                      <div key={idx} className={styles.targetGroupCard}>
                        <span className={styles.targetLabel}>{group.label}</span>
                        <span className={styles.targetDesc}>{group.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 下部分：常见副学位院校 */}
              <div className={styles.associateCollegesSection}>
                <h4 className={styles.subPanelTitle}>常见副学位院校</h4>
                <div className={styles.collegesList}>
                  {associateColleges.map((college, idx) => (
                    <span key={idx} className={styles.collegeTag}>{college}</span>
                  ))}
                </div>
              </div>

              {/* 最下方：我们的服务 */}
              <div className={styles.associateServicesSection}>
                <h4 className={styles.servicesTitle}>我们的服务</h4>
                <div className={styles.servicesGrid}>
                  {associateServices.map((service, idx) => (
                    <div key={idx} className={styles.serviceCard}>
                      <span className={styles.serviceNumber}>{idx + 1}</span>
                      <h5 className={styles.serviceTitle}>{service.title}</h5>
                      <p className={styles.serviceDesc}>{service.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 其他板块占位 */}
          {activeCategory !== 'k12' && activeCategory !== 'tutoring' && activeCategory !== 'associate' && (
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
