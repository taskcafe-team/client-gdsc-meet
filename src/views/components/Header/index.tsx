import React, { useState } from "react";
import {
  BiQuestionMark,
  BiMessageAltError,
  BiAlignRight,
  BiChevronLeft,
} from "react-icons/bi";
import { IoMdPerson, IoMdSettings } from "react-icons/io";
import Logo from "@assets/images/icons/meet.svg";
import CurrentTime from "./_components/CurrentTime";
import ThemeButton from "@views/components/ThemeButton"; // Assuming ThemeButton is a separate component.

import { useSelector } from "react-redux"; // Import the appropriate Redux hook for your setup.
// Assuming you have a Redux store configuration.

// import Avatar from '@assets/images/bg-t1.png';
import { authDetail, authLoading } from "@src/contexts/auth/authSelector";
import { Link } from "react-router-dom";

interface HeaderProps {
  type?: string;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ type, className, ...rest }) => {
  const [triggerToggle, setTriggerToggle] = useState(false);
  const theme = "light"; // Replace this with your theme logic.

  // Replace the following Redux selectors with your actual selectors from Redux.
  const isLogin = useSelector(authLoading);
  const UDetail = useSelector(authDetail);

  return (
    <header
      className={`px-[53px] py-[16px] flex  items-center justify-between ${className} max-sm:py-[10px] max-sm:px-[10px]`}
      {...rest}
    >
      <a href="/">
        <div className="flex items-center gap-2">
          <img
            src={Logo as unknown as string}
            alt="DTUMeet"
            className="w-[75px] h-[75px] object-fill max-lg:w-[45px] max-lg:h-[45px]"
          />
          <h1 className="dark:text-orange text-cltext opacity-100 text-[45px] max-lg:text-[25px] font-bold">
            GDSC Meet
          </h1>
        </div>
      </a>
      <nav className="flex items-center gap-6 max-lg:hidden">
        <CurrentTime />
        <div className="text-gray-700 font-roboto text-4xl font-normal dark:text-white transition">
          <a href="/Question">
            <BiQuestionMark />
          </a>
        </div>
        <div className="text-gray-700 font-roboto text-4xl font-normal dark:text-white transition">
          <a href="/Error">
            <BiMessageAltError />
          </a>
        </div>
        <div className="text-gray-700 font-roboto text-4xl font-normal dark:text-white transition">
          <a href="/Error">
            <IoMdSettings />
          </a>
        </div>

        <div className="text-gray-700 font-roboto text-4xl font-normal dark:text-white transition">
          {isLogin ? (
            <a href="/profile">
              {/* <img className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src={UDetail?.avatar ? UDetail?.avatar : Avatar} alt="Bordered avatar" /> */}
            </a>
          ) : (
            <a href="/signIn">
              <IoMdPerson />
            </a>
          )}
        </div>
        <div className="text-gray-700 font-roboto text-4xl font-normal">
          <ThemeButton />
        </div>
      </nav>
      <div
        className="text-cltext hidden max-lg:block"
        onClick={() => setTriggerToggle(!triggerToggle)}
      >
        <BiAlignRight className="text-4xl" />
      </div>
      <div
        onClick={() => setTriggerToggle(!triggerToggle)}
        className={`bg-black w-full opacity-90 fixed left-0 right-0 top-0 bottom-0 z-[100] transition-opacity ${
          triggerToggle === true ? "opacity-1 block" : "opacity-0 hidden"
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
        ${theme === "light" ? "bg-white" : "bg-black"}
        ${triggerToggle === true ? "translate-x-[0%]" : "translate-x-[120%]"}
        `}
        onClick={() => setTriggerToggle(!triggerToggle)}
      >
        <Link to="/">
          <div className="flex items-center">
            <div
              className="text-gray-700 text-6xl flex items-center justify-center"
              onClick={() => setTriggerToggle(!triggerToggle)}
            >
              <BiChevronLeft className="" />
            </div>
            <h1 className="text-cltext text-8xl opacity-100 text-[30px] max-lg:text-[15px] font-bold">
              DTU Meet
            </h1>
          </div>
        </Link>
        <div className="text-gray-700 font-roboto text-[15px] dark:text-white transition font-bold">
          <Link to="/Question" className="flex gap-3 items-center">
            <BiQuestionMark />
            <p>Question</p>
          </Link>
        </div>
        <div className="text-gray-700 font-roboto text-[15px] dark:text-white transition font-bold">
          <Link to="/Error" className="flex gap-3 items-center">
            <BiMessageAltError />
            <p>Help</p>
          </Link>
        </div>
        <div className="text-gray-700 font-roboto text-[15px] dark:text-white transition font-bold">
          <Link to="/Error" className="flex gap-3 items-center">
            <IoMdSettings />
            <p>setting</p>
          </Link>
        </div>
        <div className="text-gray-700 font-roboto text-[15px] dark-text-white transition font-bold"></div>
        <Link to="/signIn" className="flex gap-3 items-center">
          <IoMdPerson />
          <p>Sign In</p>
        </Link>
        <div className="text-gray-700 font-roboto text-4xl font-normal">
          <ThemeButton />
        </div>
      </nav>
    </header>
  );
};

Header.propTypes = {}; // Remove PropTypes as they are not used in a TypeScript component.

export default Header;
