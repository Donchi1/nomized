import React, { useState, useEffect, useRef } from "react";
import AdminNavbar from "@/components/user/UserNavbar";
import Sidebar from "@/components/user/Sidebar";
import FooterUser from "@/components/user/FooterUser";
import Image from "next/image";

import Message from "@/components/user/Message";
import ChatFooter from "@/components/user/ChatFooter";

import { auth, db } from "@/db/firebaseDb";
import useGetDocWithClause from "@/components/hooks/UseGetDocWithClause";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { collection, DocumentData, onSnapshot, orderBy, query } from "firebase/firestore";

function Chat() {

   const scrollRef = useRef<HTMLDivElement>(null)

    const [admin] = useGetDocWithClause({colls:"users",q:{path:"isAdmin", condition:"==", value: true}})

    const combinedId:string = admin[0]?.uid + auth.currentUser?.uid

    const [messages, setMessages] = useState<DocumentData[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)


    const {currentUser} =  useSelector((state: RootState) => state.auth)

    useEffect(() => {
   
      const unsubscribe = onSnapshot(
        query(collection(db, `chats/${combinedId}/messages`), orderBy("date")),
        (qsnap) => {
          const colData = qsnap.docs.map((each) => ({ ...each.data(), id: each.id }))
          setMessages(
            colData
          );
          setLoading(false);
          scrollRef.current && scrollRef.current.scrollIntoView({behavior: "smooth"})
        },
        (err) => {
          setError(err.message);
          setLoading(false);
        }
      );
      return unsubscribe;
    }, [combinedId]);

  return (
    <>
      <AdminNavbar />

      <div className="flex">
        <Sidebar />
        <div className='w-full '>
        <div className="mt-6 h-screen footer-bg flex-more homepage-3 mx-0 lg:mx-2 lg:px-4 ">
          <div
            className="flex   chart-card flex-col c-bg rounded-lg pb-2 "
            
          >
            <div className=" h-20 rounded-lg bg-gradient-to-tr from-light-blue-500   to-light-blue-700 text-white">
              <div className=" mx-auto flex h-full chat-container justify-between items-center">
                <p>Admin</p>

                <div className="flex gap-4 items-center">
                  <Image
                    height={30}
                    width={30}
                    className="rounded-full "
                    src={currentUser?.photo}
                    alt="logo"
                  />
                  <span>{currentUser?.firstname}</span>
                </div>
              </div>
            </div>
            <div className="chat-message mt-2  overflow-x-hidden ">
            
             {messages?.length > 0 ? messages.map(each => (
                 <Message message={each} key={each.id} />

             )) : 
             <div className="flex no-message justify-center h-full items-center text-5xl text-muted">
                <p className="text-center ">Write a message to start a chat</p>
             </div>
             }
             <div ref={scrollRef}/>
            </div>
            <ChatFooter scrollRef={scrollRef} />
          </div>
        </div>
        <FooterUser/>
        </div>
      </div>
    </>
  );
}

export default Chat;
Chat.defaultProps ={
  needsAuth: true,


}
