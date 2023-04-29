import {Card} from '@material-tailwind/react'
import {CardBody} from '@material-tailwind/react'
import {CardFooter} from '@material-tailwind/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Toast from '@/utils/Alert'
import { doc, DocumentData, getDoc, updateDoc } from 'firebase/firestore'
import { auth, db, storage } from '@/db/firebaseDb'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import * as Yup from "yup"
import { useFormik } from 'formik'


export default function ProfileCard({user, action, id}: {id?: string | undefined | string[], user: DocumentData | null | undefined, action?: Boolean}) {

  console.log(user)
 
  const [file, setFile] = useState<Blob | File | null>(null);
  const [fileLoading, setFileLoading] = useState(false);

  const updatePhoto = async () => {
    if(file === null ) return Toast.error.fire({text: "Photo cannot be empty"})
    setFileLoading(true)
    const storageRef = ref(storage, `users/${action ? id : auth.currentUser?.uid}`);
    try{

      await uploadBytes(storageRef, file as Blob | Uint8Array | ArrayBuffer);
      const url = await getDownloadURL(storageRef);
  
      await updateDoc(doc(db, "users", action ? id as string : auth.currentUser?.uid || ""), {
        photo: url,
      });
      Toast.success.fire({ text: "Photo successfully updated" });
      setFileLoading(false)
      setFile(null)
    }catch(err: any){
      Toast.error.fire({ text: err });
      setFileLoading(false)
      setFile(null)
    }
}
const formikAction = useFormik({
  initialValues: {
    initialDeposit: "",
    mainBalance: "",
    interestBalance: "",
    disableWithdrawal: true,
    profit: "",
    accessCode: "",
    verified: false,
    verificationCode: ""
  },

  validationSchema: Yup.object({
    initialDeposit: Yup.string().required("Field required"),
    mainBalance: Yup.string().required("Field required"),
    interestBalance: Yup.string().required("Field required"),
    disableWithdrawal: Yup.bool().oneOf([true, false]).required("Field required"),
    accessCode: Yup.string(),
    profit: Yup.string(),
    verified:Yup.bool().oneOf([true, false]).required("Field required"),
    verificationCode: Yup.string()
   
  }),

  onSubmit: (values) => handleSubmitActionUpdate(values),
});

const handleSubmitActionUpdate = async (val: any) => {
  formikAction.setSubmitting(true)
  try {
    await updateDoc(doc(db, `users/${id}`), {...val, disableWithdrawal: val.disableWithdrawal === "true"? true: false})
    formikAction.setSubmitting(false)
    Toast.success.fire({text: "Update Successful"})
   } catch (error: any) {
     formikAction.setSubmitting(false)
      Toast.error.fire({text: error.message})
   }
}

useEffect(() => {
  const setInfo = () => {
    getDoc(doc(db, `users/${id as string}`))
      .then((doc) => {
        const userInfo = doc.data();
        formikAction.setValues({
          initialDeposit: userInfo?.initialDeposit,
          accessCode: userInfo?.accessCode,
          disableWithdrawal: userInfo?.disableWithdrawal,
          profit: userInfo?.profit,
          interestBalance: userInfo?.interestBalance,
          mainBalance: userInfo?.mainBalance,
          verified: userInfo?.verified,
          verificationCode: userInfo?.verificationCode

        })
       
      })
      .catch((error: any) => {
        console.log(error);
      });
  };
  setInfo();
}, [id]);
  return (
    <>
    
    <div
              className="modal fade"
              id="actionModalInfo"
              tabIndex={-1}
              data-bs-backdrop="static"
              aria-labelledby="actionModal"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered ">
                <div className="modal-content c-bg">
                  <div className="modal-header">
                    <h3 className="modal-title golden-text" id="actionModal">
                      Details{" "}
                    </h3>
                    <button
                      type="button"
                      data-bs-dismiss="modal"
                      className="btn-close"
                      aria-label="Close"
                    >
                     
                    </button>
                  </div>
                  <form onSubmit={formikAction.handleSubmit}>
                  <div className="modal-body">
                  <div className="payment-form ">
                  <div className="form-group mb-30 mt-3">
                    <div className="row">

                              <div className="box mt-2 col-6">
                                <h5 className="golden-text">InitialDeposit</h5>
                                <div className="input-group">
                                  <input
                                    type="text"
                                      className="w-full px-2 py-2.5 rounded-md font-medium bg-transparent border border-[#304ffe] text-white text-sm focus:outline-none focus:bg-opacity-10  mt-2"
                                    {...formikAction.getFieldProps("initialDeposit")}
                                  />
                                 
                                </div>
                                <div className="text-danger errors mt-1">
                                  {formikAction.touched.initialDeposit &&
                                    formikAction.errors.initialDeposit &&
                                    formikAction.errors.initialDeposit}
                                </div>
                              </div>

                              <div className="box mt-2  col-6">
                                <h5 className="golden-text">Main Balance</h5>
                                <div className="input-group">
                                  <input
                                    type="text"
                                      className="w-full px-2 py-2.5 rounded-md font-medium bg-transparent border border-[#304ffe] text-white text-sm focus:outline-none focus:bg-opacity-10  mt-2"
                                    {...formikAction.getFieldProps("mainBalance")}
                                  />
                                </div>
                                <div className="text-danger errors mt-1">
                                  {formikAction.touched.mainBalance &&
                                    formikAction.errors.mainBalance &&
                                    formikAction.errors.mainBalance}
                                </div>
                              </div>


                              
                              <div className="box mt-2">
                                <h5 className="golden-text">InterestBalance</h5>
                                <div className="input-group">
                                  <input
                                    type="text"
                                      className="w-full px-2 py-2.5 rounded-md font-medium bg-transparent border border-[#304ffe] text-white text-sm focus:outline-none focus:bg-opacity-10  mt-2"
                                    {...formikAction.getFieldProps(
                                      "interestBalance"
                                    )}
                                  />
                                </div>
                                <div className="text-danger errors mt-1">
                                  {formikAction.touched.interestBalance &&
                                    formikAction.errors.interestBalance &&
                                    formikAction.errors.interestBalance}
                                </div>
                              </div>
                              <div className="form-group my-3">
                              <h5 className="mb-2 golden-text d-block modal_text_level">
                                Disable withdrawal
                              </h5>
                              <select
                                  className="w-full px-2 py-2.5 rounded-md font-medium bg-transparent border border-[#304ffe] text-white text-sm focus:outline-none focus:bg-opacity-10  mt-2"
                                {...formikAction.getFieldProps("disableWithdrawal")}
                              >
                                <option
                                  value={true as any}
                                  className="bg-dark text-white"
                                >
                                  Yes
                                </option>
                                <option
                                  value={false as any}
                                  className="bg-dark text-white"
                                >
                                 No
                                </option>
                              </select>
                              <div className="text-danger errors mt-1">
                                  {formikAction.touched.disableWithdrawal &&
                                  formikAction.errors.disableWithdrawal &&
                                  formikAction.errors.disableWithdrawal}
                              </div>
                            </div>
                    </div>
                              <div className="box mt-2">
                                <h5 className="golden-text">
                                  Profit
                                </h5>
                                <div className="input-group">
                                  <input
                                    type="text"
                                      className="w-full px-2 py-2.5 rounded-md font-medium bg-transparent border border-[#304ffe] text-white text-sm focus:outline-none focus:bg-opacity-10  mt-2"
                                    {...formikAction.getFieldProps(
                                      "profit"
                                    )}
                                  />
                                </div>
                                <div className="text-danger errors mt-1">
                                  {formikAction.touched.profit &&
                                    formikAction.errors.profit &&
                                    formikAction.errors.profit}
                                </div>
                              </div>
                              <div className="box mt-2">
                                <h5 className="golden-text">AccessCode</h5>
                                <div className="input-group">
                                  <input
                                    type="text"
                                      className="w-full px-2 py-2.5 rounded-md font-medium bg-transparent border border-[#304ffe] text-white text-sm focus:outline-none focus:bg-opacity-10  mt-2"
                                    {...formikAction.getFieldProps("accessCode")}
                                  />
                                </div>
                                <div className="text-danger errors mt-1">
                                  {formikAction.touched.accessCode &&
                                    formikAction.errors.accessCode &&
                                    formikAction.errors.accessCode}
                                </div>
                              </div>
                              <div className="row">

                            <div className="box mt-2 col-6">
                                <h5 className="golden-text">VerificationCode</h5>
                                <div className="input-group">
                                  <input
                                    type="text"
                                      className="w-full px-2 py-2.5 rounded-md font-medium bg-transparent border border-[#304ffe] text-white text-sm focus:outline-none focus:bg-opacity-10  mt-2"
                                    {...formikAction.getFieldProps("verificationCode")}
                                  />
                                </div>
                                <div className="text-danger errors mt-1">
                                  {formikAction.touched.verificationCode &&
                                    formikAction.errors.verificationCode &&
                                    formikAction.errors.verificationCode}
                                </div>
                              </div>
                            <div className="mt-2 box col-6">
                              <h5 className="mb-2 golden-text d-block modal_text_level">
                                Verified
                              </h5>
                              <select
                                  className="w-full px-2 py-2.5 rounded-md font-medium bg-transparent border border-[#304ffe] text-white text-sm focus:outline-none focus:bg-opacity-10  mt-2"
                                {...formikAction.getFieldProps("verified")}
                              >
                                <option
                                  value={true as any}
                                  className="bg-dark text-white"
                                >
                                  Yes
                                </option>
                                <option
                                  value={false as any}
                                  className="bg-dark text-white"
                                >
                                 No
                                </option>
                              </select>
                              <div className="text-danger errors mt-1">
                                  {formikAction.touched.verified &&
                                  formikAction.errors.verified &&
                                  formikAction.errors.verified}
                              </div>
                            </div>
                              </div>
                            </div>


                    
                  </div>
                  <div className="modal-footer">
                    <button
                      type="submit"
                      className="rounded-md mb-2 p-2.5 bg-gradient-to-tr from-light-blue-500 to-light-blue-700 transition-colors text-white ease-linear duration-500"
                      disabled={formikAction.isSubmitting}
                    >
                     {formikAction.isSubmitting ? "Updating.." : "Update"}
                    </button>
                  </div>
                  </div>
                  </form>
                </div>
              </div>
            </div>
    <Card className="c-bg">
      <div className="flex flex-wrap justify-center text-white">
        <label htmlFor='profile' className="hover:cursor-pointer ">
          <Image width={500} className="rounded-lg" height={400} src={file ? URL.createObjectURL(file as Blob) : user?.photo } alt="profile" />
          <input
          hidden={true}
                className="w-full rounded-lg font-medium bg-transparent border border-[#304ffe] text-white text-sm focus:outline-none focus:bg-opacity-10  mt-2"
                type="file"
                color="purple"
                name="img"
                id="profile"
                onChange={(e) => setFile(e.target.files && e.target.files[0])}
              />
        </label>
       
        <div className="w-full flex justify-between px-4 items-center py-4 lg:pt-4 pt-8">
          <div className=" ">
            <span className="text-xl font-medium block uppercase tracking-wide text-white">
               €{user?.mainBalance}
            </span>
            <span className="text-sm text-red-500 ">Main Balance</span>
          </div>
          <div className=" ">
            <span className="text-xl font-medium block uppercase tracking-wide text-white">
               €{user?.initialDeposit}
            </span>
            <span className="text-sm text-red-500 ">Initial Deposite</span>
          </div>
          <div className=" ">
            <span className="text-xl font-medium block uppercase tracking-wide text-white">
               €{user?.interestBalance}
            </span>
            <span className="text-sm text-red-500 ">Interest Balance</span>
          </div>
        </div>
      </div>
      <div className="">
        <div className='flex justify-between px-4 items-center'>

        <h5 className="text-gray-400 font-bold text-lg">
          {' '}
          {user?.firstname} {user?.lastname}
        </h5>
       
        <div className="capitalize text-white  ">
          {/* <Icon name="work" size="xl" /> */}
          {user?.occupation}
        </div>
        </div>
        <div className=" text-white mt-3 text-center">
                          Joined At{" "}
                          {new Date(user?.date).toDateString()}
                        </div>
      </div>
     
        <div className="mb-8 mt-2 border-t border-lightBlue-200 text-center px-2 text-white">
       
        </div>
     
      <CardFooter>
        <div className="w-full flex justify-center -mt-8 gap-2">
          <button onClick={updatePhoto} disabled={fileLoading} className="rounded-md mb-2 p-2.5 bg-gradient-to-tr from-light-blue-500 to-light-blue-700 transition-colors text-white ease-linear duration-500">
            {fileLoading ? "Uploading..." :  "Update Photo"}
            </button>
            {action && 
          <button type='button'  data-bs-toggle="modal"
          data-bs-target="#actionModalInfo"  className="rounded-md mb-2 p-2.5 bg-red-500 transition-colors text-white ease-linear duration-500">
              Action
            </button>
            }
        </div>
      </CardFooter>
    </Card>
    </>
  )
}
