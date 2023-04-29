import React, { useEffect } from 'react'
import AdminHero from '@/components/admin/AdminHero'
import AdminNavbar from '@/components/user/UserNavbar'
import FooterAdmin from '@/components/admin/FooterAdmin'
import Layout from '@/components/Layout'
import AdminSidebar from '@/components/admin/AdminSidebar'
import useCollectionGroup from '@/components/hooks/UseCollectionGroup'
import {DataGrid, GridColDef} from '@mui/x-data-grid'
import * as Icons from "react-icons/bs"
import moment from 'moment'
import handleStatus from '@/utils/handleStatus'
import { useRouter } from 'next/router'
import { collection, collectionGroup, deleteDoc, doc, DocumentData, getDocs, setDoc } from 'firebase/firestore'
import { db } from '@/db/firebaseDb'
import Toast from '@/utils/Alert'
import Image from 'next/image'



function Withdrawals() {
  
  const [ withdrawals, loading, error ] = useCollectionGroup("withdrawalDatas");
   const router = useRouter()

   const handleDelete = async (item: DocumentData) => {
    try {
      await deleteDoc(
        doc(db, "withdrawals", item.uid, "withdrawalDatas", item.id)
      );
      Toast.success.fire({ text: "Document successfully deleted" });
    } catch (error: any) {
      Toast.error.fire({ text: error.code });
    }
    //api call for delete
    // setProductData((prev) => prev.filter((each) => each.id !== id));
  };

  // useEffect(() => {
  //  const gg = async () => {
  //   const res = await getDocs(collectionGroup(db, `withdrawalDatas`))
  //   const resW = await getDocs(collection(db, `withdrawals`))
  //   res.docs.map(async each =>{ 
  //    await setDoc(doc(db,`withdrawals/${each.ref.parent.parent?.id}/withdrawalDatas/${each.id}`), {
  //       status:each.data().statusPending && "pending",
  //       charge: 0.5
  //    }, {merge: true}) 
  //   })
  //  res.docs.map(async each => {
  //     // await setDoc(doc(db, ``))
  //  })
  //  }
  //  gg()
  // }, [])

    
      const columns: GridColDef[] = [
        {
          field: "idx",
          headerName: "ID",
        },
        {
          field: "currentUserfirstname",
          headerName: "Name",
          width: 100,
          
        },
        {
          field: "email",
          headerName: "Email",
          width: 150,
          
        },
        {
          field: "withdrawalAmount",
          headerName: "Amount",
          width: 100,
        },
        {
          field: "method",
          headerName: "Method",
          width: 100,
        },
      
        {
          field: "charge",
          headerName: "Charge",
          width: 90,
        },
        {
          field: "AccountNumber",
          headerName: "Account No",
          width: 100,
          renderCell: (params) => (
            <span>{params.row.accountNumber || params.row.AccountNumber}</span>
          ),
        },
      
      
        {
          field: "date",
          headerName: "Date",
          renderCell: (params) => (
            <span>{moment(params.row.date.toDate()).fromNow()}</span>
          ),
          width: 130,
        },
        {
          field: "status",
          headerName: "Status",
          width: 100,
          renderCell: (params)=> <span>{handleStatus(params.row?.status)}</span>
        },
        {
          field: "action",
          headerName: "Action",
          width: 200,
          renderCell: (params) => {
            return (
              <>
                <button
                  onClick={() =>
                    router.push(`withdrawals/edit/${params.row.uid}/${params.row.id}`)
                  }
                  className=" text-white px-4 py-2  outline-none border-none rounded-full bg-green-400"
                >
                  Edit
                </button>
                <Icons.BsTrash
                  onClick={() => handleDelete(params.row)}
                  size={24}
                  className="cursor-pointer text-red-500 ml-4"
                />
              </>
            );
          },
        },
      ];
 
  
  return (
<>

      <AdminNavbar />

      <div className="flex">
        <AdminSidebar />

        <div className="w-full ">
        <div className=" min-h-screen mb-10 lg:mb-0">
          <Layout>
            <AdminHero title="Withdrawals" />
            <div className=" mt-10 " />
            <DataGrid 
            columns={columns}
            rows={withdrawals}
            getRowId={(row) => row?.id}
            disableRowSelectionOnClick
            autoHeight
            className="c-bg  text-white"
            loading={loading}
            />

    </Layout>
    </div>
    <FooterAdmin />
    </div>
    </div>
    </>
  )
}

export default Withdrawals
Withdrawals.defaultProps ={
  needsAuth: true,
  isAdmin: true

}
