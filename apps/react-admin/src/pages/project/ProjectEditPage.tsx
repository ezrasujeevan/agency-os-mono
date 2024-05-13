import React from 'react'
import { Unstable_Grid2 as Grid } from '@mui/material'
import { useParams } from 'react-router-dom'
import { ProjectCollection } from '~/components'

interface ProjectEditPageProps {}

const ProjectEditPage: React.FC<ProjectEditPageProps> = ({}: ProjectEditPageProps) => {
    const { projectId } = useParams()
    if (projectId) {
        return (
            <Grid container>
                <Grid xs={12}>
                    <ProjectCollection.NewProjectComponent projectId={projectId} />
                </Grid>
            </Grid>
        )
    }
}

export default ProjectEditPage
