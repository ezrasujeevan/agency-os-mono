import React from 'react'
import { Unstable_Grid2 as Grid } from '@mui/material'
import NewDeliveryComponent from '~/components/delivery/NewComponent'

interface DeliveryNewPageProps {}

const DeliveryNewPage: React.FC<DeliveryNewPageProps> = ({}: DeliveryNewPageProps) => {
    return (
        <Grid container>
            <Grid xs={12}>
                <NewDeliveryComponent />
            </Grid>
        </Grid>
    )
}

export default DeliveryNewPage
