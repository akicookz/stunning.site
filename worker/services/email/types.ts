/**
 * Email Service Types
 * Provider-agnostic contracts for sending transactional email
 */

export interface EmailMessage {
	to: string;
	subject: string;
	text: string;
	html?: string;
}

export interface EmailProvider {
	readonly name: string;
	send(message: EmailMessage): Promise<void>;
}

/**
 * Structural type for the Cloudflare Email Workers `send_email` binding.
 * Declared here so the code compiles whether or not the binding is enabled
 * in wrangler.jsonc (it requires Email Routing with verified destinations).
 */
export interface SendEmailBinding {
	send(message: unknown): Promise<void>;
}
