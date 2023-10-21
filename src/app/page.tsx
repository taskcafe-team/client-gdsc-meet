'use client';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { DefaultLoading } from '@/components/Loading';
import Header from '@/components/Header';
import StartMeeting from '@/components/Button/Meeting-Btn';
import Connect from '@/components/Button/Connect-Btn';

import Bg from '@/assets/images/bg.png';
import Bgtop from '@/assets/images/HomeLightTl1.svg';
import BgBottom from '@/assets/images/HomeLightBr.svg';
import BgDarktop from '@/assets/images/HomeDarkTl1.svg';
import BgDarkBottom from '@/assets/images/bgDark-bottom.png';
import BGMobile from '@/assets/images/HomeMobile1.svg';
import { refreshToken } from '@/configs/axiosClient';
export default function Home() {
  const { theme } = useTheme();
  const refContent = useRef<HTMLDivElement | null>(null);

  // Animation loading
  if (!theme) {
    return <DefaultLoading />;
  }

  // Animation start
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (refContent.current) {
        refContent.current.classList.remove('opacity-0');
        refContent.current.classList.add('opacity-100');
      }
    }, 200);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div
      className={`Home h-[100vh] w-full bg-primary backdrop-blur-30 relative overflow-hidden max-lg:overflow-auto  max-lg:bg-none ${
        theme === 'light' ? 'max-lg: bg-while' : 'max-lg:bg-black'
      }`}
    >
      <Image
        src={Bg}
        alt="background"
        className="max-lg:hidden h-[100vh] object-center opacity-30 absolute left-0 top-0 z-1 max-lg:object-cover"
      ></Image>

      <Image
        src={theme === 'light' ? Bgtop : BgDarktop}
        alt="background"
        className="max-lg:hidden h-[100vh]  max-lg:w-[120%] max-lg:object-right object-center absolute left-[-17%] top-[-3%] z-2"
      ></Image>

      <Image
        src={theme === 'light' ? BgBottom : BgDarkBottom}
        alt="background"
        className="max-lg:hidden h-[100vh] w-[40%] object-center absolute bottom-[-6%] right-[-4%] z-2"
      ></Image>

      <div
        ref={refContent}
        className="opacity-0 transition-opacity contianer absolute z-100 top-0 left-0 w-[60%] max-lg:w-full"
      >
        <Header />
        <div className="py-[16px] px-[53px] max-sm:py-[20px] max-sm:px-[20px] max-lg:flex max-lg:justify-center max-lg:items-center max-lg:flex-col">
          <Image src={BGMobile} alt="GDSC mobile" className="h-[30vh] hidden max-lg:block"></Image>
          <h1 className="max-w-[570px] text-7xl my-[20px] max-md:max-w-none text-start leading-tight py-2 max-sm:text-[25px]">
            Meetings and video calling for everyone.
          </h1>
          <p className="max-w-[570px] text-gray-700 text-[20px] font-normal dark:text-white max-sm:text-[18px]">
            DTU meet is a service that provides secure, high-quality video calling and meeting
            features for everyone, on any device.
          </p>
          <div className="Home__function flex items-center gap-2 my-8 max-sm:w-full max-sm:flex-col max-sm:items-center max-sm:justify-center">
            <StartMeeting />
            <p>or</p>
            <Connect />
          </div>
          <hr className="w-[70%] bg-[#C8C8C8] my-[30px] max-sm:w-full" />

          <Link href={'/'} className="text-gray-500 text-[20px] font-normal max-sm:text-[18px]">
            <span className="text-primary mr-2">Learn more</span>
            about DTU Meet
          </Link>
        </div>
      </div>
    </div>
  );
}
