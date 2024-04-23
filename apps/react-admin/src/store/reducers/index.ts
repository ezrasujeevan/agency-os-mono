import { authSlice } from './auth'
import { clientSlice } from './client'
import { companySlice } from './company'
import { jwtSlice, setBearer, setRefresh } from './jwt'
import { snackAlertSlice, MuiAlertType, SnackAlertState, snackAlertActions } from './snack.alert'
import { themeSlice, setDarkTheme, setLightTheme } from './theme'
import { userSlice } from './user'

export { authSlice, clientSlice, companySlice, jwtSlice, snackAlertSlice, themeSlice, userSlice }
export { setBearer, setRefresh }
export { setDarkTheme, setLightTheme }
export const { setSnackAlertError, setSnackAlertInfo, setSnackAlertSuccess, setSnackAlertWarning, setSnackClose, setSnackDefault } = snackAlertActions
export type { SnackAlertState, MuiAlertType }
