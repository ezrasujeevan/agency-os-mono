import React from 'react'
import { Button, ButtonGroup, Unstable_Grid2 as Grid } from '@mui/material'
import { GridRenderCellParams } from '@mui/x-data-grid'
import { Delivery } from '@agency-os/class'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

const DeliveryRenderActionCell: React.FC<GridRenderCellParams<Delivery.Delivery, any>> = ({
    row
}: GridRenderCellParams<any, any>) => {
    const navigate = useNavigate()
    const { projectId } = useParams()
    const handleSwitchAccess = () => {}
    const handleViewAccess = () => {}

    const handleFileAccess = () => {
        if (projectId && row.id) {
            navigate(`/project/${projectId}/delivery/${row.id}/file/new`)
        }
    }
    const handleHistory = () => {}
    const disabled = row.deliveryFiles.length === 0
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
                // sx={{ color: 'warning.main', borderColor: 'warning.main' }}
                color={'warning'}
            >
                Switch Access
            </Button>
        </ButtonGroup>
    )
}

export default DeliveryRenderActionCell
