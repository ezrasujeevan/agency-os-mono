import React from 'react'
import { Unstable_Grid2 as Grid } from '@mui/material'
import { useParams } from 'react-router-dom'
import { NewFileComponent } from '~/components'

interface DeliveryFileNewPageProps {}

const DeliveryFileNewPage: React.FC<DeliveryFileNewPageProps> = ({}: DeliveryFileNewPageProps) => {
    const { projectId, deliveryId } = useParams()

    if (projectId && deliveryId) {
        return (
            <Grid container>
                <Grid xs={12}>
                    <NewFileComponent
                        deliveryId={deliveryId}
                        projectId={projectId}
                    />
                </Grid>
            </Grid>
        )
    }
}

export default DeliveryFileNewPage
