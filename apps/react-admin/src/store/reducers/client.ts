import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { clientApiSlice } from '../api'
import { Client} from '@agency-os/class'


const initialState: Partial<Client.Client> = {
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    companyId: ''
}

export const clientSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            clientApiSlice.endpoints.getClientById.matchFulfilled,
            (state, action: PayloadAction<Client.ClientResponseDto>) => {
                const { status, client } = action.payload
                if (status === 200 && client && !Array.isArray(client)) {
                    state = client
                }
                state
            }
        )
        builder.addMatcher(
            clientApiSlice.endpoints.getClientByEmail.matchFulfilled,
            (state, action: PayloadAction<Client.ClientResponseDto>) => {
                const { status, client } = action.payload
                if (status === 200 && client && !Array.isArray(client)) {
                    state = client
                }
            }
        )
        builder.addMatcher(
            clientApiSlice.endpoints.updateClient.matchFulfilled,
            (state, action: PayloadAction<Client.ClientResponseDto>) => {
                const { status, client } = action.payload
                if (status === 200 && client && !Array.isArray(client)) {
                    state = client
                }
            }
        )
        builder.addMatcher(
            clientApiSlice.endpoints.deleteClient.matchFulfilled,
            (state, action: PayloadAction<Client.ClientResponseDto>) => {
                const { status } = action.payload
                if (status === 204) {
                    state = initialState
                }
            }
        )
    }
})
