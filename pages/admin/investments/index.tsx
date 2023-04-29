import AdminHero from '@/components/admin/AdminHero'
import AdminNavbar from '@/components/admin/AdminNavbar'
import AdminSidebar from '@/components/admin/AdminSidebar'
import useCollectionGroup from '@/components/hooks/UseCollectionGroup'
import Layout from '@/components/Layout'
import FooterAdmin from '@/components/admin/FooterAdmin'
import { db } from '@/db/firebaseDb'
import Toast from '@/utils/Alert'

import {DataGrid, GridColDef} from "@mui/x-data-grid"
import { deleteDoc, doc, DocumentData, updateDoc } from 'firebase/firestore'
import moment from 'moment'
import { useRouter } from 'next/router'
import * as Icons from "react-icons/bs"
import React from 'react'
import Image from 'next/image'
import formatCurrency from '@/utils/converter'
import handleStatus from '@/utils/handleStatus'

function Index() {
  
  const router = useRouter()
  const [investments, isLoading, isError] =
    useCollectionGroup("investmentDatas");

  const handleDelete = async (item: DocumentData) => {
    try {
      await deleteDoc(
        doc(db, "investments", item.uid, "investmentDatas", item.id)
      );
      Toast.success.fire({ text: "Document successfully deleted" });
    } catch (error: any) {
      Toast.error.fire({ text: error.code });
    }
    //api call for delete
    // setProductData((prev) => prev.filter((each) => each.id !== id));
  };


  const columns:GridColDef[] = [
    {
      field: "username",
      headerName: "Name",
      width: 150,
      renderCell: (params) => {
        return (
          <span   className="inline-flex items-center gap-2">
          
              <Image
              height={12}
              width={12}
                src={params.row.photo}
                alt="pics"
                className="w-12 rounded-full h-12"
              />
              {params.row.username}
            
          </span>
        );
      },
    },
    {
      field: "investedAmount",
      headerName: "Amount",
      width: 100,
    },
    {
      field: "Profit",
      headerName: "profit",
      width: 150,
      renderCell: (params) => <span>{formatCurrency(params.row?.profit)}</span>
    },

    {
      field: "expectedProfit",
      headerName: "Exp-Profit",
      width: 100,
      renderCell: (params) => <span>{formatCurrency(params.row?.expectedProfit)}</span>
    },
    {
      field: "fixedCharge",
      headerName: "Charges",
      width: 90,
    },
    {
      field: "progress",
      headerName: "Progress",
      width: 100,
    },
    {
      field: "date",
      headerName: "Date",
      renderCell: (params) => <span >{moment(params.row.date.toDate()).fromNow()}</span>,
      width: 130,
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      renderCell: (params) => <span>{handleStatus(params.row?.status)}</span>
    },
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        return (
          <>
            <button
              onClick={() => router.push(`edit/${params.row.uid}/${params.row.id}`)}
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
    <AdminNavbar/>

   
    <div className='flex'>
   
    <AdminSidebar />
   
    <div className='w-full min-h-screen'>
    <Layout>
        <AdminHero title='Investments' />
      <div className=" mt-10 " />
      
      <DataGrid
      columns={columns}
      rows={investments}
      getRowId={(rows) => rows?.id}
      autoHeight
      disableRowSelectionOnClick
      className='c-bg  text-white '
      />
      </Layout>
      </div>
      </div>
      <FooterAdmin />
      </>
  )
}

export default Index

Index.defaultProps ={
  needsAuth: true,
  isAdmin: true

}