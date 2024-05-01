import { Delivery } from "@agency-os/class";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { deliveryApiSlice } from "../api";

const initialState:Partial<Delivery.Delivery> = {
    projectId: "",
    deliverableName: "",
    deliverableType: "",
    description: "",
    deliverableVersion: 0,
    fileUrl: "",
    tags: [],
    access: false,
    createdBy: "",
    id: "",
}

export const deliverySlice = createSlice({
    name: 'delivery',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            deliveryApiSlice.endpoints.getDeliveryById.matchFulfilled,
            (state, action: PayloadAction<Delivery.DeliveryResponse>) => {
                const { status, delivery } = action.payload
                if (status === 200 && delivery && !Array.isArray(delivery)) {
                    state = delivery
                }
            }
        )
        builder.addMatcher(
            deliveryApiSlice.endpoints.createDelivery.matchFulfilled,
            (state, action: PayloadAction<Delivery.DeliveryResponse>) => {
                const { status, delivery } = action.payload
                if (status === 201 && delivery && !Array.isArray(delivery)) {
                    state = delivery
                }
            }
        )
        builder.addMatcher(
            deliveryApiSlice.endpoints.updateDelivery.matchFulfilled,
            (state, action: PayloadAction<Delivery.DeliveryResponse>) => {
                const { status, delivery } = action.payload
                if (status === 200 && delivery && !Array.isArray(delivery)) {
                    state = delivery
                }
            }
        )
        builder.addMatcher(
            deliveryApiSlice.endpoints.deleteDelivery.matchFulfilled,
            (state, action: PayloadAction<Delivery.DeliveryResponse>) => {
                const { status } = action.payload
                if (status === 204) {
                    state = initialState
                }
            }
        )
    }
})