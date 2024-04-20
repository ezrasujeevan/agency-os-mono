import { PaletteMode } from '@mui/material'
import { createAction } from '@reduxjs/toolkit'
import { THEME_ACTION } from '../../resources/action-constants'

export const setTheme = createAction<PaletteMode>(THEME_ACTION.SET_THEME)
