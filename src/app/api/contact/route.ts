import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // バリデーション
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: '必須項目が入力されていません' },
        { status: 400 }
      );
    }

    // 件名の変換
    const subjectMap: { [key: string]: string } = {
      product: '商品について',
      order: '注文・配送について',
      wholesale: '卸・取引について',
      media: 'メディア掲載・取材について',
      other: 'その他',
    };

    const subjectText = subjectMap[subject] || subject;

    // 1. お店側への通知メール
    const adminEmail = await resend.emails.send({
      from: 'DoSee Wellness <noreply@doseewellness.com>',
      to: ['doseewellness@gmail.com'],
      replyTo: email,
      subject: `【お問い合わせ】${subjectText} - ${name}様より`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #2c5f2d 0%, #4c814d 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .field { margin-bottom: 20px; }
              .label { font-weight: bold; color: #2c5f2d; margin-bottom: 5px; }
              .value { background: white; padding: 15px; border-radius: 5px; border-left: 3px solid #2c5f2d; }
              .footer { text-align: center; margin-top: 30px; color: #999; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">DoSee Wellness</h1>
                <p style="margin: 10px 0 0;">お問い合わせフォームより送信されました</p>
              </div>
              
              <div class="content">
                <div class="field">
                  <div class="label">氏名</div>
                  <div class="value">${name}</div>
                </div>
                
                <div class="field">
                  <div class="label">メールアドレス</div>
                  <div class="value">${email}</div>
                </div>
                
                <div class="field">
                  <div class="label">お問い合わせ内容</div>
                  <div class="value">${subjectText}</div>
                </div>
                
                <div class="field">
                  <div class="label">メッセージ</div>
                  <div class="value">${message.replace(/\n/g, '<br>')}</div>
                </div>
              </div>
              
              <div class="footer">
                <p>このメールは DoSee Wellness のお問い合わせフォームから自動送信されています。</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    // 2. お客様への自動返信メール
    const customerEmail = await resend.emails.send({
      from: 'DoSee Wellness <noreply@doseewellness.com>',
      to: [email], // お客様のメールアドレス
      subject: 'お問い合わせを受け付けました - DoSee Wellness',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', sans-serif; line-height: 1.8; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #2c5f2d 0%, #4c814d 100%); color: white; padding: 40px 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 40px 30px; border-radius: 0 0 10px 10px; }
              .message-box { background: white; padding: 20px; border-radius: 5px; border-left: 4px solid #2c5f2d; margin: 20px 0; }
              .info-section { margin: 30px 0; }
              .info-title { font-weight: bold; color: #2c5f2d; font-size: 16px; margin-bottom: 10px; }
              .info-content { background: white; padding: 15px; border-radius: 5px; }
              .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 13px; }
              .signature { margin-top: 30px; padding: 20px; background: white; border-radius: 5px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; font-size: 28px;">DoSee Wellness</h1>
                <p style="margin: 15px 0 0; font-size: 16px;">お問い合わせありがとうございます</p>
              </div>
              
              <div class="content">
                <p>${name} 様</p>
                
                <p>この度は DoSee Wellness にお問い合わせいただき、誠にありがとうございます。<br>
                以下の内容でお問い合わせを受け付けました。</p>
                
                <div class="info-section">
                  <div class="info-title">お問い合わせ内容</div>
                  <div class="info-content">${subjectText}</div>
                </div>
                
                <div class="info-section">
                  <div class="info-title">メッセージ</div>
                  <div class="info-content">${message.replace(/\n/g, '<br>')}</div>
                </div>
                
                <div class="message-box">
                  <p style="margin: 0; font-weight: bold; color: #2c5f2d;">📧 ご返信について</p>
                  <p style="margin: 10px 0 0;">
                    お問い合わせ内容を確認の上、2〜3営業日以内にご返信させていただきます。<br>
                    お急ぎの場合は、お手数ですが再度ご連絡ください。
                  </p>
                </div>
                
                <div class="signature">
                  <p style="margin: 0; font-weight: bold; color: #2c5f2d;">DoSee Wellness</p>
                  <p style="margin: 5px 0 0; font-size: 14px; color: #666;">
                    ウェブサイト: <a href="https://doseewellness.com" style="color: #2c5f2d;">https://doseewellness.com</a><br>
                    メール: doseewellness@gmail.com
                  </p>
                </div>
                
                <div class="footer">
                  <p>このメールは送信専用アドレスから配信されています。<br>
                  ご返信いただいても対応できませんので、ご了承ください。</p>
                  <p style="margin-top: 10px;">© 2025 DoSee Wellness. All rights reserved.</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json(
      { 
        message: '送信に成功しました',
        adminEmail,
        customerEmail 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: '送信に失敗しました' },
      { status: 500 }
    );
  }
}
