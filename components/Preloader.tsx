import React from 'react'


function Preloader() {
    return (
       
            <div className="flex justify-center h-screen items-center transform -translate-y-2/4 -translate-x-full">
              <div className="spinner-grow inline-block w-20 h-20 bg-red-400 rounded-full opacity-0">
                <span className="visually-hidden">loading...</span>
              </div>
            </div>
    )
}

export default Preloader
