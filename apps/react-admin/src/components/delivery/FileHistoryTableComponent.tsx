import React, { useEffect, useRef, useState } from 'react'
import { Unstable_Grid2 as Grid, Skeleton } from '@mui/material'
import { DataGrid, GridColDef, useGridApiRef } from '@mui/x-data-grid'

import { Asset, Delivery } from '@agency-os/class'
import { useGetAllAssetsOfDeliveryQuery } from '~/store/api'

import { skipToken } from '@reduxjs/toolkit/query'
import { RenderActionCell, RenderFileUrlCell } from './cell'
import moment from 'moment'

const deliveryColumns: GridColDef<Delivery.DeliveryFile>[] = [
    { field: 'createdAt', headerName: 'Created', valueGetter: (value,{createdAt}) => (moment(createdAt).format('DD/MM/YYYY')) },
    {
        field: 'deliveryFilesVersion',
        headerName: 'Version',
        valueGetter: (value, { fileVersion }) => (fileVersion)
    },
    {
        field: 'deliveryFilesUrl',
        headerName: 'FileUrl',
        renderCell: RenderFileUrlCell
    },
    {
        field: 'id',
        headerName: 'Action',
        renderCell: RenderActionCell,
        disableColumnMenu: true
    }
]

interface AssetTableComponentProps {
    deliveryId: string
}

const AssetTableComponent: React.FC<AssetTableComponentProps> = ({
    deliveryId
}: AssetTableComponentProps) => {
    const apiRef = useGridApiRef()

    const [rows, setRows] = useState<Asset.AssetFile[]>([])
    const { data, isSuccess, isFetching } = useGetAllAssetsOfDeliveryQuery(
        deliveryId ? { deliveryId } : skipToken
    )
    useEffect(() => {
        if (isSuccess) {
            const { status, delivery }: Asset.AssetResponseDto = data
            if (status === 200 && asset && !Array.isArray(asset) && Array.isArray(asset.assetFile)) {
                setRows(asset.assetFile)
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

export default AssetTableComponent
