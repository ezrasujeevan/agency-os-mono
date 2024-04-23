import { User } from '@agency-os/class'
import { rootApiSlice } from './root.api.slice'

export const userApiSlice = rootApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUserbyId: builder.query<User.User, User.FindOneUserByIdRequestDto>({
            query: (id: User.FindOneUserByIdRequestDto) => ({
                url: `user/${id}`,
                method: 'GET'
            })
        }),
        getUserByEmail: builder.query<User.User, User.FindOneUserByEmailRequestDto>({
            query: (email: User.FindOneUserByEmailRequestDto) => ({
                url: `user/${email}`,
                method: 'GET'
            })
        }),
        getAllUsers: builder.query<User.User[], void>({
            query: () => ({
                url: `user`,
                method: 'GET'
            })
        }),
        updateUser: builder.mutation<User.User, User.UpdateUserRequestDto>({
            query: (data: User.UpdateUserRequestDto) => ({
                url: `user/${data.id}`,
                method: 'PATCH',
                body: data
            })
        }),
        deleteUser: builder.mutation<User.User, string>({
            query: (id: string) => ({
                url: `user/${id}`,
                method: 'DELETE'
            })
        })
    })
})

