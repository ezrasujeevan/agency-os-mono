import React, { useEffect, useState } from 'react'
import { Chip, Unstable_Grid2 as Grid, Skeleton, Typography } from '@mui/material'
import { skipToken } from '@reduxjs/toolkit/query'
import {
    useCreateDeliveryMutation,
    useGetDeliveryByIdQuery,
    useGetUserByIdQuery
} from '~/store/api'
import { Delivery, User } from '@agency-os/class'
import { useAppDispatch } from '~/store'
import { useNavigate } from 'react-router-dom'
import { setSnackAlertError } from '~/store/reducers'
import { Cancel, CheckCircle } from '@mui/icons-material'

interface DeliveryDetailComponentProps {
    deliveryId: string
}

const DeliveryDetailComponent: React.FC<DeliveryDetailComponentProps> = ({
    deliveryId
}: DeliveryDetailComponentProps) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [delivery, setDelivery] = useState<Delivery.Delivery>()
    const [user, setUser] = useState<User.User>()

    const {
        data: dataDelivery,
        isSuccess: isSuccessDelivery,
        isFetching: isFetchingDelivery
    } = useGetDeliveryByIdQuery(deliveryId ? { id: deliveryId } : skipToken)
    const {
        data: dataUser,
        isSuccess: isSuccessUser,
        isFetching: isFetchingUser
    } = useGetUserByIdQuery(delivery?.createdBy ? { id: delivery.createdBy } : skipToken)
    const [CreateDeliveryMutation, { data: deliverRes, isSuccess: deliveryIsSuccess }] =
        useCreateDeliveryMutation()

    useEffect(() => {
        if (isSuccessDelivery) {
            const { status, delivery }: Delivery.DeliveryResponseDto = dataDelivery
            if (status === 200 && delivery && !Array.isArray(delivery)) {
                setDelivery(delivery)
            } else {
                dispatch(
                    //TODO: Toastify
                    setSnackAlertError({
                        title: 'Delivery Not Found',
                        message: `Delivery ID:${deliveryId} does not exist`
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
    }, [dataUser, dataDelivery])

    return (
        <Grid container>
            <Grid xs={12}>
                <Typography variant="h3">Delivery Detail</Typography>
                <Typography variant="h4">
                    Name: {isFetchingDelivery ? <Skeleton /> : delivery?.deliverableName}
                </Typography>
                <Typography variant="h5">
                    Type: {isFetchingDelivery ? <Skeleton /> : delivery?.deliverableType}
                </Typography>
                <Typography variant="h5">
                    Description: {isFetchingDelivery ? <Skeleton /> : delivery?.description}
                </Typography>
                <Typography variant="h5">
                    Tags:{' '}
                    {isFetchingDelivery ? (
                        <Skeleton />
                    ) : (
                        delivery?.tags.map((tag) => <Chip key={tag} label={tag} />)
                    )}
                </Typography>
                <Typography variant="h5">
                    access:{' '}
                    {isFetchingDelivery ? (
                        <Skeleton />
                    ) : delivery?.access ? (
                        <CheckCircle sx={{ color: 'success.main' }} />
                    ) : (
                        <Cancel sx={{ color: 'error.main' }} />
                    )}
                </Typography>
                <Typography variant="h5">
                    Description:{' '}
                    {isFetchingDelivery ? (
                        isFetchingUser ? (
                            <Skeleton />
                        ) : (
                            `${user?.firstName} ${user?.lastName} (${user?.email})`
                        )
                    ) : (
                        <Skeleton />
                    )}
                </Typography>
            </Grid>
        </Grid>
    )
}

export default DeliveryDetailComponent
