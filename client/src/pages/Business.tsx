import React, { useState } from 'react';
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
  { key: 'bachelor', label: '香港学士申请', tagline: '港八大及海外名校申请' },
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

// ====== 香港学士申请板块 ======

// 香港八大名校
const hk8Universities = [
  { name: '香港大学', abbr: 'HKU', desc: '亚洲顶尖，QS世界排名前15', image: '/images/business/uni_hku.jpg' },
  { name: '香港中文大学', abbr: 'CUHK', desc: '综合研究型，QS世界排名前35', image: '/images/business/uni_cuhk.jpg' },
  { name: '香港科技大学', abbr: 'HKUST', desc: '理工强校，QS亚洲排名前10', image: '/images/business/uni_hkust.jpg' },
  { name: '香港城市大学', abbr: 'CityU', desc: '商科与工程卓越', image: '/images/business/uni_cityu.jpg' },
  { name: '香港理工大学', abbr: 'PolyU', desc: '应用研究领先', image: '/images/business/uni_polyu.jpg' },
  { name: '香港浸会大学', abbr: 'HKBU', desc: '传媒/中医药闻名', image: '/images/business/uni_hkbu.jpg' },
  { name: '香港教育大学', abbr: 'EdUHK', desc: '师范教育一流', image: '/images/business/uni_eduhk.jpg' },
  { name: '岭南大学', abbr: 'Lingnan', desc: '博雅教育典范', image: '/images/business/uni_lingnan.jpg' },
];

// 香港其他优质院校
const otherUniversities = [
  { name: '香港高等教育科技学院(THEi)', desc: '华腾教育官方授权指定招生机构，专业实用，就业率高', highlight: true },
  { name: '香港都会大学', desc: '灵活学制，兼读可选', highlight: false },
  { name: '香港恒生大学', desc: '商科特色，粤港澳大湾区认可度高', highlight: false },
  { name: '香港树仁大学', desc: '老牌私立大学，人文社科优势', highlight: false },
  { name: '东华学院', desc: '护理和健康科学见长', highlight: false },
  { name: '珠海学院', desc: '建筑和新闻传播专业突出', highlight: false },
];

// 多元申请通道
const applicationChannels = [
  {
    title: '高考直申通道',
    items: [
      '高考成绩达一本线/二本线以上即可申请',
      '部分院校接受英语单科成绩替代雅思',
      '高三在读可提前申请',
    ],
  },
  {
    title: '国际课程通道',
    items: [
      'A-Level成绩，IB成绩，AP+SAT成绩均可直接申请',
      '无需参加高考',
      '国际生通道优先审理',
    ],
  },
  {
    title: '副学士-本科(2+2)',
    items: [
      '副学位毕业后通过Non-JUPAS申请衔接本科大三',
      '学位证书与四年制本科完全一致',
    ],
  },
];

// 本科服务优势
const bachelorServiceAdvantages = [
  { title: 'THEi官方授权指定招生机构', desc: '独家名额，优先录取通道' },
  { title: '专业选校规划', desc: '根据学生成绩和兴趣匹配最合适的院校和专业' },
  { title: '文书精雕细琢', desc: '个人陈述，推荐信，课外活动描述全方位准备' },
  { title: '面试实战训练', desc: '一对一模拟面试，中英文双语辅导' },
  { title: '申请全程跟进', desc: '从准备到录取，每个环节专人负责' },
];

// ====== 香港硕士申请板块 ======

// 热门申请方向
const masterPopularFields = [
  {
    category: '商科类',
    programs: '工商管理MBA，金融学，会计学，市场营销，国际商务，人力资源管理',
  },
  {
    category: '教育类',
    programs: '教育学，教育心理学，教育管理',
  },
  {
    category: '传媒类',
    programs: '新闻学，传播学，新媒体，广告学，影视制作',
  },
  {
    category: '理工IT类',
    programs: '计算机科学，数据科学，人工智能AI，信息技术IT，工程管理',
  },
  {
    category: '社科类',
    programs: '社会工作，心理学，公共政策，社会学',
  },
];

// 可申请院校
const masterUniversities = {
  hk8: ['港大', '中大', '科大', '城大', '理工', '浸会', '教大', '岭大'],
  others: ['都会大学', '恒生大学', 'HKU SPACE', '高科院', '宏恩学院'],
};

// 申请要求
const masterRequirements = [
  { item: '学历要求', desc: '本科学士学位(统招/自考/成人高考均可)' },
  { item: '成绩要求', desc: 'GPA 2.5-3.0以上(部分院校接受2.3以上)' },
  { item: '语言要求', desc: '雅思IELTS 6.0-6.5(部分专业接受CET-6 430+)' },
  { item: '工作经验', desc: '商科MBA通常要求2-3年工作经验，其他专业应届可申' },
  { item: '申请材料', desc: '个人陈述PS，中英文成绩单，学位证，推荐信2封，简历CV' },
];

// 留港发展路径
const masterStayPath = [
  { stage: '硕士毕业', desc: '获IANG留港2年' },
  { stage: 'IANG签证期间', desc: '在港工作' },
  { stage: '累计满7年', desc: '申请香港永久居民' },
  { stage: '7年后', desc: '全家享受香港福利' },
];

// 硕士服务
const masterServices = [
  { title: '免费专业评估', desc: '根据背景精准匹配院校和专业方案' },
  { title: '申请材料全套制作', desc: 'PS、CV、推荐信、Research Proposal' },
  { title: '语言考试规划', desc: '模拟面试训练，常见问题准备' },
  { title: '签证与住宿', desc: 'IANG签证申请，租房/宿舍推荐' },
  { title: '留港就业指导', desc: '简历优化，求职面试辅导，人脉资源对接' },
  { title: '面试指导', desc: '雅思/托福备考建议与时间安排' },
];

// ====== 博士申请板块 ======

// 研究型博士PhD数据
const phdResearchData = {
  fields: '人文社科，理工科，医学，法学，商学等全领域覆盖',
  scholarship: '香港政府奖学金HKPFS(每月约2.8万港币+学费减免)',
  duration: '全日制3-4年，兼读制4-6年(部分院校接受兼读)',
  requirements: '硕士学位+研究计划PR+学术套磁+面试',
  prospects: '高校教职，科研机构，企业研发高管',
};

// DBA工商管理博士数据
const dbaData = {
  audience: '企业家，企业高管，创业者，行业资深从业者',
  advantages: '免传统学术论文，以商业实践研究替代',
  features: '实战商业案例，企业战略研讨，管理实践项目',
  mode: '兼读制，每月集中授课1-2次',
  duration: '3年',
  universities: '香港都会大学，香港理工大学等',
};

// DBS商业管理博士数据
const dbsData = {
  audience: '中高层管理者，业务骨干，商科专业人士',
  advantages: '学制灵活，课程偏实用管理，以实践项目替代学术论文',
  features: '商业战略，组织管理，财务风控，数字化转型实战研讨',
  mode: '全日制为主，每周集中上课3-5天',
  duration: '3年',
  universities: '香港岭南大学',
};

// 博士申请全流程服务
const phdServices = [
  { step: '学术评估', desc: '评估学历背景，研究经历，语言水平，判断申请可行性' },
  { step: '院校筛选', desc: '根据研究方向匹配导师，分析录取概率' },
  { step: '学术套磁', desc: '撰写套磁信，联系目标导师，获取接收意向' },
  { step: '研究计划PR撰写', desc: '指导撰写高质量Research Proposal，学术规范与前沿性并重' },
  { step: '模拟学术面试', desc: '训练英文答辩能力与研究表达' },
  { step: '申请材料准备', desc: 'CV推荐信，成绩单，语言成绩全套整理' },
  { step: '申请递交与跟进', desc: '递交申请后持续跟进状态，与招生委员会沟通' },
  { step: '录取后服务', desc: '签证办理，租房安排，入学注册全流程协助' },
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

          {/* 香港学士申请板块 */}
          {activeCategory === 'bachelor' && (
            <div className={styles.bachelorSection}>
              {/* 上部分：香港八大名校 */}
              <div className={styles.bachelorTopSection}>
                <h3 className={styles.panelTitle}>
                  <span className={styles.panelTitleIcon}>✦</span>
                  香港八大名校
                </h3>
                <div className={styles.hk8UniversitiesGrid}>
                  {hk8Universities.map((uni, idx) => (
                    <div key={idx} className={styles.hk8UniversityCard}>
                      <div className={styles.uniImageWrapper}>
                        <img
                          src={uni.image}
                          alt={uni.name}
                          className={styles.uniImage}
                        />
                      </div>
                      <div className={styles.uniInfo}>
                        <h4 className={styles.uniName}>{uni.name}</h4>
                        <span className={styles.uniAbbr}>{uni.abbr}</span>
                        <p className={styles.uniDesc}>{uni.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 中部分：香港其他优质院校 */}
              <div className={styles.bachelorMiddleSection}>
                <h3 className={styles.panelTitle}>
                  <span className={styles.panelTitleIcon}>✦</span>
                  香港其他优质院校
                </h3>
                <div className={styles.otherUniversitiesGrid}>
                  {otherUniversities.map((uni, idx) => (
                    <div key={idx} className={`${styles.otherUniversityCard} ${uni.highlight ? styles.highlightedCard : ''}`}>
                      <h4 className={styles.otherUniName}>{uni.name}</h4>
                      <p className={styles.otherUniDesc}>{uni.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 下部分：多元申请通道 */}
              <div className={styles.bachelorChannelsSection}>
                <h3 className={styles.panelTitle}>
                  <span className={styles.panelTitleIcon}>✦</span>
                  多元申请通道
                </h3>
                <div className={styles.channelsGrid}>
                  {applicationChannels.map((channel, idx) => (
                    <div key={idx} className={styles.channelCard}>
                      <h4 className={styles.channelTitle}>{channel.title}</h4>
                      <ul className={styles.channelList}>
                        {channel.items.map((item, itemIdx) => (
                          <li key={itemIdx} className={styles.channelItem}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* 最下方：本科服务优势 */}
              <div className={styles.bachelorServicesSection}>
                <h4 className={styles.bachelorServicesTitle}>我们的服务优势</h4>
                <div className={styles.bachelorServicesGrid}>
                  {bachelorServiceAdvantages.map((item, idx) => (
                    <div key={idx} className={styles.bachelorServiceCard}>
                      <span className={styles.bachelorServiceNumber}>{idx + 1}</span>
                      <h5 className={styles.bachelorServiceTitle}>{item.title}</h5>
                      <p className={styles.bachelorServiceDesc}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 香港硕士申请板块 */}
          {activeCategory === 'master' && (
            <div className={styles.masterSection}>
              {/* 上部分：热门申请方向 */}
              <div className={styles.masterTopSection}>
                <h3 className={styles.panelTitle}>
                  <span className={styles.panelTitleIcon}>✦</span>
                  热门申请方向
                </h3>
                <div className={styles.masterFieldsGrid}>
                  {masterPopularFields.map((field, idx) => (
                    <div key={idx} className={styles.masterFieldCard}>
                      <h4 className={styles.masterFieldCategory}>{field.category}</h4>
                      <p className={styles.masterFieldPrograms}>{field.programs}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 中部分：左右布局 */}
              <div className={styles.masterMiddleSection}>
                {/* 左侧：可申请院校 */}
                <div className={styles.masterLeftPanel}>
                  <h4 className={styles.subPanelTitle}>可申请院校</h4>
                  <div className={styles.masterUniversitiesBlock}>
                    <div className={styles.masterUniCategory}>
                      <span className={styles.categoryLabel}>香港八大</span>
                      <div className={styles.masterUniList}>
                        {masterUniversities.hk8.join(' · ')}
                      </div>
                    </div>
                    <div className={styles.masterUniCategory}>
                      <span className={styles.categoryLabel}>其他院校</span>
                      <div className={styles.masterUniList}>
                        {masterUniversities.others.join(' · ')}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 右侧：申请要求一览 */}
                <div className={styles.masterRightPanel}>
                  <h4 className={styles.subPanelTitle}>申请要求一览</h4>
                  <div className={styles.masterRequirementsTable}>
                    <div className={styles.requirementTableHeader}>
                      <span className={styles.requirementHeaderItem}>本科学士学位(统招/自考/成人高考均可)</span>
                    </div>
                    <div className={styles.requirementTableBody}>
                      {masterRequirements.map((req, idx) => (
                        <div key={idx} className={styles.requirementRow}>
                          <span className={styles.requirementItem}>{req.item}</span>
                          <span className={styles.requirementDesc}>{req.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 中下部分：留港发展路径 */}
              <div className={styles.masterStaySection}>
                <h3 className={styles.panelTitle}>
                  <span className={styles.panelTitleIcon}>✦</span>
                  留港发展路径
                </h3>
                <div className={styles.stayPathFlow}>
                  {masterStayPath.map((item, idx) => (
                    <React.Fragment key={idx}>
                      <div className={styles.stayPathItem}>
                        <span className={styles.stayPathStage}>{item.stage}</span>
                        <span className={styles.stayPathDesc}>{item.desc}</span>
                      </div>
                      {idx < masterStayPath.length - 1 && (
                        <span className={styles.stayPathArrow}>→</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* 下部分：我们的服务 */}
              <div className={styles.masterServicesSection}>
                <h4 className={styles.masterServicesTitle}>我们的服务</h4>
                <div className={styles.masterServicesGrid}>
                  {masterServices.map((service, idx) => (
                    <div key={idx} className={styles.masterServiceCard}>
                      <span className={styles.masterServiceNumber}>{idx + 1}</span>
                      <h5 className={styles.masterServiceTitle}>{service.title}</h5>
                      <p className={styles.masterServiceDesc}>{service.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 博士申请板块 */}
          {activeCategory === 'phd' && (
            <div className={styles.phdSection}>
              {/* 上部分：研究型博士PhD */}
              <div className={styles.phdTopSection}>
                <h3 className={styles.panelTitle}>
                  <span className={styles.panelTitleIcon}>✦</span>
                  研究型博士PhD
                </h3>
                <div className={styles.phdResearchGrid}>
                  <div className={styles.phdResearchCard}>
                    <h4 className={styles.phdResearchLabel}>香港八大全学科申请</h4>
                    <p className={styles.phdResearchContent}>{phdResearchData.fields}</p>
                  </div>
                  <div className={styles.phdResearchCard}>
                    <h4 className={styles.phdResearchLabel}>全额奖学金机会</h4>
                    <p className={styles.phdResearchContent}>{phdResearchData.scholarship}</p>
                  </div>
                  <div className={styles.phdResearchCard}>
                    <h4 className={styles.phdResearchLabel}>学制安排</h4>
                    <p className={styles.phdResearchContent}>{phdResearchData.duration}</p>
                  </div>
                  <div className={styles.phdResearchCard}>
                    <h4 className={styles.phdResearchLabel}>入学要求</h4>
                    <p className={styles.phdResearchContent}>{phdResearchData.requirements}</p>
                  </div>
                  <div className={styles.phdResearchCard}>
                    <h4 className={styles.phdResearchLabel}>毕业前景</h4>
                    <p className={styles.phdResearchContent}>{phdResearchData.prospects}</p>
                  </div>
                </div>
              </div>

              {/* 中间部分：商业授课博士DBA/DBS */}
              <div className={styles.phdMiddleSection}>
                <h3 className={styles.panelTitle}>
                  <span className={styles.panelTitleIcon}>✦</span>
                  商业授课博士DBA/DBS
                </h3>
                <div className={styles.phdBusinessGrid}>
                  {/* DBA工商管理博士 */}
                  <div className={styles.phdBusinessCard}>
                    <div className={styles.phdBusinessHeader}>
                      <h4 className={styles.phdBusinessTitle}>DBA工商管理博士</h4>
                    </div>
                    <div className={styles.phdBusinessContent}>
                      <div className={styles.phdBusinessItem}>
                        <span className={styles.phdBusinessLabel}>适合人群</span>
                        <span className={styles.phdBusinessText}>{dbaData.audience}</span>
                      </div>
                      <div className={styles.phdBusinessItem}>
                        <span className={styles.phdBusinessLabel}>核心优势</span>
                        <span className={styles.phdBusinessText}>{dbaData.advantages}</span>
                      </div>
                      <div className={styles.phdBusinessItem}>
                        <span className={styles.phdBusinessLabel}>课程特色</span>
                        <span className={styles.phdBusinessText}>{dbaData.features}</span>
                      </div>
                      <div className={styles.phdBusinessItem}>
                        <span className={styles.phdBusinessLabel}>学习模式</span>
                        <span className={styles.phdBusinessText}>{dbaData.mode}</span>
                      </div>
                      <div className={styles.phdBusinessItem}>
                        <span className={styles.phdBusinessLabel}>学制</span>
                        <span className={styles.phdBusinessText}>{dbaData.duration}</span>
                      </div>
                      <div className={styles.phdBusinessItem}>
                        <span className={styles.phdBusinessLabel}>院校推荐</span>
                        <span className={styles.phdBusinessText}>{dbaData.universities}</span>
                      </div>
                    </div>
                  </div>

                  {/* DBS商业管理博士 */}
                  <div className={styles.phdBusinessCard}>
                    <div className={styles.phdBusinessHeader}>
                      <h4 className={styles.phdBusinessTitle}>DBS商业管理博士</h4>
                    </div>
                    <div className={styles.phdBusinessContent}>
                      <div className={styles.phdBusinessItem}>
                        <span className={styles.phdBusinessLabel}>适合人群</span>
                        <span className={styles.phdBusinessText}>{dbsData.audience}</span>
                      </div>
                      <div className={styles.phdBusinessItem}>
                        <span className={styles.phdBusinessLabel}>核心优势</span>
                        <span className={styles.phdBusinessText}>{dbsData.advantages}</span>
                      </div>
                      <div className={styles.phdBusinessItem}>
                        <span className={styles.phdBusinessLabel}>课程特色</span>
                        <span className={styles.phdBusinessText}>{dbsData.features}</span>
                      </div>
                      <div className={styles.phdBusinessItem}>
                        <span className={styles.phdBusinessLabel}>学习模式</span>
                        <span className={styles.phdBusinessText}>{dbsData.mode}</span>
                      </div>
                      <div className={styles.phdBusinessItem}>
                        <span className={styles.phdBusinessLabel}>学制</span>
                        <span className={styles.phdBusinessText}>{dbsData.duration}</span>
                      </div>
                      <div className={styles.phdBusinessItem}>
                        <span className={styles.phdBusinessLabel}>院校推荐</span>
                        <span className={styles.phdBusinessText}>{dbsData.universities}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 下部分：华腾博士申请全流程服务 */}
              <div className={styles.phdServicesSection}>
                <h4 className={styles.phdServicesTitle}>华腾博士申请全流程服务</h4>
                <div className={styles.phdServicesGrid}>
                  {phdServices.map((service, idx) => (
                    <div key={idx} className={styles.phdServiceCard}>
                      <span className={styles.phdServiceNumber}>{idx + 1}</span>
                      <h5 className={styles.phdServiceStep}>{service.step}</h5>
                      <p className={styles.phdServiceDesc}>{service.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
