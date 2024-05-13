import React from 'react'
import { Button, Unstable_Grid2 as Grid } from '@mui/material'
import AssetTableComponent from './AssetTableComponent'
import { DeliveryDetailComponent, ProjectDetailComponent } from '../common'
import { ROUTES } from '~/resources/routes-constants'
import { useNavigate } from 'react-router-dom'

interface DeliveryViewComponentProps {
  projectId: string
  deliveryId: string
}

const DeliveryViewComponent: React.FC<DeliveryViewComponentProps> = ({ projectId, deliveryId }: DeliveryViewComponentProps) => {
  const navigate = useNavigate()
  return (
    <Grid container>
      <Grid xs={12}><ProjectDetailComponent projectId={projectId} /></Grid>
      <Grid xs={12}><DeliveryDetailComponent deliveryId={deliveryId} /></Grid>
      <Grid>
        <Button
          color={'secondary'}
          variant={'contained'}
          onClick={() => {
            navigate(ROUTES.DELIVERY_EDIT_PAGE.replace(':projectId', projectId).replace(':deliveryId', deliveryId))
          }}
        >
          Edit
        </Button>
      </Grid>
      <Grid xs={12}><AssetTableComponent deliveryId={deliveryId} /></Grid>
      <Grid>
        <Button
          variant={'contained'}
          onClick={() => {
            navigate(ROUTES.ASSET_NEW_PAGE.replace(':projectId', projectId).replace(':deliveryId', deliveryId))
          }}
        >
          Add
        </Button>
      </Grid>
    </Grid>
  )
}

export default DeliveryViewComponent
