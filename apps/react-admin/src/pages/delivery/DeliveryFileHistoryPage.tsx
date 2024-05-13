import React from 'react'
import { Unstable_Grid2 as Grid } from '@mui/material'
import { DeliveryCollection } from '~/components'
import { useParams } from 'react-router-dom'

interface DeliveryFileHistoryPageProps {}

const DeliveryFileHistoryPage: React.FC<
    DeliveryFileHistoryPageProps
> = ({}: DeliveryFileHistoryPageProps) => {
    const { projectId, deliveryId } = useParams()
    if (projectId && deliveryId) {
        return (
            <Grid container>
                <Grid xs={12}>
                    <DeliveryCollection.DeliveryHistoryComponent
                        projectId={projectId}
                        deliveryId={deliveryId}
                    />
                </Grid>
            </Grid>
        )
    }
}

export default DeliveryFileHistoryPage
