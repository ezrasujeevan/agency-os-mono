import { User } from '@agency-os/class'
import { rootApiSlice } from './Root.Api'

export const UserApi = rootApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUserbyId: builder.query<User.User, User.FindOneUserByIdRequestDto>({
            query: (id: User.FindOneUserByIdRequestDto) => ({
                url: `users/${id}`,
                method: 'GET'
            })
        }),
        getUserByEmail: builder.query<User.User, User.FindOneUserByEmailRequestDto>({
            query: (email: User.FindOneUserByEmailRequestDto) => ({
                url: `users/${email}`,
                method: 'GET'
            })
        }),
        getAllUsers: builder.query<User.User[], void>({
            query: () => ({
                url: `users`,
                method: 'GET'
            })
        }),
        updateUser: builder.mutation<User.User, User.UpdateUserRequestDto>({
            query: (data: User.UpdateUserRequestDto) => ({
                url: `users/${data.id}`,
                method: 'PATCH',
                body: data
            })
        }),
        deleteUser: builder.mutation<User.User, string>({
            query: (id: string) => ({
                url: `users/${id}`,
                method: 'DELETE'
            })
        })
    })
})

export const { useDeleteUserMutation, useGetAllUsersQuery, useGetUserbyIdQuery, useGetUserByEmailQuery, useUpdateUserMutation } = UserApi
