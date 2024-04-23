import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppDispatch } from '..'
import { setContents } from './data'

const axiosInst = axios.create({})

export const getData = createAsyncThunk<any[], string, { dispatch: AppDispatch }>('groupedActions/getData', async (string, { dispatch }) => {
    try {
        const data: any[] = await axios.get(`https://dummyjson.com/products/search?q=${string}`).then((response) => response.data.products)
        return data
    } catch (error) {
        console.error(error)
        return error
    }
})
