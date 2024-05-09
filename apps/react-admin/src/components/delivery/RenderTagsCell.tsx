import React from 'react'
import { Chip, Unstable_Grid2 as Grid, Stack } from '@mui/material'
import { GridRenderCellParams } from '@mui/x-data-grid'
import { Delivery } from '@agency-os/class'

const DeliveryRenderTagsCell: React.FC<GridRenderCellParams<Delivery.Delivery, string[]>> = ({
    value,
    row
}: GridRenderCellParams<Delivery.Delivery, string[]>) => {
    return (
        <Stack direction="row" spacing={1}>
            {value?.map((tag, index) => <Chip label={tag} key={index} color={'secondary'}/>)}
        </Stack>
    )
}

export default DeliveryRenderTagsCell
