import React, { useEffect, useRef, useState } from 'react'
import { Unstable_Grid2 as Grid, Skeleton } from '@mui/material'
import { DataGrid, GridColDef, useGridApiRef } from '@mui/x-data-grid'

import { Asset } from '@agency-os/class'
import { useGetAllAssetsOfDeliveryQuery } from '~/store/api'

import { skipToken } from '@reduxjs/toolkit/query'
import { AssetRenderAccessCell, AssetRenderActionCell, AssetRenderFileUrlCell } from './cell'

const deliveryColumns: GridColDef<Asset.Asset>[] = [
    { field: 'name', headerName: 'Name' },
    { field: 'type', headerName: 'Type' },
    { field: 'description', headerName: 'Description' },
    {
        field: 'assetFilesVersion',
        headerName: 'Version',
        valueGetter: (value, { assetFile }) => (assetFile.length > 0 ? assetFile[0].version : 'N/A')
    },
    {
        field: 'assetFilesUrl',
        headerName: 'FileUrl',
        renderCell: AssetRenderFileUrlCell
    },

    {
        field: 'access',
        headerName: 'Access',
        description: 'Given access to Client.',
        type: 'boolean',
        editable: true,
        renderCell: AssetRenderAccessCell
    },
    {
        field: 'id',
        headerName: 'Action',
        renderCell: AssetRenderActionCell,
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

    const [rows, setRows] = useState<Asset.Asset[]>([])
    const { data, isSuccess, isFetching } = useGetAllAssetsOfDeliveryQuery(
        deliveryId ? { deliveryId } : skipToken
    )
    useEffect(() => {
        if (isSuccess) {
            const { status, asset }: Asset.AssetResponseDto = data
            if (status === 200 && asset && Array.isArray(asset)) {
                setRows(asset)
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
