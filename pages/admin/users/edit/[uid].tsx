import React, { useEffect, useState } from 'react'
import SettingsForm from '@/components/SettingsForm'
import ProfileCard from '@/components/ProfileCard'
import Sidebar from '@/components/user/Sidebar'
import AdminNavbar from '@/components/admin/AdminNavbar'
import UserHero from '@/components/user/UserHero'
import Layout from '@/components/Layout'
import FooterAdmin from '@/components/admin/FooterAdmin'
import { useRouter } from 'next/router'
import { RootState } from '@/redux/store'
import { doc, DocumentData, getDoc, updateDoc } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from "yup"
import { auth, db, storage } from '@/db/firebaseDb'
import Toast from '@/utils/Alert'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { signInWithEmailAndPassword, updatePassword, User } from 'firebase/auth'

function Index() {
  
  const { uid } = useRouter().query;

  const [userForEdit, setUserForEdit] = useState<DocumentData | null | undefined>(null)
  
  //this is the admin now?!!!
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const [tabs, setTabs] = useState({
    password: false,
    user: true,
  });
  const [file, setFile] = useState<Blob | File | null>(null);
  const [fileLoading, setFileLoading] = useState(false);

  
  const formikPass = useFormik({
    initialValues: {
      password1: "",
      password2: "",
    },
    validationSchema: Yup.object({
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
      country: "",
      address: "",
      password: ""
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .trim()
        .required("Email required")
        .lowercase(),
        password: Yup.string(),
      firstname: Yup.string().lowercase().trim().required("Firstname required"),
      lastname: Yup.string().lowercase().trim().required("Lastname required"),
      occupation: Yup.string()
        .lowercase()
        .trim()
        .required("Occupation required"),
      country: Yup.string().lowercase().trim().required("Country required"),
      address: Yup.string(),
      phone: Yup.string().required("Phone number required"),
    }),

    onSubmit: (values) => handleSubmit(values),
  });
  
 


  const updatePhoto = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFileLoading(true);
    try {
      const storageRef = ref(storage, `${uid}`);
      await uploadBytes(storageRef, file as Blob | Uint8Array | ArrayBuffer);
      const url = await getDownloadURL(storageRef);

      await updateDoc(doc(db, "users", uid as string), {
        photo: url,
      });
      setFileLoading(false);
      Toast.success.fire({ text: "Update successful" });
    } catch (err: any) {
      setFileLoading(false);
      Toast.error.fire({ text: err.message });
    }
  };

  const handleSubmit = async (val: any) => {
    const { firstname, lastname, occupation, phone, country, address } = val;
    formik.setSubmitting(true);

    try {
      //create user on firestore
      await updateDoc(doc(db, "users", uid as string), {
        firstname,
        lastname,
        occupation,
        phone,
        country,
        address,
      });

      
      formik.setSubmitting(false);
      Toast.success.fire({ text: "update success" });
    } catch (err: any) {
      formik.setSubmitting(false);
    
      Toast.error.fire({ text: err.message });
    }
  };
  const handleSubmitPassword = async (val: any) => {
    formikPass.setSubmitting(true);

    try {
      await signInWithEmailAndPassword(
        auth,
        formik.values?.email,
        formik.values?.password
      );
      await updatePassword(auth.currentUser as User, val.password1);
      await signInWithEmailAndPassword(
        auth,
        currentUser?.email,
        currentUser?.password
      );

      formikPass.resetForm();
      formikPass.setSubmitting(false);
      Toast.success.fire({ text: "password successfully updated" });
    } catch (err: any) {
      formikPass.setSubmitting(false);
      formikPass.resetForm();
      Toast.error.fire({ text: err.message });
    }
  };
  
    return (
      <>
  
        <AdminNavbar/>
       
      <div className='flex '>
      <Sidebar />
      <div className='w-full'>
        <Layout>
        <UserHero title='Profile' />
  
          <div className="container-fluid  homepage-3 max-w-full">
            <div className="grid grid-cols-1 xl:grid-cols-6 gap-5">
              <div className="xl:col-start-1 xl:col-end-5  mb-16 lg:mt-0 mt-8">
                <SettingsForm user={userForEdit}  />
              </div>
              <div className="xl:col-start-5 xl:col-end-7  mb-16 lg:mt-0 mt-8">
                <ProfileCard action  user={userForEdit} id={uid}  />
              </div>
            </div>
          </div>
        </Layout>
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