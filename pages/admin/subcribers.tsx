import AdminHero from '@/components/admin/AdminHero'
import AdminNavbar from '@/components/admin/AdminNavbar'
import AdminSidebar from '@/components/admin/AdminSidebar'
import useCollection from '@/components/hooks/UseCollection'
import FooterAdmin from '@/components/admin/FooterAdmin'
import Layout from '@/components/Layout'
import handleStatus from '@/utils/handleStatus'
import { Card, CardBody } from '@material-tailwind/react'
import moment from 'moment'
import React from 'react'
import * as Icons from "react-icons/bs"
import { deleteDoc, doc, DocumentData } from 'firebase/firestore'
import Toast from '@/utils/Alert'
import { db } from '@/db/firebaseDb'

function Subcribers() {
  const [newsletters] = useCollection("newsletters")

  const handleDelete = async (item: DocumentData) => {
    try {
      await deleteDoc(
        doc(db, "newsletters", item.uid)
      );
      Toast.success.fire({ text: "Document successfully deleted" });
    } catch (error: any) {
      Toast.error.fire({ text: error.code });
    }
    //api call for delete
    // setProductData((prev) => prev.filter((each) => each.id !== id));
  };

 
  return (
    <>
    <AdminNavbar/>

   
    <div className='flex'>
    <AdminSidebar />
    
    <div className="w-full min-h-screen mb-10">
          <Layout>
            <AdminHero title="Subcribers" />
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
                          Email
                        </th>
                        <th className="px-2 text-white align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                          User
                        </th>

                        <th className="px-2 text-white align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                          Type
                        </th>

                        <th className="px-2 text-white align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                          Date
                        </th>
                        <th className="px-2 text-white align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                          Status
                        </th>
                        <th className="px-2 text-white align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {newsletters.length  > 0 &&
                        newsletters?.map((each) => (
                          <tr key={each.uid}>
                            <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                              {each.uid.slice(0, 5)}
                            </th>
                            <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                              {each.newsLetter}
                            </th>
                            <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                              {each.user}
                            </th>

                            <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                             Subcriber
                            </td>
                           
                            <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                              {moment(each.date.toDate()).fromNow()}
                            </td>
                            <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                              {handleStatus(each.status)}
                            </td>
                            <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
           
           <Icons.BsTrash
             onClick={() => handleDelete(each)}
             size={24}
             className="cursor-pointer text-red-500 ml-4"
           />
         </td>
                          </tr>
                        ))}
                      {!newsletters?.length && (
                        <tr>
                          <td
                            colSpan={7}
                            rowSpan={7}
                            className=" text-red-500 uppercase text-center pt-8 text-sm font-bold pb-12"
                          >
                            No Subcriber Yet
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardBody>
            </Card>
            </Layout>
            </div>
            </div>
            <FooterAdmin />
            </>
  )
}

export default Subcribers

Subcribers.defaultProps ={
  needsAuth: true,
  isAdmin: true

}