import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Toast from '@/utils/Alert';
import { auth } from '@/db/firebaseDb';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useFormik } from 'formik';
import * as Yup from "yup"
import Link from 'next/link';


const Login = () => {

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .trim()
        .required("Email required")
        .lowercase(),
      password: Yup.string()
        .min(5, "password must be greater than 5")
        .max(30, "password must not exceed 30 characters")
        .required("Password required"),
    }),
    onSubmit: (values) => handleSubmit(values),
  });

  const handleSubmit = async (val: { email: string; password: string }) => {
    formik.setSubmitting(true);
    const { email, password } = val;

    try {
      //create user on firestore
      await signInWithEmailAndPassword(auth, email, password);
      //TODO toast
      formik.setSubmitting(false);
      formik.resetForm();
      Toast.success
        .fire({
          text: "Sign in successful",
        })
        .then(() => location.assign("/user/dashboard", ));
    } catch (err: any) {
      formik.setSubmitting(false);
      formik.resetForm();
     
      const msg = err.code.split("/")[1]
      Toast.error.fire({
        text:msg,
      });
    }
  };


  return (
    <div className="min-h-screen footer-bg  homepage-3  flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-20 bg-[#322194] shadow sm:rounded-lg flex justify-center flex-1 flex-wrap">
        <div className="lg:w-1/2 xl:w-5/12 w-full p-6 sm:p-12">
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-2xl font-black uppercase text-white">
              Login
            </h1>

            <form className="w-full flex-1 mt-8 " onSubmit={formik.handleSubmit}>
              <div className="mx-auto max-w-xl  relative  ">
                <div>
                  
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-transparent border border-[#304ffe] placeholder-white text-sm focus:outline-none focus:bg-opacity-10 text-white mt-2"
                  type="email"
                  placeholder="Enter Email"
                  {...formik.getFieldProps("email")}
                />
                 {formik.touched.email && formik.errors.email ? (
                      <div className="text-red-500 mb-2">
                        {formik.errors.email}
                      </div>
                    ) : null}
                </div>
                <div>
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-transparent border border-[#304ffe] placeholder-white text-sm focus:outline-none focus:bg-opacity-10 text-white mt-2"
                  type="password"
                  placeholder="Enter Password"
                  {...formik.getFieldProps("password")}
                />
                 {formik.touched.password && formik.errors.password ? (
                      <div className="text-red-500 mb-2">
                        {formik.errors.password}
                      </div>
                    ) : null}
                  </div> 

                <button
                  disabled={formik.isSubmitting}
                  type="submit"
                  className="mt-4 tracking-wide font-semibold bg-[#304ffe] text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  <i className="fas fa-sign-in-alt fa 1x w-6  text-white -ml-2" />
                  <span className="ml-3">{formik.isSubmitting ? "Submitting..." : "Login"}</span>
                </button>
                <div className="my-12 border-b text-center">
                  <div className="leading-none px-2 inline-block text-md text-indigo-400 tracking-wide font-medium  transform translate-y-1/2">
                    Or
                  </div>
                </div>

                <div className="mx-auto mx-w-sm w-full">
                  <Link
                    className="mt-5  tracking-wide  hover:text-white font-semibold border border-[#ffc400] text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    href="/register"
                  >
                    <i className="fas fa-user-plus  fa 1x w-6  -ml-2 text-indigo-700" />
                    <span className="ml-4">Register</span>
                  </Link>
                  <Link
                    className="mt-4 tracking-wide  hover:text-white font-semibold bg-[#304ffe] text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    href="/reset"
                  >
                    <span className="ml-4">Forget password</span>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* <div className="flex-1 bg-indigo-100 text-center lg:flex sm:hidden">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat "
            style={{ backgroundImage: `url(/assets/svg/login.svg)` }}
          ></div>
        </div> */}
      </div>
    </div>
  )
}

export default Login
