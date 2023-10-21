'use client';
import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import logo from '@/assets/images/logo.png';
import Image from 'next/image';
import { BiQuestionMark, BiMessageAltError, BiAlignRight, BiChevronLeft } from 'react-icons/bi';

import { IoMdPerson, IoMdSettings } from 'react-icons/io';
import ThemeButton from '../ThemeButton/ThemeButton';
import { useTheme } from 'next-themes';
import CurrentTime from './_components/CurrentTime';
import { useAppSelector } from '@/hooks/redux.hook';
import { authDetail, authLoading } from '@/redux/auth';
import { userDetail } from '@/redux/users';
import Avatar from '@/assets/images/bg-t1.png';

function Header({ type, className, ...rest }: { type?: string; className?: string }) {
  const [triggerToggle, setTriggerTogger] = useState(false);
  const { theme } = useTheme();
  const isLoading = useAppSelector(authLoading);
  const isLogin = useAppSelector(authDetail);
  const UDetail = useAppSelector(userDetail);
  console.log('s');

  return (
    <header
      className={`px-[53px] py-[16px] flex  items-center justify-between ${className} max-sm:py-[10px] max-sm:px-[10px]`}
      {...rest}
    >
      <Link href={'/'} className="flex items-center">
        <Image
          src={logo}
          alt="DTUMeet"
          className="w-[75px] h-[75px] object-cover max-lg:w-[45px] max-lg:h-[45px]"
        />
        <h1 className="text-cltext  opacity-100 text-[45px] max-lg:text-[25px] font-bold">
          GDSC Meet
        </h1>
      </Link>
      <nav className="flex  items-center gap-6 max-lg:hidden">
        <CurrentTime />
        <div className="text-gray-700 font-roboto text-4xl font-normal dark:text-white transition">
          <Link href={'/Question'}>
            <BiQuestionMark />
          </Link>
        </div>
        <div className="text-gray-700 font-roboto text-4xl font-normal dark:text-white transition">
          <Link href={'/Error'}>
            <BiMessageAltError />
          </Link>
        </div>
        <div className="text-gray-700 font-roboto text-4xl font-normal dark:text-white transition">
          <Link href={'/Error'}>
            <IoMdSettings />
          </Link>
        </div>

        <div className="text-gray-700 font-roboto text-4xl font-normal dark:text-white transition">
          {isLogin ? (
            <Link href={'/profile'}>
              <Image
                className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                src={UDetail?.avatar ? UDetail?.avatar : Avatar}
                alt="Bordered avatar"
              />
            </Link>
          ) : (
            <Link href={'/signIn'}>
              <IoMdPerson />
            </Link>
          )}
        </div>
        <div className="text-gray-700 font-roboto text-4xl font-normal ">
          <ThemeButton></ThemeButton>
        </div>
      </nav>
      <div
        className="text-cltext hidden max-lg:block"
        onClick={(e) => {
          setTriggerTogger(!triggerToggle);
        }}
      >
        <BiAlignRight className="text-4xl" />
      </div>

      <div
        onClick={(e) => {
          setTriggerTogger(!triggerToggle);
        }}
        className={`bg-black w-full opacity-90 fixed left-0 right-0 top-0 bottom-0 z-[100] transition-opacity ${
          triggerToggle == true ? 'opacity-1 block' : 'opacity-0 hidden'
        }`}
      ></div>
      <nav
        className={`w-[200px] h-[100vh]  z-[101]
          fixed  right-0 top-0 bottom-0 z-100
        rounded-md
        flex flex-col 
        p-10
        gap-5  
        transition-transform
        ${theme == 'light' ? 'bg-white' : 'bg-black'}
        ${triggerToggle == true ? 'translate-x-[0%]' : 'translate-x-[120%]'}
        `}
        onClick={(e) => {
          setTriggerTogger(!triggerToggle);
        }}
      >
        <Link href={'/'} className="flex items-center">
          <div className="flex items-center">
            <div
              onClick={(e) => {
                setTriggerTogger(!triggerToggle);
              }}
              className="text-gray-700  text-6xl    flex items-center justify-center"
            >
              <BiChevronLeft className="  " />
            </div>
            <h1 className="text-cltext text-8xl opacity-100 text-[30px] max-lg:text-[15px] font-bold">
              DTU Meet
            </h1>
          </div>
        </Link>
        <div className="text-gray-700 font-roboto text-[15px]  dark:text-white transition font-bold ">
          <Link href={'/Question'} className="flex gap-3 items-center ">
            <BiQuestionMark />
            <p>Question</p>
          </Link>
        </div>
        <div className="text-gray-700 font-roboto text-[15px] dark:text-white transition font-bold">
          <Link href={'/Error'} className="flex gap-3 items-center">
            <BiMessageAltError />
            <p>Help</p>
          </Link>
        </div>
        <div className="text-gray-700 font-roboto text-[15px]  dark:text-white transition font-bold">
          <Link href={'/Error'} className="flex gap-3 items-center">
            <IoMdSettings />
            <p>setting</p>
          </Link>
        </div>
        <div className="text-gray-700 font-roboto text-[15px]  dark:text-white transition font-bold">
          <Link href={'/signIn'} className="flex gap-3 items-center">
            <IoMdPerson />
            <p>Sign In</p>
          </Link>
        </div>

        <div className="text-gray-700 font-roboto text-4xl font-normal ">
          <ThemeButton></ThemeButton>
        </div>
      </nav>
    </header>
  );
}

Header.propTypes = {};

export default Header;
