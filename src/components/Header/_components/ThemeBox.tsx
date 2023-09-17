'use client';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from 'next-themes';
import { BiSun, BiMoon } from 'react-icons/bi';

const ThemeBox: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [themeBox, setThemeBox] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-[30px] bg-gray-200 rounded-full dark:bg-gray-700 w-[68px] "></div>;
  }

  return (
    <div
      className={`Header__item relative group px-2 py-1 transition-all rounded-md cursor-pointer min-w-[68px] max-w-[68px]`}
      onClick={() => setThemeBox(!themeBox)}
    >
      <div className="dark:hidden  Header__item__icon flex justify-center items-center group hover:bg-black dark:hover:bg-white text-black hover:text-white dark:text-while  dark:hover:text-black px-4 py-2 rounded-md cursor-pointer transition-all">
        <BiSun className="" />
      </div>

      <div className="dark:flex hidden  Header__item__icon group   justify-center items-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black px-4 py-2 transition-all rounded-md cursor-pointer">
        <BiMoon className=" transition-all" />
      </div>

      {themeBox && (
        <div className="Header__theme absolute z-400 top-[100%] bg-white p-1 z-900 rounded-md shadow border border-gray-200 max-sm:w-100px">
          <div
            className="Header__theme__item group rounded-md px-1 py-2 text-black flex items-center hover:bg-black hover:text-white transition-all "
            onClick={() => setTheme('light')}
          >
            <BiSun />
            <span className="block px-2">light</span>
          </div>
          <div
            className="Header__theme__item group rounded-md px-1 py-2 text-black flex items-center hover:bg-black hover:text-white transition-all"
            onClick={() => setTheme('dark')}
          >
            <BiMoon />
            <span className="block px-2">night</span>
          </div>
        </div>
      )}
    </div>
  );
};

ThemeBox.propTypes = {};

export default ThemeBox;
