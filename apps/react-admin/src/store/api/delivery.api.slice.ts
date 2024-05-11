import { Delivery } from '@agency-os/class'
import { rootApiSlice } from './root.api.slice'

export const deliveryApiSlice = rootApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllDeliveryByProjectId: builder.query<
            Delivery.DeliveryResponseDto,
            Delivery.FindAllDeliveryByProjectRequestDto | void
        >({
            query: ({ projectId }: Delivery.FindAllDeliveryByProjectRequestDto) => {
                if (projectId) {
                    return {
                        url: `delivery?project=${projectId}`,
                        method: 'GET'
                    }
                } else {
                    return {
                        url: `delivery`,
                        method: 'GET'
                    }
                }
            }
        }),
        getDeliveryById: builder.query<
            Delivery.DeliveryResponseDto,
            Delivery.FindOneDeliveryRequestDto
        >({
            query: ({ id }: Delivery.FindOneDeliveryRequestDto) => ({
                url: `delivery/${id}`,
                method: 'GET'
            })
        }),
        createDelivery: builder.mutation<
            Delivery.DeliveryResponseDto,
            Delivery.CreateDeliveryRequestDto
        >({
            query: (data: Delivery.CreateDeliveryRequestDto) => ({
                url: `delivery`,
                method: 'POST',
                body: data
            })
        }),
        updateDelivery: builder.mutation<
            Delivery.DeliveryResponseDto,
            Delivery.UpdateDeliveryRequestDto
        >({
            query: (data: Delivery.UpdateDeliveryRequestDto) => ({
                url: `delivery/${data.id}`,
                method: 'PATCH',
                body: data
            })
        }),
        deleteDelivery: builder.mutation<
            Delivery.DeliveryResponseDto,
            Delivery.FindOneDeliveryRequestDto
        >({
            query: ({ id }: Delivery.FindOneDeliveryRequestDto) => ({
                url: `delivery/${id}`,
                method: 'DELETE'
            })
        }),
        getAllFilesOfDelivery: builder.query<
            Delivery.DeliveryResponseDto,
            Delivery.FindOneDeliveryRequestDto
        >({
            query: ({ id }: Delivery.FindOneDeliveryRequestDto) => ({
                url: `delivery/${id}/file`,
                method: 'GET'
            })
        }),
        createFileOfDelivery: builder.mutation<
            Delivery.DeliveryResponseDto,
            Delivery.createDeliveryFileRequestDto
        >({
            query: (data: Delivery.createDeliveryFileRequestDto) => ({
                url: `delivery/${data.deliveryId}/file`,
                method: 'POST',
                body: data
            })
        })
    })
})
