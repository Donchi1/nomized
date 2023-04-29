import React, { ReactNode, useState } from 'react'



type modalTypes = {
    children: ReactNode,
    open: boolean,
    onClose : ()=> void


}

function Modal({children, open, onClose}: modalTypes) {
  
  return (
    <div className={`${open ? "block" : "hidden"} fixed top-0 bottom-0 right-0 left-0 w-full h-screen bg-blue-gray-400`}>
    <div className='flex justify-center items-center min-w-fit bg-white rounded-lg h-max  '>
        {children}
        </div>
        </div>
  )
}

export default Modal