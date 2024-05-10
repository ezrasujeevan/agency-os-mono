import { Delivery } from '@agency-os/class'
import { rootApiSlice } from './root.api.slice'

export const deliveryApiSlice = rootApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllDeliveryByProjectId: builder.query<
            Delivery.DeliveryResponse,
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
            Delivery.DeliveryResponse,
            Delivery.FindOneDeliveryRequestDto
        >({
            query: ({ id }: Delivery.FindOneDeliveryRequestDto) => ({
                url: `delivery/${id}`,
                method: 'GET'
            })
        }),
        createDelivery: builder.mutation<
            Delivery.DeliveryResponse,
            Delivery.CreateDeliveryRequestDto
        >({
            query: (data: Delivery.CreateDeliveryRequestDto) => ({
                url: `delivery`,
                method: 'POST',
                body: data
            })
        }),
        updateDelivery: builder.mutation<
            Delivery.DeliveryResponse,
            Delivery.UpdateDeliveryRequestDto
        >({
            query: (data: Delivery.UpdateDeliveryRequestDto) => ({
                url: `delivery/${data.id}`,
                method: 'PATCH',
                body: data
            })
        }),
        deleteDelivery: builder.mutation<
            Delivery.DeliveryResponse,
            Delivery.FindOneDeliveryRequestDto
        >({
            query: ({ id }: Delivery.FindOneDeliveryRequestDto) => ({
                url: `delivery/${id}`,
                method: 'DELETE'
            })
        })
    })
})
