import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from 'next-themes';
import { BiSun, BiMoon } from 'react-icons/bi';
//  import bgLight from '@assets/images/icons/LightbgButton.svg';
//  import bgDark from '@assets/images/icons/DarkbgButton.svg';

const ThemeButton: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);
  console.log(theme);
  
  const handleModel = async () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <div
      className={`cursor-pointer relative Header__item relative group px-2 py-1 transition-all rounded-md cursor-pointer min-w-[68px] max-w-[68px]`}
      onClick={() => handleModel()}
    >
      {/* <div className="dark:hidden Header__item__icon flex justify-center items-center group text-black hover:text-white dark:text-while dark:hover:text-black rounded-md cursor-pointer transition-all">
        <img src={bgLight as unknown as string} alt="light" />
      </div>

      <div className="dark:flex hidden Header__item__icon group justify-center items-center transition-all rounded-md cursor-pointer">
        <img src={bgDark as unknown as string} alt="dark" />
      </div> */}

      <div
        className={`transition-all h-9 w-9 absolute top-[5px] rounded-full ${
          theme === 'light' ? 'left-[10px] bg-white z-10' : 'translate-x-[30px] bg-black z-10'
        }`}
      ></div>
    </div>
  );
};

ThemeButton.propTypes = {};

export default ThemeButton;
