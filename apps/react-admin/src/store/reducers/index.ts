import { authSlice } from './auth'
import { clientSlice } from './client'
import { companySlice } from './company'
import { snackAlertSlice, MuiAlertType, SnackAlertState, snackAlertActions } from './snack.alert'
import { themeSlice, setDarkTheme, setLightTheme } from './theme'
import { userSlice } from './user'
import { projectSlice } from './project'

export {
    authSlice,
    clientSlice,
    companySlice,
    snackAlertSlice,
    themeSlice,
    userSlice,
    projectSlice
}
export { setDarkTheme, setLightTheme }
export const {
    setSnackAlertError,
    setSnackAlertInfo,
    setSnackAlertSuccess,
    setSnackAlertWarning,
    setSnackClose,
    setSnackDefault
} = snackAlertActions
export type { SnackAlertState, MuiAlertType }
