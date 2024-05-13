import React from 'react'
import { Unstable_Grid2 as Grid } from '@mui/material'
import { AssetCollection } from '~/components'
import { useParams } from 'react-router-dom'

interface AssetPageProps {}

const AssetPage: React.FC<AssetPageProps> = ({}: AssetPageProps) => {
    const { projectId, deliveryId, assetId } = useParams()
    if (projectId && deliveryId && assetId) {
        return (
            <Grid container>
                <Grid xs={12}>
                    <AssetCollection.AssetViewComponent
                        projectId={projectId}
                        deliveryId={deliveryId}
                        assetId={assetId}
                    />
                </Grid>
            </Grid>
        )
    }
}

export default AssetPage
