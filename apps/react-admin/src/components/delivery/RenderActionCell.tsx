import React from 'react'
import { Button, ButtonGroup, Unstable_Grid2 as Grid } from '@mui/material'
import { GridRenderCellParams } from '@mui/x-data-grid'
import { Delivery } from '@agency-os/class'

const DeliveryRenderActionCell: React.FC<GridRenderCellParams<Delivery.Delivery, any>> = ({
    row,
}: GridRenderCellParams<any, any>) => {
    const handleSwitchAccess = () => {console.log('Switch Access',row.id)}
    const handleEditAccess = () => {console.log('Edit Access',row.id)}
    const handleUpdateAccess = () => {console.log('Update Access',row.id)}
    return (
        <ButtonGroup variant="contained" aria-label="Basic button group">
            <Button onClick={handleSwitchAccess} variant='outlined' sx={{color:'warning.main'}}>Switch Access</Button>
            <Button onClick={handleEditAccess} color={'secondary'}>Edit</Button>
            <Button onClick={handleUpdateAccess}>Update</Button>
        </ButtonGroup>
    )
}

export default DeliveryRenderActionCell
