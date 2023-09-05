'use client';
import { Input } from '@/components/Input';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';
import google from '@assets/images/icons8-google-48.png';
import facebook from '@assets/images/icons8-facebook-48.png';
import { BiKey, BiUser } from 'react-icons/bi';
import Button from '@/components/Button';
import { Validator } from '@/utils/Validator';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';

import Bgtop from '@/assets/images/SignIn-Top1.png';
import Bgbottom from '@/assets/images/SignInBottom.png';
import BgT1 from '@/assets/images/Saly-6.png';
import { useTheme } from 'next-themes';

interface IValidator {
  _UserName: string | null | undefined;
  _Password: string | null | undefined;
  _RePassword: string | null | undefined;
}
const page: React.FC = (props) => {
  const [User, setUser] = useState({
    UserName: '',
    Password: '',
    Repassword: '',
  });
  const [UValidator, setValidator] = useState<IValidator>({
    _UserName: null,
    _Password: null,
    _RePassword: null,
  });
  const refContent = React.useRef<HTMLDivElement | null>(null);
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setValidator({
        _UserName: Validator.validateEmail({ email: User.UserName }),
        _Password: Validator.validatePassword({ password: User.Password }),
        _RePassword: Validator.validateConfirmPassword({
          password: User.Password,
          confirmPassword: User.Repassword,
        }),
      });
      if (UValidator._UserName) {
        // log is here
      } else if (UValidator._Password) {
      } else if (UValidator._RePassword) {
      } else {
        //code here
      }
    } catch (error) {}
  };
    // animation start
    React.useEffect(() => {
      const timeoutId = setTimeout(() => {
        if (refContent.current) {
          refContent.current.classList.remove('opacity-0');
          refContent.current.classList.add('opacity-100')
        }
      }, 200);
  
      return () => {
        clearTimeout(timeoutId);
      };
    }, []);
    
  return (
    <div className="SignIn relative  h-[100vh] overflow-hidden">
    <Image
      src={Bgtop}
      alt="backgroud"
      className="max-lg:hidden object-fill  absolute top-[-50px] right-[-65px] z-2 w-[56vh] "
    ></Image>
    <Image
      src={Bgbottom}
      alt="backgroud"
      className="max-lg:hidden object-fill  absolute bottom-[-35px] left-[-40px] z-2 "
    ></Image>
    <Image
      src={BgT1}
      alt="backgroud"
      className="max-lg:hidden object-fill  absolute bottom-[-35px] left-[-3vh] z-3 w-[100vh] h-[100vh] "
    ></Image>

    <Header className="relative z-100 w-[60%] max-lg:w-full" />
    <main ref={refContent} className="opacity-0 transition-opacity py-[16px] px-[53px] ml-[45%] max-lg:ml-[0%] max-lg:mx-0 max-lg:flex max-lg:justify-center">
      <form action="" className='w-[100%] min-w-[420px] max-w-[500px] md:mx-0'>
        <h2
          className="
             max-w-[570px] text-7xl my-[20px] max-lg:max-w-none text-start leading-tight py-2 "
        >
          Sign Up
        </h2>
        <div className="Form__group px-2 mb-2">
            <Input
              id="UserName"
              value={User.UserName}
              onChange={(e: any) =>
                setUser({
                  ...User,
                  UserName: e.target.value,
                })
              }
              // icon={<BiUser />}
              key={'input-userName'}
              placeholder="UserName"
              className=" rounded-sm border-b-2  "
            />
            <p className="error text-red-600 text-lg min-h-[20px] mx-6 my-2">
              {UValidator._UserName && <span>{UValidator._UserName}</span>}
            </p>
          </div>
          <div className="Form__group px-2 mb-2">
            <Input
              id="Password"
              value={User.Password}
              onChange={(e: any) =>
                setUser({
                  ...User,
                  Password: e.target.value,
                })
              }
              // icon={<BiKey />}
              key={'password'}
              placeholder="Password"
              className="rounded-sm border-b-2  "
            />
            <p className="error text-red-600 text-lg min-h-[20px] mx-6 my-2">
              {UValidator._Password && <span>{UValidator._Password}</span>}
            </p>
          </div>
          <div className="Form__group px-2 mb-2">
            <Input
              id="RePassword"
              type='password'
              value={User.Password}
              onChange={(e: any) =>
                setUser({
                  ...User,
                  Repassword: e.target.value,
                })
              }
              // icon={<BiKey />}
              key={'password'}
              placeholder="Re Password"
              className="rounded-sm border-b-2  "
            />
            <p className="error text-red-600 text-lg min-h-[20px] mx-6 my-2">
              {UValidator._Password && <span>{UValidator._Password}</span>}
            </p>
          </div>
          <div className="pt-5">
            <Button type="submit" onClick={handleSubmit} className="max-sm:w-full w-full  flex items-center justify-center  bg-primary text-white">
              Sign Now
            </Button>
          </div>
          <div className="flex items-center justify-center  text-gray-500 p-8">
            -or-
          </div>
          <div className="flex gap-5 justify-center items-center   ">
            <button className="flex justify-center items-center  gap-5 text-gray-500  px-10 py-3 w-full">
              <Image src={google} width={30} alt="Google" />
              <p>Google</p>
            </button>
            <button className="flex justify-center items-center  gap-5 text-gray-500  px-10 py-3 w-full ">
              <Image src={facebook} width={30} alt="Google" />
              <p>Facebook</p>
            </button>
          </div>
          <Link
            href={'/signIn'}
            className="flex gap-2 my-4 mx-auto justify-center w-full py-4 ml-2 text-xl text-[1.7rem]  max-sm:text-xl text-gray-500 dark:text-gray-30  "
          >
            <span>if you are not have account</span>
            <span className="text-primary font-bold ">create Account</span>
          </Link>
      </form>
    </main>
  </div>
  );
};

export default page;
