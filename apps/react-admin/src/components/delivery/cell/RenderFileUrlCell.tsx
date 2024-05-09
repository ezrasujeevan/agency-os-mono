import React from 'react'
import { Button } from '@mui/material'
import { Delivery } from '@agency-os/class'
import { GridRenderCellParams } from '@mui/x-data-grid'

const DeliveryRenderFileUrlCell: React.FC<
    GridRenderCellParams<Delivery.Delivery, Delivery.DeliveryFile[]>
> = ({ value, row }: GridRenderCellParams<Delivery.Delivery, Delivery.DeliveryFile[]>) => {
    const handleOnClick = () => {
        window.open(row.deliveryFiles[0].fileUrl)
    }
    return (
        <Button variant="outlined" color="primary" onClick={handleOnClick}>
            Open File Url
        </Button>
    )
}

export default DeliveryRenderFileUrlCell
