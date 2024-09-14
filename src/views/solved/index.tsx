import Image from 'next/image';

import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { BestCommentsSection } from '@/entities/solved/components/best-comments-section';
import { MyActivitySection } from '@/entities/solved/components/my-activity-section';
import { TogetherSolvedSection } from '@/entities/solved/components/together-solved-section';
import { WeekRankingSection } from '@/entities/solved/components/week-ranking-section';

export const Solved = async () => {
  const authInfo = await auth();
  const userId = authInfo?.user.auth.userId || 0;
  const accessToken = authInfo?.user.auth.accessToken || '';

  return (
    <main className="flex w-full gap-6">
      <div className="hidden lg:flex lg:w-[282px] lg:flex-col lg:gap-[30px]">
        <MyActivitySection userId={Number(userId)} accessToken={accessToken} />
        <WeekRankingSection />
        <Image
          src="/images/gift-banner.svg"
          width={282}
          height={147}
          alt="banner"
        />
      </div>
      <TogetherSolvedSection />
      <BestCommentsSection />
    </main>
  );
};
