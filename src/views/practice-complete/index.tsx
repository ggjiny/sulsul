'use client';
import { HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';
interface PracticeCompleteProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * https://www.figma.com/design/300FZcKnRKJSVsVLdTxQeN/%F0%9F%92%AC-Sulsul_team?m=dev&node-id=4382-15805&t=OZrGkP4ZgEF84mEl-1
 */
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

import { ResultCard } from '@/components/cards/result-card';
import { ConfettiAnimation } from '@/components/lotties/confetti-animation';
import { SmileAnimation } from '@/components/lotties/smile-animation';
import { ThinkingAnimation } from '@/components/lotties/thinking-animation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  usePracticeResultStore,
  usePracticeStore,
} from '@/store/practiceStore';

export const PracticeComplete = ({
  className,
  ...props
}: PracticeCompleteProps) => {
  const { time, correct, incorrect } = usePracticeResultStore();
  const { timer, setStore, practiceId } = usePracticeStore();

  const totalCorrect = correct.length;
  const totalIncorrect = incorrect.length;
  const totalScore = totalCorrect / (totalCorrect + totalIncorrect);
  const router = useRouter();

  const handlePracticeAll = () => {
    router.push('/practice/ing');
  };
  const handlePracticeIncorrect = () => {
    setStore({
      timer: timer,
      practiceList: incorrect,
      practiceId: practiceId,
    }),
      router.push('/practice/ing');
  };

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formatNumber = (num: number) => String(num).padStart(2, '0');

    return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`;
  };

  const timeText = formatTime(time);

  return (
    <main
      className={cn(
        className,
        'absolute top-[60px] left-0 w-screen justify-items-center mobile:top-14',
      )}
      {...props}
    >
      <div className="absolute h-[497px] w-screen bg-blue-500 mobile:h-[360px]" />
      {totalScore >= 0.8 && (
        <ConfettiAnimation
          loop={1}
          className="absolute left-1/2 -translate-x-1/2"
        />
      )}
      <div className="relative">
        <div className="flex flex-col items-center justify-center">
          <Badge variant="result" className="mt-[42px] mobile:mt-2">
            {totalScore >= 0.8 ? '답변이 술술' : '천 리 길도 한 걸음부터죠'}
          </Badge>
          <h2 className="mt-3 text-center text-5xl font-bold text-white">
            {totalScore >= 0.8
              ? '이번 면접, 거뜬해요!'
              : '연습이 조금 더 필요해요'}
          </h2>
          <Image
            className="mt-[37px] mobile:hidden"
            src={
              totalScore >= 0.8
                ? '/images/character-happy.svg'
                : '/images/character-shocked.svg'
            }
            alt="happy character"
            width={164}
            height={164}
          />
          <Image
            className="mt-[13px] desktop:hidden"
            src={
              totalScore >= 0.8
                ? '/images/character-happy.svg'
                : '/images/character-shocked.svg'
            }
            alt="happy character"
            width={150}
            height={150}
          />
          <div className="mt-[47px] flex w-full items-center justify-center gap-4 mobile:mt-[6px] mobile:flex-col mobile:px-4">
            <ResultCard
              title="술술 말한 면접질문"
              result={totalCorrect}
              icon={<SmileAnimation loop={false} className="w-8" />}
            />
            <ResultCard
              title="답변 못한 면접 질문"
              result={totalIncorrect}
              icon={<ThinkingAnimation loop={false} className="w-8" />}
            />
            <ResultCard
              title="총 연습시간"
              result={timeText}
              icon={
                <Image
                  alt="clock icon"
                  width={32}
                  height={32}
                  src={'/images/icons/etc-clock.svg'}
                />
              }
            />
          </div>
          <div className="mt-14 flex items-center justify-center mobile:mt-6">
            <div className="flex w-full items-center justify-center gap-2 desktop:w-[652px] ">
              <Button
                className={cn(
                  'mobile:w-[168px] mobile:py-[11.5px]',
                  incorrect.length !== 0 ? 'w-full' : 'w-[300px] py-[13px]',
                )}
                onClick={handlePracticeAll}
              >
                전체 다시하기
              </Button>
              {incorrect.length !== 0 && (
                <Button
                  className="w-full mobile:w-[168px] mobile:py-[11.5px]"
                  onClick={handlePracticeIncorrect}
                >
                  답변 못한 질문만 다시
                  <span className="mobile:hidden">하기</span>
                </Button>
              )}
            </div>
          </div>
          <Link
            href={'/practice'}
            className="mt-9 flex items-center gap-1 text-lg font-semibold mobile:mt-5"
          >
            <span className="text-gray-600 mobile:text-base">
              실전 연습 홈으로
            </span>
            <ChevronRight className="text-gray-500" />
          </Link>
        </div>
      </div>
    </main>
  );
};
