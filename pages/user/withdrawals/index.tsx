import { auth, db } from '@/db/firebaseDb'
import { RootState } from '@/redux/store'
import Toast from '@/utils/Alert'
import { Dialog } from '@mui/material'
import axios from 'axios'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useFormik } from 'formik'
import React, {  FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from "yup"


type withdrawDataType ={
  amount: number,
  wallet: string,
  withdrawalMethod: string,
  name: string,
  accountNumber: string,
  phone: string,
  charge: string
}

function Withdrawals() {


  const withdrawalInfo = useSelector((state:RootState) => state.app)

  const {currentUser} = useSelector((state:RootState) => state.auth)

  const [openPay, setOpenPay] = useState({
    btc: false,
    etheruim: false,
    litecoin: false,
    bank: false,
  })

  const [newAmount, setNewAmount] = useState(1)

  const formik = useFormik({
    initialValues:{
    amount: 1,
    wallet: '',
    withdrawalMethod: '',
    name: '',
    accountNumber: 'none',
    phone: '',
    charge: "0.5"
  } as withdrawDataType,
  validationSchema: Yup.object({
    wallet: Yup.string().required(),
    withdrawalMethod: Yup.string().required(),
    accountNumber: Yup.string().required(),
    phone: Yup.string().required(),
    amount: Yup.number().required(),
    name: Yup.mixed().required()
  }),
  onSubmit: (values) => handleWithdrawal(values)
})
 

  useEffect(() => {
    axios
      .get(
        `https://blockchain.info/tobtc?currency=USD&value=${formik.values.amount}`,
      )
      .then((res) => {
        setNewAmount(res.data)
      })
      .catch((err) => {})
  }, [formik.values.amount])

  const handleWithdrawal = async(values: withdrawDataType) => {

    setOpenPay({ 
      ...openPay,
      btc: false,
      etheruim: false,
      litecoin: false,
      bank: false,
    })
    formik.setSubmitting(true)
    try{
     await addDoc(collection(db, `withdrawals/${currentUser?.uid}/withdrawalDatas`), {
      withdrawalAmount: values.amount,
      wallet: values.wallet,
      method: values.withdrawalMethod,
      email: currentUser?.email,
      date: serverTimestamp(),
      currentUserfirstname: currentUser?.firstname,
      currentUserlastname: currentUser?.lastname,
      withdrawerName: values.name,
      number: values.phone,
      charge: values.charge,
      AccountNumber: values.accountNumber,
      uid: currentUser?.uid,
      idx: Math.random().toString(),
      status: "pending"
     })
     formik.setSubmitting(false)
     formik.resetForm()
     Toast.success.fire({
      text:"Please wait for less then 24 hour for withdrawal verification."
     })
    }catch(err: any){
      formik.setSubmitting(false)
      formik.resetForm()
      Toast.error.fire({
       text:err
      })
    }
  }
 
  return (
    <div className="min-h-screen footer-bg  homepage-3  flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-20 bg-[#322194] shadow sm:rounded-lg flex justify-center flex-1 sm:flex sm:flex-col lg:flex lg:flex-row">
        <div className="lg:w-1/2 xl:w-5/12 sm:w-full p-6 sm:p-12">
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-3xl xl:text-4xl font-black uppercase text-center text-white">
              Withdrawal Methods
            </h1>
            <h4 className="text-lg mt-4 uppercase text-center text-white">
              Make your instant withdrawal today with ease <br />
              Choose your withdrawal method
            </h4>

            <section className="w-full ">
              <div className="mx-auto max-w-xl  relative ">
                <button
                  className="mt-5 tracking-wide  font-semibold bg-[#304ffe] text-gray-100 w-full  py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  onClick={() => {
                    setOpenPay({
                      ...openPay,
                      btc: !openPay.btc,
                      bank: false,
                      etheruim: false,
                      litecoin: false,
                    })
                    formik.setFieldValue("withdrawalMethod", 'Bitcoin')
                  }}
                >
                  Bitcoin
                </button>
              </div>

              <Dialog
                open={openPay.btc}
                onClose={() => setOpenPay({ ...openPay, btc: false })}
              >
                <div className="field_form authorize_form">
                  <div className="text-center">
                    <h6 className="text-bold capitalize">
                      You want to withdraw ${formik.values.amount}
                    </h6>
                    <p>Bitcoin : {newAmount && newAmount}</p>
                    <p>
                      with {formik.values.withdrawalMethod} withdrawal
                      method.
                    </p>
                    <h5 className="text-center">
                      {formik.values.withdrawalMethod} withdrawal.
                    </h5>
                  </div>
                  <h5 className="text-center">
                    Input your withdrawal information
                  </h5>
                  <form onSubmit={formik.handleSubmit}>
                    <div className="form-group col-md-12 animation">
                      <input
                        type="text"
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-200 focus:bg-gray-200 border border-[#304ffe] placeholder-gray-500 text-xl focus:outline-none focus:bg-opacity-10 text-black mt-5"
                        placeholder="Name"
                        {...formik.getFieldProps("name")}
                       
                      />
                       {formik.touched.name && formik.errors.name ? (
                      <div className="text-red-500 mb-2">
                        {formik.errors.name}
                      </div>
                    ) : null}
                    </div>
                    <div className="form-group col-md-12 animation">
                      <input
                        type="number"
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-200 focus:bg-gray-200 border border-[#304ffe] placeholder-gray-500 text-xl focus:outline-none focus:bg-opacity-10 text-black mt-5"
                        required
                        placeholder="Amount"
                        {...formik.getFieldProps("amount")}
                      />
                       {formik.touched.amount && formik.errors.amount ? (
                      <div className="text-red-500 mb-2">
                        {formik.errors.amount}
                      </div>
                    ) : null}
                    </div>
                    <div className="form-group col-md-12 animation">
                      <input
                        type="text"
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-200 focus:bg-gray-200 border border-[#304ffe] placeholder-gray-500 text-xl focus:outline-none focus:bg-opacity-10 text-black mt-5"
                        required
                        placeholder="Wallet"
                        {...formik.getFieldProps("vwallet")}
                        
                      />
                       {formik.touched.wallet && formik.errors.wallet ? (
                      <div className="text-red-500 mb-2">
                        {formik.errors.wallet}
                      </div>
                    ) : null}
                    </div>
                    <div className="form-group col-md-12 animation">
                      <input
                        type="tel"
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-200 focus:bg-gray-200 border border-[#304ffe] placeholder-gray-500 text-xl focus:outline-none focus:bg-opacity-10 text-black mt-5"
                        required
                        placeholder="Number"
                       {...formik.getFieldProps("number")}
                      />
                       {formik.touched.phone && formik.errors.phone ? (
                      <div className="text-red-500 mb-2">
                        {formik.errors.phone}
                      </div>
                    ) : null}
                    </div>
                    <div className="form-group col-md-12 text-center animation">
                      <button
                        className="mt-5 tracking-wide font-semibold bg-[#304ffe] text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                    <div className="divider small_divider"></div>
                  </form>
                </div>
              </Dialog>

              <div className="mx-auto max-w-xl  relative">
                <button
                  className="mt-5 tracking-wide font-semibold bg-[#304ffe] text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  onClick={() => {
                    setOpenPay({
                      ...openPay,
                      etheruim: !openPay.etheruim,
                      bank: false,
                      litecoin: false,
                      btc: false,
                    })
                    formik.setFieldValue(
                      "withdrawalAmount",
                      'Etheruim'
                    )
                  }}
                >
                  Etherium
                </button>
              </div>
              <Dialog
                open={openPay.etheruim}
                onClose={() => setOpenPay({ ...openPay, etheruim: false })}
              >
                  <div className="field_form authorize_form">
                  <div className="text-center">
                    <h6 className="text-bold capitalize">
                      You want to withdraw ${formik.values.amount}
                    </h6>
                    <p>Bitcoin : {newAmount && newAmount}</p>
                    <p>
                      with {formik.values.withdrawalMethod} withdrawal
                      method.
                    </p>
                    <h5 className="text-center">
                      {formik.values.withdrawalMethod} withdrawal.
                    </h5>
                  </div>
                  <h5 className="text-center">
                    Input your withdrawal information
                  </h5>
                  <form onSubmit={formik.handleSubmit}>
                    <div className="form-group col-md-12 animation">
                      <input
                        type="text"
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-200 focus:bg-gray-200 border border-[#304ffe] placeholder-gray-500 text-xl focus:outline-none focus:bg-opacity-10 text-black mt-5"
                        placeholder="Name"
                        {...formik.getFieldProps("name")}
                       
                      />
                       {formik.touched.name && formik.errors.name ? (
                      <div className="text-red-500 mb-2">
                        {formik.errors.name}
                      </div>
                    ) : null}
                    </div>
                    <div className="form-group col-md-12 animation">
                      <input
                        type="number"
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-200 focus:bg-gray-200 border border-[#304ffe] placeholder-gray-500 text-xl focus:outline-none focus:bg-opacity-10 text-black mt-5"
                        required
                        placeholder="Amount"
                        {...formik.getFieldProps("amount")}
                      />
                       {formik.touched.amount && formik.errors.amount ? (
                      <div className="text-red-500 mb-2">
                        {formik.errors.amount}
                      </div>
                    ) : null}
                    </div>
                    <div className="form-group col-md-12 animation">
                      <input
                        type="text"
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-200 focus:bg-gray-200 border border-[#304ffe] placeholder-gray-500 text-xl focus:outline-none focus:bg-opacity-10 text-black mt-5"
                        required
                        placeholder="Wallet"
                        {...formik.getFieldProps("vwallet")}
                        
                      />
                       {formik.touched.wallet && formik.errors.wallet ? (
                      <div className="text-red-500 mb-2">
                        {formik.errors.wallet}
                      </div>
                    ) : null}
                    </div>
                    <div className="form-group col-md-12 animation">
                      <input
                        type="tel"
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-200 focus:bg-gray-200 border border-[#304ffe] placeholder-gray-500 text-xl focus:outline-none focus:bg-opacity-10 text-black mt-5"
                        required
                        placeholder="Number"
                       {...formik.getFieldProps("number")}
                      />
                       {formik.touched.phone && formik.errors.phone ? (
                      <div className="text-red-500 mb-2">
                        {formik.errors.phone}
                      </div>
                    ) : null}
                    </div>
                    <div className="form-group col-md-12 text-center animation">
                      <button
                        className="mt-5 tracking-wide font-semibold bg-[#304ffe] text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                    <div className="divider small_divider"></div>
                  </form>
                </div>
              </Dialog>

              <div className="mx-auto max-w-xl  relative">
                <button
                  className="mt-5 tracking-wide font-semibold bg-[#304ffe] text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  onClick={() => {
                    setOpenPay({
                      ...openPay,
                      litecoin: !openPay.litecoin,
                      bank: false,
                      etheruim: false,
                      btc: false,
                    })
                    formik.setFieldValue(
                      "withdrawalAmount",
                      'Litecoin'
                    )
                  }}
                >
                  Litecoin
                </button>
              </div>
              <Dialog
                open={openPay.litecoin}
                onClose={() => setOpenPay({ ...openPay, litecoin: false })}
              >
                 <div className="field_form authorize_form">
                  <div className="text-center">
                    <h6 className="text-bold capitalize">
                      You want to withdraw ${formik.values.amount}
                    </h6>
                    <p>Bitcoin : {newAmount && newAmount}</p>
                    <p>
                      with {formik.values.withdrawalMethod} withdrawal
                      method.
                    </p>
                    <h5 className="text-center">
                      {formik.values.withdrawalMethod} withdrawal.
                    </h5>
                  </div>
                  <h5 className="text-center">
                    Input your withdrawal information
                  </h5>
                  <form onSubmit={formik.handleSubmit}>
                    <div className="form-group col-md-12 animation">
                      <input
                        type="text"
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-200 focus:bg-gray-200 border border-[#304ffe] placeholder-gray-500 text-xl focus:outline-none focus:bg-opacity-10 text-black mt-5"
                        placeholder="Name"
                        {...formik.getFieldProps("name")}
                       
                      />
                       {formik.touched.name && formik.errors.name ? (
                      <div className="text-red-500 mb-2">
                        {formik.errors.name}
                      </div>
                    ) : null}
                    </div>
                    <div className="form-group col-md-12 animation">
                      <input
                        type="number"
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-200 focus:bg-gray-200 border border-[#304ffe] placeholder-gray-500 text-xl focus:outline-none focus:bg-opacity-10 text-black mt-5"
                        required
                        placeholder="Amount"
                        {...formik.getFieldProps("amount")}
                      />
                       {formik.touched.amount && formik.errors.amount ? (
                      <div className="text-red-500 mb-2">
                        {formik.errors.amount}
                      </div>
                    ) : null}
                    </div>
                    <div className="form-group col-md-12 animation">
                      <input
                        type="text"
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-200 focus:bg-gray-200 border border-[#304ffe] placeholder-gray-500 text-xl focus:outline-none focus:bg-opacity-10 text-black mt-5"
                        required
                        placeholder="Wallet"
                        {...formik.getFieldProps("vwallet")}
                        
                      />
                       {formik.touched.wallet && formik.errors.wallet ? (
                      <div className="text-red-500 mb-2">
                        {formik.errors.wallet}
                      </div>
                    ) : null}
                    </div>
                    <div className="form-group col-md-12 animation">
                      <input
                        type="tel"
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-200 focus:bg-gray-200 border border-[#304ffe] placeholder-gray-500 text-xl focus:outline-none focus:bg-opacity-10 text-black mt-5"
                        required
                        placeholder="Number"
                       {...formik.getFieldProps("number")}
                      />
                       {formik.touched.phone && formik.errors.phone ? (
                      <div className="text-red-500 mb-2">
                        {formik.errors.phone}
                      </div>
                    ) : null}
                    </div>
                    <div className="form-group col-md-12 text-center animation">
                      <button
                        className="mt-5 tracking-wide font-semibold bg-[#304ffe] text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                    <div className="divider small_divider"></div>
                  </form>
                </div>
              </Dialog>

              <div className="mx-auto max-w-xl  relative ">
                <button
                  className="mt-5 tracking-wide font-semibold bg-[#304ffe] text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  onClick={() => {
                    setOpenPay({
                      ...openPay,
                      bank: !openPay.bank,
                      litecoin: false,
                      etheruim: false,
                      btc: false,
                    })
                    formik.setFieldValue(
                      "withdrawalAmount",
                      'Bank'
                    )
                  }}
                >
                  Bank
                </button>
              </div>
              <Dialog
                open={openPay.bank}
                onClose={() => setOpenPay({ ...openPay, bank: false })}
              >
                  <div className="field_form authorize_form">
                  <div className="text-center">
                    <h6 className="text-bold capitalize">
                      You want to withdraw ${formik.values.amount}
                    </h6>
                    <p>Bitcoin : {newAmount && newAmount}</p>
                    <p>
                      with {formik.values.withdrawalMethod} withdrawal
                      method.
                    </p>
                    <h5 className="text-center">
                      {formik.values.withdrawalMethod} withdrawal.
                    </h5>
                  </div>
                  <h5 className="text-center">
                    Input your withdrawal information
                  </h5>
                  <form onSubmit={formik.handleSubmit}>
                    <div className="form-group col-md-12 animation">
                      <input
                        type="text"
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-200 focus:bg-gray-200 border border-[#304ffe] placeholder-gray-500 text-xl focus:outline-none focus:bg-opacity-10 text-black mt-5"
                        placeholder="Name"
                        {...formik.getFieldProps("name")}
                       
                      />
                       {formik.touched.name && formik.errors.name ? (
                      <div className="text-red-500 mb-2">
                        {formik.errors.name}
                      </div>
                    ) : null}
                    </div>
                    <div className="form-group col-md-12 animation">
                      <input
                        type="number"
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-200 focus:bg-gray-200 border border-[#304ffe] placeholder-gray-500 text-xl focus:outline-none focus:bg-opacity-10 text-black mt-5"
                        required
                        placeholder="Amount"
                        {...formik.getFieldProps("amount")}
                      />
                       {formik.touched.amount && formik.errors.amount ? (
                      <div className="text-red-500 mb-2">
                        {formik.errors.amount}
                      </div>
                    ) : null}
                    </div>
                    <div className="form-group col-md-12 animation">
                      <input
                        type="text"
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-200 focus:bg-gray-200 border border-[#304ffe] placeholder-gray-500 text-xl focus:outline-none focus:bg-opacity-10 text-black mt-5"
                        required
                        placeholder="Wallet"
                        {...formik.getFieldProps("vwallet")}
                        
                      />
                       {formik.touched.wallet && formik.errors.wallet ? (
                      <div className="text-red-500 mb-2">
                        {formik.errors.wallet}
                      </div>
                    ) : null}
                    </div>
                    <div className="form-group col-md-12 animation">
                      <input
                        type="tel"
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-200 focus:bg-gray-200 border border-[#304ffe] placeholder-gray-500 text-xl focus:outline-none focus:bg-opacity-10 text-black mt-5"
                        required
                        placeholder="Number"
                       {...formik.getFieldProps("number")}
                      />
                       {formik.touched.phone && formik.errors.phone ? (
                      <div className="text-red-500 mb-2">
                        {formik.errors.phone}
                      </div>
                    ) : null}
                    </div>
                    <div className="form-group col-md-12 text-center animation">
                      <button
                        className="mt-5 tracking-wide font-semibold bg-[#304ffe] text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                    <div className="divider small_divider"></div>
                  </form>
                </div>
              </Dialog>

              <div className="divider small_divider"></div>
            </section>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden">
          <div className="lg:m-12 xl:m-16 w-full  ">
            <div>
              <h4 className="mt-8 text-red-600 text-2xl">
              39mdPL5NsJky1cZyD7hyjrCA45iHo21Pcd
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Withdrawals

Withdrawals.defaultProps ={
  needsAuth: true,


}