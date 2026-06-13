import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { LoaderCircle, Sparkles, ArrowRight } from 'lucide-react';
import type { BlueprintType } from '@/api-types';
import { Button } from '@/components/ui/button';
import { ViewContainer } from './view-container';
import { HEADER_STYLES } from './view-header-styles';
import { Blueprint } from './blueprint';
import { PlanQuestions, type PlanAnswers } from './plan-questions';

interface PlanPanelProps {
	blueprint?: BlueprintType | null;
	isGeneratingBlueprint: boolean;
	onSubmit: (answers: PlanAnswers) => void;
}

export function PlanPanel({ blueprint, isGeneratingBlueprint, onSubmit }: PlanPanelProps) {
	const [answers, setAnswers] = useState<PlanAnswers>({});

	const questions = useMemo(() => blueprint?.clarifyingQuestions ?? [], [blueprint]);
	const hasBlueprint = !!blueprint && !!blueprint.title;
	const isReady = hasBlueprint && !isGeneratingBlueprint;

	const handleChange = (id: string, value: string | string[]) => {
		setAnswers((prev) => ({ ...prev, [id]: value }));
	};

	return (
		<ViewContainer>
			<div className={`grid grid-cols-3 ${HEADER_STYLES.padding} ${HEADER_STYLES.container}`}>
				<div className="flex items-center gap-1.5 text-text-50/70">
					<Sparkles className="size-3.5 text-accent" />
					<span className={HEADER_STYLES.textBase}>Plan</span>
				</div>
				<div />
				<div className="flex items-center justify-end">
					{isGeneratingBlueprint && (
						<span className="flex items-center gap-1.5 text-xs text-text-50/60">
							<LoaderCircle className="size-3.5 animate-spin" />
							Planning…
						</span>
					)}
				</div>
			</div>

			<div className="flex-1 overflow-y-auto bg-bg-3">
				<div className="mx-auto w-full max-w-2xl px-5 py-8 flex flex-col gap-6">
					{hasBlueprint ? (
						<Blueprint blueprint={blueprint!} className="w-full" />
					) : (
						<div className="flex items-center gap-2 text-text-50/60 text-sm py-10 justify-center">
							<LoaderCircle className="size-4 animate-spin" />
							Drafting your plan…
						</div>
					)}

					{questions.length > 0 && (
						<motion.div
							initial={{ opacity: 0, y: 8 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.25 }}
							className="rounded-xl border border-border-primary bg-bg-2 p-5 flex flex-col gap-5"
						>
							<div className="flex flex-col gap-1">
								<h3 className="text-sm font-medium text-text-primary">
									A few questions before we build
								</h3>
								<p className="text-xs text-text-50/60">
									Your answers shape the build. Skip any you don't care about.
								</p>
							</div>
							<PlanQuestions
								questions={questions}
								answers={answers}
								onChange={handleChange}
								disabled={!isReady}
							/>
						</motion.div>
					)}
				</div>
			</div>

			<div className="border-t border-border-primary bg-bg-2 px-5 py-3 flex items-center justify-between gap-3">
				<span className="text-xs text-text-50/50">
					{questions.length > 0
						? 'Review the plan and answer the questions, then start building.'
						: 'Review the plan, then start building.'}
				</span>
				<Button
					onClick={() => onSubmit(answers)}
					disabled={!isReady}
					className="shrink-0 gap-1.5"
				>
					Start building
					<ArrowRight className="size-4" />
				</Button>
			</div>
		</ViewContainer>
	);
}
