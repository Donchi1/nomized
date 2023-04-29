import { doc,  getDoc, updateDoc } from "firebase/firestore";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { db } from "@/db/firebaseDb";
import Toast from "@/utils/Alert";
import AdminNavbar from "@/components/admin/AdminNavbar";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Layout from "@/components/Layout";
import AdminHero from "@/components/admin/AdminHero";
import FooterAdmin from "@/components/admin/FooterAdmin";

function Index() {
  const { id, uid } = useRouter().query;

  const formik = useFormik({
    initialValues: {
      email: "",
      amount: "",
      charge: "",
      status: "",
      accountNumber: "",
      wallet: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .trim()
        .required("Field required")
        .lowercase(),
      amount: Yup.string().lowercase().trim().required("Field required"),
      charge: Yup.string().lowercase().trim().required("Field required"),
      wallet: Yup.string().lowercase().trim().optional(),
      accountNumber: Yup.string().lowercase().trim().optional(),
      status: Yup.string()
        .oneOf(["pending", "success", "failed"])
        .required("Field required"),
    }),

    onSubmit: (values) => handleUpdate(values),
  });

  const handleUpdate = async (val: any) => {
    formik.setSubmitting(true);
    try {
      await updateDoc(doc(db, `withdrawals/${uid}/withdrawalDatas/${id}`), { ...val });
      formik.setSubmitting(false);
      Toast.success.fire({ text: "Update Successful" });
    } catch (error: any) {
      formik.setSubmitting(false);
      Toast.error.fire({ text: error.message });
    }
  };
  useEffect(() => {
    const setInfo = () => {
      getDoc(doc(db, `withdrawals/${uid}/withdrawalDatas/${id}`))
        .then((doc) => {
          const withdrawalInfo = doc.data();
          formik.setValues({
            amount: withdrawalInfo?.withdrawalAmount,
            charge: withdrawalInfo?.charge,
            status: "pending",
            accountNumber: withdrawalInfo?.accountNumber,
            wallet: withdrawalInfo?.wallet,
            email: withdrawalInfo?.email,
          } as any);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    setInfo();
  }, [id, uid]);
  return (
    <>
    <AdminNavbar />

    <div className="flex">
      <AdminSidebar />

      <div className="w-full ">
        <div className="min-h-screen mb-10 lg:mb-0">

        
        <Layout>
          <AdminHero title="Withdrawals" />
          <div className=" mt-10 " />

                <section className="c-bg rounded-lg py-4">
                  <div className="container">
                    <div className="row">
                      <div className="col">
                        <div className="login-box edit">
                          <div className="form-group ">
                            <form
                              className="row"
                              onSubmit={formik.handleSubmit}
                            >
                              <div className="col-12 col-lg-6 mb-1 ">
                                <h4 className="golden-text">Email </h4>
                                <div className="input-group">
                                  <input
                                    type="email"
                                    {...formik.getFieldProps("email")}
                                     className="w-full px-8 py-2.5 rounded-md font-medium bg-transparent border border-[#304ffe] text-white text-sm focus:outline-none focus:bg-opacity-10  mt-2"
                                   
                                  />
                                </div>
                                <div className="text-danger mt-2">
                                  {formik.touched.email &&
                                    formik.errors.email &&
                                    formik.errors.email}
                                </div>
                              </div>
                              <div className="col-12 col-lg-6 mb-1">
                                <h4 className="golden-text">Amount </h4>
                                <div className="input-group">
                                  <input
                                    type="text"
                                    {...formik.getFieldProps("amount")}
                                     className="w-full px-8 py-2.5 rounded-md font-medium bg-transparent border border-[#304ffe] text-white text-sm focus:outline-none focus:bg-opacity-10  mt-2"
                                   
                                  />
                                </div>
                                <div className="text-danger mt-2">
                                  {formik.touched.amount &&
                                    formik.errors.amount &&
                                    formik.errors.amount}
                                </div>
                              </div>
                              <div className="col-12 col-lg-6 mb-1">
                                <h4 className="golden-text">Charge </h4>
                                <div className="input-group">
                                  <input
                                    type="text"
                                    {...formik.getFieldProps("charge")}
                                     className="w-full px-8 py-2.5 rounded-md font-medium bg-transparent border border-[#304ffe] text-white text-sm focus:outline-none focus:bg-opacity-10  mt-2"
                                    
                                  />
                                </div>
                                <div className="text-danger mt-2">
                                  {formik.touched.charge &&
                                    formik.errors.charge &&
                                    formik.errors.charge}
                                </div>
                              </div>
                              <div className="col-12 col-lg-6 mb-1">
                                <h4 className="golden-text">Wallet </h4>
                                <div className="input-group">
                                  <input
                                    type="text"
                                    {...formik.getFieldProps("wallet")}
                                     className="w-full px-8 py-2.5 rounded-md font-medium bg-transparent border border-[#304ffe] text-white text-sm focus:outline-none focus:bg-opacity-10  mt-2"
                                    
                                  />
                                </div>
                                <div className="text-danger mt-2">
                                  {formik.touched.wallet &&
                                    formik.errors.wallet &&
                                    formik.errors.wallet}
                                </div>
                              </div>
                              <div className="col-12 col-lg-6 mb-1">
                                <h4 className="golden-text">Account No </h4>
                                <div className="input-group">
                                  <input
                                    type="text"
                                    {...formik.getFieldProps("accountNumber")}
                                     className="w-full px-8 py-2.5 rounded-md font-medium bg-transparent border border-[#304ffe] text-white text-sm focus:outline-none focus:bg-opacity-10  mt-2"
                                    
                                  />
                                </div>
                                <div className="text-danger mt-2">
                                  {formik.touched.accountNumber &&
                                    formik.errors.accountNumber &&
                                    formik.errors.accountNumber}
                                </div>
                              </div>
                              <div className="col-12 col-lg-6 mb-1">
                                <h4 className="golden-text">Status </h4>
                                <div className="input-group">
                                  <select
                                     className="w-full px-8 py-2.5 rounded-md font-medium bg-transparent border border-[#304ffe] text-white text-sm focus:outline-none focus:bg-opacity-10  mt-2"
                                    {...formik.getFieldProps("status")}
                                  >
                                    <option
                                      value={"pending"}
                                      className="bg-dark text-white"
                                    >
                                      Pending
                                    </option>
                                    <option
                                      value={"success"}
                                      className="bg-dark text-white"
                                    >
                                      Success
                                    </option>
                                    <option
                                      value={"failed"}
                                      className="bg-dark text-white"
                                    >
                                      Failed
                                    </option>
                                  </select>
                                </div>
                                <div className="text-danger errors mt-2">
                                  {formik.touched.status &&
                                    formik.errors.status &&
                                    formik.errors.status}
                                </div>
                              </div>
                              <div className="mx-auto">

                              <button
                                disabled={formik.isSubmitting}
                                className="mt-4  tracking-wide font-semibold bg-gradient-to-tr from-light-blue-500  to-light-blue-700 text-gray-100 w-full py-2.5 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out  focus:shadow-outline focus:outline-none"
                                type="submit"
                              >
                                {formik.isSubmitting
                                  ? "Please wait..."
                                  : "Update"}
                              </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </Layout>
            </div>
            <FooterAdmin />
          </div >
          </div >
      
    </>
  );
}

export default Index;
Index.defaultProps={
  needsAuth :true,
  isAdmin: true

}
