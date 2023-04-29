import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from './redux/store'

function AuthIsReady({ children }: {children:  React.ReactNode}) {
  const {currentUser} = useSelector((state: RootState) => state.auth)

  if (!currentUser) {
    return (
      <div className="flex justify-center h-screen items-center transform -translate-y-2/4 -translate-x-full">
        <div className="spinner-grow inline-block w-20 h-20 bg-red-400 rounded-full opacity-0">
          <span className="visually-hidden">loading...</span>
        </div>
      </div>
    )
  } else {
    return children
  }
}

export default AuthIsReady
