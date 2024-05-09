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
interface ProjectCardComponentProps {}

const ProjectCardComponent: React.FC<
    ProjectCardComponentProps
> = ({}: ProjectCardComponentProps) => {
    return (
        <Grid>
            <Paper elevation={1} sx={{ p: 1 }}>
                <Typography variant="h4" color={'primary'}>
                    Project Name
                </Typography>
                <Typography variant="h5" color={'secondary'}>
                    Company Name
                </Typography>
                <Typography variant="subtitle1">Project Trial Name</Typography>

                <Paper>
                    <Grid display={'flex'} flexDirection={'row'}>
                        <Grid m={1}>
                            <Typography>Start Date:</Typography>
                            <Typography>19/05/2024</Typography>
                        </Grid>
                        <Grid m={1}>
                            <Typography>End Date:</Typography>
                            <Typography>19/05/2024</Typography>
                        </Grid>
                    </Grid>
                </Paper>

                <Typography variant="caption" sx={{ color: 'success.main' }}>
                    STATUS
                </Typography>
            </Paper>
        </Grid>
    )
}

export default ProjectCardComponent
