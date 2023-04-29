import React from "react";
import useCollection from "@/components/hooks/UseCollection";
import Layout from "@/components/Layout";
import Sidebar from "@/components/user/Sidebar";
import UserHero from "@/components/user/UserHero";
import AdminNavbar from "@/components/user/UserNavbar";
import FooterUser from "@/components/user/FooterUser";
import { auth } from "@/db/firebaseDb";
import handleStatus from "@/utils/handleStatus";
import { Card, CardBody } from "@material-tailwind/react";
import moment from "moment";
import Image from "next/image";

function Transactions() {
  const [transactions] = useCollection(
    `transactions/${auth.currentUser?.uid}/transactionDatas`
  );

  return (
    <>
      <AdminNavbar />

      <div className="flex">
        <Sidebar />

        <div className="w-full">
          <Layout>
            <UserHero title="transactions" />
            <div className=" mt-10 " />

            <Card
              className="bg-[#12055c] c-bg text-white "
              style={{ minHeight: "80vh" }}
            >
              <CardBody>
                <div className="overflow-x-auto">
                  <table className="items-center w-full bg-transparent border-collapse">
                    <thead>
                      <tr>
                        <th className="px-2 text-white align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                          ID
                        </th>
                        <th className="px-2 text-white align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                          User
                        </th>

                        <th className="px-2 text-white align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                          Type
                        </th>

                        <th className="px-2 text-white align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                          amount
                        </th>
                        <th className="px-2 text-white align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                          Remark
                        </th>
                        <th className="px-2 text-white align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                          Prove
                        </th>

                        <th className="px-2 text-white align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                          Date
                        </th>
                        <th className="px-2 text-white align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {(transactions?.length as number) > 0 &&
                        transactions?.map((each) => (
                          <tr key={each.uid}>
                            <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                              {each.idx.slice(0, 5)}
                            </th>
                            <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                              {each.firstname}
                            </th>

                            <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                              {each.type}
                            </td>
                            <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                              {each.amount}
                            </td>
                            <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                              {each.remark}
                            </td>
                            <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                              <Image
                                src={each.prove}
                                height={14}
                                width={40}
                                className="h-14 w-14 rounded-full"
                                alt="prove"
                              />
                            </td>
                            <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                              {moment(each.date.toDate()).fromNow()}
                            </td>
                            <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                              {handleStatus(each.status)}
                            </td>
                          </tr>
                        ))}
                      {!transactions?.length && (
                        <tr>
                          <td
                            colSpan={7}
                            rowSpan={7}
                            className=" text-red-500 uppercase text-center pt-8 text-sm font-bold pb-12"
                          >
                            No transaction Yet
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardBody>
            </Card>
          </Layout>

          <FooterUser />
        </div>
      </div>
    </>
  );
}

export default Transactions;
Transactions.defaultProps ={
  needsAuth: true,


}
