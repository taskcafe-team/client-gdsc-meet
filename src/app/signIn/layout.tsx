
import Image from 'next/image';
import Header from '@/components/Header';
import BgDarktop from '@/assets/images/bgDark-top.png';
import Bgtop from '@/assets/images/SignIn-Top1.png';
import Bgbottom from '@/assets/images/SignInBottom.png';
import BgT1 from '@/assets/images/bg-t2.png';
import '@livekit/components-styles';
import '@livekit/components-styles/prefabs';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="SignIn relative  h-[100vh] overflow-hidden">
      <Image
        priority={true}
        src={Bgtop}
        alt="backgroud"
        className="max-lg:hidden object-fill  absolute top-[-50px] right-[-65px] z-2 w-[56vh] "
      ></Image>
      <Image
        priority={true}
        src={Bgbottom}
        alt="backgroud"
        className="max-lg:hidden object-fill  absolute bottom-[-35px] left-[-40px] z-2 "
      ></Image>
      <Image
        priority={true}
        src={BgT1}
        alt="backgroud"
        className="max-lg:hidden object-fill  absolute bottom-[-35px] left-[17vh] z-3 w-[72vh] h-[100vh] "
      ></Image>

      {children}
    </div>
  );
}
