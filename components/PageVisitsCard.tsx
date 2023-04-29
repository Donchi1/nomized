import {Card} from "@material-tailwind/react"
import {CardHeader} from "@material-tailwind/react"
import {CardBody} from  "@material-tailwind/react"
import {Button} from "@material-tailwind/react"
import { useRouter } from 'next/router'
import moment from 'moment'
import { DocumentData } from "firebase/firestore"
import handleStatus from "@/utils/handleStatus"


type pageVisitedTypes = {

 transactions: DocumentData[] ,
 current?:string 
}

export default function PageVisitsCard({  transactions, current }: pageVisitedTypes) {
  const { push } = useRouter()

  
  return (
    <Card className="c-bg min-h-full " >
      <CardHeader color="blue" className="justify-none p-2">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-white text-2xl">Latest Transactions</h2>
          <Button
            className="bg-transparent"
            
            size="lg"
            style={{ padding: 0 }}
            onClick={() => push(`/${current? current: "user"}/transactions`)}
          >
            See More
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        <div className="overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-2 text-white align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                  ID
                </th>
                <th className="px-2 text-white align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left ">
                  Type
                </th>

                <th className="px-2 text-white align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left ">
                  Name
                </th>
                <th className="px-2 text-white align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left ">
                  amount
                </th>
                <th className="px-2 text-white align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                  Date
                </th>
                <th className="px-2 text-white align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left ">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions?.length > 0 ?
                transactions.map((each: any) => (
                  <tr key={each.uid}>
                    <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left text-white">
                      {each.slNo}
                    </th>
                    <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left text-white">
                      {each.type}
                    </td>
                    <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left text-white">
                      {each.firstname}
                    </td>
                    <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left text-white">
                      {each.amount || "00"}
                    </td>
                    <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left text-white">
                      {moment(each.date?.toDate()).calendar()}
                    </td>
                    <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left text-white">
                     {handleStatus(each.status)}
                    </td>
                  </tr>
                )) : 
            
                <tr>
                  <td
                    colSpan={6}
                    rowSpan={4}
                    className=" text-red-500 uppercase text-center pt-8 text-sm font-bold pb-12"
                  >
                    No transaction Yet
                  </td>
                </tr>
                }
              
            </tbody>
          </table>
          {/* <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-2 text-white align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left ">
                  ID
                </th>
                <th className="px-2 text-white align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left ">
                  Type
                </th>
                <th className="px-2 text-white align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left ">
                  Name
                </th>
                <th className="px-2 text-white align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left ">
                  amount
                </th>
                <th className="px-2 text-white align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left ">
                  Date
                </th>
                <th className="px-2 text-white align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left ">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {withdrawals &&
                withdrawals.map((each) => (
                  <tr key={each.uid}>
                    <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left text-white">
                      {each.idx.slice(0, 5)}
                    </th>
                    <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left text-white">
                      Withdrawal
                    </td>
                    <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left text-white">
                      {each.withdrawerName}
                    </td>
                    <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left text-white">
                      {each.withdrawalAmount}
                    </td>
                    <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left text-white">
                      {moment(each.date.toDate()).calendar()}
                    </td>
                    <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left text-white">
                      {each.statusSuccess && (
                        <span className="border border-green-500 text-green-500 rounded-full p-8">
                          success
                        </span>
                      )}
                      {each.statusFailed && (
                        <span className="border border-red-600 text-red-600 rounded-full p-8">
                          Failed
                        </span>
                      )}
                      {each.statusPending && (
                        <span className="border border-yellow-500 text-yellow-500 rounded-full p-8">
                          Pending
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              {withdrawals?.length < 1 && (
                <tr>
                  <td
                    colSpan={5}
                    className=" text-red-500 uppercase text-center pt-8 text-sm font-bold pb-12"
                  >
                    No transaction Yet
                  </td>
                </tr>
              )}
            </tbody>
          </table> */}
        </div>
      </CardBody>
    </Card>
  )
}
