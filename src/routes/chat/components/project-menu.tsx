import { useNavigate } from 'react-router';
import {
	ArrowLeft,
	Settings,
	Rocket,
	RotateCcw,
	HelpCircle,
	ChevronDown,
	Monitor,
	Moon,
	Sun,
	ExternalLink,
} from 'lucide-react';
import { GithubIcon } from '@/components/icons/logos';
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubTrigger,
	DropdownMenuSubContent,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/contexts/theme-context';
import type { AuthUser } from '@/api-types';

interface ProjectMenuProps {
	title: string;
	subtitle?: string;
	user?: AuthUser | null;
	creditsLabel?: string;
	canReset?: boolean;
	onResetConversation?: () => void;
	onGitHubExport?: () => void;
	onDeploy?: () => void;
	deploymentUrl?: string;
	isDeploying?: boolean;
}

export function ProjectMenu({
	title,
	subtitle,
	user,
	creditsLabel,
	canReset = false,
	onResetConversation,
	onGitHubExport,
	onDeploy,
	deploymentUrl,
	isDeploying = false,
}: ProjectMenuProps) {
	const navigate = useNavigate();
	const { setTheme } = useTheme();

	const accountName = user?.displayName || user?.username || 'Account';
	const initial = (user?.displayName || user?.username || user?.email || '?')
		.trim()
		.charAt(0)
		.toUpperCase();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					type="button"
					className="group flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-left hover:bg-bg-2 transition-colors max-w-full"
				>
					<span className="size-7 shrink-0 rounded-md bg-gradient-to-br from-accent to-fuchsia-500 shadow-sm" />
					<span className="flex flex-col leading-tight min-w-0">
						<span className="flex items-center gap-1">
							<span className="text-sm font-semibold text-text-primary truncate max-w-[200px]">
								{title}
							</span>
							<ChevronDown className="size-3.5 shrink-0 text-text-50/50 group-hover:text-text-primary transition-colors" />
						</span>
						{subtitle && (
							<span className="text-[11px] text-text-50/50 truncate max-w-[220px]">
								{subtitle}
							</span>
						)}
					</span>
				</button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="start" sideOffset={6} className="w-64">
				<DropdownMenuItem onClick={() => navigate('/')}>
					<ArrowLeft className="size-4 mr-2" />
					Go to Dashboard
				</DropdownMenuItem>

				{user && (
					<>
						<DropdownMenuSeparator />
						<div className="px-2 py-1.5 flex items-center gap-2.5">
							{user.avatarUrl ? (
								<img
									src={user.avatarUrl}
									alt=""
									className="size-7 rounded-md object-cover"
								/>
							) : (
								<span className="size-7 rounded-md bg-accent/20 text-accent flex items-center justify-center text-xs font-semibold">
									{initial}
								</span>
							)}
							<div className="flex flex-col min-w-0">
								<span className="text-sm text-text-primary truncate">{accountName}</span>
								<span className="text-[11px] text-text-50/50 truncate">{user.email}</span>
							</div>
						</div>
						{creditsLabel && (
							<div className="px-2 pb-1.5 text-[11px] text-text-50/60">{creditsLabel}</div>
						)}
					</>
				)}

				<DropdownMenuSeparator />

				<DropdownMenuItem onClick={() => navigate('/settings')}>
					<Settings className="size-4 mr-2" />
					Settings
				</DropdownMenuItem>

				{onDeploy && (
					<DropdownMenuItem onClick={onDeploy} disabled={isDeploying}>
						<Rocket className="size-4 mr-2" />
						{isDeploying ? 'Deploying…' : deploymentUrl ? 'Redeploy' : 'Deploy to Cloudflare'}
					</DropdownMenuItem>
				)}

				{onGitHubExport && (
					<DropdownMenuItem onClick={onGitHubExport}>
						<GithubIcon className="size-4 mr-2" />
						Export to GitHub
					</DropdownMenuItem>
				)}

				{onResetConversation && (
					<DropdownMenuItem
						variant="destructive"
						disabled={!canReset}
						onClick={onResetConversation}
					>
						<RotateCcw className="size-4 mr-2" />
						Reset conversation
					</DropdownMenuItem>
				)}

				<DropdownMenuSeparator />

				<DropdownMenuSub>
					<DropdownMenuSubTrigger>
						<Monitor className="size-4 mr-2" />
						Appearance
					</DropdownMenuSubTrigger>
					<DropdownMenuSubContent>
						<DropdownMenuItem onClick={() => setTheme('light')}>
							<Sun className="size-4 mr-2" />
							Light
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setTheme('dark')}>
							<Moon className="size-4 mr-2" />
							Dark
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setTheme('system')}>
							<Monitor className="size-4 mr-2" />
							System
						</DropdownMenuItem>
					</DropdownMenuSubContent>
				</DropdownMenuSub>

				<DropdownMenuItem
					onClick={() => window.open('https://developers.cloudflare.com/', '_blank', 'noopener')}
				>
					<HelpCircle className="size-4 mr-2" />
					Help
					<ExternalLink className="size-3 ml-auto opacity-50" />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
