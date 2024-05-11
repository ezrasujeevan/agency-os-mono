import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { Box, Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import Theme from './Theme'
import { ROUTES } from './resources/routes-constants'
import { SnackBarComponent, HeaderComponent } from './components'
import { useAppSelector } from './store'
import {
    HomePage,
    LoginUserPage,
    NotFoundPage,
    ProtectedRoute,
    DashboardPage,
    ProjectPage,
    ProjectNewPage,
    ProjectEditPage,
    RegisterUserPage,
    DeliveryEditPage,
    DeliveryPage,
    DeliveryFilePage,
    DeliveryFileUpdatePage,
    DeliveryNewPage,
    AssetEditPage,
    AssetFilePage,
    AssetNewPage,
    AssetPage,
    AssetFileUpdatePage
} from './pages'

const RootComponent: React.FC = () => {
    const { mode } = useAppSelector((state) => state.theme)
    const { HOME_PAGE, DASHBOARD_PAGE, LOGIN_PAGE, REGISTER_PAGE } = ROUTES
    const { PROJECT_PAGE, PROJECT_EDIT_PAGE, PROJECT_NEW_PAGE } = ROUTES
    const {
        DELIVERY_EDIT_PAGE,
        DELIVERY_FILE_PAGE,
        DELIVERY_FILE_UPDATE_PAGE,
        DELIVERY_NEW_PAGE,
        DELIVERY_PAGE
    } = ROUTES
    const { ASSET_EDIT_PAGE, ASSET_FILE_PAGE, ASSET_FILE_UPDATE_PAGE, ASSET_NEW_PAGE, ASSET_PAGE } =
        ROUTES
    return (
        <Box>
            <ThemeProvider theme={createTheme(Theme(mode))}>
                <CssBaseline />
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <Router>
                        <HeaderComponent />
                        <Container fixed>
                            <Routes>
                                <Route path="*" element={<NotFoundPage />} />
                                <Route path={HOME_PAGE} element={<HomePage />} />
                                <Route path={LOGIN_PAGE} element={<LoginUserPage />} />
                                <Route path={REGISTER_PAGE} element={<RegisterUserPage />} />
                                <Route element={<ProtectedRoute />}>
                                    <Route path={DASHBOARD_PAGE} element={<DashboardPage />} />
                                    <Route path={PROJECT_NEW_PAGE} element={<ProjectNewPage />} />
                                    <Route path={PROJECT_PAGE} element={<ProjectPage />} />
                                    <Route path={PROJECT_EDIT_PAGE} element={<ProjectEditPage />} />

                                    <Route path={DELIVERY_PAGE} element={<DeliveryPage />} />
                                    <Route path={DELIVERY_NEW_PAGE} element={<DeliveryNewPage />} />
                                    <Route
                                        path={DELIVERY_EDIT_PAGE}
                                        element={<DeliveryEditPage />}
                                    />
                                    <Route
                                        path={DELIVERY_FILE_PAGE}
                                        element={<DeliveryFilePage />}
                                    />
                                    <Route
                                        path={DELIVERY_FILE_UPDATE_PAGE}
                                        element={<DeliveryFileUpdatePage />}
                                    />

                                    <Route path={ASSET_PAGE} element={<AssetPage />} />
                                    <Route path={ASSET_NEW_PAGE} element={<AssetNewPage />} />
                                    <Route path={ASSET_EDIT_PAGE} element={<AssetEditPage />} />
                                    <Route path={ASSET_FILE_PAGE} element={<AssetFilePage />} />
                                    <Route
                                        path={ASSET_FILE_UPDATE_PAGE}
                                        element={<AssetFileUpdatePage />}
                                    />
                                </Route>
                            </Routes>
                        </Container>
                    </Router>
                    <SnackBarComponent />
                </LocalizationProvider>
            </ThemeProvider>
        </Box>
    )
}

export default RootComponent
