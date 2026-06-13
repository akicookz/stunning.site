import type { ChatMode } from '@/api-types';
import { ChevronDown, Sparkles, ClipboardList, HelpCircle, Check } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

interface ModeDef {
	id: ChatMode;
	label: string;
	description: string;
	icon: React.ComponentType<{ className?: string }>;
}

const MODES: ModeDef[] = [
	{ id: 'agent', label: 'Agent', description: 'Build and edit your app', icon: Sparkles },
	{ id: 'plan', label: 'Plan', description: 'Plan the work and ask questions first', icon: ClipboardList },
	{ id: 'ask', label: 'Ask', description: 'Discuss without changing code', icon: HelpCircle },
];

interface ChatModeSelectorProps {
	value: ChatMode;
	onChange: (mode: ChatMode) => void;
	disabled?: boolean;
}

export function ChatModeSelector({ value, onChange, disabled }: ChatModeSelectorProps) {
	const current = MODES.find((m) => m.id === value) ?? MODES[0];
	const CurrentIcon = current.icon;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					type="button"
					disabled={disabled}
					className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-text-50/70 hover:text-text-primary hover:bg-bg-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
				>
					<CurrentIcon className="size-3.5" />
					{current.label}
					<ChevronDown className="size-3 opacity-70" />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start" side="top" sideOffset={8} className="w-60">
				{MODES.map((mode) => {
					const Icon = mode.icon;
					return (
						<DropdownMenuItem
							key={mode.id}
							onClick={() => onChange(mode.id)}
							className="flex items-start gap-2"
						>
							<Icon className="size-4 mt-0.5 shrink-0 text-text-50/70" />
							<div className="flex flex-col flex-1 min-w-0">
								<span className="text-sm text-text-primary">{mode.label}</span>
								<span className="text-[11px] text-text-50/50">{mode.description}</span>
							</div>
							{value === mode.id && <Check className="size-4 shrink-0 text-accent" />}
						</DropdownMenuItem>
					);
				})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
