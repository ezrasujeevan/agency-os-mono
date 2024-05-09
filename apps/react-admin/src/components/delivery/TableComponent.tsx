import React from 'react'
import { Unstable_Grid2 as Grid } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import {
    DeliveryRenderAccessCell,
    DeliveryRenderActionCell,
    DeliveryRenderFileUrlCell,
    DeliveryRenderTagsCell
} from './cell'

import { dummyDelivery } from './dummy'
import { Delivery } from '@agency-os/class'

const deliveryColumns: GridColDef<Delivery.Delivery>[] = [
    { field: 'deliverableName', headerName: 'Name' },
    { field: 'deliverableType', headerName: 'Type' },
    { field: 'description', headerName: 'Description' },
    {
        field: 'deliveryFilesVersion',
        headerName: 'Version',
        valueGetter: (value, { deliveryFiles }) => deliveryFiles[0].fileVersion,
        valueFormatter: (value) => {
            ;`V ${value}`
        }
    },
    {
        field: 'deliveryFilesUrl',
        headerName: 'FileUrl',
        renderCell: DeliveryRenderFileUrlCell
    },
    { field: 'tags', headerName: 'Tags', renderCell: DeliveryRenderTagsCell, sortable: false },
    {
        field: 'access',
        headerName: 'Access',
        description: 'Given access to Client.',
        type: 'boolean',
        renderCell: DeliveryRenderAccessCell
    },
    {
        field: 'id',
        headerName: 'Action',
        renderCell: DeliveryRenderActionCell,
        width: 1,
        disableColumnMenu: true
    }
]

interface DeliveryTableComponentProps {}

const DeliveryTableComponent: React.FC<
    DeliveryTableComponentProps
> = ({}: DeliveryTableComponentProps) => {
    const dummy = dummyDelivery
    console.log(dummy)
    return (
        <Grid container>
            <Grid xs={12}>
                <DataGrid
                    columns={deliveryColumns}
                    rows={dummyDelivery}
                    initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}
                    pageSizeOptions={[5]}
                />
            </Grid>
        </Grid>
    )
}

export default DeliveryTableComponent
