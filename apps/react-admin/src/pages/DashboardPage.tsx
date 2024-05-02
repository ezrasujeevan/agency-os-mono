import { Project } from '@agency-os/class'
import { Unstable_Grid2 as Grid } from '@mui/material'
import React from 'react'
import { ProjectComponent } from '~/components'

const DashboardPage: React.FC = () => {
    return (
        <Grid>
            <div>DashboardPage</div>
            <ProjectComponent.NewProjectComponent />
        </Grid>
    )
}

export default DashboardPage
