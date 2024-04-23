import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { setSnack } from '../actions/snack'
import { s } from 'vitest/dist/reporters-LqC_WI4d'

export enum MuiAlertType {
    SUCCESS = 'success',
    ERROR = 'error',
    WARNING = 'warning',
    INFO = 'info'
}

interface content 
    { message: string | string[]; title: string }

export interface SnackAlertState {
    content: content
    type: MuiAlertType
    open: boolean
}

const initialState: SnackAlertState = {
    content: { message: '', title: '' },
    type: MuiAlertType.INFO,
    open: false
}



export const snackAlertSlice = createSlice({
    name: 'snack',
    initialState,
    reducers: {
        setSnackAlertInfo: (state, action: PayloadAction<content>) => {
            state.content = action.payload
            state.type = MuiAlertType.INFO
            state.open = true
        },
        setSnackAlertError: (state, action: PayloadAction<content>) => {
            state.content = action.payload
            state.type = MuiAlertType.ERROR
            state.open = true
        },
        setSnackAlertSuccess: (state, action: PayloadAction<content>) => {
            state.content = action.payload
            state.type = MuiAlertType.SUCCESS
            state.open = true
        },
        setSnackAlertWarning: (state, action: PayloadAction<content>) => {
            state.content = action.payload
            state.type = MuiAlertType.WARNING
            state.open = true
        },
        setSnackClose: (state) => {
            state.open = false
        },
        setSnackDefault: (state) => {
            state = initialState
        }
    },
    extraReducers: (builder) => {
        builder.addCase(setSnack, (state, action: PayloadAction<SnackAlertState>) => {
            state = action.payload
        })
    }
})

export const snackAlertActions = snackAlertSlice.actions
