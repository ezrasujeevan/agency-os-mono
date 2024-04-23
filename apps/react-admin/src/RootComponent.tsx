import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ROUTES } from './resources/routes-constants'
import Header from './components/Header'
import { Box, Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import Theme from './Theme'
import { HomePage, LoginPage, NotFoundPage } from './pages'
import { useAppSelector } from './store'
import SnackBar from './components/SnackBar'
import ProtecedRoute from './components/ProtecedRoute'
import DashboardPage from './pages/DashboardPage'

const RootComponent: React.FC = () => {
    const { mode } = useAppSelector((state) => state.theme)
    return (
        <Box>
            <ThemeProvider theme={createTheme(Theme(mode))}>
                <CssBaseline />
                <Router>
                    <Header />
                    <Container fixed>
                        <Routes>
                            <Route path="*" element={<NotFoundPage />} />
                            <Route path={ROUTES.HOMEPAGE_ROUTE} element={<HomePage />} />
                            <Route path={ROUTES.LOGINPAGE_ROUTE} element={<LoginPage />} />
                            <Route element={<ProtecedRoute />}>
                                <Route path={ROUTES.DASHBOARD_ROUTE} element={<DashboardPage />} />
                            </Route>
                        </Routes>
                    </Container>
                </Router>
                <SnackBar />
            </ThemeProvider>
        </Box>
    )
}

export default RootComponent
