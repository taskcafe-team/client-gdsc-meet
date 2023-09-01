import React from 'react';
import Image from 'next/image';
import Bg from '@/assets/images/bg.png';
import Bgtop from '@/assets/images/bg-top.png';
import BgBottom from '@/assets/images/Bg-bottom.png';
import BgDarktop from '@/assets/images/bgDark-top.png';
import BgDarkBottom from '@/assets/images/bgDark-bottom.png';
import logo from '@/assets/images/logo.png';
function HomeLayout({ children, theme }: { children: React.ReactNode; theme: String }) {
  
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
      {children}
    </div>
  );
}

export default HomeLayout;
