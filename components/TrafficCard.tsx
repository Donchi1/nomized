import {Card} from "@material-tailwind/react";
import {CardHeader} from "@material-tailwind/react";
import {CardBody} from "@material-tailwind/react";
import {Button} from "@material-tailwind/react";
import {Progress} from "@material-tailwind/react";
import { useRouter } from "next/router";
import { DocumentData } from "firebase/firestore";
import formatCurrency from "@/utils/converter";

interface trafficCardType {
  profile: DocumentData | null;
  payments: DocumentData[] | null;
  investments: DocumentData[] | null;
  initial: number;
  total: number;
  interest: number;

}

export default function TrafficCard({
  profile,
  payments,
  initial,
  total,
  interest,
  investments
}: trafficCardType) {

  const {push} = useRouter();
  return (
    <Card className="c-bg">
      <CardHeader color="purple" className="justify-none p-2">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-white text-2xl">Account Info</h2>
          <Button
            className="bg-transparent"
            size="lg"
            style={{ padding: 0 }}
            onClick={() => push("/user/profile")}
          >
            See More
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        <div className="overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead className="thead-light">
              <tr>
                <th className="px-2 text-purple-400 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                  Datas
                </th>
                <th className="px-2 text-purple-400 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                  Values
                </th>
                <th className="px-2 text-purple-400 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left w-56"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="border-b text-white border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                  Deposits
                </th>
                <td className="border-b text-white border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                {formatCurrency(Number(profile?.initialDeposit) || 0)}
                </td>
                <td className="border-b  border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                  <Progress color="blue" value={20} />
                </td>
              </tr>
              <tr>
                <th className="border-b text-white border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                 Payments
                </th>
                <td className="border-b text-white border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
               {payments?.length}
                </td>
                <td className="border-b  border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                  <Progress color="blue" value={20} />
                </td>
              </tr>
              <tr>
                <th className="border-b text-white border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                  Investments
                </th>
                <td className="border-b text-white border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                  {investments?.length}
                </td>
                <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                  <Progress color="red" value={initial} />
                </td>
              </tr>
              <tr>
                <th className="border-b text-white border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                  Interest
                </th>
                <td className="border-b text-white border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                {formatCurrency(Number(profile?.interestBalance || 0))}
                </td>
                <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                  <Progress color="indigo" value={interest} />
                </td>
              </tr>
              <tr>
                <th className="border-b text-white border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                  Total Earned
                </th>
                <td className="border-b text-white border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                
                  { formatCurrency(Number(profile?.mainBalance) + Number(profile?.interestBalance) ||
                    0)}
                </td>
                <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                  <Progress color="light-blue" value={total} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
}
