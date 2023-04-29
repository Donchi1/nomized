import React, { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot, DocumentData } from "firebase/firestore";
import { db } from "../../db/firebaseDb";
import { useDispatch } from "react-redux";
import { getAllUsers } from "../../redux/adminAuthSlice";
import { RootDispatch } from "../../redux/store";

function useCollection(col: string, shouldDispatch?: boolean) {
  const dispatch = useDispatch<RootDispatch>()
  const [myCollection, setMyCollection] = useState<Array<DocumentData>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  
  useEffect(() => {
    
  
    const unsubscribe = onSnapshot(
      query(collection(db, col), orderBy("date")),
      (qsnap) => {

        const colData = qsnap.docs.map((each) => ({ ...each.data(), id: each.id }))
    
        setMyCollection(
          colData
        );
        setLoading(false);
        shouldDispatch && dispatch(getAllUsers({users:colData, loading: false }))
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, [col, shouldDispatch]);

  return [myCollection, loading, error] as const;
}

export default useCollection;
