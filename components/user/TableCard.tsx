import {Card} from '@material-tailwind/react'
import {CardHeader} from '@material-tailwind/react'
import {CardBody} from '@material-tailwind/react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import useCollection from '../hooks/UseCollection'
import { auth } from '@/db/firebaseDb'
import { DocumentData } from 'firebase/firestore'
import handleStatus from '@/utils/handleStatus'

export default function TableCard({data}: {data: DocumentData[] | null}) {
  return (
   
    <Card className="bg-[#12055c]  c-bg text-white " style={{minHeight: "80vh"}}>
     
      <CardBody >
        <div className="overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-2 text-white align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                  ID
                </th>
                <th className="px-2 text-white align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                  Method
                </th>

                <th className="px-2 text-white align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                  Name
                </th>
                <th className="px-2 text-white align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                  amount
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
              {data?.length as number > 0 &&
                data?.map((each) => (
                  <tr key={each.uid}>
                    <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                      {each.idx.slice(0, 8)}
                    </th>
                    
                    <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                      {each.method}
                    </td>
                    <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                      {each.firstname}
                    </td>
                    <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                    €{each.paymentAmount}
                    </td>
                    <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                      {moment(each.date.toDate()).fromNow()}
                    </td>
                    <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                     {handleStatus(each.status)}
                      
                    </td>
                  </tr>
                ))}
              {!data?.length  && (
                <tr>
                  <td
                    colSpan={6}
                    className=" text-red-500 uppercase text-center pt-8 text-sm font-bold "
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
 
  )
}
