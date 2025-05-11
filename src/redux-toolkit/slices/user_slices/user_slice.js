import { createSlice } from "@reduxjs/toolkit"

const userAuthSlice = createSlice({
    name:'auth',
    initialState:{
        tokenValue: null,
        isLoading: false,
        errorMsg:null,
        redirection:'',
        isAuthenticated:false,
    },
    reducers: {
        set_token: (state, action) => {
            state.tokenValue = action.payload
            state.isLoading = false
            state.errorMsg = null
        },
        clear_auth:(state) =>{
            state.tokenValue = null
            state.isLoading = false
        },
        set_loading: (state, action) => {
            state.isLoading = action.payload
        },
        set_error: (state, action) => {
            state.errorMsg = action.payload
            state.isLoading = false

        },
        set_redirection: (state, action) => {
            state.redirection = action.payload
        },
        set_authenticated: (state, action) =>{
            state.isAuthenticated = action.payload
        },
    }
})


export const { set_token, clear_auth, set_loading, set_error, set_redirection, set_authenticated } = userAuthSlice.actions

export default userAuthSlice.reducer