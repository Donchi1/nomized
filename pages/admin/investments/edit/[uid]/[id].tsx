import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { db } from "@/db/firebaseDb"; 
import Toast from "@/utils/Alert"; 
import AdminSidebar from "@/components/admin/AdminSidebar"; 
import AdminNavbar from "@/components/user/UserNavbar"; 
import AdminHero from "@/components/admin/AdminHero";
import FooterAdmin from "@/components/admin/FooterAdmin";
import Layout from "@/components/Layout";

function Index() {
  const { id, uid } = useRouter().query;

  const formik = useFormik({
    initialValues: {
      firstname: "",
      status: "",
      profit: "",
      investedAmount: "",
      expectedProfit: "",
      fixedCharge: "",
    },

    validationSchema: Yup.object({
      firstname: Yup.string().trim().required("Field required").lowercase(),
      profit: Yup.string().trim().required("Field required").lowercase(),
      expectedProfit: Yup.string()
        .lowercase()
        .trim()
        .required("Field required"),
      investedProfit: Yup.string()
        .lowercase()
        .trim()
        .required("Field required"),
      fixedCharge: Yup.string().lowercase().trim().required("Field required"),
      status: Yup.string()
        .oneOf(["pending", "success", "failed"])
        .required("Field required"),
    }),

    onSubmit: (values) => handleUpdate(values),
  });

  const handleUpdate = async (val: any) => {
    formik.setSubmitting(true);
    try {
      await updateDoc(doc(db, `investments/${uid}/investmentDatas/${id}`), {
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
      getDoc(doc(db, `investments/${uid}/investmentDatas/${id}`))
        .then((doc) => {
          const investmentInfo = doc.data();
          formik.setValues({
            firstname: investmentInfo?.username,
            status: "pending",
            profit: investmentInfo?.profit,
            investedAmount: investmentInfo?.investedAmount,
            expectedProfit: investmentInfo?.expectedProfit,
            fixedCharge: investmentInfo?.fixedCharge,
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
        
    <AdminNavbar/>

   
    <div className='flex'>
   
    <AdminSidebar />
   
    <div className='w-full'>
      <div>
    <Layout>
        <AdminHero title='Investments' />
      <div className=" mt-10 " />

                <section className="c-bg pt-4 pb-2 rounded-lg">
                  <div className="container">
                    <div className="row">
                      <div className="col">
                        <div className="login-box edit">
                          <div className="form-group ">
                            <form
                              className="row"
                              onSubmit={formik.handleSubmit}
                            >
                              <div className="box mb-4 ">
                                <h4 className="golden-text">InvestedAmount </h4>
                                <div className="input-group">
                                  <input
                                    type="text"
                                    {...formik.getFieldProps("investedAmount")}
                                    className="form-control"
                                    placeholder="InvestedAmount"
                                  />
                                </div>
                                <div className="text-danger mt-2">
                                  {formik.touched.investedAmount &&
                                    formik.errors.investedAmount &&
                                    formik.errors.investedAmount}
                                </div>
                              </div>
                              <div className="box mb-4">
                                <h4 className="golden-text">ExpectedProfit </h4>
                                <div className="input-group">
                                  <input
                                    type="text"
                                    {...formik.getFieldProps("expectedProfit")}
                                    className="form-control"
                                    placeholder="ExpectedProfit"
                                  />
                                </div>
                                <div className="text-danger mt-2">
                                  {formik.touched.expectedProfit &&
                                    formik.errors.expectedProfit &&
                                    formik.errors.expectedProfit}
                                </div>
                              </div>
                              <div className="box mb-4">
                                <h4 className="golden-text">FixedCharge </h4>
                                <div className="input-group">
                                  <input
                                    type="text"
                                    {...formik.getFieldProps("fixedCharge")}
                                    className="form-control"
                                    placeholder="FixedCharge"
                                  />
                                </div>
                                <div className="text-danger mt-2">
                                  {formik.touched.fixedCharge &&
                                    formik.errors.fixedCharge &&
                                    formik.errors.fixedCharge}
                                </div>
                              </div>
                              <div className="box mb-4">
                                <h4 className="golden-text">Status </h4>
                                <div className="input-group">
                                  <select
                                    className="form-control"
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
                              <div className="box mb-4 ">
                                <h4 className="golden-text">Profit </h4>
                                <div className="input-group">
                                  <input
                                    type="text"
                                    {...formik.getFieldProps("profit")}
                                    className="form-control"
                                    placeholder="Profit"
                                  />
                                </div>
                                <div className="text-danger mt-2">
                                  {formik.touched.profit &&
                                    formik.errors.profit &&
                                    formik.errors.profit}
                                </div>
                              </div>

                              <div className="box mb-4">
                                <h4 className="golden-text">Firstname </h4>
                                <div className="input-group">
                                  <input
                                    type="text"
                                    {...formik.getFieldProps("firstname")}
                                    className="form-control"
                                    placeholder="Firstname"
                                  />
                                </div>
                                <div className="text-danger mt-2">
                                  {formik.touched.firstname &&
                                    formik.errors.firstname &&
                                    formik.errors.firstname}
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
Index.defaultProps={
  needsAuth :true,
  isAdmin: true

}
