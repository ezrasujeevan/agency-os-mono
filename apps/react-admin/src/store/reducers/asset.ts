import { Asset } from "@agency-os/class";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { assetApiSlice } from "../api";

const initialState:Partial<Asset.Asset> = {
    deliveryId: "",
    name: "",
    type: "",
    description: "",
    fileURL: "",
    access: false,
    createdBy: "",
    id: "",
}

export const assetSlice = createSlice({
    name: 'asset',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            assetApiSlice.endpoints.getAssetById.matchFulfilled,
            (state, action: PayloadAction<Asset.AssetResponseDto>) => {
                const { status, asset } = action.payload
                if (status === 200 && asset && !Array.isArray(asset)) {
                    state = asset
                }
            }
        )
        builder.addMatcher(
            assetApiSlice.endpoints.createAsset.matchFulfilled,
            (state, action: PayloadAction<Asset.AssetResponseDto>) => {
                const { status, asset } = action.payload
                if (status === 201 && asset && !Array.isArray(asset)) {
                    state = asset
                }
            }
        )
        builder.addMatcher(
            assetApiSlice.endpoints.updateAsset.matchFulfilled,
            (state, action: PayloadAction<Asset.AssetResponseDto>) => {
                const { status, asset } = action.payload
                if (status === 200 && asset && !Array.isArray(asset)) {
                    state = asset
                }
            }
        )
        builder.addMatcher(
            assetApiSlice.endpoints.deleteAsset.matchFulfilled,
            (state, action: PayloadAction<Asset.AssetResponseDto>) => {
                const { status } = action.payload
                if (status === 204) {
                    state = initialState
                }
            }
        )
    }
})
