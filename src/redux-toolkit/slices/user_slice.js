import { createSlice } from "@reduxjs/toolkit"

const userAuthSlice = createSlice({
    name: 'auth',
    initialState: {
        tokenValue: null,
        isLoading: false,
        errorMsg: null,
        redirection: null,
        isAuthenticated: null,
        doctor_data: {},
        isModalOpen: false,
        isLoadingPage: false,
        isCollapsed: false,
    },
    reducers: {
        set_token: (state, action) => {
            state.tokenValue = action.payload
            state.isLoading = false
            state.isAuthenticated = true
            state.errorMsg = null
        },
        clear_auth: (state) => {
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
        set_authenticated: (state, action) => {
            state.isAuthenticated = action.payload
        },
        set_doctor_data: (state, action) => {
            state.doctor_data = action.payload
        },
        set_modal: (state, action) => {
            state.isModalOpen = action.payload
        },
        set_loading_page: (state, action) => {
            state.isLoadingPage = action.payload
        },
        set_collapsed: (state, action) =>{
            state.isCollapsed = action.payload
        }
    }
})


export const {
    set_token,
    clear_auth,
    set_loading,
    set_error,
    set_redirection,
    set_authenticated,
    set_doctor_data,
    set_modal,
    set_loading_page,
    set_collapsed,

    
} = userAuthSlice.actions

export default userAuthSlice.reducer