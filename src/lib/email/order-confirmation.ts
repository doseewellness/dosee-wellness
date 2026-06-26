import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = "DoSee Wellness <noreply@doseewellness.com>";
const SHOP_EMAIL = "info@doseegroup.com";

export type OrderEmailItem = {
  product_name: string;
  price: number;
  quantity: number;
};

export type OrderShipping = {
  name: string;
  postalCode: string;
  state: string;
  city: string;
  line1: string;
  line2: string;
  phone: string;
};

export type OrderEmailParams = {
  orderId: string;
  customerEmail: string;
  items: OrderEmailItem[];
  subtotalAmount: number;
  discountAmount: number;
  shippingAmount: number;
  totalAmount: number;
  shipping: OrderShipping | null;
};

const yen = (n: number) => `¥${n.toLocaleString("ja-JP")}`;

const orderRef = (orderId: string) => orderId.slice(0, 8).toUpperCase();

function itemRows(items: OrderEmailItem[]): string {
  return items
    .map(
      (item) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #eee;">${item.product_name} × ${item.quantity}</td>
          <td style="padding:10px 0;border-bottom:1px solid #eee;text-align:right;">${yen(item.price * item.quantity)}</td>
        </tr>`
    )
    .join("");
}

function addressBlock(shipping: OrderShipping | null): string {
  if (!shipping) return "";
  const line2 = shipping.line2 ? `${shipping.line2}` : "";
  return `
    <div class="info-section">
      <div class="info-title">お届け先</div>
      <div class="info-content">
        ${shipping.name} 様<br>
        〒${shipping.postalCode}<br>
        ${shipping.state}${shipping.city}${shipping.line1}${line2}<br>
        ${shipping.phone ? `TEL: ${shipping.phone}` : ""}
      </div>
    </div>`;
}

const baseStyle = `
  body { font-family: 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', sans-serif; line-height: 1.8; color: #333; }
  .container { max-width: 600px; margin: 0 auto; padding: 20px; }
  .header { background: linear-gradient(135deg, #1b1a17 0%, #2e2a23 100%); color: white; padding: 40px 30px; text-align: center; border-radius: 10px 10px 0 0; }
  .content { background: #f9f9f9; padding: 40px 30px; border-radius: 0 0 10px 10px; }
  .info-section { margin: 24px 0; }
  .info-title { font-weight: bold; color: #9a7b3f; font-size: 16px; margin-bottom: 10px; }
  .info-content { background: white; padding: 15px; border-radius: 5px; }
  table { width: 100%; border-collapse: collapse; }
  .total-row td { padding-top: 12px; font-weight: bold; font-size: 16px; }
  .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 13px; }
`;

export async function sendOrderEmails(params: OrderEmailParams): Promise<void> {
  const {
    orderId,
    customerEmail,
    items,
    subtotalAmount,
    discountAmount,
    shippingAmount,
    totalAmount,
    shipping,
  } = params;
  const ref = orderRef(orderId);

  const discountRow =
    discountAmount > 0
      ? `
      <tr>
        <td>割引（クーポン）</td>
        <td style="text-align:right;color:#9a7b3f;">−${yen(discountAmount)}</td>
      </tr>`
      : "";

  const summaryTable = `
    <table>
      ${itemRows(items)}
      <tr>
        <td style="padding-top:12px;">小計</td>
        <td style="padding-top:12px;text-align:right;">${yen(subtotalAmount)}</td>
      </tr>
      ${discountRow}
      <tr>
        <td>送料</td>
        <td style="text-align:right;">${shippingAmount === 0 ? "無料" : yen(shippingAmount)}</td>
      </tr>
      <tr class="total-row">
        <td>合計</td>
        <td style="text-align:right;">${yen(totalAmount)}</td>
      </tr>
    </table>`;

  // 1. お客様宛 注文確認
  const customerHtml = `
    <!DOCTYPE html>
    <html><head><meta charset="utf-8"><style>${baseStyle}</style></head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin:0;font-size:28px;">DoSee Wellness</h1>
          <p style="margin:15px 0 0;font-size:16px;">ご注文ありがとうございます</p>
        </div>
        <div class="content">
          <p>この度は DoSee Wellness にご注文いただき、誠にありがとうございます。<br>
          以下の内容で承りました。</p>
          <div class="info-section">
            <div class="info-title">注文番号</div>
            <div class="info-content">${ref}</div>
          </div>
          <div class="info-section">
            <div class="info-title">ご注文内容</div>
            <div class="info-content">${summaryTable}</div>
          </div>
          ${addressBlock(shipping)}
          <div class="info-section">
            <div class="info-title">配送について</div>
            <div class="info-content">発送準備に1〜2営業日、その後の配送に2〜5日ほどお時間をいただきます。</div>
          </div>
          <div class="footer">
            <p>ご不明な点は <a href="mailto:${SHOP_EMAIL}" style="color:#9a7b3f;">${SHOP_EMAIL}</a> までお問い合わせください。</p>
            <p>このメールは送信専用アドレスから配信されています。</p>
            <p style="margin-top:10px;">© DoSee Wellness. All rights reserved.</p>
          </div>
        </div>
      </div>
    </body></html>`;

  // 2. 店舗宛 新規注文通知
  const shopHtml = `
    <!DOCTYPE html>
    <html><head><meta charset="utf-8"><style>${baseStyle}</style></head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin:0;font-size:24px;">新規注文が入りました</h1>
        </div>
        <div class="content">
          <div class="info-section">
            <div class="info-title">注文番号</div>
            <div class="info-content">${ref}</div>
          </div>
          <div class="info-section">
            <div class="info-title">お客様メール</div>
            <div class="info-content">${customerEmail}</div>
          </div>
          <div class="info-section">
            <div class="info-title">ご注文内容</div>
            <div class="info-content">${summaryTable}</div>
          </div>
          ${addressBlock(shipping)}
        </div>
      </div>
    </body></html>`;

  await Promise.all([
    resend.emails.send({
      from: FROM,
      to: [customerEmail],
      subject: `【DoSee Wellness】ご注文を承りました（注文番号 ${ref}）`,
      html: customerHtml,
    }),
    resend.emails.send({
      from: FROM,
      to: [SHOP_EMAIL],
      replyTo: customerEmail,
      subject: `【新規注文】${ref} / ${yen(totalAmount)}`,
      html: shopHtml,
    }),
  ]);
}
