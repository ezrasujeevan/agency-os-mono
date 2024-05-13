import React from 'react'
import { Unstable_Grid2 as Grid } from '@mui/material'
import { ProjectCollection } from '~/components'

interface ProjectNewPageProps {}

const ProjectNewPage: React.FC<ProjectNewPageProps> = ({}: ProjectNewPageProps) => {
    return (
        <Grid container>
            <Grid xs={12}>
                <ProjectCollection.NewProjectComponent />
            </Grid>
        </Grid>
    )
}

export default ProjectNewPage
