import AdminHero from "@/components/admin/AdminHero";
import AdminNavbar from "@/components/admin/AdminNavbar";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Layout from "@/components/Layout";
import FooterAdmin from "@/components/admin/FooterAdmin";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";
import * as Icons from "react-icons/bs";
import useGetDocWithClause from "@/components/hooks/UseGetDocWithClause";
import { useRouter } from "next/router";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/db/firebaseDb";
import Toast from "@/utils/Alert";
import Image from "next/image";
import formatCurrency from "@/utils/converter";
import Link from "next/link";

function Index() {
  const [users, loading] = useGetDocWithClause({colls:"users", 
   q:{ path: "isAdmin",
   condition: "==",
    value: false,
}});

  const navigate = useRouter();

  const handleDelete = async (id: string) => {
    //api call for delete
    try {
      await deleteDoc(doc(db, "users", id));

      Toast.success.fire({
        icon: "success",
        text: "user successfully deleted",
      });
    } catch (err: any) {
      Toast.error.fire({ icon: "error", text: err });
    }
  };
  const columns: GridColDef[] = [
    { field: "uid", headerName: "Id", width: 90 },
    {
      field: "name",
      headerName: "User",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="flex gap-2 items-center  ">
            <Image
              height={12}
              width={12}
              src={params.row.photo}
              alt="pics"
              className="w-12 rounded-full h-12 object-cover"
            />
            {params.row.firstname} {params.row.lastname}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 130,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 150,
    },
 
    {
      field: "country",
      headerName: "Country",
      width: 100,
    },
    {
      field: "mainBalance",
      headerName: "TotalB",
      width:100,
      renderCell: (params) => (
        <span>{formatCurrency(params.row.mainBalance || 0)}</span>
      ),
    },
    {
      field: "interestBalance",
      headerName: "InterestB",
      width: 100,
      renderCell: (params) => (
        <span>{formatCurrency(params.row.interestBalance || 0)}</span>
      ),
    },
    {
      field: "initialDeposit",
      headerName: "Deposites",
      width: 100,
      renderCell: (params) => (
        <span>{formatCurrency(params.row.initialDeposit || 0)}</span>
      ),
    },

    {
      field: "status",
      headerName: "status",
      width: 130,
    },
    {
      field: "action",
      headerName: "Action",
      width: 130,
      renderCell: (params) => {
        return (
          <>
            <button
              onClick={() => navigate.push(`/admin/users/edit/${params.row.uid}`)}
              className=" text-white px-4 py-2  outline-none border-none rounded-full bg-green-400"
            >
              Edit
            </button>
            <Icons.BsTrash
              onClick={() => handleDelete(params.row.uid)}
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
            <AdminHero title="Users" />
            <div className=" mt-10 " />
          <div className="mb-2">
            <Link className="border p-2 text-red-500 rounded-md" href="users/create">Create</Link>
          </div>
            <DataGrid
              columns={columns}
              rows={users}
              getRowId={(row) => row?.id}
              disableRowSelectionOnClick
              autoHeight
              className="c-bg  text-white"
            />
          </Layout>
        </div>
        <FooterAdmin />
        </div>
      </div>
    </>
  );
}

export default Index;

Index.defaultProps ={
  needsAuth: true,
  isAdmin: true

}