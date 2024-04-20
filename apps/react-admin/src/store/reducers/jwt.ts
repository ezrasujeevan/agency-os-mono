import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Reducer } from 'redux'

// /home/ezra/workspace/agency-os-mono/apps/react-admin/src/store/reducers/jwt.ts
interface JwtState {
    bearer: string
    refresh: string
}

// Define the initial state for the JWT token
const initialState: JwtState = {
    bearer: '',
    refresh: ''
}

// Define the JWT reducer
const jwtSlice = createSlice({
    name: 'jwt',
    initialState,
    reducers: {
        setBearer(state: JwtState, action: PayloadAction<string>) {
            state.bearer = action.payload
        },
        setRefresh(state: JwtState, action: PayloadAction<string>) {
            state.refresh = action.payload
        }
    }
})

export const { setBearer, setRefresh } = jwtSlice.actions
export default jwtSlice.reducer
