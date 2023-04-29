import React, { useEffect, useState } from "react";
import { auth, db } from "../../db/firebaseDb";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { onAuthStateChanged, User, updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { getUser } from "../../redux/authSlice";

type ArgType = {
  user: DocumentData | undefined,
  loading: boolean,
  type: "auth/getUser"
} 

export const useGetCurrentUser = () => {
  const [user, setUser] = useState<DocumentData | null | undefined>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
     
      if (authUser) {
        console.log(authUser)
        getDoc(doc(db, "users", authUser.uid)).then((fireUser ) => {
             setUser(fireUser?.data());
           
             dispatch(getUser({user: fireUser.data(), loading: false } as any));
             setLoading(false);
           }).catch(err =>{
             console.log(err)
             setLoading(false);
           })
        
      } else {
        setLoading(false);
        setError("No user found. Please Reauthenticate!!");
      }
    });
  }, []);

  return [user, loading, error] as const;
};
