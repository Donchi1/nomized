import React, { useEffect, useState } from 'react'
import * as Yup from "yup"
import {Card} from '@material-tailwind/react'
import {CardHeader} from '@material-tailwind/react'
import {CardBody} from '@material-tailwind/react'
import {Button} from '@material-tailwind/react'

import { useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { RootState } from '@/redux/store'
import { auth, db } from '@/db/firebaseDb'
import { doc, DocumentData, updateDoc } from 'firebase/firestore'
import Toast from '@/utils/Alert'
import createNotification from '@/utils/createNotification'
import { updatePassword, User } from 'firebase/auth'


type userUpdateType ={
  email:string,
  firstname:string,
  lastname:string,
  occupation:string,
  phone:string,
  state:string,
  country:string,
  address:string,
  aboutMe:string,
  postalCode:string,
  city:string
}
type userUpdatePassType ={
  currentPassword: string,
      password1: string,
      password2: string,
}

export default function SettingsForm({user}: {user: DocumentData | null | undefined}) {
 

  const [tabs, setTabs] = useState({
    password: false,
    user: true,
  });



  const formikPass = useFormik({
    initialValues: {
      currentPassword: "",
      password1: "",
      password2: "",
    }as userUpdatePassType,
    validationSchema: Yup.object({
      currentPassword: Yup.string()
        .min(5, "password must be greater than 5")
        .max(30, "password must not exceed 30 characters")
        .required("Password required"),
      password1: Yup.string()
        .min(5, "password must be greater than 5")
        .max(30, "password must not exceed 30 characters")
        .required("Password required"),
      password2: Yup.string()
        .required()
        .oneOf([Yup.ref("password1"), ""], "Your password do not match"),
    }),
    onSubmit: (val) => handleSubmitPassword(val),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      firstname: "",
      lastname: "",
      occupation: "",
      phone: "",
      state: "",
      country: "",
      address: "",
      aboutMe: "",
      postalCode: "",
      city: ""
    } as userUpdateType,

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .trim()
        .lowercase(),
      firstname: Yup.string().lowercase().trim().required("Firstname required"),
      lastname: Yup.string().lowercase().trim().required("Lastname required"),
      occupation: Yup.string()
        .lowercase()
        .trim()
        .required("Occupation required"),
      country: Yup.string().lowercase().trim().required("Country required"),
      address: Yup.string(),
      state: Yup.string(),
      city: Yup.string(),
      aboutMe: Yup.string(),
      postalCode: Yup.string(),
      phone: Yup.string().required("Phone number required"),
    }),

    onSubmit: (values) => handleSubmit(values)
  });


 useEffect(() => {
  formik.setValues({
    firstname: user?.firstname,
    lastname: user?.lastname,
    occupation: user?.occupation,
    aboutMe: user?.aboutMe,
    state: user?.state,
    country: user?.country,
    email: user?.email,
    phone: user?.phone,
    postalCode: user?.postalCode,
    city: user?.city,
    address: user?.address,
  })
   
  }, [user])


 




  const handleSubmit = async(value: userUpdateType) => {

   
      const {  firstname,
      lastname,
      occupation,
      phone,
      country,
      aboutMe,
      city,
      postalCode,
      state,
      address} = value
      formik.setSubmitting(true);
  
      try {
        //update user info on firestore
     
        await updateDoc(doc(db, "users", auth.currentUser?.uid as string), {
          firstname,
          lastname,
          occupation,
          phone,
          country,
          address,
          aboutMe,
          state,
          postalCode,
          city
        });
        await createNotification({
          text: "Profile successfully updated",
          title: "Profile Update",
        });
        formik.setSubmitting(false);
        Toast.success.fire({ text: "update success" });
      } catch (err : any) {
        formik.setSubmitting(false);
        Toast.error.fire({ text: err.message });
      }
    
  }

  

  const handleSubmitPassword = async (val: userUpdatePassType) => {
    formikPass.setSubmitting(true);

    try {
      
      await updatePassword(auth.currentUser as User, val.password1);
      await createNotification({
        text: "Password successfully updated",
        title: "Password Update",
      });
      formikPass.resetForm();
      formikPass.setSubmitting(false);
      Toast.success.fire({ text: "password successfully updated" });
    } catch (err : any) {
      formikPass.setSubmitting(false);
      formikPass.resetForm();
      const msg = err.code.split("/")[1]
      Toast.error.fire({ text: msg });
    }
  };


 

  return (
    <Card className="c-bg">
     
      <CardBody>
        <form onSubmit={formik.handleSubmit}>
          <h6 className="text-red-500 text-xl mt-3 mb-3 font-light uppercase">
            User Information
          </h6>
          <div className="row ">
            
            <div className="col-lg-6 col-sm-12  mb-3 font-light">
              <input
                className="w-full px-8 py-3 rounded-md font-medium bg-transparent border border-[#304ffe]  text-sm focus:outline-none focus:bg-opacity-10 text-white mt-2"
                type="tel"
                color="red"
                placeholder="Phone"
                {...formik.getFieldProps("phone")}
                />
                 {formik.touched.phone &&
                        formik.errors.phone? (
                          <div className="text-red-500 mb-2 mt-2">
                            {formik.errors.phone}
                          </div>
                        ) : null}
            </div>
            <div className="col-lg-6 col-sm-12  mb-6 font-light">
              <input
                className="w-full px-8 py-3 rounded-md font-medium bg-transparent border border-[#304ffe] text-white text-sm focus:outline-none focus:bg-opacity-10  mt-2"
                type="email"
                color="red"
                placeholder="Email Address"
                disabled
                {...formik.getFieldProps("email")}
                />
                 {formik.touched.email &&
                        formik.errors.email? (
                          <div className="text-red-500 mb-2 mt-2">
                            {formik.errors.email}
                          </div>
                        ) : null}
            </div>
            <div className="col-lg-6 col-sm-12  mb-6 font-light">
              <input
                type="text"
                color="red"
                className="w-full px-8 py-3 rounded-md font-medium bg-transparent border border-[#304ffe] text-white text-sm focus:outline-none focus:bg-opacity-10  mt-2"
                placeholder="FirstName"
                {...formik.getFieldProps("firstname")}
                />
                 {formik.touched.firstname &&
                        formik.errors.firstname? (
                          <div className="text-red-500 mb-2 mt-2">
                            {formik.errors.firstname}
                          </div>
                        ) : null}
            </div>
            <div className="col-lg-6 col-sm-12 mb-6 font-light">
              <input
                className="w-full px-8 py-3 rounded-md font-medium bg-transparent border border-[#304ffe] text-white text-sm focus:outline-none focus:bg-opacity-10  mt-2"
                type="text"
                color="red"
                placeholder="LastName"
                {...formik.getFieldProps("lastname")}
                />
                 {formik.touched.lastname &&
                        formik.errors.lastname? (
                          <div className="text-red-500 mb-2 mt-2">
                            {formik.errors.lastname}
                          </div>
                        ) : null}
            </div>
          </div>

          <h6 className="text-red-500 text-xl mb-3 mt-2 font-light uppercase">
            Contact Information
          </h6>
          <div className="row ">
            <div className="col-12 mb-6 font-light">
              <input
                className="w-full px-8 py-3 rounded-md font-medium bg-transparent border border-[#304ffe] text-white text-sm focus:outline-none focus:bg-opacity-10  mt-2"
                type="text"
                color="red"
                placeholder="Address"
                {...formik.getFieldProps("address")}
                />
                 {formik.touched.address &&
                        formik.errors.address? (
                          <div className="text-red-500 mb-2 mt-2">
                            {formik.errors.address}
                          </div>
                        ) : null}
            </div>
            <div className="col-lg-4 col-sm-12  mb-6 font-light">
              <input
                className="w-full px-8 py-3 rounded-md font-medium bg-transparent border border-[#304ffe] text-white text-sm focus:outline-none focus:bg-opacity-10  mt-2"
                type="text"
                color="red"
                placeholder="City"
                {...formik.getFieldProps("city")}
                />
                 {formik.touched.city &&
                        formik.errors.city? (
                          <div className="text-red-500 mb-2 mt-2">
                            {formik.errors.city}
                          </div>
                        ) : null}
            </div>
            <div className="col-lg-4 col-sm-12  mb-6 font-light">
              <input
                className="w-full px-8 py-3 rounded-md font-medium bg-transparent border border-[#304ffe] text-white text-sm focus:outline-none focus:bg-opacity-10  mt-2"
                type="text"
                color="red"
                placeholder="Country"
                {...formik.getFieldProps("country")}
                />
                 {formik.touched.country &&
                        formik.errors.country? (
                          <div className="text-red-500 mb-2 mt-2">
                            {formik.errors.country}
                          </div>
                        ) : null}
            </div>
            <div className="col-lg-4 col-sm-12  mb-6 font-light">
              <input
                className="w-full px-8 py-3 rounded-md font-medium bg-transparent border border-[#304ffe] text-white text-sm focus:outline-none focus:bg-opacity-10  mt-2"
                type="text"
                color="red"
                placeholder="State"
                {...formik.getFieldProps("state")}
                />
                 {formik.touched.state &&
                        formik.errors.state? (
                          <div className="text-red-500 mb-2 mt-2">
                            {formik.errors.state}
                          </div>
                        ) : null}
            </div>
            <div className="col-lg-6  mb-6 font-light">
              <input
                type="text"
                className="w-full px-8 py-3 rounded-md font-medium bg-transparent border border-[#304ffe] text-white text-sm focus:outline-none focus:bg-opacity-10  mt-2"
                color="red"
                placeholder="Occupation"
                {...formik.getFieldProps("occupation")}
              />
               {formik.touched.occupation &&
                      formik.errors.occupation? (
                        <div className="text-red-500 mb-2 mt-2">
                          {formik.errors.occupation}
                        </div>
                      ) : null}
            </div>
            <div className="col-lg-6 col-sm-12 mb-8 font-light">
              <input
                type="text"
                color="red"
                className="w-full px-8 py-3 rounded-md font-medium bg-transparent border border-[#304ffe] text-white text-sm focus:outline-none focus:bg-opacity-10  mt-2"
                placeholder="Postal Code"
                {...formik.getFieldProps("postalCode")}
              />
               {formik.touched.postalCode &&
                      formik.errors.postalCode? (
                        <div className="text-red-500 mb-2 mt-2">
                          {formik.errors.postalCode}
                        </div>
                      ) : null}
            </div>
          </div>

          <h6 className="text-red-500 text-xl  font-light uppercase">
            About Me
          </h6>
          <div className="row  mt-6 font-light">
            <div className="col-12">
              <textarea
                color="red"
                placeholder="About Me"
                className="w-full px-8 py-3 rounded-md font-medium bg-transparent border border-[#304ffe] text-white text-sm focus:outline-none focus:bg-opacity-10  mt-2"
                cols={5}
                rows={5}
                {...formik.getFieldProps("aboutMe")}
              />
               {formik.touched.aboutMe &&
                      formik.errors.aboutMe? (
                        <div className="text-red-500 mb-2 mt-2">
                          {formik.errors.aboutMe}
                        </div>
                      ) : null}
            </div>
          </div>
          <div className="flex flex-wrap  font-light">
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="mt-4 tracking-wide font-semibold bg-gradient-to-tr from-light-blue-500  to-light-blue-700 text-gray-100 w-full py-3 rounded-md hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
            >
             {formik.isSubmitting ? "Submitting..." : "Update"}
            </button>
          </div>
        </form>
        <form onSubmit={formikPass.handleSubmit}>
          <h6 className="text-red-500 text-xl my-6 font-light uppercase">
            Password
          </h6>
          <div className="row ">
            <div className="col-6 mb-8 font-light">
              <input
                className="w-full px-8 py-3 rounded-md font-medium bg-transparent border border-[#304ffe] text-white text-sm focus:outline-none focus:bg-opacity-10  mt-2"
                type="password"
                color="red"
                placeholder="Current password"
                {...formikPass.getFieldProps("currentPassword")}
              />
                {formikPass.touched.currentPassword &&
                      formikPass.errors.currentPassword? (
                        <div className="text-red-500 mb-2 mt-2">
                          {formikPass.errors.currentPassword}
                        </div>
                      ) : null}
            </div>
            <div className="col-6 mb-6 font-light">
              <input
                type="password"
                color="red"
                className="w-full px-8 py-3 rounded-md font-medium bg-transparent border border-[#304ffe] text-white text-sm focus:outline-none focus:bg-opacity-10  mt-2"
                placeholder="New Password"
                {...formikPass.getFieldProps("password1")}
                />
                  {formikPass.touched.password1 &&
                        formikPass.errors.password1? (
                          <div className="text-red-500 mb-2 mt-2">
                            {formikPass.errors.password1}
                          </div>
                        ) : null}
            </div>
            <div className="col-6  mb-6 font-light">
              <input
                type="password"
                color="red"
                className="w-full px-8 py-3 rounded-md font-medium bg-transparent border border-[#304ffe] text-white text-sm focus:outline-none focus:bg-opacity-10  mt-2"
                placeholder="Repeat Password"
                {...formikPass.getFieldProps("password2")}
                />
                  {formikPass.touched.password2 &&
                        formikPass.errors.password2? (
                          <div className="text-red-500 mb-2 mt-2">
                            {formikPass.errors.password2}
                          </div>
                        ) : null}
              
            </div>
            <div className="w-full lg:w-12/12 pr-4  font-light">
              <button
                type="submit"
                disabled={formikPass.isSubmitting}
                className="mt-4 tracking-wide font-semibold bg-gradient-to-tr from-light-blue-500  to-light-blue-700 text-gray-100 w-full py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
              >
                {formikPass.isSubmitting ? "Submitting..." : "Update"}
              </button>
            </div>
          </div>
        </form>
      </CardBody>
    </Card>
  )
}
