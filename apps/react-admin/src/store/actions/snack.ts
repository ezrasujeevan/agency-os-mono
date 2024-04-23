import { createAction } from '@reduxjs/toolkit'
import { SnackAlertState } from '~/store/reducers'


export const setSnack = createAction<SnackAlertState>('snack/setSnack')
