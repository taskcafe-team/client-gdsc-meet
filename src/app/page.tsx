'use client';
import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import 'moment-timezone';
import Link from 'next/link';
import { BiMessageAltError, BiQuestionMark } from 'react-icons/bi';
import { IoMdPerson, IoMdSettings } from 'react-icons/io';
import ThemeButton from '@/components/ThemeButton/ThemeButton';
import { useTheme } from 'next-themes';
import { useSpring, animated } from '@react-spring/web';
import StartMeeting from '@/components/Button/Meeting-Btn';
import { Connect } from '@/components/Button/Connect-Btn';
import { DefaultLoading } from '@/components/Loading';
import Header from '@/components/Header';
import HomeLayout from '@/container/HomeLayout';
import Bg from '@/assets/images/bg.png';
import Bgtop from '@/assets/images/bg-top.png';
import BgBottom from '@/assets/images/Bg-bottom.png';
import BgDarktop from '@/assets/images/bgDark-top.png';
import BgDarkBottom from '@/assets/images/bgDark-bottom.png';
import { Console } from 'console';
import Image from 'next/image';
import { useAppSelector } from '@/hooks/redux.hook';
import { authDetail } from '@/redux/auth';
import { userDetail } from '@/redux/users';
export default function Home() {
  const [currentTime, setCurrentTime] = useState(moment());

  const { theme } = useTheme();
  const refContent = useRef<HTMLDivElement | null>(null);

  // animation loading
  if (!theme) {
    return <DefaultLoading />;
  }
  // animation start
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
  const isLogin = useAppSelector(authDetail);
  const UDetail = useAppSelector(userDetail);
  console.log(isLogin,UDetail);
  return (
    <div
      className={`Home  h-[100vh]  w-full bg-primary relative overflow-hidden   ${
        theme == 'light' ? 'max-lg:bg-white' : 'max-lg:bg-black'
      }`}
    >
      <Image
        src={Bg}
        alt="backgroud"
        className="max-lg:hidden h-[100vh] object-center opacity-30 position-absolute z-1 max-lg:object-cover"
      ></Image>
      <Image
        src={theme == 'light' ? Bgtop : BgDarktop}
        alt="backgroud"
        className="max-lg:hidden h-[100vh] w-[80%] max-lg:w-[120%] max-lg:object-right object-center  absolute top-[-25px] left-[-25px] z-2"
      ></Image>

      <Image
        src={theme == 'light' ? BgBottom : BgDarkBottom}
        alt="backgroud"
        className="max-lg:hidden h-[100vh] w-[40%] object-fill  absolute bottom-[-40px] right-[-50px] z-2"
      ></Image>

      <div
        ref={refContent}
        className="opacity-0 transition-opacity contianer absolute z-100 top-0 left-0  w-[60%] max-lg:w-full"
      >
        {/* <Header/> */}
        <Header 
        />
        <main className="py-[16px] px-[53px]  max-sm:py-[20px] max-sm:px-[20px]">
          <h1
            className="
               max-w-[570px] text-7xl my-[20px] max-md:max-w-none text-start leading-tight py-2 max-sm:text-6xl"
          >
            Meetings and video calling for everyone.
          </h1>
          <p className="max-w-[570px] text-gray-700 text-[20px] font-normal dark:text-white">
            DTU meet is a service that provides secure, high-quality video calling and meeting
            features for everyone, on any device.
          </p>
          <div className="Home__function flex items-center gap-2 my-8 max-sm:flex-col max-sm:items-center max-sm:justify-center">
            <StartMeeting />
            <p className="">or</p>
            <Connect />
          </div>
          <hr className="w-[70%] bg-[#C8C8C8]  my-[30px] max-sm:w-full " />

          <Link href={'/'} className="text-gray-500 text-[20px] font-normal">
            <span className="text-primary mr-2">Learn more</span>
            about DTU Meet
          </Link>
        </main>
      </div>
    </div>
  );
}
