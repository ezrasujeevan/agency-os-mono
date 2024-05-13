import React from 'react'
import { Unstable_Grid2 as Grid } from '@mui/material'
import { AssetDetailComponent, DeliveryDetailComponent, ProjectDetailComponent } from '../common'

interface AssetViewComponentProps {
    projectId: string
    deliveryId: string
    assetId: string
}

const AssetViewComponent: React.FC<AssetViewComponentProps> = ({
    projectId,
    deliveryId,
    assetId
}: AssetViewComponentProps) => {
    return (
        <Grid container>
            <Grid xs={12}>
                <ProjectDetailComponent projectId={projectId} />
                <DeliveryDetailComponent deliveryId={deliveryId} />
                <AssetDetailComponent assetId={assetId} />
            </Grid>
        </Grid>
    )
}

export default AssetViewComponent
