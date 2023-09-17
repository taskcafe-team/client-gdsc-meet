'use client';
import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import logo from '@/assets/images/logo.png';
import Image from 'next/image';
import {
  BiUser,
  BiSun,
  BiCog,
  BiRepost,
  BiQuestionMark,
  BiMoon,
  BiMenuAltRight,
  BiX,
  BiMessageAltError,
} from 'react-icons/bi';
import ThemeBox from './_components/ThemeBox';
import UserBox from './_components/UserBox';
import { MobileHeader } from './_components/MobileHeader';
import moment from 'moment';
import { IoMdPerson, IoMdSettings } from 'react-icons/io';
import ThemeButton from '../ThemeButton/ThemeButton';

function Header({ type, className }: { type?: string; className?: string }) {
  const [currentTime, setCurrentTime] = useState(moment());
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className={`px-[53px] py-[16px] flex  items-center justify-between ${className}`}>
      <Link href={'/'} className="flex items-center">
        <Image src={logo} alt="DTUMeet logo" className="w-[75px] h-[75px] object-cover"></Image>
        <h1 className="text-cltext  opacity-100 text-[30px] font-bold">DTU Meet</h1>
      </Link>
      <nav className="flex  items-center gap-6">
        <div className="text-gray-700 font-roboto text-4xl font-normal dark:text-white transition">
          {currentTime.format('HH:mm ddd, DD MMM')}
        </div>
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
          <Link href={'/signIn'}>
            <IoMdPerson />
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
