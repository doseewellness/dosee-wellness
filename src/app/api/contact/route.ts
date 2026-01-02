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

    // メール送信
    const data = await resend.emails.send({
      from: 'DoSee Wellness <noreply@dosee-wellness.com>', // 変更必要
      to: ['doseewellness@gmail.com'], // 受信先メールアドレス
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

    return NextResponse.json(
      { message: '送信に成功しました', data },
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