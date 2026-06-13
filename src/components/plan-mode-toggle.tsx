import clsx from 'clsx';
import { ClipboardList } from 'lucide-react';

interface PlanModeToggleProps {
	value: boolean;
	onChange: (value: boolean) => void;
	disabled?: boolean;
	className?: string;
}

/**
 * Compact pill toggle for "Plan first" mode. When on, the agent reviews the
 * plan and asks any clarifying questions before it starts building.
 */
export function PlanModeToggle({ value, onChange, disabled = false, className }: PlanModeToggleProps) {
	return (
		<button
			type="button"
			disabled={disabled}
			onClick={() => onChange(!value)}
			aria-pressed={value}
			title="Plan first: review the plan and answer any questions before building"
			className={clsx(
				'flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium border transition-colors',
				value
					? 'bg-accent/10 border-accent/40 text-accent'
					: 'border-text-primary/15 text-text-primary/50 hover:text-text-primary/80 hover:border-text-primary/30',
				disabled && 'opacity-50 cursor-not-allowed',
				className,
			)}
		>
			<ClipboardList className="size-3.5" />
			Plan first
		</button>
	);
}
