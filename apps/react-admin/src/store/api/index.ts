import { clientApiSlice } from './client.api.slice'
import { companyApiSlice } from './company.api.slice'
import { loginApiSlice } from './login.api.slice'
import { userApiSlice } from './user.api.slice'
import { rootApiSlice } from './root.api.slice'

export { clientApiSlice, companyApiSlice, loginApiSlice, userApiSlice, rootApiSlice }

export const {
    useDeleteClientMutation,
    useGetAllClientsQuery,
    useGetClientbyIdQuery,
    useGetClientByEmailQuery,
    useUpdateClientMutation
} = clientApiSlice

export const {
    useDeleteCompanyMutation,
    useGetAllCompaniesQuery,
    useGetCompanyByIdQuery,
    useUpdateCompanyMutation
} = companyApiSlice

export const { useLoginUserMutation, useRegisterUserMutation, useValudateUserMutation } =
    loginApiSlice

export const {
    useDeleteUserMutation,
    useGetAllUsersQuery,
    useGetUserByEmailQuery,
    useGetUserbyIdQuery,
    useUpdateUserMutation
} = userApiSlice

export const {} = rootApiSlice
