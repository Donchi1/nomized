import React, { useState } from "react";
import Link from "next/link";
import Toast from "@/utils/Alert";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useFormik } from "formik";
import * as Yup from "yup";
import { auth, db } from "@/db/firebaseDb";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { makeRequestApi } from "@/utils/makeRequest";

const Footer = () => {
  const {currentUser} = useSelector((state:RootState) => state.auth)
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      subject: "",
      message: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .trim()
        .required("Email required")
        .lowercase(),
      name: Yup.string().lowercase().trim().required("Name is required"),
      subject: Yup.string().optional(),
      message: Yup.string()
        .min(4, "Message must be more then 4 characters")
        .required("Message required"),
    }),
    onSubmit: (values) => handleSubmit(values),
  });

  const handleSubmit = async (val: {
    email: string;
    name: string;
    subject: string;
    message: string;
  }) => {
    formik.setSubmitting(true);
    const { email, name, subject, message } = val;

    try {
      await addDoc(collection(db, "contacts"), {
        uid: auth.currentUser ? auth.currentUser?.uid : Date.now(),
        name,
        email,
        subject,
        message,
        status: "success",
        filterDate: new Date().toLocaleDateString(),
        date: serverTimestamp(),
      });
      formik.setSubmitting(false);
      formik.resetForm();
      Toast.success.fire({
        text: "Thanks for contacting Cryptonomize. We will get back to you soon.",
      });
      const res = await makeRequestApi.post("/contact", val)
      console.log(res.data?.message)
      
    } catch (err) {
      formik.setSubmitting(false);
      formik.resetForm();
      Toast.success.fire({ text: "An error occured" });
    }
  };
  const formikSub = useFormik({
    initialValues: {
      email: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .trim()
        .required("Email required")
        .lowercase(),
    }),
    onSubmit: (values) => handleSubmitSub(values),
  });

  const handleSubmitSub = async (val: { email: string }) => {
    formik.setSubmitting(true);
    const { email } = val;

    try {
      await addDoc(collection(db, "newsletters"), {
        newsLetter: email,
        uid: auth.currentUser ? auth.currentUser?.uid : Date.now(),
        status: "success",
        date: serverTimestamp(),
        user: currentUser? currentUser?.firstname : "Guest User"
      });
      formik.setSubmitting(false);
      formik.resetForm();
      Toast.success.fire({
        text: "Thanks for subscribing for our newsletter.",
      });
    } catch (err) {
      formik.setSubmitting(false);
      formik.resetForm();
      Toast.success.fire({ text: "An error occured" });
    }
  };

  return (
    <>
      <section className="promotion_area section-padding">
        <div className="container mx-auto">
          <div className="row">
            <div
              className="col-lg-8 offset-lg-2 col-sm-12 col-xs-12 text-center wow fadeInDown"
              data-wow-duration="1s"
              data-wow-delay="0.2s"
              data-wow-offset="0"
              style={{
                visibility: "hidden",
                animationDuration: "1s",
                animationDelay: "0.2s",
                animationName: "none",
              }}
            >
              <div className="newsletter_form">
                <h4>
                  Subscribe our newsletter for get updates <br />
                  We dont make any spam
                </h4>
                <form onSubmit={formikSub.handleSubmit}>
                  <input
                    type="email"
                    className="subscribe__input text-gray-700"
                    placeholder="Email Address"
                    {...formikSub.getFieldProps("email")}
                  />

                  <button
                    disabled={formikSub.isSubmitting}
                    type="submit"
                    className="btn_one py-3"
                  >
                    {formikSub.isSubmitting ? "Submitting..." : "Subscribe"}
                  </button>
                  {formikSub.touched.email && formikSub.errors.email ? (
                    <div className="text-red-500 my-2">
                      {formikSub.errors.email}
                    </div>
                  ) : null}
                </form>
              </div>
            </div>
            {/* END COL */}
          </div>
          {/* END ROW */}
        </div>
        {/* END CONTAINER */}
      </section>
      <section id="contact" className="contact_us section-padding">
        <div className="container mx-auto">
          <div className="row">
            <div
              className="col-lg-8 col-sm-12 col-xs-12 wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay="0.2s"
              data-wow-offset="0"
              style={{
                visibility: "hidden",
                animationDuration: "1s",
                animationDelay: "0.2s",
                animationName: "none",
              }}
            >
              <div className="contact">
                <h4>Write Your Message </h4>
                <p>
                  Drop your message here and we will get back to you as soon as
                  possible.
                </p>
                <form className="form" onSubmit={formik.handleSubmit}>
                  <div className="row">
                    <div className="form-group col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        {...formik.getFieldProps("name")}
                      />
                      {formik.touched.name && formik.errors.name ? (
                        <div className="text-red-500 mb-2">
                          {formik.errors.name}
                        </div>
                      ) : null}
                    </div>
                    <div className="form-group col-md-6">
                      <input
                        type="email"
                        placeholder="Enter Email"
                        className="form-control"
                        {...formik.getFieldProps("email")}
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <div className="text-red-500 mb-2">
                          {formik.errors.email}
                        </div>
                      ) : null}
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Subject"
                        {...formik.getFieldProps("subject")}
                      />
                      {formik.touched.subject && formik.errors.subject ? (
                        <div className="text-red-500 mb-2">
                          {formik.errors.subject}
                        </div>
                      ) : null}
                    </div>
                    <div className="form-group col-md-12">
                      <textarea
                        rows={6}
                        className="form-control"
                        placeholder="Your Message"
                        {...formik.getFieldProps("message")}
                      ></textarea>

                      {formik.touched.message && formik.errors.message ? (
                        <div className="text-red-500 mb-2">
                          {formik.errors.message}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-md-12 text-center">
                      <button
                        type="submit"
                        value="Send message"
                        className="btn btn-lg contact_btn"
                        title="Submit Your Message!"
                        disabled={formik.isSubmitting}
                      >
                        {formik.isSubmitting
                          ? "Submitting..."
                          : "Submit Message"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            {/* END COL  */}
            <div
              className="col-lg-4 col-sm-12 col-xs-12 wow fadeInRight mt-8"
              data-wow-duration="1s"
              data-wow-delay="0.2s"
              data-wow-offset="0"
              style={{
                visibility: "hidden",
                animationDuration: "1s",
                animationDelay: "0.2s",
                animationName: "none",
              }}
            >
              <div className="address_bg">
                <div className="single_address">
                  <div className="address_br">
                    <span className="fas fa-map-marker-alt"></span>
                  </div>
                  <h5 className="font-bold text-[25px]">Germany Office</h5>

                  <p>Marseiller Promenade, 20355 Humburg Germany</p>
                </div>
                <div className="single_address">
                  <div className="address_br">
                    <span className="fas fa-map-marker-alt"></span>
                  </div>
                  <h5 className="font-bold text-[25px]">UK Office</h5>
                  <p>820 king Road kensington, London United Kingdon</p>
                </div>
                <div className="single_address">
                  <div className="address_br">
                    <span className="fas fa-phone"></span>
                  </div>
                  <h5 className="font-bold text-[25px]">Phone</h5>
                  <p>+447944723764</p>
                </div>
                <div className="single_address">
                  <div className="address_br">
                    <span className="fa fa-envelope"></span>
                  </div>
                  <h5 className="font-bold text-[25px]">Email</h5>
                  <p>support@cryptonomize.com</p>
                </div>
                <div className="single_address">
                  <div className="address_br">
                    <span className="fas fa-clock"></span>
                  </div>
                  <h5 className="font-bold text-[25px]">Working Hours</h5>
                  <p>Mon to Sat 9:00am to 5:00pm</p>
                </div>
              </div>
            </div>
            {/* END COL  */}
          </div>
          {/* END ROW */}
        </div>
        {/* END CONTAINER */}
      </section>
      <div className="footer">
        <div className="container mx-auto">
          <div className="row text-center">
            <div className="col-lg-12 col-sm-12 col-xs-12">
              <div className="footer_menu">
                <ul>
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="/about">About</Link>
                  </li>
                  <li>
                    <Link href="/team">Team</Link>
                  </li>
                  <li>
                    <Link href="/plan">Plans</Link>
                  </li>
                  <li>
                    <Link href="/register">Register</Link>
                  </li>
                  <li>
                    <Link href="/login">Login</Link>
                  </li>
                  <li>
                    <Link href="/contact">Contact</Link>
                  </li>
                </ul>
              </div>
              <div className="footer_copyright">
                <p>
                  © {new Date().getFullYear()} Cryptonomize. All Rights
                  Reserved.
                </p>
              </div>
              <div className="footer_profile">
                <ul>
                  <li>
                    <Link href="#">
                      <i className="fa fa-facebook"></i>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <i className="fa fa-twitter"></i>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <i className="fa fa-instagram"></i>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <i className="fa fa-pinterest"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            {/*- END COL */}
          </div>
          {/*- END ROW */}
        </div>
        {/*- END CONTAINER */}
      </div>
    </>
  );
};

export default Footer;
