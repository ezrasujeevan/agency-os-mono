import React from 'react'
import { Unstable_Grid2 as Grid } from '@mui/material'
import NewProjectComponent from '~/components/project/NewComponent'

interface ProjectNewPageProps {}

const ProjectNewPage: React.FC<ProjectNewPageProps> = ({}: ProjectNewPageProps) => {
    return (
        <Grid container>
            <Grid xs={12}>
                <NewProjectComponent />
            </Grid>
        </Grid>
    )
}

export default ProjectNewPage
