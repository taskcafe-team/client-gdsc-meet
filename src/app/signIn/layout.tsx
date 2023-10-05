import Bgtop from '@/assets/images/SignInTr.svg';
import Bgbottom from '@/assets/images/SignIn-BT.svg';
import BgT1 from '@/assets/images/PS-1.svg';
import Image from 'next/image';

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
