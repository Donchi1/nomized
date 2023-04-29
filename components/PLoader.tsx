import React from 'react'
import Preloader from './Preloader'
import { useGetCurrentUser } from './hooks/GetCurrentUser'

function PLoader({children}: {children: JSX.Element}) {
    const [user, loading, error] = useGetCurrentUser()
    if(loading) return <Preloader />
    return children
}

export default PLoader
