/**
 * Transactional Email Templates
 */

import { EmailMessage } from './types';

export function buildVerificationOtpEmail(
	to: string,
	otp: string,
	appName: string,
): EmailMessage {
	const subject = `${otp} is your ${appName} verification code`;
	const text = [
		`Your ${appName} verification code is: ${otp}`,
		'',
		'This code expires in 15 minutes. If you did not request it, you can safely ignore this email.',
	].join('\n');
	const html = `
<div style="font-family: -apple-system, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; color: #0a0a0a;">
	<h2 style="margin: 0 0 16px; font-size: 18px;">Verify your email</h2>
	<p style="margin: 0 0 24px; color: #444;">Use this code to finish signing in to ${appName}:</p>
	<div style="display: inline-block; padding: 12px 24px; border-radius: 999px; background: #f4f5f7; font-size: 28px; font-weight: 700; letter-spacing: 6px;">${otp}</div>
	<p style="margin: 24px 0 0; font-size: 13px; color: #888;">This code expires in 15 minutes. If you didn't request it, you can ignore this email.</p>
</div>`;
	return { to, subject, text, html };
}
