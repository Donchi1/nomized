import { createSlice } from '@reduxjs/toolkit'

import {  store } from './store'

const initialState = { 
  paymentAmount: '',
  qrCodeEth: false,
  qrCodeLit: false,
  qrCodeBtc: false,
  notifications: [],
  accessCodeError: "",
  withdrawalAccessPopUp: "",
  accessCodeSuccess: "",
  accessCodeProveSuccess: "",
  withdrawalError:"",
  withdrawalSuccess: "",
  paymentError:"",
  paymentSuccess: "",
  withdrawalData : "",
 showSidebar: false,
 
 accessCodeInfo:{
        open: false,
        isSubmitting: false
        }
}

type sliderType = {payload: string, type: 'app/handleSidebar'}
export type accessCodeType = {open: boolean, isSubmitting: boolean } & void

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    handleAccessCode: (state: typeof initialState, action: any) =>{
      state.accessCodeInfo = action.payload
    },

    handleSidebar: (state:typeof initialState, action: any) => {

       state.showSidebar = !state.showSidebar
      },



  
  }
})

export const {
  handleSidebar,
  handleAccessCode 
} = appSlice.actions
export default appSlice.reducer
