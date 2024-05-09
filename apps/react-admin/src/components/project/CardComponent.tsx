import React, { useEffect, useState } from 'react'
import {
    Autocomplete,
    Button,
    ButtonGroup,
    Unstable_Grid2 as Grid,
    InputAdornment,
    TextField,
    Paper,
    Typography
} from '@mui/material'
import { Project } from '@agency-os/class'
import moment from 'moment'
import { ProjectStatus } from '~/resources/project-constans'
interface ProjectCardComponentProps {
    project: Project.Project
}

const ProjectCardComponent: React.FC<ProjectCardComponentProps> = ({
    project
}: ProjectCardComponentProps) => {
    const { companyId, startDate, endDate, name, trialName, status } = project
    const projectStatus: ProjectStatus = status
    const statusColor = () => {
        switch (projectStatus) {
            case ProjectStatus.ACTIVE:
                return 'success.main'
            case ProjectStatus.INACTIVE:
                return 'info.main'
            case ProjectStatus.PENDING:
                return 'warning.main'
            case ProjectStatus.BlOCKED:
                return 'error.main'
            case ProjectStatus.DROPPED:
                return 'secondary.main'
            case ProjectStatus.COMPLETED:
                return 'primary.main'
        }
    }
    return (
        <Grid>
            <Paper elevation={1} sx={{ p: 1 }}>
                <Typography variant="h4" color={'primary'}>
                    {name}
                </Typography>
                <Typography variant="h5" color={'secondary'}>
                    {companyId}
                </Typography>
                <Typography variant="subtitle1">{trialName}</Typography>

                <Paper>
                    <Grid display={'flex'} flexDirection={'row'}>
                        <Grid m={1}>
                            <Typography>Start Date:</Typography>
                            <Typography>{moment(startDate).format('DD/MM/yy')}</Typography>
                        </Grid>
                        <Grid m={1}>
                            <Typography>End Date:</Typography>
                            <Typography>{moment(endDate).format('DD/MM/yy')}</Typography>
                        </Grid>
                    </Grid>
                </Paper>

                <Typography variant="caption" sx={{ color: statusColor }}>
                    {status.toUpperCase()}
                </Typography>
            </Paper>
        </Grid>
    )
}

export default ProjectCardComponent
