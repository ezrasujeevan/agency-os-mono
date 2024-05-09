import React from 'react'
import { Unstable_Grid2 as Grid } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import DeliveryRenderAccessCell from './RenderAccessCell'
import DeliveryRenderActionCell from './RenderActionCell'
import { dummyRows } from './delivery-table'
import DeliveryRenderTagsCell from './RenderTagsCell'

const deliveryColumns: GridColDef[] = [
    { field: 'deliverableName', headerName: 'Name' },
    { field: 'deliverableType', headerName: 'Type' },
    { field: 'description', headerName: 'Description' },
    { field: 'deliverableVersion', headerName: 'Version' },
    { field: 'fileUrl', headerName: 'URl' },
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
    return (
        <Grid container>
            <Grid xs={12}>
                <DataGrid
                    columns={deliveryColumns}
                    rows={dummyRows}
                    initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}
                    pageSizeOptions={[5]}
                />
            </Grid>
        </Grid>
    )
}

export default DeliveryTableComponent
