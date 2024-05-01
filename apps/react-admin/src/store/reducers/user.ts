import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { userApiSlice } from '../api'
import { User } from '@agency-os/class'

interface userState {
    id: string
    email: string
    firstName?: string
    lastName?: string
}

const initialState: userState = {
    id: '',
    email: '',
    firstName: '',
    lastName: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            userApiSlice.endpoints.getUserById.matchFulfilled,
            (state, action: PayloadAction<User.UserResponseDto>) => {
                const { status, user } = action.payload
                if (status === 200 && user && !Array.isArray(user)) {
                    state = user
                }
            }
        )
        builder.addMatcher(
            userApiSlice.endpoints.getUserByEmail.matchFulfilled,
            (state, action: PayloadAction<User.UserResponseDto>) => {
                const { status, user } = action.payload
                if (status === 200 && user && !Array.isArray(user)) {
                    state = user
                }
            }
        )
        builder.addMatcher(
            userApiSlice.endpoints.updateUser.matchFulfilled,
            (state, action: PayloadAction<User.UserResponseDto>) => {
                const { status, user } = action.payload
                if (status === 200 && user && !Array.isArray(user)) {
                    state = user
                }
            }
        )
        builder.addMatcher(
            userApiSlice.endpoints.deleteUser.matchFulfilled,
            (state, action: PayloadAction<User.UserResponseDto>) => {
                const { status } = action.payload
                if (status === 204) {
                    state = initialState
                }
            }
        )
    }
})
