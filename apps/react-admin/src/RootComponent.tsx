import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ROUTES } from './resources/routes-constants'
import Header from './components/Header'
import { Box, Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import Theme from './Theme'
import { HomePage, LoginPage, NotFoundPage } from './pages'
import { useAppSelector } from './store'
import SnackBar from './components/SnackBar'
import ProtectedRoute from './components/ProtectedRoute'
import DashboardPage from './pages/DashboardPage'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

const RootComponent: React.FC = () => {
    const { mode } = useAppSelector((state) => state.theme)
    return (
        <Box>
            <ThemeProvider theme={createTheme(Theme(mode))}>
                <CssBaseline />
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <Router>
                        <Header />
                        <Container fixed>
                            <Routes>
                                <Route path="*" element={<NotFoundPage />} />
                                <Route path={ROUTES.HOME_PAGE} element={<HomePage />} />
                                <Route path={ROUTES.LOGIN_PAGE} element={<LoginPage />} />
                                <Route element={<ProtectedRoute />}>
                                    <Route
                                        path={ROUTES.DASHBOARD_PAGE}
                                        element={<DashboardPage />}
                                    />
                                </Route>
                            </Routes>
                        </Container>
                    </Router>
                    <SnackBar />
                </LocalizationProvider>
            </ThemeProvider>
        </Box>
    )
}

export default RootComponent
