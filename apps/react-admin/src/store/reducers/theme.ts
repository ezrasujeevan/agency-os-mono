import { createReducer } from '@reduxjs/toolkit'
import { setTheme } from '../actions/theme'
import { PaletteMode } from '@mui/material'

interface ThemeReducer {
    mode: PaletteMode
}

const initialState: ThemeReducer = {
    mode: 'light'
}

const themeReducer = createReducer<ThemeReducer>(initialState, (builder) => {
    builder.addCase(setTheme, (state, action) => {
        state.mode = action.payload
    })
})

export default themeReducer
