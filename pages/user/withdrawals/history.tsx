import React from "react";
import useCollection from "@/components/hooks/UseCollection";
import TableCard from "@/components/user/TableCard";
import { auth } from "@/db/firebaseDb";
import AdminNavbar from "@/components/user/UserNavbar";
import FooterUser from "@/components/user/FooterUser";
import Sidebar from "@/components/user/Sidebar";
import UserHero from "@/components/user/UserHero";
import Layout from "@/components/Layout";

const WithdrawalHistory = () => {
  const [withdrawals] = useCollection(
    `withdrawals/${auth.currentUser?.uid}/withdrawalDatas`
  );
  return (
    <>
      <AdminNavbar />

      <div className="flex">
        <Sidebar />

        <div className='w-full'>

        <Layout>
          <UserHero title="Withdrawals" />

          <div className="  mt-10 " />
          <TableCard data={withdrawals} />
        </Layout>
      <FooterUser />
        </div>
      </div>
    </>
  );
};

export default WithdrawalHistory;

WithdrawalHistory.defaultProps ={
  needsAuth: true,


}
