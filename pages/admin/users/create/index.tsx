import React from 'react'
import AdminHero from '@/components/admin/AdminHero'
import AdminNavbar from '@/components/admin/AdminNavbar'
import AdminSidebar from '@/components/admin/AdminSidebar'
import FooterAdmin from '@/components/admin/FooterAdmin'
import Layout from '@/components/Layout'
import { useFormik } from 'formik'
import * as Yup from "yup"
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db, storage } from '@/db/firebaseDb'
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage'
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore'
import createNotification from '@/utils/createNotification'
import Toast from '@/utils/Alert'
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

function Index() {

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
    <>

      <AdminNavbar />

      <div className="flex">
        <AdminSidebar />

        <div className="w-full">
            <div className=" min-h-screen mb-10 ">
          <Layout>
            <AdminHero title="Create" />
            <div className=" mt-10 " />
            <section className="c-bg rounded-md px-4 py-3">
            <form className="" onSubmit={formik.handleSubmit}>
              <div className=" row ">
                <div className="col-12 col-lg-6 ">
              

                  <input
                    className="w-full px-2 py-3 rounded-md font-medium bg-transparent border border-[#304ffe] placeholder-white text-sm focus:outline-none focus:bg-opacity-10 text-white mt-4"
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
                    <div className="col-12 col-lg-6 ">

                  <input
                    className="w-full px-2 py-3 rounded-md font-medium bg-transparent border border-[#304ffe] placeholder-white text-sm focus:outline-none focus:bg-opacity-10 text-white mt-4"
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
                
                
                    <div className="col-12 col-lg-6 ">

                  <input
                    className="w-full  px-2 py-3 rounded-md font-medium bg-transparent border border-[#304ffe] placeholder-white text-sm focus:outline-none focus:bg-opacity-10 text-white mt-4"
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
                  <div className="col-12 col-lg-6 ">

                  <input
                    className="w-full px-2 py-3 rounded-md font-medium bg-transparent border border-[#304ffe] placeholder-white text-sm focus:outline-none focus:bg-opacity-10 text-white mt-4"
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
                
               
                  <div className="col-12 col-lg-6 ">
                    
                  <input
                    className="w-full  px-2 py-3 rounded-md font-medium bg-transparent border border-[#304ffe] placeholder-white text-sm focus:outline-none focus:bg-opacity-10 text-white mt-4"
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
                  <div className="col-12 col-lg-6 ">

                  <input
                    className="w-full px-2 py-3 rounded-md font-medium bg-transparent border border-[#304ffe] placeholder-white text-sm focus:outline-none focus:bg-opacity-10 text-white mt-4"
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
             
                  <div className="col-12 col-lg-6 ">
                  <input
                  className="w-full px-2 py-3 rounded-md font-medium bg-transparent border border-[#304ffe] placeholder-white text-sm focus:outline-none focus:bg-opacity-10 text-white mt-4"
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

                  <div className="col-12 col-lg-6 ">
                  <input
                  className="w-full px-2 py-3 rounded-md font-medium bg-transparent border border-[#304ffe] placeholder-white text-sm focus:outline-none focus:bg-opacity-10 text-white mt-4"
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

                
                  
                  <div className="col-12 col-lg-6 ">
               
               
                <input
               className="w-full px-2 py-3 rounded-md font-medium bg-transparent border border-[#304ffe] placeholder-white text-sm focus:outline-none focus:bg-opacity-10 text-white mt-4"
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
                      <div className="col-12 col-lg-6 ">
                <input
                  className="w-full px-2 py-3 rounded-md font-medium bg-transparent border border-[#304ffe] placeholder-white text-sm focus:outline-none focus:bg-opacity-10 text-white mt-4"
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
                 <div className="col-12">
                <button
                  disabled={formik.isSubmitting}
                  type="submit"
                  className="mt-4 w-full uppercase tracking-wide font-semibold bg-gradient-to-tr from-light-blue-500  to-light-blue-700 text-gray-100  py-3 rounded-md hover:bg-indigo-700 transition-all duration-300 ease-in-out  focus:shadow-outline focus:outline-none"
                >
                {formik.isSubmitting ? 'Submitting...': "Create"}
                </button>
                 </div>
                  
               
              
              </div>
            </form>
            </section>
            </Layout>
            

            </div>
             <FooterAdmin />
            </div>
            </div>
            </>
  )
}

export default Index

Index.defaultProps ={
  needsAuth: true,
  isAdmin: true

}