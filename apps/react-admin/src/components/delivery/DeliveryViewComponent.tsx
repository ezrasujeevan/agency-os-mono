import React from 'react'
import { Unstable_Grid2 as Grid } from '@mui/material'
import AssetTableComponent from './AssetTableComponent'
import { DeliveryDetailComponent, ProjectDetailComponent } from '../common'

interface DeliveryViewComponentProps {
  projectId: string
  deliveryId: string
}

const DeliveryViewComponent: React.FC<DeliveryViewComponentProps> = ({projectId,deliveryId}: DeliveryViewComponentProps) => {
    return (
        <Grid container>
          <Grid xs={12}><ProjectDetailComponent projectId={projectId}/></Grid>
          <Grid xs={12}><DeliveryDetailComponent deliveryId={deliveryId}/></Grid>
          <Grid xs={12}><AssetTableComponent deliveryId={deliveryId}/></Grid>
        </Grid>
    )
}

export default DeliveryViewComponent
