/**
 * Email Service
 * Picks the best available provider for the environment:
 * 1. Resend (RESEND_API_KEY set) — works for any recipient
 * 2. Cloudflare Email Workers (SEND_EMAIL binding enabled in wrangler.jsonc)
 * 3. Console logging fallback for local development
 */

import { CloudflareEmailProvider } from './providers/cloudflare';
import { ConsoleEmailProvider } from './providers/console';
import { ResendEmailProvider } from './providers/resend';
import { EmailProvider, SendEmailBinding } from './types';

const DEFAULT_FROM = 'stunning.site <onboarding@resend.dev>';

export function createEmailProvider(env: Env): EmailProvider {
	const from = env.EMAIL_FROM || DEFAULT_FROM;

	if (env.RESEND_API_KEY) {
		return new ResendEmailProvider(env.RESEND_API_KEY, from);
	}

	const sendEmailBinding = (env as Partial<Record<'SEND_EMAIL', SendEmailBinding>>).SEND_EMAIL;
	if (sendEmailBinding) {
		return new CloudflareEmailProvider(sendEmailBinding, from);
	}

	return new ConsoleEmailProvider();
}

export type { EmailMessage, EmailProvider } from './types';
export { buildVerificationOtpEmail } from './templates';
