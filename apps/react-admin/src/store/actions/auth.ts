import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppDispatch } from '..'
import { setContents } from './data'
import { User } from '@agency-os/class'

const axiosInstance = axios.create({ baseURL: 'http://localhost:3000' })

export const Loginuser = createAsyncThunk<User.LoginUserResponceDto, User.LoginUserRequestDto>('login/user', async (data: User.LoginUserRequestDto) => {
    return await axiosInstance.post('/auth/user/login', data)
})
