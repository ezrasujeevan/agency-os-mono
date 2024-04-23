import { PayloadAction, createReducer, createSlice } from '@reduxjs/toolkit'
import { setTheme } from '../actions/theme'
import { PaletteMode } from '@mui/material'

interface ThemeState {
    mode: PaletteMode
}

const initialState: ThemeState = {
    mode: 'light'
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setDarkTheme: (state) => {
            state.mode = 'dark'
        },
        setLightTheme: (state) => {
            state.mode = 'light'
        }
    },
    extraReducers: (builder) => {
        builder.addCase(setTheme, (state, action:PayloadAction<PaletteMode>) => {
            state.mode = action.payload
        })
    }
})

export const { setDarkTheme, setLightTheme } = themeSlice.actions
