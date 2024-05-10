import React, { useEffect, useState } from 'react'
import {
    Unstable_Grid2 as Grid,
    Paper,
    Typography,
    Skeleton
} from '@mui/material'
interface ProjectCardComponentProps {}

const SkeletonCardComponent: React.FC<ProjectCardComponentProps> = ({}: ProjectCardComponentProps) => {
    return (
        <Grid>
            <Skeleton variant='rectangular' width={'100%'}>
                <Paper elevation={1} sx={{ p: 1 }}>
                    <Typography variant="h4" color={'primary'}>
                        <Skeleton />
                    </Typography>
                    <Typography variant="h5" color={'secondary'}>
                        <Skeleton />
                    </Typography>
                    <Typography variant="subtitle1">
                        <Skeleton />
                    </Typography>
                    <Skeleton>
                        <Paper>
                            <Grid display={'flex'} flexDirection={'row'}>
                                <Grid m={1}>
                                    <Typography>Start Date:</Typography>
                                    <Typography>
                                        <Skeleton />
                                    </Typography>
                                </Grid>
                                <Grid m={1}>
                                    <Typography>End Date:</Typography>
                                    <Typography>
                                        <Skeleton />
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Skeleton>
                    <Typography variant="caption">
                        <Skeleton />
                    </Typography>
                </Paper>
            </Skeleton>
        </Grid>
    )
}

export default SkeletonCardComponent
