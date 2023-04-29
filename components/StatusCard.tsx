

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

export default function StatusCard({
  color,
  icon,
  title,
  amount,
  percentage,
  percentageColor,
  percentageIcon,
  date,
}: statusCardType) {

  const checkIcon = (type: string) => {
      let icon 
      if(type === "money") icon = <Icon1.BiMoney size={20} />
      if(type === "storage") icon = <Icon2.MdStorage size={20} />
      if(type === "paid") icon = <Icon2.MdPayments size={20} />
      if(type === "poll") icon = <Icon2.MdPool size={20} />

      return icon
  }
  return (
    <div className="lg:px-4 mb-4 lg:mb-10 mt-4">
      <div className="c-bg rounded-lg">
        <div className=" border-black relative py-3  pl-5 ">
          <div className={`absolute -top-10 bg-${color}-500`}>
            <span className=" inline-block p-3 lg:p-4 rounded-lg">
              {checkIcon(icon)}
              
            </span>
          </div>
          <div className="float-right pr-4">
            <h2 className="text-white mb-4">{title}</h2>
            <h2 className="text-2xl">€{amount || '000'}</h2>
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
