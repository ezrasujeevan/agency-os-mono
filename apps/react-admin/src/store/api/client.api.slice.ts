import { Client } from '@agency-os/class'
import { rootApiSlice } from './root.api.slice'

export const clientApiSlice = rootApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getClientbyId: builder.query<Client.Client, Client.FindOneClientByIdRequestDto>({
            query: (id: Client.FindOneClientByIdRequestDto) => ({
                url: `client/${id}`,
                method: 'GET'
            })
        }),
        getClientByEmail: builder.query<Client.Client, Client.FindOneClientByEmailRequestDto>({
            query: (email: Client.FindOneClientByEmailRequestDto) => ({
                url: `client/${email}`,
                method: 'GET'
            })
        }),
        getAllClients: builder.query<Client.Client[], void>({
            query: () => ({
                url: `client`,
                method: 'GET'
            })
        }),
        updateClient: builder.mutation<Client.Client, Client.UpdateClientRequestDto>({
            query: (data: Client.UpdateClientRequestDto) => ({
                url: `client/${data.id}`,
                method: 'PATCH',
                body: data
            })
        }),
        deleteClient: builder.mutation<Client.Client, string>({
            query: (id: string) => ({
                url: `client/${id}`,
                method: 'DELETE'
            })
        })
    })
})
