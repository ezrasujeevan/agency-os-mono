import React from 'react'
import { Unstable_Grid2 as Grid } from '@mui/material'

interface NewFileComponentProps {
    projectId:string
    deliveryId?: string
    assetId?: string
}

const NewFileComponent: React.FC<NewFileComponentProps> = ({
    assetId,
    deliveryId
}: NewFileComponentProps) => {
    return (
        <Grid container>
            <Grid xs={12}>NewFileComponent</Grid>
        </Grid>
    )
}

export default NewFileComponent
