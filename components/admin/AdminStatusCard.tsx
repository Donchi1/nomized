

import {CardFooter} from '@material-tailwind/react'
import * as Icons from  "react-icons/hi2"
import * as Icon1 from  "react-icons/bi"
import * as Icon2 from  "react-icons/md"





type statusCardType = {
  color: string,
  icon: string,
  title: string,
  amount: number,
  percentage: number,
  percentageColor: string,
  percentageIcon: string,
  date: string,
}

export default function AdminStatusCard({
  color,
  icon,
  title,
  percentage,
  amount,
  percentageColor,
  percentageIcon,
  date,
}: statusCardType) {

  const checkIcon = (type: string) => {
      let icon 
      if(type === "users") icon = <Icon1.BiGroup size={20} />
      if(type === "rInvestments") icon = <Icon2.MdAttachMoney size={20} />
      if(type === "cInvestments") icon = <Icon2.MdPayments size={20} />
      if(type === "pendingW") icon = <Icon2.MdMonetizationOn size={20} />

      return icon
  }
  return (
    <div className="lg:px-4 mb-4 lg:mb-10 mt-4">
      <div className="c-bg rounded-lg">
        <div className=" border-black relative py-3  pl-5 ">
          <div className={`absolute -top-0 bg-${color}-500`}>
            <span className=" block px-3 py-2 rounded-lg">
              {checkIcon(icon)}
              
            </span>
          </div>
          <div className="float-right pr-4">
            <h2 className="text-white mb-4">{title}</h2>
            <h2 className="text-2xl text-right">{amount}</h2>
          </div>
        </div>
        <div className="border-b border-gray-200 mt-2"></div>

        <CardFooter
           
           >
          
          
          {percentageIcon === "arrow_downward"?
          <Icons.HiArrowDown className="h-4 w-6 text-red-500" />: <Icons.HiArrowUp className="h-4 w-6  text-green-500" />}
          <span className='text-gray-300'>
            {date}
            </span>
        </CardFooter>
      </div>
    </div>
  )
}
