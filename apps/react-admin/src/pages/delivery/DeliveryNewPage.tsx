import React from 'react'
import { Unstable_Grid2 as Grid } from '@mui/material'
import { DeliveryCollection } from '~/components'
import { useParams } from 'react-router-dom'

interface DeliveryNewPageProps {}

const DeliveryNewPage: React.FC<DeliveryNewPageProps> = ({}: DeliveryNewPageProps) => {
    const { projectId } = useParams()
    if (projectId) {
        return (
            <Grid container>
                <Grid xs={12}>
                    <DeliveryCollection.NewDeliveryComponent projectId={projectId} />
                </Grid>
            </Grid>
        )
    }
}

export default DeliveryNewPage
