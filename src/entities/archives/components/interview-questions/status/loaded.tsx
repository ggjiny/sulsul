import { HTMLAttributes } from 'react';

import { ArchiveQuestionItem } from '@/entities/types';
import { cn } from '@/lib/utils';

import { QuestionCard } from '../../question-card';
interface LoadedInterviewQuestionProps extends HTMLAttributes<HTMLDivElement> {
  data: ArchiveQuestionItem[];
  archiveId: number;
  clickedQuestions: number[];
  setClickedQuestions: React.Dispatch<React.SetStateAction<number[]>>;
}

export const LoadedStatus = ({
  className,
  data,
  archiveId,
  clickedQuestions,
  setClickedQuestions,
  ...props
}: LoadedInterviewQuestionProps) => {
  return (
    <div className={cn('h-full', className)} {...props}>
      <div className="flex size-full flex-col gap-3">
        {data.map((question, i) => (
          <QuestionCard
            key={i}
            data={question}
            archiveId={archiveId}
            isClicked={clickedQuestions.includes(question.questionId)}
            setClickedQuestions={setClickedQuestions}
          />
        ))}
      </div>
    </div>
  );
};