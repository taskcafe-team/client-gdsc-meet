'use client';

import Button from '@/components/Button';
import { Input } from '@/components/Input';
import useToastily from '@/hooks/useToastily';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
interface IUser {
  Password: string | null | undefined;
  Repassword: string | null | undefined;
}

const validationSchema = Yup.object().shape({
//   Password: Yup.string()
//   .min(8, 'Password must be 8 characters long')
//   .matches(/[0-9]/, 'Password requires a number')
//   .matches(/[a-z]/, 'Password requires a lowercase letter')
//   .matches(/[A-Z]/, 'Password requires an uppercase letter')
//   .matches(/[^\w]/, 'Password requires a symbol')
//   .required('Required'),

// Repassword: Yup.string()
//   .required('required')
//   .oneOf(
//     [Yup.ref('password'), null] as (string | null | any)[],
//     'Xác nhận mật khẩu phải giống mật khẩu',
//   ),
});
const inituser: IUser = {
  Password: '',
  Repassword: '',
};
const page: React.FC = (props) => {
  const [flag, setFlag] = React.useState(false);
  const showToast = useToastily();
  const formik = useFormik({
    initialValues: inituser,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setFlag(true)
      
    },
  });

  return (
    <div>
      <main className="w=[100%] h=[100vh] flex items-center justify-center">
        {flag == false ? (
          <form
            onSubmit={formik.handleSubmit}
            action=""
            className="w-[100%] min-w-[420px] max-w-[500px] md:mx-0 shadow p-10 rounded-md "
          >
            <h2
              className="
                 max-w-[570px] text-7xl my-[20px] max-lg:max-w-none text-start leading-tight py-2 "
            >
              Forgot password
            </h2>
            {/* <div className="flex items-start justify-start py-8">
              <span>Reconfirm Your Password</span>
            </div> */}
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
              key={'New password'}
              placeholder="New password"
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
                type="submit"
                className="max-sm:w-full w-full  flex items-center justify-center  bg-primary text-white"
              >
                Send now
              </Button>
            </div>
          </form>
        ) : (
          <div className="w-[100%] min-w-[420px] max-w-[500px] md:mx-0 shadow p-10 rounded-md ">
            <h2
              className="
               max-w-[570px] text-7xl my-[20px] max-lg:max-w-none text-start leading-tight py-2 "
            >
              Send Email
            </h2>
            <div className="flex flex-col gap-5">
              <p>
                {`Please check your Gmail inbox at for any new messages or
                notifications.`}
              </p>
              <p>Thank you!</p>
            </div>

            <div className="mt-5" onClick={() => setFlag(false)}>
              <span className="text-primary font-bold underline cursor-pointer">
                Click if no Gmail yet!!
              </span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
export default page;
