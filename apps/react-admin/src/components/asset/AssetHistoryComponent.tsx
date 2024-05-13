import React from 'react'
import { Unstable_Grid2 as Grid } from '@mui/material'
import AssetFileHistoryTableComponent from './AssetFileHistoryTableComponent'
import { AssetDetailComponent, DeliveryDetailComponent, ProjectDetailComponent } from '../common'

interface AssetHistoryComponentProps {
    projectId: string
    deliveryId: string
    assetId:string
}

const AssetHistoryComponent: React.FC<AssetHistoryComponentProps> = ({
    projectId,
    deliveryId,
    assetId
    
}: AssetHistoryComponentProps) => {
    return (
        <Grid container>
            <Grid xs={12}>
                <ProjectDetailComponent projectId={projectId} />
            </Grid>
            <Grid xs={12}>
                <DeliveryDetailComponent deliveryId={deliveryId} />
            </Grid>
            <Grid xs={12}>
                <AssetDetailComponent assetId={deliveryId} />
            </Grid>
            <Grid xs={12}>
                <AssetFileHistoryTableComponent projectId={projectId} deliveryId={deliveryId} assetId={assetId}/>
            </Grid>
        </Grid>
    )
}

export default AssetHistoryComponent
