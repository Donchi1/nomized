import React from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup"
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db, storage } from '@/db/firebaseDb'
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage'
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore'
import createNotification from '@/utils/createNotification'
import Toast from '@/utils/Alert'
import Link from 'next/link'
import Compressor from 'compressorjs'

type formDataType = {
 
    firstname: string,
    lastname:string,
    country:string,
    state:string,
    occupation:string,
    email:string,
    photo: Blob | null,
    phone:string,
    password:string,
    password1:string,
}

const Register = () => {
 
  const formik = useFormik({
    initialValues: {
    firstname: '',
    lastname: '',
    country: '',
    state: '',
    occupation: '',
    email: '',
    photo: null,
    phone: '',
    password: '',
    password1: '',
    } as formDataType,

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .trim()
        .required("Email required")
        .lowercase(),
      firstname: Yup.string().lowercase().trim().required("Firstname required"),
      lastname: Yup.string().lowercase().trim().required("Lastname required"),
      occupation: Yup.string()
        .lowercase()
        .trim()
        .required("Occupation required"),
      country: Yup.string().lowercase().trim().required("Country required"),
      state: Yup.string().lowercase().trim().required("State required"),
      password: Yup.string()
        .min(5, "password must be greater than 5")
        .max(30, "password must not exceed 30 characters")
        .required("Password required"),
        password1: Yup.string().required("Reapeat-Password required").oneOf([Yup.ref("password"), ""], "Your password do not match"),
      phone: Yup.string().required("Phone number required"),
      photo: Yup.mixed()
        .nullable()
        .required("Photo required")
    }),

    onSubmit: (values) => handleSubmit(values),
  });

  const handleSubmit = async (val: formDataType) => {
    formik.setSubmitting(true);
    let {
      email,
      password,
      occupation,
      phone,
      lastname,
      country,
      photo,
      firstname,
      state
    } = val;


    try {
      //compress user photo
      new Compressor(photo as Blob, {
        quality: 0.6,
        success: (result) => {photo = result}
      })
      //register User
      const res = await createUserWithEmailAndPassword(auth, email, password);
      
     
      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `users/${auth.currentUser?.uid}`);
      
     await uploadBytes(storageRef, photo as Blob)
       const url =  await getDownloadURL(storageRef)
     
      try {
          //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              firstname,
              lastname,
              email,
              password,
              photo: url,
              country,
              phone,
              state,
              occupation,
              city: "",
              aboutMe: "",
              postalCode: "",
              gender: "",
              status: "Active",
              accessCode: "",
              accessCodeProve: "",
              isAdmin: false,
              profit: "",
              address: "",
              uid: auth.currentUser?.uid || null,
              date: serverTimestamp(),
              mainBalance: "0000",
              initialDeposit: "0000",
              interestBalance: "20",
              verified: false,
              verificationCode: "",
              disbleWithdrawal: true,
            });
            
            await addDoc(collection(db,`transactions/${"jgukhk"}/transactionDatas`), {
              slNo: Math.ceil(Math.random() + new Date().getSeconds()),
              uid: res.user?.uid, 
              amount: "$20",
              type:"Interest Added" ,       
              remarks : `You have successfully received $20 interest`,
              date: serverTimestamp(),
              firstname: firstname,
              photo:url,
              status: "success",
              accessCodeProve: "",
              filterDate: new Date().toLocaleDateString(),
            })
           
            const noteData = {
              title: "Welcome",
              text: "Welcome to cryptonomize"
            }
            await createNotification(noteData)
         
            formik.resetForm();
            formik.setSubmitting(false);
            Toast.success
              .fire({ text: "Sign up success" })
              .then(() => location.assign("/login"));
          } catch (err: any) {
            formik.setSubmitting(false);
            formik.resetForm();
            Toast.error.fire({ text: err.message  });
          }
      
    } catch (err: any) {
      formik.setSubmitting(false);
      formik.resetForm();
      const msg = err.code.split("/")[1]
      Toast.error.fire({ text: msg });
    }
  }


  return (
    <div className="min-h-screen footer-bg homepage-3 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-20 bg-[#322194] shadow sm:rounded-lg flex justify-center flex-1 flex-wrap">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-2xl font-black uppercase text-white">
              Sign Up
            </h1>

            <form className="w-full flex-1 mt-8 " onSubmit={formik.handleSubmit}>
              <div className="mx-auto max-w-xl  relative ">
                <div className="flex space-x-2">
                  <div>

                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-transparent border border-[#304ffe] placeholder-white text-sm focus:outline-none focus:bg-opacity-10 text-white mt-4"
                    type="text"
                    placeholder="Enter firstname"
                    {...formik.getFieldProps("firstname")}
                    />
                     {formik.touched.firstname &&
                      formik.errors.firstname ? (
                        <div className="text-red-500 mb-2">
                          {formik.errors.firstname}
                        </div>
                      ) : null}
                    </div>
                    <div>

                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-transparent border border-[#304ffe] placeholder-white text-sm focus:outline-none focus:bg-opacity-10 text-white mt-4"
                    type="text"
                    placeholder="Enter lastname"
                    {...formik.getFieldProps("lastname")}
                  />
                   {formik.touched.lastname &&
                      formik.errors.lastname ? (
                        <div className="text-red-500 mb-2">
                          {formik.errors.lastname}
                        </div>
                      ) : null}
                    </div>
                </div>
                <div className="flex space-x-2">
                  <div>

                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-transparent border border-[#304ffe] placeholder-white text-sm focus:outline-none focus:bg-opacity-10 text-white mt-4"
                    type="email"
                    placeholder="Enter email"
                    {...formik.getFieldProps("email")}
                  />
                   {formik.touched.email &&
                      formik.errors.email ? (
                        <div className="text-red-500 mb-2">
                          {formik.errors.email}
                        </div>
                      ) : null}
                  </div>
                  <div>

                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-transparent border border-[#304ffe] placeholder-white text-sm focus:outline-none focus:bg-opacity-10 text-white mt-4"
                    type="tel"
                    placeholder="Enter number"
                   {...formik.getFieldProps("phone")}
                  />
                   {formik.touched.phone &&
                      formik.errors.phone ? (
                        <div className="text-red-500 mb-2">
                          {formik.errors.phone}
                        </div>
                      ) : null}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <div>
                    
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-transparent border border-[#304ffe] placeholder-white text-sm focus:outline-none focus:bg-opacity-10 text-white mt-4"
                    type="password"
                    placeholder="Enter password"
                    {...formik.getFieldProps("password")}
                  />
                   {formik.touched.password &&
                      formik.errors.password ? (
                        <div className="text-red-500 mb-2">
                          {formik.errors.password}
                        </div>
                      ) : null}
                  </div>
                  <div>

                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-transparent border border-[#304ffe] placeholder-white text-sm focus:outline-none focus:bg-opacity-10 text-white mt-4"
                    type="password"
                    placeholder="Confirm Password"
                    {...formik.getFieldProps("password1")}
                  />
                   {formik.touched.password1 &&
                      formik.errors.password1 ? (
                        <div className="text-red-500 mb-2">
                          {formik.errors.password1}
                        </div>
                      ) : null}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <div>
                  <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-transparent border border-[#304ffe] placeholder-white text-sm focus:outline-none focus:bg-opacity-10 text-white mt-4"
                  type="text"
                  placeholder="Enter country"
                {...formik.getFieldProps("country")}
                />
                 {formik.touched.country &&
                      formik.errors.country ? (
                        <div className="text-red-500 mb-2">
                          {formik.errors.country}
                        </div>
                      ) : null}

                  </div>

                  <div>
                  <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-transparent border border-[#304ffe] placeholder-white text-sm focus:outline-none focus:bg-opacity-10 text-white mt-4"
                  type="text"
                  placeholder=" Enter state"
                  {...formik.getFieldProps("state")}
                />
                 {formik.touched.state &&
                      formik.errors.state ? (
                        <div className="text-red-500 mb-2">
                          {formik.errors.state}
                        </div>
                      ) : null}
                  </div>

                  </div>
                  <div className="flex space-x-2">
                  <div>
               
               
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-transparent border border-[#304ffe] placeholder-white text-sm focus:outline-none focus:bg-opacity-10 text-white mt-4"
                  type="text"
                  placeholder="Enter occupation"
                  {...formik.getFieldProps("occupation")}
                />
                 {formik.touched.occupation &&
                      formik.errors.occupation ? (
                        <div className="text-red-500 mb-2">
                          {formik.errors.occupation}
                        </div>
                      ) : null}
                      </div>
                      <div>
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-transparent border border-[#304ffe] placeholder-white text-sm focus:outline-none focus:bg-opacity-10 text-white mt-4"
                  type="file"
                  placeholder="Your Photo"
                  onChange={(e) => formik.setFieldValue("photo", e.target.files && e.target.files[0])}
                />
                 {formik.touched.photo &&
                      formik.errors.photo ? (
                        <div className="text-red-500 mb-2">
                          {formik.errors.photo}
                        </div>
                      ) : null}
                  </div>
                  </div>
                <button
                  disabled={formik.isSubmitting}
                  type="submit"
                  className="mt-4 uppercase tracking-wide font-semibold bg-[#304ffe] text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  <i className="fas fa-user-plus fa 1x w-6  -ml-2" />
                  <span className="ml-3">{formik.isSubmitting ? 'Submitting...': "Sign Up"}</span>
                </button>
                <div className="my-12 border-b text-center">
                  <div className="leading-none px-2 inline-block text-md text-indigo-400 tracking-wide font-medium transform translate-y-1/2">
                    OR
                  </div>
                </div>
                <div className="mx-auto mx-w-sm w-full">
                  <Link
                    className="mt-4 max-w-full uppercase tracking-wide font-semibold bg-[#304ffe] text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center hover:text-white focus:shadow-outline focus:outline-none"
                    href="/login"
                  >
                    <i className="fas fa-sign-in-alt fa 1x w-6  -ml-2 text-indigo-500" />
                    <span className="ml-4">Sign In</span>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* <div className=" h-[60%] bg-indigo-100 text-center sm:hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full  bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(/assets/svg/auth.svg)` }}
          ></div>
        </div> */}
      </div>
    </div>
  )
}

export default Register
