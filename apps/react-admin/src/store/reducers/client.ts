import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { clientApiSlice } from '../api'
import { Client, Company } from '@agency-os/class'

const company: Partial<Company.Company> = {
    id: '',
    name: '',
    code: ''
}

const initialState: Partial<Client.Client> = {
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    company: company
}

export const clientSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            clientApiSlice.endpoints.getClientById.matchFulfilled,
            (state, action: PayloadAction<Client.Client>) => {
                state = { ...state, ...action.payload }
            }
        )
        builder.addMatcher(
            clientApiSlice.endpoints.getClientByEmail.matchFulfilled,
            (state, action: PayloadAction<Client.Client>) => {
                state = { ...state, ...action.payload }
            }
        )
        builder.addMatcher(
            clientApiSlice.endpoints.updateClient.matchFulfilled,
            (state, action: PayloadAction<Client.Client>) => {
                state = { ...state, ...action.payload }
            }
        )
        builder.addMatcher(
            clientApiSlice.endpoints.deleteClient.matchFulfilled,
            (state) => {
                state = initialState
            }
        )
    }
})
