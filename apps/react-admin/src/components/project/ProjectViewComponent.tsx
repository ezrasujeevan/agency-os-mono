import React, { useEffect, useState } from 'react'
import { Button, Unstable_Grid2 as Grid } from '@mui/material'
import DeliveryTableComponent from './DeliveryTableComponent'
import { ProjectDetailComponent } from '../common'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '~/resources/routes-constants'

interface ProjectViewComponentProps {
    projectId: string
}

const ProjectViewComponent: React.FC<ProjectViewComponentProps> = ({
    projectId
}: ProjectViewComponentProps) => {
    const navigate = useNavigate()
    return (
        <Grid container>
            <Grid xs={12}>
                <ProjectDetailComponent projectId={projectId} />
            </Grid>
            <Grid>
                <Button
                    color={'secondary'}
                    variant={'contained'}
                    onClick={() => {
                        navigate(ROUTES.PROJECT_EDIT_PAGE.replace(':projectId', projectId))
                    }}
                >
                    Edit
                </Button>
            </Grid>
            <Grid xs={12}>
                <DeliveryTableComponent projectId={projectId} />
            </Grid>
            <Grid>
                <Button
                    variant={'contained'}
                    onClick={() => {
                        navigate(ROUTES.DELIVERY_NEW_PAGE.replace(':projectId', projectId))
                    }}
                >
                    Add
                </Button>
            </Grid>
        </Grid>
    )
}

export default ProjectViewComponent
