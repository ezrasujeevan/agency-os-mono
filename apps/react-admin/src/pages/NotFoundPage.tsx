import React from 'react'
import { Link as Route } from 'react-router-dom'
import { ROUTES } from '../resources/routes-constants'
import { Box, Typography, Link } from '@mui/material'

interface NotFoundPageProps {
    project?: boolean
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({ project }: NotFoundPageProps) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }}
        >
            <Typography variant={'h1'}>Oops 404!</Typography>
            {project &&  <Typography variant={'h4'}>Project Not Found</Typography>}
            {/* <Route to={ROUTES.HOMEPAGE_ROUTE}> */}
            <Link href={ROUTES.HOME_PAGE}>Homepage</Link>
            {/* </Route> */}
        </Box>
    )
}

export default NotFoundPage
