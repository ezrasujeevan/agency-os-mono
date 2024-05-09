import React from 'react'
import { Unstable_Grid2 as Grid } from '@mui/material'

interface DeliveryRowComponentProps {}

const DeliveryRowComponent: React.FC<
    DeliveryRowComponentProps
> = ({}: DeliveryRowComponentProps) => {
    return (
        <Grid container>
            <Grid xs={12}>DeliveryRowComponent</Grid>
        </Grid>
    )
}

export default DeliveryRowComponent
