import AdminNavbar from "@/components/user/UserNavbar";
import useCollection from "@/components/hooks/UseCollection";
import Sidebar from "@/components/user/Sidebar";
import FooterUser from "@/components/user/FooterUser";
import TableCard from "@/components/user/TableCard";
import { auth } from "@/db/firebaseDb";
import React from "react";
import UserHero from "@/components/user/UserHero";
import Layout from "@/components/Layout";

function History() {
  const [payments] = useCollection(
    `payments/${auth.currentUser?.uid}/paymentDatas`
  );
  return (
    <>
      <AdminNavbar />

      <div className="flex">
        <Sidebar />

        <div className="w-full">
          <Layout>
            <UserHero title="Payments" />

            <div className=" mt-10 " />
            <TableCard data={payments} />
          </Layout>
          <FooterUser />
        </div>
      </div>
    </>
  );
}

export default History;

History.defaultProps ={
  needsAuth: true,


}
