import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '@agency-os/class'
import { loginApiSlice } from '../api'
interface AuthState {
    user: string | null
    token: string | null
    refresh: string | null
    // Add any other auth-related state properties here
}

const initialState: AuthState = {
    user: null,
    token: null,
    refresh: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Add any other auth-related reducers here
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            loginApiSlice.endpoints.loginUser.matchFulfilled,
            (state, action: PayloadAction<User.LoginUserResponceDto>) => {
                state.token = action.payload.token
                state.refresh = action.payload.refreshToken
                state.user = action.payload.userId
            }
        )
        builder.addMatcher(
            loginApiSlice.endpoints.RefreshTokenUser.matchFulfilled,
            (state, action: PayloadAction<User.LoginUserResponceDto>) => {
                state.token = action.payload.token
                state.refresh = action.payload.refreshToken
                state.user = action.payload.userId
            }   
        )
        // builder.addMatcher()// Add any extra reducers here
    }
})

export const {} = authSlice.actions
