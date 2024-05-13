import React from 'react'
import { Unstable_Grid2 as Grid } from '@mui/material'
import { ProjectCollection } from '~/components'
import { useParams } from 'react-router-dom'
import NotFoundPage from '../NotFoundPage'

interface ProjectPageProps {}

const ProjectPage: React.FC<ProjectPageProps> = ({}: ProjectPageProps) => {
    const { projectId } = useParams()
    if (projectId) {
        return (
            <Grid container>
                <Grid xs={12}>
                    <ProjectCollection.ProjectViewComponent projectId={projectId} />
                </Grid>
            </Grid>
        )
    }
    
}

export default ProjectPage
