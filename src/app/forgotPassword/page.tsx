"use client";
import { AuthService } from '@/api/http-rest/auth';
import Button from '@/components/Button';
import { Input } from '@/components/Input';
import useToastily from '@/hooks/useToastily';
import { useFormik } from 'formik';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import Bg from '@assets/images/FortgotBg3.svg';
import BgDark from '@assets/images/FortgotBgDark3.svg';
import BgT1 from '@/assets/images/PS-1.svg';
import BgTL from '@/assets/images/FortgotBg44.svg';
import { useTheme } from 'next-themes';
import { DefaultLoading } from '@/components/Loading';
import Header from '@/components/Header';
interface IUser {
  UserName: string;
}

const validationSchema = Yup.object().shape({
  UserName: Yup.string().email('Invalid email address').required('Required'),
});
const inituser: IUser = {
  UserName: '',
};
const page: React.FC = (props) => {
  const [flag, setFlag] = useState(false);
  const [loading, setLoading] = useState(false);
  const showToast = useToastily();
  const { theme } = useTheme();
  const refContent = useRef<HTMLDivElement | null>(null);
  const formik = useFormik({
    initialValues: inituser,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await setLoading(true);
      if (values.UserName?.length == 0) {
        return;
      }
      const initUser = await AuthService.forgotPassword({ email: values.UserName });
      if (initUser) {
        showToast({ content: 'Send email success', type: 'success' });
        setFlag(true);
      } else {
        showToast({ content: 'Please double-check your email.', type: 'error' });
        setFlag(false);
      }
      await setLoading(false);
    },
  });

  // Animation loading
  if (!theme) {
    return <DefaultLoading />;
  }
  // animation start
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (refContent.current) {
        refContent.current.classList.remove('opacity-0');
        refContent.current.classList.add('opacity-100');
      }
    }, 200);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
  return (
    <div
      className={`Home h-[100vh] w-full bg-primary backdrop-blur-30 relative overflow-hidden max-lg:overflow-auto  max-lg:bg-none ${
        theme === 'light' ? 'max-lg: bg-while' : 'max-lg:bg-black'
      }`}
    >
      <Image
        priority={true}
        src={theme === 'light' ? Bg : BgDark}
        alt="backgroud"
        className="max-lg:hidden  object-contain absolute left-[-15%] top-[-50px]  w-[120%] max-w-[110%] z-2  "
      ></Image>
      <Image
        priority={true}
        src={BgT1}
        alt="backgroud"
        className="max-lg:hidden object-fill  absolute bottom-[-15%] right-[12%] z-3 w-[40%] "
      ></Image>
      <Image
        priority={true}
        src={BgTL}
        alt="backgroud"
        className="max-lg:hidden object-fill  absolute bottom-[-10%] right-[-10%] z-3 w-[40%] "
      ></Image>
      <div className="relative z-3  w-[60%] max-lg:w-full ">
        <Header />
        <div
          className="opacity-0 mt-10 transition-opacity max-lg:flex max-lg:items-center justify-center"
          ref={refContent}
        >
          {flag == false ? (
            <form
              onSubmit={formik.handleSubmit}
              action=""
              className="  w-[500px] border border-solid max-lg:ml-0
                ml-[20%] mt-10 p-[30px] max-lg:p-[20px] 
                 bg-white bg-opacity-50 backdrop-blur-lg 
                 rounded drop-shadow-lg 
                 max-lg:backdrop-blur-0 max-lg:border-none max-lg:bg-opacity-0 
                 "
            >
              <h2
                className="
                 max-w-[570px] text-7xl my-[20px] max-lg:max-w-none text-start leading-tight py-2"
              >
                Forgot password
              </h2>
              <div className="Form__group px-2 mb-2">
                <Input
                  id="UserName"
                  value={formik.values.UserName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  // icon={<BiUser />}
                  key={'input-userName'}
                  placeholder="Your email..."
                  className=" "
                />
                <p className="error text-red-600 text-lg min-h-[20px] mx-6 my-2">
                  {formik.touched.UserName && formik.errors.UserName ? (
                    <span>{formik.errors.UserName}</span>
                  ) : null}
                </p>
              </div>
              <div className="pt-5">
                <Button
                  loading={loading}
                  type="submit"
                  className="max-sm:w-full w-full  flex items-center justify-center  bg-primary text-white"
                >
                  Send now
                </Button>
              </div>
            </form>
          ) : (
            <div className=" w-[500px] border border-solid   ml-[20%] mt-10 p-[30px]  bg-white bg-opacity-50 backdrop-blur-lg rounded drop-shadow-lg ">
              <h2
                className="
                   max-w-[570px] text-7xl my-[20px] max-lg:max-w-none text-start leading-tight py-2"
              >
                Send email
              </h2>
              <div className="flex flex-col gap-5 my-2">
                <p>
                  {`Please check your Gmail inbox at ${formik.values.UserName} for any new messages or
                  notifications.`}
                </p>
                <p>Thank you!</p>
              </div>
              <Button
                onClick={() => setFlag(false)}
                type="submit"
                className="max-sm:w-full w-full  flex items-center justify-center  bg-primary text-white"
              >
                Click if no Gmail yet!!
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default page;
