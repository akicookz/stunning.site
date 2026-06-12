/**
 * Email-related environment additions.
 * Merged into the generated Env interface so email config stays optional
 * regardless of which secrets exist in .dev.vars when types are generated.
 */

interface Env {
	RESEND_API_KEY?: string;
	EMAIL_FROM?: string;
	SEND_EMAIL?: { send(message: unknown): Promise<void> };
}

declare module 'cloudflare:email' {
	export class EmailMessage {
		constructor(from: string, to: string, raw: string);
		readonly from: string;
		readonly to: string;
	}
}
