import React from 'react'
import { Unstable_Grid2 as Grid } from '@mui/material'
import { useParams } from 'react-router-dom'
import { AssetCollection } from '~/components'

interface AssetFilePageProps {}

const AssetFilePage: React.FC<AssetFilePageProps> = ({}: AssetFilePageProps) => {
    const { projectId, deliveryId, assetId } = useParams()
    if (projectId && deliveryId && assetId) {
        return (
            <Grid container>
                <Grid xs={12}>
                    <AssetCollection.AssetHistoryComponent
                        projectId={projectId}
                        deliveryId={deliveryId}
                        assetId={assetId}
                    />
                </Grid>
            </Grid>
        )
    }
}

export default AssetFilePage
