import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

type ContactFormData = {
  company: string;
  name: string;
  position?: string;
  email: string;
  phone?: string;
  service: string;
  budget?: string;
  timeline?: string;
  message: string;
};

type SuccessResponse = {
  success: true;
  message: string;
};

type ErrorResponse = {
  error: string;
};

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body: ContactFormData = req.body;

    // バリデーション
    const requiredFields: (keyof ContactFormData)[] = ['company', 'name', 'email', 'service', 'message'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return res.status(400).json({ error: `${field}は必須項目です` });
      }
    }

    // メールアドレスの検証
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return res.status(400).json({ error: '有効なメールアドレスを入力してください' });
    }

    const toEmail = process.env.CONTACT_EMAIL || 'info@kensetsu-tech.com';

    // メール本文を作成
    const emailContent = `
新しいお問い合わせがありました。

【会社名】
${body.company}

【お名前】
${body.name}

【役職】
${body.position || '未入力'}

【メールアドレス】
${body.email}

【電話番号】
${body.phone || '未入力'}

【ご検討中のサービス】
${body.service}

【ご予算】
${body.budget || '未入力'}

【導入時期】
${body.timeline || '未入力'}

【お問い合わせ内容】
${body.message}

---
このメールはunionのウェブサイトから自動送信されています。
    `.trim();

    // Resendでメール送信
    const { data, error } = await resend.emails.send({
      from: 'お問い合わせフォーム <noreply@kensetsu-tech.com>',
      to: [toEmail],
      replyTo: body.email,
      subject: `【お問い合わせ】${body.company} ${body.name}様より`,
      text: emailContent,
    });

    if (error) {
      console.error('Resend error:', error);
      console.error('Resend error details:', JSON.stringify(error, null, 2));
      return res.status(500).json({ error: `メール送信に失敗しました: ${error.message}` });
    }

    console.log('Resend success:', data);

    console.log('Contact form submission sent:', {
      company: body.company,
      name: body.name,
      email: body.email,
      service: body.service,
      timestamp: new Date().toISOString(),
    });

    return res.status(200).json({
      success: true,
      message: 'お問い合わせありがとうございます。3営業日以内にご連絡いたします。',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ error: 'サーバーエラーが発生しました' });
  }
}
