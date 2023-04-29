import { createSlice } from '@reduxjs/toolkit'
import { DocumentData } from 'firebase/firestore'

type InitialAuthType = {
   loginError: string,
  loginSuccess: string,
  logout: string,
  signupSuccess: string,
  signupError: string,
  passResetSuccess: string,
  passResetError: string,
  passError: string,
  currentUser: DocumentData | null ,
  profileMessage: string,
  passwordMessage: string,
  redirect: string,
  initializing: boolean,
  userDate: string
}

const initialAuth : InitialAuthType = {
  loginError: '',
  loginSuccess: '',
  logout: '',
  signupSuccess: '',
  signupError: '',
  passResetSuccess: '',
  passResetError: '',
  passError: '',
  currentUser: null ,
  profileMessage: '',
  passwordMessage: '',
  redirect: "",
  initializing: true,
  userDate: ""
}

const setUser =(state : typeof initialAuth, action: any)=> {
  if(action.payload.user){        
    action.payload.user["date"] = action.payload.user?.date.toDate()
    state.initializing = action.payload.loading
    state.currentUser = action.payload.user
  }else{      
    state.initializing = action.payload.loading
    state.currentUser = action.payload.user
  }
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuth,
  reducers: {
    profileUploadSuccess: (state:InitialAuthType, action: any) =>{state.profileMessage = action.payload},
    passwordUpdateSuccess: (state:InitialAuthType, action: any) =>
      {state.passwordMessage = action.payload},
    loginSuccess: (state:InitialAuthType, action: any) => {state.loginSuccess = action.payload},
    getUser: (state:InitialAuthType, action: any) => {
        setUser(state, action)   
    
    },
    passResetSuccess: (state:InitialAuthType, action: any) =>
      {state.passResetSuccess = 'A password reset email has been sent to you'},
    passResetError: (state:InitialAuthType, action: any) => {state.passResetError = action.payload},
    setRedirect: (state: InitialAuthType, action: any) => {
      state.redirect = action.payload.redirect
    }
  },
})

export const { getUser, setRedirect } = authSlice.actions
export default authSlice.reducer
