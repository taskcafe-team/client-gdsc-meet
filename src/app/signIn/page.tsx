'use client';
import { Input } from '@/components/Input';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useRef, useState } from 'react';
import google from '@assets/images/icons8-google-48.png';
import facebook from '@assets/images/icons8-facebook-48.png';
import { BiKey, BiUser } from 'react-icons/bi';
import Button from '@/components/Button';
import { Validator } from '@/utils/Validator';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import BgDarktop from '@/assets/images/bgDark-top.png';
import Bgtop from '@/assets/images/SignIn-Top1.png';
import Bgbottom from '@/assets/images/SignInBottom.png';
import BgT1 from '@/assets/images/bg-t2.png';
import { useTheme } from 'next-themes';

import { useAppDispatch, useAppSelector } from '@/hooks/redux.hook';
import { AUTH_DETAIL } from '@/redux/auth/action';
import { AuthService } from '@/api/http-rest/auth';
import useToastily from '@/hooks/useToastily';
import { useRouter } from 'next/navigation';
import { authLoading } from '@/redux/auth';
import { browser } from 'process';

interface IUser {
  UserName: string;
  Password: string;
}
const inituser: IUser = {
  UserName: '',
  Password: '',
};
const validationSchema = Yup.object().shape({
  UserName: Yup.string().email('Invalid email address').required('Required'),
  Password: Yup.string()
    .min(8, 'Password must be 8 characters long')
    .matches(/[0-9]/, 'Password requires a number')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter')
    .matches(/[^\w]/, 'Password requires a symbol')
    .required('Required'),
});
const page: React.FC = (props) => {
  const [loading, setLoading] = React.useState(false);
  const showToast = useToastily();
  const refContent = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleGoogle = () => {
    // Mở một tab mới với URL đăng nhập

    const loginTab = window.open(
      'http://localhost:8080/auth/google/login',
      '_blank',
      'width:500,height:500'
    );
  
    // if (loginTab != null) {
    //   loginTab.focus();

    //   // Lắng nghe sự kiện khi tab đã tải xong
    //   loginTab.addEventListener('load', () => {
    //     // Đợi một khoảng thời gian (ví dụ: 2 giây) để đảm bảo đăng nhập thành công
    //     setTimeout(() => {
    //       // Điều hướng đến URL sau khi đăng nhập thành công
    //       loginTab.location.href = 'http://localhost:8080/auth/google/verify';

    //       // Lắng nghe sự kiện khi tab đã tải xong URL mới
    //       loginTab.addEventListener('load', () => {
    //         // Truy cập dữ liệu trả về từ tab
    //         const responseData = loginTab.document.body.textContent;
    //         console.log('Data:', responseData);

    //         // Ở đây, bạn có thể xử lý dữ liệu theo nhu cầu của bạn

    //         // Đóng tab sau khi hoàn thành
    //         loginTab.close();
    //       });
    //     }, 2000); // Đợi 2 giây
    //   });
    // }
  };  
  const handleFacebook = () => {};
  const formik = useFormik({
    initialValues: inituser,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await setLoading(true);
        console.log(values);
        console.log(values.UserName.length, values.Password.length);
        const initUser = await AuthService.EmailLogin({
          username: values.UserName,
          password: values.Password,
        });

        if (inituser) {
          const { accessToken, refreshToken } = initUser;
          console.log(initUser);
          dispatch(AUTH_DETAIL({ accessTokent: accessToken, refreshToken: refreshToken }));
          showToast({
            content: 'Login success',
            type: 'success',
          });
          router.push('/');
        } else {
          showToast({
            content: 'Erors',
            type: 'error',
          });
        }
        await setLoading(false);
      } catch (error) {
        showToast({
          content: 'Erors 2',
          type: 'error',
        });
        await setLoading(false);
      }
    },
  });
  // animation start
  React.useEffect(() => {
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
    <div>
      <Header className="relative z-100 w-[60%] max-lg:w-full" />
      <main
        ref={refContent}
        className=" opacity-0 transition-opacity py-[16px] px-[53px] ml-[45%] max-lg:ml-[0%] max-lg:mx-0 max-lg:flex max-lg:justify-center"
      >
        <form
          onSubmit={formik.handleSubmit}
          action=""
          className="w-[100%] min-w-[420px] max-w-[500px] md:mx-0"
        >
          <h2
            className="
               max-w-[570px] text-7xl my-[20px] max-lg:max-w-none text-start leading-tight py-2 "
          >
            Login
          </h2>
          <div className="Form__group px-2 mb-2">
            <Input
              id="UserName"
              type="email"
              value={formik.values.UserName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              // icon={<BiUser />}
              key={'input-userName'}
              placeholder="UserName"
              className=" rounded-sm border-b-2  "
            />
            <p className="error text-red-600 text-lg min-h-[20px] mx-6 my-2">
              {formik.touched.UserName && formik.errors.UserName ? (
                <span>{formik.errors.UserName}</span>
              ) : null}
            </p>
          </div>
          <div className="Form__group px-2 mb-2">
            <Input
              id="Password"
              type="password"
              value={formik.values.Password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              // icon={<BiKey />}
              key={'Password'}
              placeholder="Password"
              className="rounded-sm border-b-2  "
            />
            <p className="error text-red-600 text-lg min-h-[20px] mx-6 my-2">
              {formik.touched.Password && formik.errors.Password ? (
                <span>{formik.errors.Password}</span>
              ) : null}
            </p>
          </div>
          <div className="pt-5">
            <Button
              type="submit"
              className="max-sm:w-full w-full  flex items-center justify-center gap-10  bg-primary text-white"
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5  bg-white text-white rounded-sm"
                  viewBox="0 0 24 24"
                ></svg>
              ) : (
                <span>Sign Now</span>
              )}
            </Button>
          </div>
          <div className="flex items-start justify-start  text-gray-500 p-8">
            <Link href={'/forgotPassword'}>Forgot password ?</Link>
          </div>
          <div className="flex items-center justify-center  text-gray-500 ">-or-</div>
          <div className="flex gap-5 justify-center items-center   ">
            <div
              className="flex justify-center items-center cursor-pointer gap-5 text-gray-500  px-10 py-3 w-full"
              onClick={handleGoogle}
            >
              <Image src={google} width={30} alt="Google" />
              <p>Google</p>
            </div>
            <div className="flex justify-center items-center cursor-pointer  gap-5 text-gray-500  px-10 py-3 w-full ">
              <Image src={facebook} width={30} alt="Google" />
              <p>Facebook</p>
            </div>
          </div>
          <Link
            href={'/signUp'}
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
