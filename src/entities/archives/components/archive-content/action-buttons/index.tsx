'use client';

import { HTMLAttributes } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { APP_ROUTES } from '@/config/constants/app-routes';
import { ArchiveFeedbackStatus } from '@/entities/types';
import { cn } from '@/lib/utils';
interface ActionButtonsProps extends HTMLAttributes<HTMLDivElement> {
  status: ArchiveFeedbackStatus;
}

export const ActionButtons = ({
  className,
  status,
  ...props
}: ActionButtonsProps) => {
  const router = useRouter();
  const handleNew = () => {
    router.push(APP_ROUTES.createArchive());
  };

  return (
    <div className={cn('flex items-center gap-2', className)} {...props}>
      <Button
        onClick={handleNew}
        className="gap-2 px-8 text-gray-600"
        variant="outline"
      >
        <Image
          src="/images/icons/icon-redo.svg"
          width={24}
          height={24}
          alt="icon"
        />
        초기화
      </Button>
      {status === 'COMPLETE' && (
        <Button
          type="button"
          className={cn(
            'bg-blue-100 gap-2 text-blue-500 hover:bg-blue-100 cursor-default w-full border-0',
          )}
          variant="outline"
        >
          <Image
            src="/images/icons/icon-check.svg"
            width={24}
            height={24}
            alt="icon"
          />
          <span>예상질문 생성 완료</span>
        </Button>
      )}
    </div>
  );
};