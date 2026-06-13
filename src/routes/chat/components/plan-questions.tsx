import type { ClarifyingQuestion } from '@/api-types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

export type PlanAnswers = Record<string, string | string[]>;

interface PlanQuestionsProps {
	questions: ClarifyingQuestion[];
	answers: PlanAnswers;
	onChange: (id: string, value: string | string[]) => void;
	disabled?: boolean;
}

export function PlanQuestions({ questions, answers, onChange, disabled }: PlanQuestionsProps) {
	return (
		<div className="flex flex-col gap-6">
			{questions.map((q, index) => (
				<div key={q.id} className="flex flex-col gap-2">
					<Label className="text-sm font-medium text-text-primary leading-snug">
						<span className="text-text-50/50 mr-1.5 tabular-nums">{index + 1}.</span>
						{q.question}
					</Label>
					<QuestionField
						question={q}
						value={answers[q.id]}
						onChange={(value) => onChange(q.id, value)}
						disabled={disabled}
					/>
				</div>
			))}
		</div>
	);
}

function QuestionField({
	question,
	value,
	onChange,
	disabled,
}: {
	question: ClarifyingQuestion;
	value: string | string[] | undefined;
	onChange: (value: string | string[]) => void;
	disabled?: boolean;
}) {
	switch (question.type) {
		case 'textarea':
			return (
				<Textarea
					value={(value as string) ?? ''}
					placeholder={question.placeholder}
					disabled={disabled}
					rows={3}
					onChange={(e) => onChange(e.target.value)}
					className="resize-none bg-bg-2"
				/>
			);

		case 'select':
			return (
				<Select
					value={(value as string) ?? ''}
					onValueChange={onChange}
					disabled={disabled}
				>
					<SelectTrigger className="bg-bg-2 w-full">
						<SelectValue placeholder={question.placeholder ?? 'Select an option'} />
					</SelectTrigger>
					<SelectContent>
						{(question.options ?? []).map((option) => (
							<SelectItem key={option} value={option}>
								{option}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			);

		case 'multiselect': {
			const selected = Array.isArray(value) ? value : [];
			const toggle = (option: string, checked: boolean) => {
				onChange(
					checked
						? [...selected, option]
						: selected.filter((o) => o !== option),
				);
			};
			return (
				<div className="flex flex-col gap-2">
					{(question.options ?? []).map((option) => {
						const id = `${question.id}-${option}`;
						return (
							<label
								key={option}
								htmlFor={id}
								className="flex items-center gap-2.5 text-sm text-text-50 cursor-pointer select-none"
							>
								<Checkbox
									id={id}
									checked={selected.includes(option)}
									disabled={disabled}
									onCheckedChange={(checked) => toggle(option, checked === true)}
								/>
								{option}
							</label>
						);
					})}
				</div>
			);
		}

		case 'text':
		default:
			return (
				<Input
					value={(value as string) ?? ''}
					placeholder={question.placeholder}
					disabled={disabled}
					onChange={(e) => onChange(e.target.value)}
					className="bg-bg-2"
				/>
			);
	}
}
