import { User } from '@agency-os/class'
import { rootApiSlice } from './root.api.slice'

export const userApiSlice = rootApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUserById: builder.query<User.UserResponseDto, User.FindOneUserByIdRequestDto>({
            query: ({id}: User.FindOneUserByIdRequestDto) => ({
                url: `user/${id}`,
                method: 'GET'
            })
        }),
        getUserByEmail: builder.query<User.UserResponseDto, User.FindOneUserByEmailRequestDto>({
            query: ({email}: User.FindOneUserByEmailRequestDto) => ({
                url: `user/${email}`,
                method: 'GET'
            })
        }),
        getAllUsers: builder.query<User.UserResponseDto, void>({
            query: () => ({
                url: `user`,
                method: 'GET'
            })
        }),
        updateUser: builder.mutation<User.UserResponseDto, User.UpdateUserRequestDto>({
            query: (data: User.UpdateUserRequestDto) => ({
                url: `user/${data.id}`,
                method: 'PATCH',
                body: data
            })
        }),
        deleteUser: builder.mutation<User.UserResponseDto, string>({
            query: (id: string) => ({
                url: `user/${id}`,
                method: 'DELETE'
            })
        })
    })
})

