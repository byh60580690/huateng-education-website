import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Business.module.css';

type ServiceCategory = 'k12' | 'tutoring' | 'associate' | 'bachelor' | 'master' | 'phd';

export default function Business() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('k12');

  // Get data from i18n
  const serviceCategories = t('business.categories', { returnObjects: true }) as Array<{
    key: ServiceCategory;
    label: string;
    tagline: string;
  }>;

  // K12 data
  const k12ApplicationTypes = t('business.k12.applicationTypes', { returnObjects: true }) as string[];
  const k12PartnerSchools = t('business.k12.partnerSchools', { returnObjects: true }) as Array<{
    name: string;
    features: string;
    image: string;
  }>;
  const tutoringCourses = t('business.k12.tutoringCourses', { returnObjects: true }) as Array<{
    title: string;
    content: string;
  }>;
  const serviceProcess = t('business.k12.serviceProcess', { returnObjects: true }) as string[];

  // Tutoring data
  const alevelData = t('business.tutoring.alevel', { returnObjects: true }) as {
    subjects: string;
    teachingModes: Array<{ label: string; desc: string }>;
    features: string[];
    examPrep: string[];
  };
  const dseData = t('business.tutoring.dse', { returnObjects: true }) as {
    coreSubjects: Array<{ name: string; desc: string }>;
    electiveSubjects: string;
    guarantee: string[];
  };
  const igcseData = t('business.tutoring.igcse', { returnObjects: true }) as {
    positioning: string;
    subjects: string;
    advantages: string[];
    targetAudience: string;
  };
  const englishData = t('business.tutoring.english', { returnObjects: true }) as {
    services: Array<{ name: string; desc: string }>;
  };
  const tutoringHighlights = t('business.tutoring.highlights', { returnObjects: true }) as Array<{
    title: string;
    desc: string;
  }>;

  // Associate data
  const associateIntro = t('business.associate.intro', { returnObjects: true }) as string[];
  const associateUniversities = t('business.associate.universities', { returnObjects: true }) as {
    hk8: string[];
    others: string[];
  };
  const associateTargetGroups = t('business.associate.targetGroups', { returnObjects: true }) as Array<{
    label: string;
    desc: string;
  }>;
  const associateColleges = t('business.associate.colleges', { returnObjects: true }) as string[];
  const associateServices = t('business.associate.services', { returnObjects: true }) as Array<{
    title: string;
    desc: string;
  }>;

  // Bachelor data
  const hk8Universities = t('business.bachelor.hk8Universities', { returnObjects: true }) as Array<{
    name: string;
    abbr: string;
    desc: string;
    image: string;
  }>;
  const otherUniversities = t('business.bachelor.otherUniversities', { returnObjects: true }) as Array<{
    name: string;
    desc: string;
    highlight: boolean;
  }>;
  const applicationChannels = t('business.bachelor.applicationChannels', { returnObjects: true }) as Array<{
    title: string;
    items: string[];
  }>;
  const bachelorServiceAdvantages = t('business.bachelor.serviceAdvantages', { returnObjects: true }) as Array<{
    title: string;
    desc: string;
  }>;

  // Master data
  const masterPopularFields = t('business.master.popularFields', { returnObjects: true }) as Array<{
    category: string;
    programs: string;
  }>;
  const masterUniversities = t('business.master.universities', { returnObjects: true }) as {
    hk8: string[];
    others: string[];
  };
  const masterRequirements = t('business.master.requirements', { returnObjects: true }) as Array<{
    item: string;
    desc: string;
  }>;
  const masterStayPath = t('business.master.stayPath', { returnObjects: true }) as Array<{
    stage: string;
    desc: string;
  }>;
  const masterServices = t('business.master.services', { returnObjects: true }) as Array<{
    title: string;
    desc: string;
  }>;

  // PhD data
  const phdResearchData = t('business.phd.research', { returnObjects: true }) as {
    fields: string;
    scholarship: string;
    duration: string;
    requirements: string;
    prospects: string;
  };
  const dbaData = t('business.phd.dba', { returnObjects: true }) as {
    audience: string;
    advantages: string;
    features: string;
    mode: string;
    duration: string;
    universities: string;
  };
  const dbsData = t('business.phd.dbs', { returnObjects: true }) as {
    audience: string;
    advantages: string;
    features: string;
    mode: string;
    duration: string;
    universities: string;
  };
  const phdServices = t('business.phd.services', { returnObjects: true }) as Array<{
    step: string;
    desc: string;
  }>;

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
