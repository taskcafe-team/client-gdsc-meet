'use client';
import { AuthService } from '@/api/http-rest/auth';
import Button from '@/components/Button';
import { Input } from '@/components/Input';
import useToastily from '@/hooks/useToastily';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
interface IUser {
  UserName: string ;
}

const validationSchema = Yup.object().shape({
  UserName: Yup.string().email('Invalid email address').required('Required'),
});
const inituser: IUser = {
  UserName: '',
};
const page: React.FC = (props) => {
  const [flag, setFlag] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
   const showToast = useToastily();
  const formik = useFormik({
    initialValues: inituser,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await setLoading(true)
      if(values.UserName?.length == 0){
        return;
      }
      const initUser = await AuthService.forgotPassword({email:values.UserName})
      if(initUser){
        showToast({content:'Send email success',type:'success'});
        setFlag(true);
      }else{
        showToast({content:'Please double-check your email.',type:'error'});
        setFlag(false);
      }
      await setLoading(false)
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
            <div className="flex items-start justify-start py-8">
              <span>Email address</span>
            </div>
            <div className="Form__group px-2 mb-2">
              <Input
                id="UserName"
                value={formik.values.UserName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                // icon={<BiUser />}
                key={'input-userName'}
                placeholder="Your email..."
                className=" rounded-sm border-b-2  "
                
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
          <div className="w-[100%] min-w-[420px] max-w-[500px] md:mx-0 shadow p-10 rounded-md ">
            <h2
              className="
               max-w-[570px] text-7xl my-[20px] max-lg:max-w-none text-start leading-tight py-2 "
            >
              Send Email
            </h2>
            <div className="flex flex-col gap-5">
              <p>
                {`Please check your Gmail inbox at ${formik.values.UserName} for any new messages or
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
