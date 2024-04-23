import { createReducer } from '@reduxjs/toolkit'
import { setContents } from '../actions/data'
import { getData } from '../actions/thunkActions'

interface DataReducer {
    isloadign: boolean
    contents: any[]
    error: any
}

const initialState: DataReducer = {
    contents: [],
    isloadign: false,
    error: undefined
}

export const dataReducer = createReducer<DataReducer>(initialState, (builder) => {
    builder.addCase(setContents, (state, action) => {
        state.contents = action.payload
    })
    builder.addCase(getData.pending, (state) => {
        state.isloadign = true
    })
    builder.addCase(getData.fulfilled, (state, action) => {
        state.isloadign = false
        state.contents = action.payload
    })
    builder.addCase(getData.rejected, (state, action) => {
        state.isloadign = false
        state.error = action.payload
    })
})

