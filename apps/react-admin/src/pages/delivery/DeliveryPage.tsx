import React from 'react'
import { Unstable_Grid2 as Grid } from '@mui/material'
import { DeliveryCollection } from '~/components'
import { useParams } from 'react-router-dom'

interface DeliveryPageProps {}

const DeliveryPage: React.FC<DeliveryPageProps> = ({}: DeliveryPageProps) => {
    const { projectId, deliveryId } = useParams()
    if (projectId && deliveryId) {
        return (
            <Grid container>
                <Grid xs={12}>
                    <DeliveryCollection.DeliveryViewComponent
                        deliveryId={deliveryId}
                        projectId={projectId}
                    />
                </Grid>
            </Grid>
        )
    }
}

export default DeliveryPage
