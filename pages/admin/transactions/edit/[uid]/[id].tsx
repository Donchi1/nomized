import { doc, getDoc, updateDoc } from "firebase/firestore";
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
      amount: "",
      remarks: "",
      firstname: "",
      status: "",
    },

    validationSchema: Yup.object({
      firstname: Yup.string().trim().required("Field required").lowercase(),
      amount: Yup.string().lowercase().trim().required("Field required"),
      remarks: Yup.string().lowercase().trim().required("Field required"),
      status: Yup.string()
        .oneOf(["pending", "success", "failed"])
        .required("Field required"),
    }),

    onSubmit: (values) => handleUpdate(values),
  });

  const handleUpdate = async (val: any) => {
    formik.setSubmitting(true);
    try {
      await updateDoc(doc(db, `transactions/${uid}/transactionDatas/${id}`), {
        ...val,
      });
      formik.setSubmitting(false);
      Toast.success.fire({ text: "Update Successful" });
    } catch (error: any) {
      formik.setSubmitting(false);
      Toast.error.fire({ text: error.message });
    }
  };
  useEffect(() => {
    const setInfo = () => {
      getDoc(doc(db, `transactions/${uid}/transactionDatas/${id}`))
        .then((doc) => {
          const transInfo = doc.data();
          formik.setValues({
            amount: transInfo?.amount,
            remarks: transInfo?.remark,
            firstname: transInfo?.firstname,
            status: transInfo?.status,
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

        <div className="w-full mb-10 lg:mb-0 ">
          <div className="min-h-screen">
          <Layout>
            <AdminHero title="Transactions" />
            <div className=" mt-10 " />
            <section className="c-bg pt-4 pb-4 rounded-lg">
              <div className="container">
                <div className="row">
                  <div className="col">
                    <div className="login-box edit">
                      <div className="form-group ">
                        <form className="row" onSubmit={formik.handleSubmit}>
                          <div className="col-6 ">
                            <h4 className="text-white">Firstname </h4>
                            <div className="input-group">
                              <input
                                type="text"
                                {...formik.getFieldProps("firstname")}
                                 className="w-full px-2 py-2.5 rounded-md font-medium bg-transparent border border-[#304ffe] text-white text-sm focus:outline-none focus:bg-opacity-10  mt-2"
                               
                              />
                            </div>
                            <div className="text-danger mt-2">
                              {formik.touched.firstname &&
                                formik.errors.firstname &&
                                formik.errors.firstname}
                            </div>
                          </div>
                          <div className="col-6">
                            <h4 className="text-white">Amount </h4>
                            <div className="input-group">
                              <input
                                type="text"
                                {...formik.getFieldProps("amount")}
                                 className="w-full px-2 py-2.5 rounded-md font-medium bg-transparent border border-[#304ffe] text-white text-sm focus:outline-none focus:bg-opacity-10  mt-2"
                               
                              />
                            </div>
                            <div className="text-danger mt-2">
                              {formik.touched.amount &&
                                formik.errors.amount &&
                                formik.errors.amount}
                            </div>
                          </div>
                          <div className="col-6">
                            <h4 className="text-white">Remarks </h4>
                            <div className="input-group">
                              <input
                                type="text"
                                {...formik.getFieldProps("remarks")}
                                 className="w-full px-2 py-2.5 rounded-md font-medium bg-transparent border border-[#304ffe] text-white text-sm focus:outline-none focus:bg-opacity-10  mt-2"
                                
                              />
                            </div>
                            <div className="text-danger mt-2">
                              {formik.touched.remarks &&
                                formik.errors.remarks &&
                                formik.errors.remarks}
                            </div>
                          </div>
                          <div className="col-6">
                            <h4 className="text-white">Status </h4>
                            <div className="input-group">
                              <select
                                 className="w-full px-2 py-2.5 rounded-md font-medium bg-transparent border border-[#304ffe] text-white text-sm focus:outline-none focus:bg-opacity-10  mt-2"
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
        </div>

      </div>
    </>
  );
}

export default Index;

Index.defaultProps ={
  needsAuth: true,
  isAdmin: true

}
