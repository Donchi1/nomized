import { DocumentData, Timestamp } from 'firebase/firestore'
import React from 'react'

export type ChatDataType = {
    lastMessage: string,
    date: Timestamp,
    senderPhoto: string,
    firstname: string,
    uid: string,
    lastname: string
    
}
type UserData = {
    setChatUserId: React.Dispatch<React.SetStateAction<string>> ,
     chat: ChatDataType

}
   

function UsersChat({chat, setChatUserId}:UserData) {
  return (
    <div onClick={() => setChatUserId(chat.uid)} className="flex justify-center items-center chat-users gap-2 cursor-pointer  rounded-lg py-1">
                <img className="w-16 h-16 rounded-full object-cover" src={chat.senderPhoto} alt="chats" />
                <div className="flex gap-1 flex-col items-center">
                <span className="text-black font-extrabold capitalize">{chat.firstname}</span>
                 <span className="text-ellipsis whitespace-nowrap">{chat.lastMessage?.slice(0, 20)}...</span>
                </div>
                </div>
  )
}

export default UsersChat