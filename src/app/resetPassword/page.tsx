'use client';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSearchParams } from 'next/navigation';
import { AuthService } from '@/api/http-rest/auth';
import Button from '@/components/Button';
import { Input } from '@/components/Input';
import useToastily from '@/hooks/useToastily';

interface IUser {
  Password: string;
  Repassword: string;
}

const validationSchema = Yup.object().shape({
  Password: Yup.string()
    .min(8, 'Password must be 8 characters long')
    .matches(/[0-9]/, 'Password requires a number')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter')
    .matches(/[^\w]/, 'Password requires a symbol')
    .required('Required'),

  Repassword: Yup.string()
    .required('Required')
    .oneOf([Yup.ref('Password')], 'Passwords do not match'),
});

const initUser: IUser = {
  Password: '',
  Repassword: '',
};

const ResetPasswordPage: React.FC = () => {
  const [flag, setFlag] = useState(false);
  const [loading, setLoading] = useState(false);
  const page = useSearchParams();
  const token = page.get('token');
  const showToast = useToastily();

  const formik = useFormik({
    initialValues: initUser,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        if (!token) {
          showToast({
            content: 'Token is null',
            type: 'error',
          });
          return;
        }
        const resetResult = await AuthService.resetPassword({
          token: token,
        });

        if (resetResult) {
          showToast({
            content: 'Reset password success',
            type: 'success',
          });
          setFlag(true);
        } else {
          showToast({
            content: 'Error resetting password',
            type: 'error',
          });
          setFlag(false);
        }

        setLoading(false);
      } catch (error) {
        setFlag(false);
      }
    },
  });

  return (
    <div>
      <main className="w-full h-screen flex items-center justify-center">
        {!flag ? (
          <form
            onSubmit={formik.handleSubmit}
            action=""
            className="w-full min-w-[420px] max-w-[500px] md:mx-0 shadow p-10 rounded-md"
          >
            <h2 className="max-w-[570px] text-7xl my-20 max-lg:max-w-none text-start leading-tight py-2">
              Forgot password
            </h2>
            <div className="Form__group px-2 mb-2">
              <Input
                id="Password"
                type="password"
                value={formik.values.Password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                key="Password"
                placeholder="Password"
                className="rounded-sm border-b-2"
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
                key="Repassword"
                placeholder="New password"
                className="rounded-sm border-b-2"
              />
              <p className="error text-red-600 text-lg min-h-[20px] mx-6 my-2">
                {formik.touched.Repassword && formik.errors.Repassword ? (
                  <span>{formik.errors.Repassword}</span>
                ) : null}
              </p>
            </div>
            <div className="pt-5">
              <Button
                loading={loading}
                type="submit"
                className="max-sm:w-full w-full flex items-center justify-center bg-primary text-white"
              >
                Send now
              </Button>
            </div>
          </form>
        ) : (
          <div className="w-full min-w-[420px] max-w-[500px] md:mx-0 shadow p-10 rounded-md">
            <h2 className="max-w-[570px] text-7xl my-20 max-lg:max-w-none text-start leading-tight py-2">
              Send Email
            </h2>
            <div className="flex flex-col gap-5">
              <p>{`Please check your Gmail inbox for any new messages or notifications.`}</p>
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

export default ResetPasswordPage;
