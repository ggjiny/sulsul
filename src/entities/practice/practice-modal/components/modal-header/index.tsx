'use client';

import Image from 'next/image';

export default function ModalHeader() {
  return (
    <div className="mb-[22px] ml-8 mt-[30px] flex h-8 flex-row text-4xl font-semibold text-gray-900">
      어떤 면접질문을 연습할까요?
      <Image
        className="ml-1"
        src="/images/icons/face-laugh.svg"
        alt="face-laugh-icon"
        width={32}
        height={32}
      />
    </div>
  );
}
