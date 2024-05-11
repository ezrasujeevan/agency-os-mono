import React, { useEffect, useRef, useState } from 'react'
import { Unstable_Grid2 as Grid, Skeleton } from '@mui/material'
import { DataGrid, GridColDef, useGridApiRef } from '@mui/x-data-grid'
import {
    DeliveryRenderAccessCell,
    DeliveryRenderActionCell,
    DeliveryRenderFileUrlCell,
    DeliveryRenderTagsCell
} from './cell'

import { Delivery } from '@agency-os/class'
import { useGetAllDeliveryByProjectIdQuery } from '~/store/api'


const deliveryColumns: GridColDef<Delivery.Delivery>[] = [
    { field: 'deliverableName', headerName: 'Name' },
    { field: 'deliverableType', headerName: 'Type' },
    { field: 'description', headerName: 'Description' },
    {
        field: 'deliveryFilesVersion',
        headerName: 'Version',
        valueGetter: (value, { deliveryFiles }) =>
            deliveryFiles.length > 0 ? deliveryFiles[0].version : 'N/A'
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
        editable: true,
        renderCell: DeliveryRenderAccessCell
    },
    {
        field: 'id',
        headerName: 'Action',
        renderCell: DeliveryRenderActionCell,
        disableColumnMenu: true
    }
]

interface DeliveryTableComponentProps {
    projectId: string
}

const DeliveryTableComponent: React.FC<DeliveryTableComponentProps> = ({
    projectId
}: DeliveryTableComponentProps) => {
    const apiRef = useGridApiRef()

    const [rows, setRows] = useState<Delivery.Delivery[]>([])
    const { data, isSuccess, isFetching } = useGetAllDeliveryByProjectIdQuery({ projectId })
    useEffect(() => {
        if (isSuccess) {
            const { status, delivery }: Delivery.DeliveryResponseDto = data
            if (status === 200 && delivery && Array.isArray(delivery)) {
                setRows(delivery)
                apiRef.current.autosizeColumns({ includeOutliers: true })
            }
        }
    }, [data])

    return (
        <Grid container>
            <Grid xs={12}>
                <DataGrid
                    apiRef={apiRef}
                    columns={deliveryColumns}
                    rows={rows}
                    initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}
                    pageSizeOptions={[5]}
                    loading={isFetching}
                    autosizeOptions={{ includeOutliers: true }}
                    onResize={() => {
                        apiRef.current.autosizeColumns({ includeOutliers: true })
                    }}
                />
            </Grid>
        </Grid>
    )
}

export default DeliveryTableComponent