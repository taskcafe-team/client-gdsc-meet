import React from 'react';
import logo from '@/assets/images/meeticon.png';
import Image from 'next/image';
import Link from 'next/link';
const Footer = () => {
  return (
    <div className="Footer p-[10px] ">
      <div className="Footer__header flex items-center justify-between">
        <div className="Footer__logo">
          <Image src={logo} alt="Logo" />
        </div>
        <div className="Footer__nav flex items-center gap-4 text-gray-500">
          <div className="Footer__nav__item">
            <Link href={'/Policy'}>Chính sách</Link>
          </div>
          <div className="Footer__nav__item">
            <Link href={'/security'}>Bảo Mật</Link>
          </div>
          <div className="Footer__nav__item">
            <Link href={'/About'}>Về chúng tôi</Link>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Footer;
