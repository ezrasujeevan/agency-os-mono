import React, { useEffect, useRef, useState } from 'react'
import { Unstable_Grid2 as Grid, Skeleton } from '@mui/material'
import { DataGrid, GridColDef, useGridApiRef } from '@mui/x-data-grid'

import { Asset, Delivery } from '@agency-os/class'
import { useGetAllAssetsOfDeliveryQuery, useGetAllFilesOfAssetQuery, useGetAllFilesOfDeliveryQuery } from '~/store/api'

import { skipToken } from '@reduxjs/toolkit/query'
import { RenderActionCell, RenderFileUrlCell } from './cell'
import moment from 'moment'
import { NoDataOverlayTable } from '../common'
import { useAppDispatch } from '~/store'
import { snackAlertActions } from '~/store/reducers/snack.alert'

const assetColumns: GridColDef<Asset.AssetFile>[] = [
    {
        field: 'createdAt',
        headerName: 'Created',
        valueGetter: (value, { createdAt }) => moment(createdAt).format('DD/MM/YYYY')
    },
    {
        field: 'assetFilesVersion',
        headerName: 'Version',
        valueGetter: (value, { fileVersion }) => fileVersion
    },
    {
        field: 'assetFilesUrl',
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

interface AssetHistoryTableComponentProps {
    deliveryId: string
    projectId: string
    assetId: string
}

const AssetHistoryTableComponent: React.FC<AssetHistoryTableComponentProps> = ({
    deliveryId,
    projectId,
    assetId,
}: AssetHistoryTableComponentProps) => {
    const apiRef = useGridApiRef()
    const dispatch = useAppDispatch()

    const [rows, setRows] = useState<Asset.AssetFile[]>([])
    const { data, isSuccess, isFetching } = useGetAllFilesOfAssetQuery(
        assetId ? { id: assetId } : skipToken
    )
    useEffect(() => {
        if (isSuccess) {
            const { status, asset }: Asset.AssetResponseDto = data
            if (
                status === 200 &&
                asset &&
                !Array.isArray(asset) &&
                Array.isArray(asset.assetFile)
            ) {
                setRows(asset.assetFile)
                if (asset.assetFile.length > 0) {
                    //TODO: dispatch snack alert
                    dispatch(
                        snackAlertActions.setSnackAlertInfo({
                            title: 'Asset File History',
                            message: `Found ${asset.assetFile.length} files`
                        })
                    )
                } else {
                    dispatch(
                        snackAlertActions.setSnackAlertWarning({
                            title: 'Asset File History',
                            message: 'No Files Found'
                        })
                    )
                }
            }
        }
    }, [data])

    return (
        <Grid container>
            <Grid xs={12}>
                <DataGrid
                    slots={{ noRowsOverlay: NoDataOverlayTable }}
                    apiRef={apiRef}
                    columns={assetColumns}
                    rows={rows}
                    autoHeight={true}
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

export default AssetHistoryTableComponent
