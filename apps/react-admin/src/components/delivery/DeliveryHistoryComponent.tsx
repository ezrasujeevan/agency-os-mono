import React from 'react'
import { Unstable_Grid2 as Grid } from '@mui/material'
import DeliveryHistoryTableComponent from './DeliveryFileHistoryTableComponent'
import { DeliveryDetailComponent, ProjectDetailComponent } from '../common'

interface DeliveryHistoryComponentProps {
    projectId: string
    deliveryId: string
}

const DeliveryHistoryComponent: React.FC<DeliveryHistoryComponentProps> = ({
    projectId,
    deliveryId
}: DeliveryHistoryComponentProps) => {
    return (
        <Grid container>
            <Grid xs={12}>
                <ProjectDetailComponent projectId={projectId} />
            </Grid>
            <Grid xs={12}>
                <DeliveryDetailComponent deliveryId={deliveryId} />
            </Grid>
            <Grid xs={12}>
                <DeliveryHistoryTableComponent projectId={projectId} deliveryId={deliveryId} />
            </Grid>
        </Grid>
    )
}

export default DeliveryHistoryComponent
