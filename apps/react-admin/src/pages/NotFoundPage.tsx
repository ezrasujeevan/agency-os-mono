import React from 'react'
import { Link as Route } from 'react-router-dom'
import { ROUTES } from '../resources/routes-constants'
import { Box, Typography, Link } from '@mui/material'

const NotFoundPage: React.FC = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Typography variant={'h1'}>Oops 404!</Typography>
            {/* <Route to={ROUTES.HOMEPAGE_ROUTE}> */}
            <Link href={ROUTES.HOMEPAGE_ROUTE}>Homepage</Link>
            {/* </Route> */}
        </Box>
    )
}

export default NotFoundPage
