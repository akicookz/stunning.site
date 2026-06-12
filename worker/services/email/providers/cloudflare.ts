/**
 * Cloudflare Email Workers Provider
 * Sends email through the `send_email` binding (Email Routing).
 * Note: Cloudflare Email Routing can only deliver to destination addresses
 * verified on the zone, so this provider suits single-tenant/allowlisted
 * deployments. Use Resend for arbitrary recipient addresses.
 */

import { EmailMessage, EmailProvider, SendEmailBinding } from '../types';

export class CloudflareEmailProvider implements EmailProvider {
	readonly name = 'cloudflare-email';

	constructor(
		private readonly binding: SendEmailBinding,
		private readonly from: string,
	) {}

	async send(message: EmailMessage): Promise<void> {
		const { EmailMessage: CfEmailMessage } = await import('cloudflare:email');
		const raw = this.buildMime(message);
		await this.binding.send(new CfEmailMessage(this.fromAddress(), message.to, raw));
	}

	private fromAddress(): string {
		const match = this.from.match(/<([^>]+)>/);
		return match ? match[1] : this.from;
	}

	private buildMime(message: EmailMessage): string {
		const messageId = `<${crypto.randomUUID()}@${this.fromAddress().split('@')[1] ?? 'localhost'}>`;
		return [
			`From: ${this.from}`,
			`To: ${message.to}`,
			`Subject: ${message.subject}`,
			`Message-ID: ${messageId}`,
			'MIME-Version: 1.0',
			'Content-Type: text/plain; charset=utf-8',
			'',
			message.text,
		].join('\r\n');
	}
}
