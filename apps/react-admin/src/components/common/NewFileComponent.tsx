import React, { useState } from 'react'
import { Button, Unstable_Grid2 as Grid, TextField, VisuallyHiddenInput } from '@mui/material'
import { CloudUpload } from '@mui/icons-material'

interface NewFileComponentProps {
    projectId: string
    deliveryId?: string
    assetId?: string
}

const NewFileComponent: React.FC<NewFileComponentProps> = ({
    assetId,
    deliveryId
}: NewFileComponentProps) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    // const [upload, { isLoading, error }] = useUploadMutation()

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFile(event.target.files?.[0] ?? null)
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        // if (selectedFile) {
        //     try {
        //         await upload(selectedFile)
        //         // Handle successful upload (e.g., display success message)
        //     } catch (error) {
        //         console.error('Upload failed:', error)
        //     }
        // }
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                type="file"
                variant="outlined"
                margin="normal"
                fullWidth
                label="Select File"
                onChange={handleFileChange}
                // error={error}
                // helperText={error?.data?.message} // Display error message from API response (if any)
            />
            <Button variant="contained" type="submit" disabled={isLoading}>
                {'Upload'}
            </Button>
        </form>
    )
}

export default NewFileComponent
