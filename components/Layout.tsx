import React from 'react'

function Layout({children}: {children: React.ReactNode}) {
  return (
    <div className="mx-auto  " style={{width: "95%"}}>
     {children}
    </div> 
  )
}

export default Layout