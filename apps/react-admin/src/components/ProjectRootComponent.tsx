import React from 'react'
import { Unstable_Grid2 as Grid } from '@mui/material'
import { ProjectCollection } from '.'
import { dummyProject } from './delivery/dummy'
import { Project } from '@agency-os/class'

interface ProjectRootComponentProps {}

const ProjectRootComponent: React.FC<
    ProjectRootComponentProps
> = ({}: ProjectRootComponentProps) => {
    const dummy = dummyProject
    dummy.sort((a:Project.Project, b:Project.Project) => (a.endDate > b.endDate ? 1 : -1))
    return (
        <Grid container>
            {dummy.map((project, index) => (
                <Grid xs={4} p={1} key={index}>
                    <ProjectCollection.CardComponent key={index} project={project} />
                </Grid>
            ))}
        </Grid>
    )
}

export default ProjectRootComponent
