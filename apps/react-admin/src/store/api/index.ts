import { clientApiSlice } from './client.api.slice'
import { companyApiSlice } from './company.api.slice'
import { loginApiSlice } from './login.api.slice'
import { userApiSlice } from './user.api.slice'
import { projectApiSlice } from './project.api.slice'
import { assetApiSlice } from './asset.api.slice'
import { deliveryApiSlice } from './delivery.api.slice'
import { rootApiSlice } from './root.api.slice'

export {
    rootApiSlice,
    clientApiSlice,
    companyApiSlice,
    loginApiSlice,
    userApiSlice,
    projectApiSlice,
    assetApiSlice,
    deliveryApiSlice
}

export const {
    useDeleteClientMutation,
    useGetAllClientsQuery,
    useGetClientByIdQuery,
    useGetClientByEmailQuery,
    useUpdateClientMutation
} = clientApiSlice

export const {
    useDeleteCompanyMutation,
    useGetAllCompaniesQuery,
    useGetCompanyByIdQuery,
    useUpdateCompanyMutation
} = companyApiSlice

export const {
    useLoginUserMutation,
    useRegisterUserMutation,
    useRefreshTokenUserMutation,
    useValidateUserMutation
} = loginApiSlice

export const {
    useDeleteUserMutation,
    useGetAllUsersQuery,
    useGetUserByEmailQuery,
    useGetUserByIdQuery,
    useUpdateUserMutation
} = userApiSlice

export const {
    useCreateProjectMutation,
    useDeleteProjectMutation,
    useUpdateProjectMutation,
    useGetProjectByIdQuery,
    useGetProjectByTrialNameQuery,
    useGetAllProjectsQuery,
    useGetAllProjectsByClientIdQuery,
    useGetAllProjectsByCompanyIdQuery,
    useGetAllProjectsByUserIdQuery
} = projectApiSlice

export const {
    useCreateDeliveryMutation,
    useDeleteDeliveryMutation,
    useUpdateDeliveryMutation,
    useGetAllDeliveryByProjectIdQuery,
    useGetDeliveryByIdQuery
} = deliveryApiSlice

export const {
    useCreateAssetMutation,
    useDeleteAssetMutation,
    useUpdateAssetMutation,
    useGetAllAssetsOfDeliveryQuery,
    useGetAllAssetsQuery,
    useGetAssetByIdQuery
} = assetApiSlice

export const {} = rootApiSlice
