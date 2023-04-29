import { useFormik } from 'formik';
import React from 'react'
import * as Yup from "yup"
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/db/firebaseDb';
import Toast from '@/utils/Alert';
import Link from 'next/link';


const PasswordReset = () => {

  const formik = useFormik({
    initialValues: {
      email: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .trim()
        .required("Email required")
        .lowercase(),
    }),
    onSubmit: (values) => handleSubmit(values),
  });

  const handleSubmit = async (val: { email: string }) => {
    formik.setSubmitting(true);
    const { email } = val;

    try {
      //create user on firestore
      await sendPasswordResetEmail(auth, email);
      formik.setSubmitting(false);
      formik.resetForm();
      Toast.success.fire({
        text: "An account reset instructions was sent to your email",
      });
    } catch (err: any) {
      formik.setSubmitting(false);
      formik.resetForm();
      Toast.error.fire({ text: err });
    }
  };

  return (
    <div className="min-h-screen footer-bg homepage-3 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-20 bg-[#322194] shadow sm:rounded-lg  flex justify-center flex-1 flex-wrap">
        <div className="lg:w-1/2 xl:w-5/12 sm:w-full p-6 sm:p-12">
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-2xl font-black uppercase text-white">
              Password Reset
            </h1>

            <form className="w-full flex-1 mt-8 " onSubmit={formik.handleSubmit}>
              <div className="mx-auto max-w-xl  relative ">
                <div>
                  
                <input
                  className="w-full px-8 py-6 rounded-lg font-medium bg-transparent border border-[#304ffe] placeholder-white text-sm focus:outline-none focus:bg-opacity-10 text-white mt-3"
                  type="email"
                  placeholder="Email"
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email ? (
                      <div className="text-red-500 mb-2">
                        {formik.errors.email}
                      </div>
                    ) : null}
                </div>

                <button
                disabled={formik.isSubmitting}
                  type="submit"
                  className="mt-4 uppercase tracking-wide font-semibold bg-[#304ffe] text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  <i className="fas fa-user-plus fa 1x w-6  -ml-2" />
                  <span className="ml-3">{formik.isSubmitting ? "Submitting..." : "Submit"}</span>
                </button>
                <div className="my-12 border-b text-center">
                  <div className="leading-none px-2 inline-block text-md text-indigo-400 tracking-wide font-medium  transform translate-y-1/2">
                    OR
                  </div>
                </div>
                <div className="mx-auto mx-w-sm w-full">
                  <Link
                    className="w-full mx-w-xl  uppercase font-bold shadow-sm rounded-lg py-4
           bg-[#304ffe]  text-white flex items-center  hover:text-white justify-center hover:bg-indigo-800 transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:text-white focus:shadow-sm focus:shadow-outline mt-4"
                    href="/login"
                    target="_self"
                  >
                    <i className="fas fa-sign-in-alt fa 1x w-6  -ml-2 text-white" />
                    <span className="ml-4">Login</span>
                  </Link>
                  <Link
                    className="w-full uppercase mx-w-xl font-bold shadow-sm rounded-lg py-4
           bg-[#304ffe]  text-white flex items-center focus:border-none hover:text-white justify-center hover:bg-indigo-800 transition-all duration-300 ease-in-out focus:outline-none focus:text-white hover:shadow focus:shadow-sm focus:shadow-outline mt-4"
                    href="/register"
                    target="_self"
                  >
                    <i className="fas fa-sign-in-alt fa 1x w-6  -ml-2 text-white" />
                    <span className="ml-4">Register</span>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* <div className="flex-1 bg-indigo-100 text-center d-none d-lg-flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(/assets/svg/reset.svg)` }}
          ></div>
        </div> */}
      </div>
    </div>
  )
}

export default PasswordReset
