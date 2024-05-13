import React from 'react'
import { Button, ButtonGroup, Unstable_Grid2 as Grid } from '@mui/material'
import { GridRenderCellParams } from '@mui/x-data-grid'
import { Asset } from '@agency-os/class'
import { useNavigate, useParams } from 'react-router-dom'

const AssetRenderActionCell: React.FC<GridRenderCellParams<Asset.Asset, any>> = ({
    row
}: GridRenderCellParams<any, any>) => {
    const navigate = useNavigate()
    const { projectId, deliveryId } = useParams()
    const handleSwitchAccess = () => {}
    const handleViewAccess = () => {
        if (projectId && deliveryId && row.id) {
            navigate(`/project/${projectId}/delivery/${deliveryId}/asset/${row.id}/`)
        }
    }

    const handleFileAccess = () => {
        if (projectId && deliveryId && row.id) {
            navigate(`/project/${projectId}/delivery/${deliveryId}/asset/${row.id}/file/new`)
        }
    }
    const handleHistory = () => {
        if (projectId && deliveryId && row.id) {
            navigate(`/project/${projectId}/delivery/${deliveryId}/asset/${row.id}/file/`)
        }
    }
    const disabled = row.assetFile.length === 0
    return (
        <ButtonGroup variant="contained" aria-label="Basic button group">
            <Button onClick={handleViewAccess} color={'secondary'}>
                View
            </Button>
            <Button onClick={handleFileAccess}>Add New Version</Button>
            <Button
                // disabled={disabled}
                onClick={handleHistory}
                variant={'outlined'}
                color={'secondary'}
                sx={{ color: 'secondary', borderColor: 'secondary' }}
            >
                History
            </Button>
            <Button
                onClick={handleSwitchAccess}
                variant="outlined"
                color={'warning'}
            >
                Switch Access
            </Button>
        </ButtonGroup>
    )
}

export default AssetRenderActionCell
