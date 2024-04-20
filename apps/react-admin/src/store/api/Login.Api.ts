import { User } from '@agency-os/class'
import { rootApiSlice } from './Root.Api'

export const LoginApi = rootApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        loginUser: builder.mutation<User.LoginUserResponceDto, User.LoginUserRequestDto>({
            query: (loginClientRequestDto: User.LoginUserRequestDto) => ({
                url: 'auth/user/login',
                method: 'POST',
                body: loginClientRequestDto
            })
        }),
        RegisterUser: builder.mutation<User.RegisterUserResponseDto, User.CreateUserRequestDto>({
            query: (registerClientRequestDto: User.CreateUserRequestDto) => ({
                url: 'auth/user/register',
                method: 'POST',
                body: registerClientRequestDto
            })
        }),
        ValudateUser: builder.mutation<User.ValidateUserResponseDto, User.ValidateUserRequestDto>({
            query: (validateClientRequestDto: User.ValidateUserRequestDto) => ({
                url: 'auth/user/validate',
                method: 'POST',
                body: validateClientRequestDto
            })
        })
    })
})

export const { useLoginUserMutation, useRegisterUserMutation, useValudateUserMutation } = LoginApi
