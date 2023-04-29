import Link from 'next/link'
import React from 'react'

type  PlanType = {
    head: string,
    initialw: string, 
    initiald : string
}
function Plans({ head, initialw, initiald }: PlanType) {
  return (
    <div className="">
      <div className="shadow-xl lg:max-w-lg  sm:w-full bg-[#452fc3]">
        <div className="border-b-4 border-[#304ffe]  p-6 text-center">
          <h2 className="text-2xl text-white uppercase font-bold mb-4 ">
            {head} Plan
          </h2>
          <p className="text-yellow-700">
            Get this and more in just trading days
          </p>
        </div>

        <div>
          <p className="uppercase text-center font-medium p-2 text-white">
            Initial Withdrawal
          </p>
          <p className="uppercase text-center font-extrabold text-4xl text-yellow-700 p-2">
            {initialw}
          </p>
        </div>
        <p className="uppercase text-center font-medium p-2 text-white">
          Normal Deposit
        </p>
        <p className="uppercase text-center font-medium p-2 text-white">
          {initiald}
        </p>
        <p className="uppercase text-center font-medium p-2 text-white">
          Top Up $30
        </p>
        <p className="uppercase text-center font-medium p-2 text-white">
          Bonus $10
        </p>
        <div className="border-t border-[#304ffe] mt-4">
          <Link
            href="/register"
            className=" uppercase tracking-wide font-semibold hover:text-white bg-[#304ffe] text-gray-100 w-full py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
          >
            Get Now
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Plans
