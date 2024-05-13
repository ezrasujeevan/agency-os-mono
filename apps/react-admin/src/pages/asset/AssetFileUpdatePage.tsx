import React from 'react'
import { Unstable_Grid2 as Grid } from '@mui/material'
import { NewFileComponent } from '~/components'
import { useParams } from 'react-router-dom'

interface AssetFileUpdatePageProps {}

const AssetFileUpdatePage: React.FC<AssetFileUpdatePageProps> = ({}: AssetFileUpdatePageProps) => {
    const { projectId, assetId, deliveryId } = useParams()
    if (projectId && assetId && deliveryId)
        return (
            <Grid container>
                <Grid xs={12}>
                    <NewFileComponent
                        projectId={projectId}
                        assetId={assetId}
                        deliveryId={deliveryId}
                    />
                </Grid>
            </Grid>
        )
}

export default AssetFileUpdatePage
