import React from 'react'
import { Unstable_Grid2 as Grid } from '@mui/material'
import { useParams } from 'react-router-dom'

interface DeliveryFileUpdatePageProps {}

const DeliveryFileUpdatePage: React.FC<
    DeliveryFileUpdatePageProps
> = ({}: DeliveryFileUpdatePageProps) => {
    const { projectId, deliveryId } = useParams()
    return (
        <Grid container>
            <Grid xs={12}>DeliveryFileUpdatePage</Grid>
            <Grid xs={12}>Project ID - {projectId} </Grid>
            <Grid xs={12}>delivery ID - {projectId}</Grid>
        </Grid>
    )
}

export default DeliveryFileUpdatePage
