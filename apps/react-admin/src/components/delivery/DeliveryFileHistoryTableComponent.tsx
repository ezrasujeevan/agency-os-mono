import React, { useEffect, useRef, useState } from 'react'
import { Unstable_Grid2 as Grid, Skeleton } from '@mui/material'
import { DataGrid, GridColDef, useGridApiRef } from '@mui/x-data-grid'

import { Asset, Delivery } from '@agency-os/class'
import { useGetAllAssetsOfDeliveryQuery, useGetAllFilesOfDeliveryQuery } from '~/store/api'

import { skipToken } from '@reduxjs/toolkit/query'
import { RenderActionCell, RenderFileUrlCell } from './cell'
import moment from 'moment'
import { NoDataOverlayTable } from '../common'
import { useAppDispatch } from '~/store'
import { snackAlertActions } from '~/store/reducers/snack.alert'

const deliveryColumns: GridColDef<Delivery.DeliveryFile>[] = [
    {
        field: 'createdAt',
        headerName: 'Created',
        valueGetter: (value, { createdAt }) => moment(createdAt).format('DD/MM/YYYY')
    },
    {
        field: 'deliveryFilesVersion',
        headerName: 'Version',
        valueGetter: (value, { fileVersion }) => fileVersion
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

interface DeliveryHistoryTableComponentProps {
    deliveryId: string
    projectId: string
}

const DeliveryHistoryTableComponent: React.FC<DeliveryHistoryTableComponentProps> = ({
    deliveryId,
    projectId
}: DeliveryHistoryTableComponentProps) => {
    const apiRef = useGridApiRef()
    const dispatch = useAppDispatch()

    const [rows, setRows] = useState<Delivery.DeliveryFile[]>([])
    const { data, isSuccess, isFetching } = useGetAllFilesOfDeliveryQuery(
        deliveryId ? { id: deliveryId } : skipToken
    )
    useEffect(() => {
        if (isSuccess) {
            const { status, delivery }: Delivery.DeliveryResponseDto = data
            if (
                status === 200 &&
                delivery &&
                !Array.isArray(delivery) &&
                Array.isArray(delivery.deliveryFiles)
            ) {
                setRows(delivery.deliveryFiles)
                if (delivery.deliveryFiles.length > 0) {
                    //TODO: dispatch snack alert
                    dispatch(
                        snackAlertActions.setSnackAlertInfo({
                            title: 'Delivery File History',
                            message: `Found ${delivery.deliveryFiles.length} files`
                        })
                    )
                } else {
                    dispatch(
                        snackAlertActions.setSnackAlertWarning({
                            title: 'Delivery File History',
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
                    columns={deliveryColumns}
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

export default DeliveryHistoryTableComponent
