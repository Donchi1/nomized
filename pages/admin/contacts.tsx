import React, { useEffect } from 'react'

import {DataGrid, GridColDef} from "@mui/x-data-grid"
import * as Icons from "react-icons/bs"
import Image from 'next/image';
import moment from 'moment';
import { collection, deleteDoc, doc, DocumentData, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/db/firebaseDb';
import Toast from '@/utils/Alert';
import useCollection from '@/components/hooks/UseCollection';
import AdminNavbar from '@/components/admin/AdminNavbar';
import AdminSidebar from '@/components/admin/AdminSidebar';
import Layout from '@/components/Layout';
import AdminHero from '@/components/admin/AdminHero';
import FooterAdmin from '@/components/admin/FooterAdmin';
import handleStatus from '@/utils/handleStatus';



function Contacts() {
  const [contacts, isLoading, isError] =
    useCollection("contacts");
    
  

  const handleDelete = async (item: DocumentData) => {
    try {
      await deleteDoc(
        doc(db, "contacts", item.id)
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
      field: "uid",
      headerName: "ID",
      width: 90,
  
    },
    {
      field: "name",
      headerName: "Name",
      width: 200,
  
    },
    {
      field: "subject",
      headerName: "Subject",
      width: 150,
    },
   
    {
      field: "date",
      headerName: "Date",
      renderCell: (params) => <span >{moment(params.row.date.toDate()).fromNow()}</span>,
      width: 130,
    },
    {
      field: "message",
      headerName: "Message",
      width: 300,
    },
    {
      field: "status",
      headerName: "Status",
      renderCell: (params) => <span >{handleStatus(params.row.status)}</span>,
      width: 100,
      
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
           
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
    
    <div className="w-full min-h-screen">
          <Layout>
            <AdminHero title="Contacts" />
            <div className=" mt-10 " />
        <DataGrid
      columns={columns}
      rows={contacts}
      getRowId={(rows) => rows?.id}
      editMode="cell"
      autoHeight
      loading={isLoading}
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

export default Contacts

Contacts.defaultProps ={
  needsAuth: true,
  isAdmin: true

}