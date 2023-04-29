import React, { useState, useEffect } from "react";
import { getDoc, doc, onSnapshot, getDocs, DocumentData } from "firebase/firestore";
import { db } from "@/db/firebaseDb";
import { useDispatch } from "react-redux";
import { getUser } from "../../redux/authSlice";

function useGetDocument(colls: string, docId:string, { snap, user }:{snap:boolean, user?: boolean}) {
  const [document, setDocument] = useState<DocumentData | undefined | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch()
  useEffect(() => {
    const getDocument = async () => {

      if (snap) {
        
        const unsubscribe = onSnapshot(
          doc(db, colls, docId),
          (qsnap) => {
            setDocument(qsnap.data());
            setLoading(false);
            if(user) dispatch(getUser({user:qsnap.data(), loading: false} as any))
           
          },
          (err) => {
            setError(err.message);
            setLoading(false);
           
          }
        );
        return unsubscribe;
      } else {
        try {
          const data = await getDoc(doc(db, colls, docId));
          setDocument(data.data());
          setLoading(false);
        } catch (err: any) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    getDocument();
  }, []);

  return [document, loading, error] as const;
}



export default useGetDocument;
