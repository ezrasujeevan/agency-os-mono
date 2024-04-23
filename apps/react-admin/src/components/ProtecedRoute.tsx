import React from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { useAppSelector, RootState } from '~/store'

const ProtecedRoute: React.FC = () => {
    const { token } = useAppSelector((state: RootState) => state.auth)
    const location = useLocation()
    return { token } ? (
        <Outlet />
    ) : (
        <Navigate to={{ pathname: '/login', state: { from: location } }} replace={true} />
    )
}

export default ProtecedRoute
