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
            (state, action: PayloadAction<User.User>) => {
                state = { ...state, ...action.payload }
            }
        )
        builder.addMatcher(
            userApiSlice.endpoints.getUserByEmail.matchFulfilled,
            (state, action: PayloadAction<User.User>) => {
                state = { ...state, ...action.payload }
            }
        )
        builder.addMatcher(
            userApiSlice.endpoints.updateUser.matchFulfilled,
            (state, action: PayloadAction<User.User>) => {
                state = { ...state, ...action.payload }
            }
        )
        builder.addMatcher(
            userApiSlice.endpoints.deleteUser.matchFulfilled,
            (state) => {
                state = initialState
            }
        )
    }
})
