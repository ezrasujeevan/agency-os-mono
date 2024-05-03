import { Client } from '@agency-os/class'
import { rootApiSlice } from './root.api.slice'

export const clientApiSlice = rootApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getClientById: builder.query<Client.ClientResponseDto, Client.FindOneClientByIdRequestDto>({
            query: (id: Client.FindOneClientByIdRequestDto) => ({
                url: `client/${id}`,
                method: 'GET'
            })
        }),
        getClientByEmail: builder.query<
            Client.ClientResponseDto,
            Client.FindOneClientByEmailRequestDto
        >({
            query: (email: Client.FindOneClientByEmailRequestDto) => ({
                url: `client?email=${email}`,
                method: 'GET'
            })
        }),
        getAllClients: builder.query<
            Client.ClientResponseDto,
            void | Client.findAllOfCompanyRequestDto
        >({
            query: ({ companyId }: Client.findAllOfCompanyRequestDto) => {
                if (companyId) {
                    return { url: `client?company=${companyId}`, method: 'GET' }
                } else {
                    return { url: `client`, method: 'GET' }
                }
            }
        }),
        getAllClientsByCompany: builder.query<
            Client.ClientResponseDto,
            Client.findAllOfCompanyRequestDto
        >({
            query: (company: Client.findAllOfCompanyRequestDto) => ({
                url: `client?company=${company}`,
                method: 'GET'
            })
        }),
        updateClient: builder.mutation<Client.ClientResponseDto, Client.UpdateClientRequestDto>({
            query: (data: Client.UpdateClientRequestDto) => ({
                url: `client/${data.id}`,
                method: 'PATCH',
                body: data
            })
        }),
        deleteClient: builder.mutation<Client.ClientResponseDto, string>({
            query: (id: string) => ({
                url: `client/${id}`,
                method: 'DELETE'
            })
        })
    })
})
