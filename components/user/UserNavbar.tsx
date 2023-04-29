import React, { useState, useEffect, useRef} from "react";
import * as Icons from "react-icons/hi2";
import * as IconM from "react-icons/md";


import { useDispatch, useSelector } from "react-redux";
import { auth, db, storage } from "@/db/firebaseDb";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import Toast from "@/utils/Alert";
import useGetDocument from "../hooks/UseDocument";
import useCollection from "../hooks/UseCollection";
import PreLoader from "@/components/Preloader";
import { RootDispatch, RootState } from "@/redux/store";
import {
  handleAccessCode,
  accessCodeType,
  handleSidebar,
} from "@/redux/mainSlice";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";

type accessType = {
  open: boolean;
  accessCode: string;
  isSubmitting: boolean;
};

type accessCodeSchemaType = {
  accessCode: string;
  accessProve: File | null;
};
export default function AdminNavbar() {
  const { showSidebar, accessCodeInfo } = useSelector(
    (state: RootState) => state.app
  );
  const dispatch: RootDispatch = useDispatch();

 

  const noteRefData = `notifications/${
    auth.currentUser?.uid as string
  }/notificationDatas`;

  const [notifications, loading, error] = useCollection(noteRefData);

  const [userDocument, userLoading, userError] = useGetDocument(
    "users",
    auth.currentUser?.uid as string || "euyiyruy",
    { snap: true, user: true }
  );
 

  const [accessCodeProve, setAccessCodeProve] = useState({
    open: false,
    price: "",
    isSubmitting: false,
  })
  const [accessCode, setAccessCode] = useState("")
  //open modal
  const openModal = (el:HTMLElement) => {
    if(el){
      el.style.display = "block";
      el.classList.add("show");
  };
}
  //close modal
  const closeModal = (el:HTMLElement) => { 
    if(el){
   el.style.display = "none";
   el.classList.remove("show");
   el.classList.add("hide");
  };

}
const screenRef = useRef<HTMLSpanElement>(null)

useEffect(() => {
  
  screenRef.current?.addEventListener("click", function (e) {
    
      if (
        document.fullscreenElement 
        // document.webkitFullscreenElement ||
        // document.mozFullScreenElement ||
        // document.msFullscreenElement
      ) {
        /* Enter fullscreen */
        if (document.exitFullscreen) {
          document.exitFullscreen();
        // } else if (document<any>.msExitFullscreen) {
        //   document.msExitFullscreen(); /* IE/Edge */
        // } else if (document.mozCancelFullScreen) {
        //   document.mozCancelFullScreen(); /* Firefox */
        // } else if (document.webkitExitFullscreen) {
        //   document.webkitExitFullscreen(); /* Chrome, Safari & Opera */
        }
      } else {
        /* exit fullscreen */
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        // } else if (document.documentElement.webkitRequestFullscreen) {
        //   document.documentElement.webkitRequestFullscreen();
        // } else if (document.documentElement.mozRequestFullScreen) {
        //   document.documentElement.mozRequestFullScreen();
        // } else if (document.documentElement.msRequestFullscreen) {
        //   document.documentElement.msRequestFullscreen();
        }
      }
    });
  


}, []);

  useEffect(() => {
    const pay = document.getElementById("accessCodeModal") as HTMLElement;
    if(accessCodeProve.open){
      openModal(pay)
    }else{
      closeModal(pay)

    }
  }, [ accessCodeProve.open])

  useEffect(() => {
    const code = document.getElementById("accessCodeInfoModal") as HTMLElement;
    if(accessCodeInfo.open){
      openModal(code)
    }else{
      closeModal(code)
    }
  }, [ accessCodeInfo.open])


  const handleLogout = async () => {
    await auth.signOut();
    return window.location.assign("/");
  };


  const [accessCodeSchema, setAccessCodeSchema] =
    useState<accessCodeSchemaType>({
      accessCode: "",
      accessProve: null,
    });

  const handleSubmit2 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   
    setAccessCodeProve(prev => ({...prev, isSubmitting: true}))
    if (accessCodeSchema.accessProve === null || undefined) {
      return setAccessCodeProve(prev => ({...prev, isSubmitting: false}))
    }
    return accessCodeProveAction(accessCodeSchema, setAccessCodeSchema);
  };

  const accessCodeProveAction = async (
    values: accessCodeSchemaType,
    setFormData: React.Dispatch<React.SetStateAction<accessCodeSchemaType>>
  ) => {
    if (values.accessProve === null) {
      Toast.error.fire({
        text: "Access Code prove Required.Please select again",
      });
      return (
       setAccessCodeProve(prev => ({...prev, isSubmitting: false}))
      );
    }
    const user = auth.currentUser;
    const storageRef = ref(storage, `accessCodeProves/${user?.uid}`);
    try {
      await uploadBytes(storageRef, values.accessProve as Blob);
      const url = await getDownloadURL(storageRef);
      await addDoc(
        collection(db, `transactions/${user?.uid}/transactionDatas`),
        {
          slNo: Math.ceil(Math.random() + new Date().getSeconds()),
          uid: user?.uid,
          amount: accessCodeProve.price,
          type: "access Code",
          remarks: `Your access code prove was successfully updated`,
          date: serverTimestamp(),
          firstname: userDocument?.firstname,
          photo: userDocument?.photo,
          status: "pending",
          accessCodeProve: url,
          filterDate: new Date().toLocaleDateString(),
        }
      );
      setAccessCodeProve(prev => ({...prev, isSubmitting: false}))
       setFormData(prev => ({...prev , accessProve: null }))
      Toast.success.fire({
        text: " Your access code prove has been sent successfully.Wait for less than 24hours while we verify your prove...",
      });
    } catch (err: any) {
      setAccessCodeProve(prev => ({...prev, isSubmitting: false}))
      Toast.error.fire({ text: err });
    }
  };

  const handleSubmit1 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      handleAccessCode({
        open: true,      
        isSubmitting: true,
      } as accessCodeType)
    );
    if (accessCode === "") {
      Toast.error.fire({
        text: "Access Code Required",
      });
      return dispatch(
        handleAccessCode({
          open: true,
          
          isSubmitting: false,
        } as accessCodeType)
      );
    }
    return accessCodeCheck();
  };
  const accessCodeCheck = () => {
    if (accessCode !== userDocument?.accessCode) {
      return accessAction("notValid");
    } else {
      return accessAction("valid");
    }
  };

  const accessAction = (status: string) => {
    if (status === "notValid") {
      return new Promise((resolve, reject) => {
        setTimeout(() => reject("Expired or Invalid Access Code"), 5000);
      }).catch((e) => {
        dispatch(
          handleAccessCode({
            open: true,   
            isSubmitting: false,
          } as accessCodeType)
        );
        setAccessCode("")
        return Toast.error.fire({
          text: e,
        });
      });
    }
    if (status === "valid") {
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve("Access Code Success"), 4000);
      }).then((message: string | unknown) => {
        dispatch(
          handleAccessCode({
            open: true, 
            isSubmitting: false,
          } as accessCodeType)
        );
        setAccessCode("")
        Toast.success
          .fire({
            text: message as string,
          })
          .then(() => {
            return window.location.assign("/user/withdrawals");
          });
      });
    }
  };

  //clear all notifications
  const handleNotificationClear = async () => {
    const docRef = collection(db, noteRefData);
    const data = await getDocs(docRef);
    data.docs.forEach(async (each) => {
      await deleteDoc(doc(docRef, each.id));
    });
  };

    if (userLoading) {
      return <PreLoader />;
    }

  //   if(!userDocument?.verified || userDocument?.verified === "false"){
  //     router.push("/verify")
  // }

  return (
    <>
      <div  data-bs-backdrop="static" data-bs-keyboard="false"  id="accessCodeInfoModal" tabIndex={-1}
       className="modal fade"
       // open={accessCodeInfo.open}
       
      >
        <div className="modal-dialog modal-dialog-centered">
           <div className="modal-content c-bg rounded-lg shadow-lg">
            <div className="modal-header">
            <h5 className="modal-title text-bold uppercase text-red-500">
                Access Code 
              </h5>
      
        <button
              
                onClick={() =>
                  dispatch(
                    handleAccessCode({
                      open: false,             
                      isSubmitting: false,
                    } as accessCodeType)
                  )
                }
                className="btn-close "
                data-bs-dismiss="modal"
                aria-label="close"
              ></button>
            </div>
              <div className="modal-body">

        <form onSubmit={handleSubmit1}>
          <p>
            Access code is a personal withdrawal authorization code, to secure
            your withdrawal against scammers.
          </p>
          
            <div className="w-full mb-3  font-light">
              <input
                type="text"
                name="accessCode"
                placeholder="Enter Access Code"
                className="w-full px-8 py-3 rounded-lg font-medium bg-transparent border border-[#304ffe] text-white text-sm focus:outline-none focus:bg-opacity-10  mt-2"
                onChange={(e) => setAccessCode(e.target.value)}
                value={accessCode}
              />
            </div>

          <button disabled={accessCodeInfo.isSubmitting}  className=" tracking-wide font-semibold bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white w-full py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none" type="submit">
           {accessCodeInfo.isSubmitting ? "Submitting..." : "Submit"}
          </button>
            <div className="w-full   font-light">
              <p className="text-center my-2">Dont have ?</p>
              <button
                type="button"
              
                className=" tracking-wide font-semibold bg-red-500 text-white w-full py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                onClick={() => {
                  setAccessCodeProve({ ...accessCodeProve, open: true });
                  dispatch(
                    handleAccessCode({
                      open: false,
                      isSubmitting: false,
                    } as accessCodeType)
                  );
                }}
              >
                Get One
              </button>
            </div>
          
        </form>
              </div>
           </div>
        </div>

      </div>

      <div
      data-bs-backdrop="static" data-bs-keyboard="false"  id="accessCodeModal" 
       className="modal fade"
      
      >
        <div className="modal-dialog modal-dialog-centered ">
        <div className="modal-content c-bg rounded-lg shadow-lg">
        <div className="modal-header">
        <h5 className="modal-title text-bold uppercase text-red-500">
                Access Code 
              </h5>
      
        <button
                onClick={() => {
                  setAccessCodeProve((prev) => ({...prev, open:false}))
                  setAccessCodeSchema((prev) => ({...prev, accessProve: null}))
                }}
                className="btn-close "
                data-bs-dismiss="modal"
                aria-label="close"
              ></button>
        </div>
        <div className="modal-body">
        <h6 className="text-white mt-1 mb-3 text-center">
          Make payment with the below btc wallet and upload Prove
        </h6>
         
        <div className="flex flex-col justify-center items-center">
          <Image src="/assets/img/qrcode.jpg" width={300} height={300} alt="Code" />
          <p className="userTextColor mt-3">3GezeU2iVe7J9n9D4ZG8aKWGkQsxGDro2X</p>
        </div>

        <form onSubmit={handleSubmit2}>
          
            <div className="w-full  mb-3 font-light">
              <input
                type="file"
                name="accessProve"
                required
                className="w-full px-8 py-3 rounded-lg font-medium bg-transparent border border-[#304ffe] text-white text-sm focus:outline-none focus:bg-opacity-10  mt-2"
                placeholder="Access code"
                onChange={(e) =>
                  setAccessCodeSchema({
                    ...accessCodeSchema,
                    accessProve: e.target.files && e.target.files[0],
                  })
                }
              />
           
          </div>
          <button  className=" tracking-wide font-semibold bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white w-full py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none" type="submit" disabled={accessCodeProve.isSubmitting}>
           {accessCodeProve.isSubmitting?"...Uploading" :  "Upload"}
          </button>
        </form>

        </div>
        </div>
        </div>
       

      </div>
      <nav className="bg-[#12055c] sticky top-0 py-6 px-0 lg:px-2 shadow-lg z-20">
        <div className="container max-w-full mx-auto flex items-center justify-between md:pr-8 md:pl-10">
          <div className="flex justify-between items-center w-full ">
            <div className="flex justify-center items-center">
              <Image height={50} width={50} src="/assets/img/apple-touch-icon.png" alt="logo" />
              <span>Cryptonomize</span>
            </div>
            <div className="flex justify-center gap-2 items-center">
              <div>
                <span ref={screenRef} className="cursor-pointer hidden d-lg-inline rounded-xl bg-transparent">
                <IconM.MdFullscreen size={30}/>

                </span>
              </div>
              <div className="dropdown cursor-pointer relative">
                {notifications.length > 0 && (
                  <span className="w-4 h-4 flex text-xs justify-center items-center rounded-full absolute bg-green-500">
                    {notifications?.length}
                  </span>
                )}
                <Icons.HiBell
                  size={30}
                  className="dropdown-toggle "
                  id="notify-me"
                  aria-haspopup="false"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                />
                <div
                  className="dropdown-menu dropdown-menu-right overflow-y-scroll min-h-full c-bg"
                  aria-labelledby="notify-me"
                >
                
                  {notifications?.length > 0 ? (
                    notifications.map((each) => (
                      <div
                        key={each.id}
                        className="dropdown-item bg-transparent border-b "
                      >
                        <span className="text-white  text-sm-wrap">
                          {each.text}
                        </span>
                        <p className="text-muted">
                         
                          {moment(each.date?.toDate()).fromNow()}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className=" dropdown-item bg-transparent hover:text-red-500 text-red-500">
                      No notification
                    </p>
                  )}
                  {notifications?.length > 0 && (
                    <span onClick={handleNotificationClear} className="dropdown-item bg-transparent transition-color  duration-500 ease-linear text-red-500 hover:text-red-700 text-center">
                      clear All
                    </span>
                  )}
                </div>
              </div>
              <div className="dropdown">
                <Image
                  width={40}
                  height={40}
                  src={userDocument?.photo || "/assets/img/avater.png"}
                  className="dropdown-toggle rounded-full cursor-pointer "
                  id="dd-drop"
                  area-aria-expanded="false"
                  area-aria-haspopup="true"
                  data-bs-toggle="dropdown"
                  alt="profile"
                />

                <div
                  className="dropdown-menu c-bg "
                  area-aria-labelledby="dd-drop"
                >
                  <li className="dropdown-item hover:bg-red-500 transition-colors ease-linear duration-500 ">
                    <Link
                      className="text-white block w-full"
                      href="/user/profile"
                    >
                      Profile
                    </Link>
                  </li>
                  <li
                    className=" text-white dropdown-item hover:bg-red-500 transition-colors ease-linear duration-500 "
                    onClick={handleLogout}
                  >
                    <Link href="#" className="block w-full">
                      Logout
                    </Link>
                  </li>
                </div>
              </div>
              <div className="lg:hidden block ">
                <button onClick={() => dispatch(handleSidebar("" as any))}>
                  <Icons.HiBars3 size={30} color="white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
