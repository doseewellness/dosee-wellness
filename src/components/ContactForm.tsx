'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslations } from 'next-intl';

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactForm() {
  const t = useTranslations('contactPage');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // バリデーションスキーマ（翻訳メッセージを使用するため関数内で定義）
  const contactSchema = z.object({
    name: z.string().min(1, t('form.validation.nameRequired')),
    email: z.string().email(t('form.validation.emailInvalid')),
    subject: z.string().min(1, t('form.validation.subjectRequired')),
    message: z.string().min(10, t('form.validation.messageMinLength')),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('送信に失敗しました');
      }

      setSubmitStatus('success');
      reset();

      // 5秒後にメッセージをクリア
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* 氏名 */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-2">
          {t('form.name.label')} <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent transition-all ${
            errors.name ? 'border-red-500' : 'border-stone-300'
          }`}
          placeholder={t('form.name.placeholder')}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* メールアドレス */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
          {t('form.email.label')} <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent transition-all ${
            errors.email ? 'border-red-500' : 'border-stone-300'
          }`}
          placeholder={t('form.email.placeholder')}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* 件名 */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-stone-700 mb-2">
          {t('form.subject.label')} <span className="text-red-500">*</span>
        </label>
        <select
          id="subject"
          {...register('subject')}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent transition-all ${
            errors.subject ? 'border-red-500' : 'border-stone-300'
          }`}
        >
          <option value="">{t('form.subject.placeholder')}</option>
          <option value="product">{t('form.subject.options.product')}</option>
          <option value="order">{t('form.subject.options.order')}</option>
          <option value="wholesale">{t('form.subject.options.wholesale')}</option>
          <option value="media">{t('form.subject.options.media')}</option>
          <option value="other">{t('form.subject.options.other')}</option>
        </select>
        {errors.subject && (
          <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
        )}
      </div>

      {/* メッセージ */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-2">
          {t('form.message.label')} <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          {...register('message')}
          rows={6}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent transition-all resize-none ${
            errors.message ? 'border-red-500' : 'border-stone-300'
          }`}
          placeholder={t('form.message.placeholder')}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
        )}
      </div>

      {/* 送信ボタン */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 px-8 rounded-full font-medium text-white transition-all duration-300 ${
            isSubmitting
              ? 'bg-stone-400 cursor-not-allowed'
              : 'bg-brand hover:bg-brand-dark hover:shadow-lg'
          }`}
        >
          {isSubmitting ? t('form.submitButton.sending') : t('form.submitButton.idle')}
        </button>
      </div>

      {/* 送信結果メッセージ */}
      {submitStatus === 'success' && (
        <div className="p-4 bg-brand-soft border border-brand-soft rounded-lg">
          <p className="text-brand-dark text-center">
            {t('form.successMessage')}
          </p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 text-center">
            {t('form.errorMessage')}
          </p>
        </div>
      )}

      {/* プライバシーポリシー */}
      <p className="text-xs text-stone-500 text-center">
        {t.rich('form.privacyNotice', {
          link: (chunks) => (
            <a href="/privacy" className="text-brand hover:underline">
              {chunks}
            </a>
          ),
        })}
      </p>
    </form>
  );
}
