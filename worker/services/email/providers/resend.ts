/**
 * Resend Email Provider
 * Sends transactional email via the Resend HTTP API
 */

import { EmailMessage, EmailProvider } from '../types';

export class ResendEmailProvider implements EmailProvider {
	readonly name = 'resend';

	constructor(
		private readonly apiKey: string,
		private readonly from: string,
	) {}

	async send(message: EmailMessage): Promise<void> {
		const response = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${this.apiKey}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				from: this.from,
				to: [message.to],
				subject: message.subject,
				text: message.text,
				html: message.html,
			}),
		});

		if (!response.ok) {
			const body = await response.text();
			throw new Error(`Resend API error ${response.status}: ${body}`);
		}
	}
}
