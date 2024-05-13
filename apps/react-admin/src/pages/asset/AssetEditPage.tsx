import React from 'react'
import { Unstable_Grid2 as Grid } from '@mui/material'
import { AssetCollection } from '~/components'
import { useParams } from 'react-router-dom'

interface AssetEditPageProps {}

const AssetEditPage: React.FC<AssetEditPageProps> = ({}: AssetEditPageProps) => {
    const { projectId, deliveryId, assetId } = useParams()
    if (projectId && deliveryId && assetId)
        return (
            <Grid container>
                <Grid xs={12}>
                    <AssetCollection.NewAssetComponent
                        projectId={projectId}
                        deliveryId={deliveryId}
                        assetId={assetId}
                    />
                </Grid>
            </Grid>
        )
}

export default AssetEditPage
