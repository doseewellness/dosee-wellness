'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// バリデーションスキーマ
const contactSchema = z.object({
  name: z.string().min(1, '氏名を入力してください'),
  email: z.string().email('有効なメールアドレスを入力してください'),
  subject: z.string().min(1, '件名を選択してください'),
  message: z.string().min(10, 'メッセージは10文字以上で入力してください'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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
      
      // 3秒後にメッセージをクリア
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
          氏名 <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
            errors.name ? 'border-red-500' : 'border-stone-300'
          }`}
          placeholder="山田 太郎"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* メールアドレス */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
          メールアドレス <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
            errors.email ? 'border-red-500' : 'border-stone-300'
          }`}
          placeholder="example@email.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* 件名 */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-stone-700 mb-2">
          お問い合わせ内容 <span className="text-red-500">*</span>
        </label>
        <select
          id="subject"
          {...register('subject')}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
            errors.subject ? 'border-red-500' : 'border-stone-300'
          }`}
        >
          <option value="">選択してください</option>
          <option value="product">商品について</option>
          <option value="order">注文・配送について</option>
          <option value="wholesale">卸・取引について</option>
          <option value="media">メディア掲載・取材について</option>
          <option value="other">その他</option>
        </select>
        {errors.subject && (
          <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
        )}
      </div>

      {/* メッセージ */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-2">
          メッセージ <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          {...register('message')}
          rows={6}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none ${
            errors.message ? 'border-red-500' : 'border-stone-300'
          }`}
          placeholder="お問い合わせ内容をご記入ください"
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
              : 'bg-green-700 hover:bg-green-800 hover:shadow-lg'
          }`}
        >
          {isSubmitting ? '送信中...' : '送信する'}
        </button>
      </div>

      {/* 送信結果メッセージ */}
      {submitStatus === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 text-center">
            ✓ お問い合わせを受け付けました。<br />
            担当者より折り返しご連絡いたします。
          </p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 text-center">
            ✗ 送信に失敗しました。<br />
            時間をおいて再度お試しいただくか、メールにて直接ご連絡ください。
          </p>
        </div>
      )}

      {/* プライバシーポリシー */}
      <p className="text-xs text-stone-500 text-center">
        送信することで、
        <a href="/privacy" className="text-green-700 hover:underline">
          プライバシーポリシー
        </a>
        に同意したものとみなされます。
      </p>
    </form>
  );
}