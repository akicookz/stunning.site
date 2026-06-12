/**
 * Console Email Provider
 * Local-development fallback when no email provider is configured.
 * Logs the message (including OTP content) so flows remain testable.
 */

import { createLogger } from '../../../logger';
import { EmailMessage, EmailProvider } from '../types';

const logger = createLogger('ConsoleEmailProvider');

export class ConsoleEmailProvider implements EmailProvider {
	readonly name = 'console';

	async send(message: EmailMessage): Promise<void> {
		logger.info('Email sending not configured; logging message instead', {
			to: message.to,
			subject: message.subject,
			text: message.text,
		});
	}
}
