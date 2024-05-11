import React from 'react'
import { Unstable_Grid2 as Grid } from '@mui/material'
import { Cancel, CheckCircle } from '@mui/icons-material'
import { GridRenderCellParams } from '@mui/x-data-grid'

const DeliveryRenderAccessCell: React.FC<GridRenderCellParams<any, boolean>> = ({
    value
}: GridRenderCellParams<any, boolean>) => {
    return value ? <CheckCircle sx={{color:'success.main'}} /> : <Cancel sx={{color:'error.main'}}/>
}

export default DeliveryRenderAccessCell
