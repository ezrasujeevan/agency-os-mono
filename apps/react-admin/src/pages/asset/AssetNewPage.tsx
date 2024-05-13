import React from 'react'
import { Unstable_Grid2 as Grid } from '@mui/material'
import { AssetCollection } from '~/components'
import { useParams } from 'react-router-dom'

interface AssetNewPageProps {}

const AssetNewPage: React.FC<AssetNewPageProps> = ({}: AssetNewPageProps) => {
    const { projectId, deliveryId } = useParams()
    if (projectId && deliveryId)
        return (
            <Grid container>
                <Grid xs={12}>
                    <AssetCollection.NewAssetComponent
                        projectId={projectId}
                        deliveryId={deliveryId}
                    />
                </Grid>
            </Grid>
        )
}

export default AssetNewPage
