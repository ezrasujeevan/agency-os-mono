import { Box, Unstable_Grid2 as Grid } from '@mui/material'
import React from 'react'
import { ProjectCollection, DeliveryCollection } from '~/components'
import ProjectRootComponent from '~/components/ProjectRootComponent'
import { dummyProject } from '~/components/delivery/dummy'

const DashboardPage: React.FC = () => {
    return (
        <Box>
            <div>DashboardPage</div>
            <DeliveryCollection.TableComponent />
            {/* <ProjectCollection.NewComponent /> */}

            {/* <DeliveryCollection.NewComponent /> */}
            <ProjectRootComponent />
        </Box>
    )
}

export default DashboardPage
