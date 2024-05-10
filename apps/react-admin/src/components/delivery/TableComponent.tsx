import React, { useState } from 'react'
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
import { useGetAllDeliveryByProjectIdQuery } from '~/store/api'

const deliveryColumns: GridColDef<Delivery.Delivery>[] = [
    { field: 'deliverableName', headerName: 'Name' },
    { field: 'deliverableType', headerName: 'Type' },
    { field: 'description', headerName: 'Description' },
    {
        field: 'deliveryFilesVersion',
        headerName: 'Version',
        valueGetter: (value, { deliveryFiles }) => deliveryFiles.length>0 ? deliveryFiles[0].version : 'N/A',
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

interface DeliveryTableComponentProps {
    projectId: string
}

const DeliveryTableComponent: React.FC<DeliveryTableComponentProps> = ({
    projectId
}: DeliveryTableComponentProps) => {
    const [rows, setRows] = React.useState<Delivery.Delivery[]>([])
    const { data, isSuccess, isFetching } = useGetAllDeliveryByProjectIdQuery({projectId})
    React.useEffect(() => {
        if (isSuccess) {
            const { status, delivery }: Delivery.DeliveryResponse = data
            if (status === 200 && delivery && Array.isArray(delivery)) {
                setRows(delivery)
            }
        }
    }, [data])

    return (
        <Grid container>
            <Grid xs={12}>
                <DataGrid
                    columns={deliveryColumns}
                    rows={rows}
                    initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}
                    pageSizeOptions={[5]}
                    loading={isFetching}
                />
            </Grid>
        </Grid>
    )
}

export default DeliveryTableComponent
