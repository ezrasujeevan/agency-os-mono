import React from 'react'
import { Button } from '@mui/material'
import { Asset } from '@agency-os/class'
import { GridRenderCellParams } from '@mui/x-data-grid'

const AssetRenderFileUrlCell: React.FC<GridRenderCellParams<Asset.Asset, Asset.AssetFile[]>> = ({
    value,
    row
}: GridRenderCellParams<Asset.Asset, Asset.AssetFile[]>) => {
    const handleOnClick = () => {
        window.open(row.assetFile[0].fileUrl)
    }
    const disabled = row.assetFile.length === 0
    return (
        <Button variant="outlined" color="primary" onClick={handleOnClick} disabled={disabled}>
            Open File Url
        </Button>
    )
}

export default AssetRenderFileUrlCell
