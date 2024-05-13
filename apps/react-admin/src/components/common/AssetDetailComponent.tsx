import React, { useEffect, useState } from 'react'
import { Chip, Unstable_Grid2 as Grid, Skeleton, Typography } from '@mui/material'
import { skipToken } from '@reduxjs/toolkit/query'
import {
    useCreateAssetMutation,
    useGetAssetByIdQuery,
    useGetUserByIdQuery
} from '~/store/api'
import { Asset, User } from '@agency-os/class'
import { useAppDispatch } from '~/store'
import { useNavigate } from 'react-router-dom'
import { setSnackAlertError } from '~/store/reducers'
import { Cancel, CheckCircle } from '@mui/icons-material'

interface AssetDetailComponentProps {
    assetId: string
}

const AssetDetailComponent: React.FC<AssetDetailComponentProps> = ({
    assetId
}: AssetDetailComponentProps) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [asset, setAsset] = useState<Asset.Asset>()
    const [user, setUser] = useState<User.User>()

    const {
        data: dataAsset,
        isSuccess: isSuccessAsset,
        isFetching: isFetchingAsset
    } = useGetAssetByIdQuery(assetId ? { id: assetId } : skipToken)
    const {
        data: dataUser,
        isSuccess: isSuccessUser,
        isFetching: isFetchingUser
    } = useGetUserByIdQuery(asset?.createdBy ? { id: asset.createdBy } : skipToken)
    const [CreateAssetMutation, { data: deliverRes, isSuccess: assetIsSuccess }] =
        useCreateAssetMutation()

    useEffect(() => {
        if (isSuccessAsset) {
            const { status, asset }: Asset.AssetResponseDto = dataAsset
            if (status === 200 && asset && !Array.isArray(asset)) {
                setAsset(asset)
            } else {
                dispatch(
                    //TODO: Toastify
                    setSnackAlertError({
                        title: 'Asset Not Found',
                        message: `Asset ID:${assetId} does not exist`
                    })
                )
                navigate(-1)
            }
        }
        if (isSuccessUser) {
            const { status, user }: User.UserResponseDto = dataUser
            if (status === 200 && user && !Array.isArray(user)) {
                setUser(user)
            }
        }
    }, [dataUser, dataAsset])

    return (
        <Grid container>
            <Grid xs={12}>
                <Typography variant="h3">Asset Detail</Typography>
                <Typography variant="h4">
                    Name: {isFetchingAsset ? <Skeleton /> : asset?.name}
                </Typography>
                <Typography variant="h5">
                    Type: {isFetchingAsset ? <Skeleton /> : asset?.type}
                </Typography>
                <Typography variant="h5">
                    Description: {isFetchingAsset ? <Skeleton /> : asset?.description}
                </Typography>
                <Typography variant="h5">
                    access:{' '}
                    {isFetchingAsset ? (
                        <Skeleton />
                    ) : asset?.access ? (
                        <CheckCircle sx={{ color: 'success.main' }} />
                    ) : (
                        <Cancel sx={{ color: 'error.main' }} />
                    )}
                </Typography>
                <Typography variant="h5">
                    Created By:{' '}
                    {isFetchingAsset ? (
                        <Skeleton />
                    ) : isFetchingUser ? (
                        <Skeleton />
                    ) : (
                        `${user?.firstName} ${user?.lastName} (${user?.email})`
                    )}
                </Typography>
            </Grid>
        </Grid>
    )
}

export default AssetDetailComponent
