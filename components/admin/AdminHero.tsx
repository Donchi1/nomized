import Link from 'next/link'
import React from 'react'
import {useRouter} from "next/router"

function AdminHero({title}: {title: string}) {
    const router = useRouter()
  return (
    <div className={`h-2/4  mt-10 ${router.pathname === "/user/profile" && "mx-2"}`} >
      <div className='flex justify-between items-center '>
        <h2 className='text-2xl font-bold'>{title}</h2>
        <div>
            <button className='hover:text-red-500' onClick={() => router.back()}>Go Back</button>
           {" "} {"/"} {" "}<span>{title}</span>
        </div>
      </div>
    </div>
  )
}

export default AdminHero