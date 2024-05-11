import React from 'react'
import { Unstable_Grid2 as Grid } from '@mui/material'
import ProjectDetailComponent from './ProjectDetailComponent'
import DetailComponent from './DetailComponent'
import AssetTableComponent from './AssetTableComponent'

interface ViewComponentProps {
  projectId: string
  deliveryId: string
}

const ViewComponent: React.FC<ViewComponentProps> = ({projectId,deliveryId}: ViewComponentProps) => {
    return (
        <Grid container>
          <Grid xs={12}><ProjectDetailComponent projectId={projectId}/></Grid>
          <Grid xs={12}><DetailComponent deliveryId={deliveryId}/></Grid>
          <Grid xs={12}><AssetTableComponent deliveryId={deliveryId}/></Grid>
        </Grid>
    )
}

export default ViewComponent
