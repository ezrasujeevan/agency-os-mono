import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '..'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
    prepareHeaders: (headers, { getState }) => {
        headers.set('Access-Control-Allow-Origin', 'localhost:4000')
        const token = (getState() as RootState).auth.token
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers
    }
})
const baseQueryWithReAuth = async (args: any, api: any, extraOptions: any) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result.error?.status === 403) {
        await api.endpoints.refreshTokenUser.initiate({}, api, extraOptions)
        result = await baseQuery(args, api, extraOptions)
    }
    return result
}

export const rootApiSlice = createApi({
    baseQuery: baseQueryWithReAuth,
    endpoints: (builder) => ({}),
    tagTypes: ['Asset', 'User', 'Project', 'Delivery', 'Client', 'Company', 'User', 'Auth']
})
