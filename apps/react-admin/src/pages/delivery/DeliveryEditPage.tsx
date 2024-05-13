import React from 'react'
import { Unstable_Grid2 as Grid } from '@mui/material'
import { useParams } from 'react-router-dom'
import { DeliveryCollection } from '~/components'

interface DeliveryEditPageProps {}

const DeliveryEditPage: React.FC<DeliveryEditPageProps> = ({}: DeliveryEditPageProps) => {
    const { projectId, deliveryId } = useParams()
    if (projectId && deliveryId) {
        return (
            <Grid container>
                <Grid xs={12}>
                    <DeliveryCollection.NewDeliveryComponent
                        projectId={projectId}
                        deliveryId={deliveryId}
                    />
                </Grid>
            </Grid>
        )
    }
}

export default DeliveryEditPage
