import clsx from 'clsx';
import { Sparkles } from 'lucide-react';

interface BrandMarkProps {
	className?: string;
}

/** The stunning.site logo mark — a gradient rounded square with a spark. */
export function BrandMark({ className }: BrandMarkProps) {
	return (
		<span
			className={clsx(
				'inline-flex items-center justify-center rounded-md bg-gradient-to-br from-accent to-fuchsia-500 text-white shadow-sm',
				className ?? 'size-7',
			)}
		>
			<Sparkles className="size-[58%]" strokeWidth={2.25} />
		</span>
	);
}

interface BrandProps {
	className?: string;
	/** Hide the wordmark and show only the mark. */
	markOnly?: boolean;
	markClassName?: string;
}

/** Full stunning.site brand lockup: mark + wordmark. */
export function Brand({ className, markOnly = false, markClassName }: BrandProps) {
	return (
		<span className={clsx('inline-flex items-center gap-2 select-none', className)}>
			<BrandMark className={markClassName} />
			{!markOnly && (
				<span className="text-[15px] font-semibold tracking-tight text-text-primary">
					stunning<span className="text-text-50/50">.site</span>
				</span>
			)}
		</span>
	);
}
