'use client';
import { Input } from '@/components/Input';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import google from '@assets/images/icons8-google-48.png';
import facebook from '@assets/images/icons8-facebook-48.png';
import Button from '@/components/Button';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import { useRouter } from 'next/navigation';
import Bgtop from '@/assets/images/SignIn-Top1.png';
import Bgbottom from '@/assets/images/SignInBottom.png';
import BgT1 from '@/assets/images/Saly-6.png';
import { AuthService } from '@/api/http-rest/auth';
import useToastily from '@/hooks/useToastily';

interface IUser {
  UserName: string;
  Password: string;
  Repassword: string;
}

const inituser: IUser = {
  UserName: '',
  Password: '',
  Repassword: '',
};

const page: React.FC = (props) => {
  const router = useRouter();
  const showToast = useToastily();
  const [loading, setLoading] = React.useState(false);
  const refContent = React.useRef<HTMLDivElement | null>(null);
  // validate input
  const validationSchema = Yup.object().shape({
    UserName: Yup.string().email('Invalid email address').required('Required'),
    Password: Yup.string()
      .min(8, 'Password must be 8 characters long')
      .matches(/[0-9]/, 'Password requires a number')
      .matches(/[a-z]/, 'Password requires a lowercase letter')
      .matches(/[A-Z]/, 'Password requires an uppercase letter')
      .matches(/[^\w]/, 'Password requires a symbol')
      .required('Required'),
    Repassword: Yup.string()
      .required('Please re-type your password')
      .oneOf([Yup.ref('Password')], 'Passwords does not match'),
  });

  const formik = useFormik({
    initialValues: inituser,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const initUser = await AuthService.register({
          email: values.UserName as string,
          password: values.Password as string,
        });
        if (initUser) {
          showToast({
            content: 'success',
            type: 'success',
          });
          router.push('/signIn');
        } else {
          showToast({
            content: 'Erors',
            type: 'error',
          });
        }
      } catch (error) {
        showToast({
          content: 'Erors',
          type: 'error',
        });
      } finally {
        setLoading(false);
      }
    },
  });

  // animation
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
      <main
        ref={refContent}
        className="opacity-0 transition-opacity py-[16px] px-[53px] ml-[45%] max-lg:ml-[0%] max-lg:mx-0 max-lg:flex max-lg:justify-center"
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
            Sign Up
          </h2>
          <div className="Form__group px-2 mb-2">
            <Input
              id="UserName"
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
          <div className="Form__group px-2 mb-2">
            <Input
              id="Repassword"
              type="password"
              value={formik.values.Repassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              // icon={<BiKey />}
              key={'RePassword'}
              placeholder="Re Password"
              className="rounded-sm border-b-2  "
            />
            <p className="error text-red-600 text-lg min-h-[20px] mx-6 my-2">
              {formik.touched.Repassword && formik.errors.Repassword ? (
                <span>{formik.errors.Repassword}</span>
              ) : null}
            </p>
          </div>
          <div className="pt-5">
            <Button
              // s
              type="submit"
              loading={loading}
              className="max-sm:w-full w-full  flex items-center justify-center  bg-primary text-white"
            >
              Sign Now
            </Button>
          </div>
          <div className="flex items-center justify-center  text-gray-500 p-8">-or-</div>
          <div className="flex gap-5 justify-center items-center   ">
            <button
              type="button"
              className="flex justify-center items-center  gap-5 text-gray-500  px-10 py-3 w-full"
            >
              <Image src={google} width={30} alt="Google" />
              <p>Google</p>
            </button>
            <button
              type="button"
              className="flex justify-center items-center  gap-5 text-gray-500  px-10 py-3 w-full "
            >
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
