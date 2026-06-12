/**
 * Email Service
 * Picks the best available provider for the environment:
 * 1. Cloudflare Email Workers (SEND_EMAIL binding enabled in wrangler.jsonc)
 * 2. Resend (RESEND_API_KEY set) — works for any recipient
 * 3. Console logging fallback for local development
 */

import { CloudflareEmailProvider } from './providers/cloudflare';
import { ConsoleEmailProvider } from './providers/console';
import { ResendEmailProvider } from './providers/resend';
import { EmailProvider } from './types';

const DEFAULT_FROM = 'stunning.site <no-reply@stunning.site>';

export function createEmailProvider(env: Env): EmailProvider {
	const from = env.EMAIL_FROM || DEFAULT_FROM;

	if (env.SEND_EMAIL) {
		return new CloudflareEmailProvider(env.SEND_EMAIL, from);
	}

	if (env.RESEND_API_KEY) {
		return new ResendEmailProvider(env.RESEND_API_KEY, from);
	}

	return new ConsoleEmailProvider();
}

export type { EmailMessage, EmailProvider } from './types';
export { buildVerificationOtpEmail } from './templates';
