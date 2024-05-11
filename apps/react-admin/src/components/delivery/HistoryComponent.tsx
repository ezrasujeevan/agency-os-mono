import React from 'react'
import { Unstable_Grid2 as Grid } from '@mui/material'

interface HistoryComponentProps {}

const HistoryComponent: React.FC<HistoryComponentProps> = ({}: HistoryComponentProps) => {
    return (
        <Grid container>
            <Grid xs={12}>HistoryComponent</Grid>
        </Grid>
    )
}

export default HistoryComponent
