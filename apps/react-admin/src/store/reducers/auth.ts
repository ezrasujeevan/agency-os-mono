import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '@agency-os/class'
import { LoginApi } from '../api/Login.Api'

interface AuthState {
    user: User.User | null
    token: string | null
    refresh: string | null
    // Add any other auth-related state properties here
}

const initialState: AuthState = {
    user: null,
    token: null,
    refresh: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Add any other auth-related reducers here
    },
    extraReducers: (builder) => {
        builder.addMatcher(LoginApi.endpoints.loginUser.matchFulfilled, (state, action: PayloadAction<User.LoginUserResponceDto>) => {
            state.token = action.payload.token
        })
        // builder.addMatcher()// Add any extra reducers here
    }
})

export const {} = authSlice.actions

export default authSlice.reducer
