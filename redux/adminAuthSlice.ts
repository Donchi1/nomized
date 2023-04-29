import {createSlice} from "@reduxjs/toolkit"
import { DocumentData } from "firebase/firestore"


type initialType = {
    adminUser: DocumentData | null,
    users: DocumentData[] | [],
    adminLoading: boolean
}
const initialState:initialType = {
    adminUser:{},
    users: [],
    adminLoading: true
}

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
     getAdminUser:(state, action) => {
         state.adminUser = action.payload
     },
     getAllUsers:(state, action) => {
            state.adminLoading = action.payload.loading
            state.users = action.payload.users
     }
    }
})

export const {getAdminUser, getAllUsers} = adminSlice.actions
export default adminSlice.reducer