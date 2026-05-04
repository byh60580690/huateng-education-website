import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { validateContactForm, type ContactFormData, type ContactFormErrors } from '../utils/validation';
import { submitContactForm } from '../services/api';
import styles from './Cooperation.module.css';

export default function Cooperation() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phone: '',
    organization: '',
    intention: '',
  });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field error on change
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');

    const validationErrors = validateContactForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const result = await submitContactForm(formData);

      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', phone: '', organization: '', intention: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getErrorMessage = (errorKey?: string) => {
    if (!errorKey) return null;
    return t(`cooperation.validation.${errorKey}`);
  };

  return (
    <div>
      {/* Hero Banner */}
      <section className={styles.heroBanner}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{t('cooperation.hero.title')}</h1>
          <p className={styles.heroSubtitle}>{t('cooperation.hero.subtitle')}</p>
        </div>
      </section>

      {/* Intro */}
      <section className={`${styles.section} container`}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{t('cooperation.intro.title')}</h2>
        </div>
        <p className={styles.introText}>{t('cooperation.intro.description')}</p>
      </section>

      {/* Form */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t('cooperation.form.title')}</h2>
            <p className={styles.sectionSubtitle}>{t('cooperation.form.subtitle')}</p>
          </div>

          <div className={styles.formWrapper}>
            {submitStatus === 'success' && (
              <div className={styles.successMessage}>{t('cooperation.message.success')}</div>
            )}
            {submitStatus === 'error' && (
              <div className={styles.errorMessage}>{t('cooperation.message.error')}</div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {/* Name */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  {t('cooperation.form.name')}<span className="required">*</span>
                </label>
                <input
                  type="text"
                  className={`${styles.formInput} ${errors.name ? styles.inputError : ''}`}
                  placeholder={t('cooperation.form.namePlaceholder')}
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                />
                {errors.name && <span className={styles.errorText}>{getErrorMessage(errors.name)}</span>}
              </div>

              {/* Phone */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  {t('cooperation.form.phone')}<span className="required">*</span>
                </label>
                <input
                  type="tel"
                  className={`${styles.formInput} ${errors.phone ? styles.inputError : ''}`}
                  placeholder={t('cooperation.form.phonePlaceholder')}
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                />
                {errors.phone && <span className={styles.errorText}>{getErrorMessage(errors.phone)}</span>}
              </div>

              {/* Organization */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  {t('cooperation.form.organization')}<span className="required">*</span>
                </label>
                <input
                  type="text"
                  className={`${styles.formInput} ${errors.organization ? styles.inputError : ''}`}
                  placeholder={t('cooperation.form.organizationPlaceholder')}
                  value={formData.organization}
                  onChange={(e) => handleChange('organization', e.target.value)}
                />
                {errors.organization && <span className={styles.errorText}>{getErrorMessage(errors.organization)}</span>}
              </div>

              {/* Intention */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  {t('cooperation.form.intention')}<span className="required">*</span>
                </label>
                <textarea
                  className={`${styles.formTextarea} ${errors.intention ? styles.inputError : ''}`}
                  placeholder={t('cooperation.form.intentionPlaceholder')}
                  value={formData.intention}
                  onChange={(e) => handleChange('intention', e.target.value)}
                />
                {errors.intention && <span className={styles.errorText}>{getErrorMessage(errors.intention)}</span>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={isSubmitting}
              >
                {isSubmitting ? t('cooperation.form.submitting') : t('cooperation.form.submit')}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
