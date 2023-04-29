import React, { useEffect } from 'react'
import {useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { useGetCurrentUser } from './hooks/GetCurrentUser'
import { setRedirect } from '../redux/authSlice'
import Preloader from './Preloader'


function Protected({children}:{children: JSX.Element}) {
    const router = useRouter()
    const dispatch = useDispatch()
    
    const [user, loading, error] = useGetCurrentUser()
     useEffect(() => {
        if(!loading){
            if(!user){
             dispatch(setRedirect({redirect : router.route}as any))
             router.push("/login")
            }
           

        }
        
     }, [router, loading, user])

     if(loading && !user){
         return  <Preloader />
      
     }
   
    return children
}

export default Protected
