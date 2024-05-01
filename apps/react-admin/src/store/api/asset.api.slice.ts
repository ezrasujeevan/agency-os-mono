import { Asset } from '@agency-os/class'
import { rootApiSlice } from './root.api.slice'
import { A } from 'vitest/dist/reporters-LqC_WI4d'

export const assetApiSlice = rootApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllAssets: builder.query<Asset.AssetResponseDto, void>({
            query: () => ({
                url: `asset`,
                method: 'GET'
            })
        }),
        getAllAssetsOfDelivery: builder.query<
            Asset.AssetResponseDto,
            Asset.FindAllAssetsOfDeliveryRequestDto
        >({
            query: ({ deliveryId }: Asset.FindAllAssetsOfDeliveryRequestDto) => ({
                url: `asset?delivery=${deliveryId}`,
                method: 'GET'
            })
        }),
        getAssetById: builder.query<Asset.AssetResponseDto, Asset.FindOneAssetRequestDto>({
            query: ({ id }: Asset.FindOneAssetRequestDto) => ({
                url: `asset/${id}`,
                method: 'GET'
            })
        }),
        createAsset: builder.mutation<Asset.AssetResponseDto, Asset.CreateAssetRequestDto>({
            query: (data: Asset.CreateAssetRequestDto) => ({
                url: `asset`,
                method: 'POST',
                body: data
            })
        }),
        updateAsset: builder.mutation<Asset.AssetResponseDto, Asset.UpdateAssetRequestDto>({
            query: (data: Asset.UpdateAssetRequestDto) => ({
                url: `asset/${data.id}`,
                method: 'PATCH',
                body: data
            })
        }),
        deleteAsset: builder.mutation<Asset.AssetResponseDto, Asset.FindOneAssetRequestDto>({
            query: ({ id }: Asset.FindOneAssetRequestDto) => ({
                url: `asset/${id}`,
                method: 'DELETE'
            })
        })
    })
})
