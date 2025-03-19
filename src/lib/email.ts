import { Resend } from 'resend';

// Initialize Resend with API key from environment variable
const resendApiKey = process.env.NEXT_PUBLIC_RESEND_API_KEY;

if (!resendApiKey) {
  console.warn('NEXT_PUBLIC_RESEND_API_KEY is not defined in environment variables');
}

// Create Resend instance
const resend = new Resend(resendApiKey);

// Email template types
export type EmailTemplate = {
  subject: string;
  html: string;
  text: string;
};

// Basic email sending function
export async function sendEmail({
  to,
  from = 'onboarding@resend.dev', // Using Resend's default domain, you have to change it to yours if necessary
  subject,
  html,
  text,
}: {
  to: string | string[];
  from?: string;
  subject: string;
  html: string;
  text: string;
}) {
  if (!resendApiKey) {
    console.error('Cannot send email: RESEND_API_KEY is not defined');
    throw new Error('RESEND_API_KEY is not defined');
  }

  try {
    const { data, error } = await resend.emails.send({
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      text,
    });

    if (error) {
      console.error('Error sending email:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

// Function to create a welcome email
export function createWelcomeEmail(name: string, locale: string = 'en'): EmailTemplate {
  // You can expand this to use your i18n translation files for different locales
  const subject = locale === 'fr' 
    ? 'Bienvenue sur notre plateforme!' 
    : locale === 'kr' 
      ? '우리 플랫폼에 오신 것을 환영합니다!' 
      : 'Welcome to our platform!';
  
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #333;">${subject}</h1>
      <p style="font-size: 16px; line-height: 1.5; color: #555;">
        ${locale === 'fr' 
          ? `Bonjour ${name}, merci de vous être inscrit!` 
          : locale === 'kr' 
            ? `안녕하세요 ${name}, 가입해 주셔서 감사합니다!` 
            : `Hello ${name}, thank you for signing up!`}
      </p>
      <p style="font-size: 16px; line-height: 1.5; color: #555;">
        ${locale === 'fr' 
          ? 'Nous sommes ravis de vous avoir à bord.' 
          : locale === 'kr' 
            ? '함께 하게 되어 기쁩니다.' 
            : 'We are excited to have you on board.'}
      </p>
    </div>
  `;
  
  const text = locale === 'fr' 
    ? `Bonjour ${name}, merci de vous être inscrit! Nous sommes ravis de vous avoir à bord.` 
    : locale === 'kr' 
      ? `안녕하세요 ${name}, 가입해 주셔서 감사합니다! 함께 하게 되어 기쁩니다.` 
      : `Hello ${name}, thank you for signing up! We are excited to have you on board.`;
  
  return { subject, html, text };
}

// Function to create a password reset email
export function createPasswordResetEmail(resetLink: string, locale: string = 'en'): EmailTemplate {
  const subject = locale === 'fr' 
    ? 'Réinitialisation de votre mot de passe' 
    : locale === 'kr' 
      ? '비밀번호 재설정' 
      : 'Reset your password';
  
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #333;">${subject}</h1>
      <p style="font-size: 16px; line-height: 1.5; color: #555;">
        ${locale === 'fr' 
          ? 'Vous avez demandé une réinitialisation de mot de passe.' 
          : locale === 'kr' 
            ? '비밀번호 재설정을 요청하셨습니다.' 
            : 'You requested a password reset.'}
      </p>
      <a href="${resetLink}" style="display: inline-block; background-color: #4F46E5; color: white; text-decoration: none; padding: 10px 20px; border-radius: 5px; margin: 20px 0;">
        ${locale === 'fr' 
          ? 'Réinitialiser le mot de passe' 
          : locale === 'kr' 
            ? '비밀번호 재설정' 
            : 'Reset Password'}
      </a>
      <p style="font-size: 14px; color: #777;">
        ${locale === 'fr' 
          ? 'Si vous n\'avez pas demandé cette réinitialisation, veuillez ignorer cet e-mail.' 
          : locale === 'kr' 
            ? '만약 재설정을 요청하지 않으셨다면, 이 이메일을 무시해 주세요.' 
            : 'If you did not request this reset, please ignore this email.'}
      </p>
    </div>
  `;
  
  const text = locale === 'fr' 
    ? `Vous avez demandé une réinitialisation de mot de passe. Veuillez suivre ce lien pour réinitialiser: ${resetLink}` 
    : locale === 'kr' 
      ? `비밀번호 재설정을 요청하셨습니다. 다음 링크를 통해 재설정하세요: ${resetLink}` 
      : `You requested a password reset. Please follow this link to reset: ${resetLink}`;
  
  return { subject, html, text };
}

// Function to send a notification email
export async function sendNotificationEmail(
  to: string | string[],
  subject: string,
  message: string,
  locale: string = 'en'
) {
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #333;">${subject}</h1>
      <p style="font-size: 16px; line-height: 1.5; color: #555;">${message}</p>
    </div>
  `;
  
  return sendEmail({
    to,
    subject,
    html,
    text: message,
  });
}

export default {
  sendEmail,
  createWelcomeEmail,
  createPasswordResetEmail,
  sendNotificationEmail,
};