import React, { useEffect, useState } from 'react'
import { skipToken } from '@reduxjs/toolkit/query'
import { Asset, Delivery, Project, User } from '@agency-os/class'
import {
    Autocomplete,
    Button,
    ButtonGroup,
    Chip,
    FormLabel,
    Unstable_Grid2 as Grid,
    InputAdornment,
    Switch,
    TextField,
    FormControlLabel
} from '@mui/material'
import {
    useCreateDeliveryMutation,
    useGetAssetByIdQuery,
    useGetDeliveryByIdQuery,
    useGetProjectByIdQuery,
    useGetUserByIdQuery
} from '~/store/api'
import { RootState, useAppDispatch, useAppSelector } from '~/store'
import { setSnackAlertError, setSnackAlertWarning } from '~/store/reducers'
import { Cancel, Save, Upgrade } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

interface NewAssetComponentProps {
    deliveryId: string
    projectId: string
    assetId?: string
}

const NewAssetComponent: React.FC<NewAssetComponentProps> = ({
    deliveryId,
    projectId,
    assetId
}: NewAssetComponentProps) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { user } = useAppSelector((state: RootState) => state.auth)
    const [delivery, setDelivery] = useState<Delivery.Delivery>()
    const [project, setProject] = useState<Project.Project>()
    const [asset, setAsset] = useState<Asset.Asset>()
    const [creator, setCreator] = useState<User.User>()

    const [nameError, setNameError] = useState<boolean>(false)
    const [typeError, setTypeError] = useState<boolean>(false)
    const [descriptionError, setDescriptionError] = useState<boolean>(false)
    const [tags, setTags] = useState<string[]>([])
    const [tagsError, setTagsError] = useState<boolean>(false)
    const [access, setAccess] = useState<boolean>(true)

    const { data: dataUser, isSuccess: isSuccessUser } = useGetUserByIdQuery(
        user ? { id: user } : skipToken
    )
    const { data: dataProject, isSuccess: isSuccessProject } = useGetProjectByIdQuery(
        projectId ? { id: projectId } : skipToken
    )
    const { data: dataDelivery, isSuccess: isSuccessDelivery } = useGetDeliveryByIdQuery(
        deliveryId ? { id: deliveryId } : skipToken
    )
    const { data: dataAsset, isSuccess: isSuccessAsset } = useGetAssetByIdQuery(
        assetId ? { id: assetId } : skipToken
    )

    useEffect(() => {
        if (isSuccessUser) {
            const { status, user } = dataUser
            if (status === 200 && user && !Array.isArray(user)) {
                setCreator(user)
            }
        }
        if (isSuccessProject) {
            const { status, project, error } = dataProject
            if (status === 200 && project && !Array.isArray(project)) {
                setProject(project)
            } else {
                if (error) {
                    //TODO Toastify
                    dispatch(setSnackAlertError({ title: status.toString(), message: error }))
                }
                navigate(-1)
            }
        }

        if (isSuccessDelivery) {
            const { status, delivery, error } = dataDelivery
            if (status === 200 && delivery && !Array.isArray(delivery)) {
                setDelivery(delivery)
            } else {
                if (error) {
                    //TODO Toastify
                    dispatch(setSnackAlertError({ title: status.toString(), message: error }))
                }
                navigate(-1)
            }
        }
        if (isSuccessAsset) {
            const { status, asset, error } = dataAsset
            if (status === 200 && asset && !Array.isArray(asset)) {
                setAsset(asset)
            } else {
                if (error) {
                    //TODO Toastify
                    dispatch(setSnackAlertError({ title: status.toString(), message: error }))
                }
                navigate(-1)
            }
        }
    }, [dataUser, dataDelivery, dataProject, dataAsset])

    const handleSaveOrUpdateAsset = () => {
        //TODO: Validate
        //TODO: Save or Update
    }

    return (
        <Grid>
            <Grid>
                <TextField
                    fullWidth
                    required
                    label="Project"
                    value={`${project?.name} (${project?.trialName})`}
                    helperText={'Project Name (Trial Name)'}
                    margin="dense"
                    disabled
                />
            </Grid>
            <Grid>
                <TextField
                    fullWidth
                    required
                    label="Delivery"
                    value={`${delivery?.deliverableName} (${delivery?.deliverableType})`}
                    helperText={'Delivery Name (Type)'}
                    margin="dense"
                    disabled
                />
            </Grid>
            <Grid>
                <TextField
                    error={nameError}
                    fullWidth
                    required
                    label="Name"
                    value={asset ? asset.name : ''}
                    onChange={(e) => setAsset({ ...asset, name: e.target.value })}
                    helperText=""
                    margin="dense"
                />
            </Grid>
            <Grid>
                <TextField
                    error={typeError}
                    fullWidth
                    required
                    label="Type"
                    value={asset ? asset.type : ''}
                    onChange={(e) => setAsset({ ...asset, type: e.target.value })}
                    helperText=""
                    margin="dense"
                />
            </Grid>
            <Grid>
                <TextField
                    error={descriptionError}
                    fullWidth
                    multiline
                    maxRows={2}
                    required
                    label="Description"
                    value={asset ? asset.description : ''}
                    onChange={(e) => setAsset({ ...asset, description: e.target.value })}
                    helperText=""
                    margin="dense"
                />
            </Grid>

            <Grid>
                <FormControlLabel
                    control={
                        <Switch
                            color="primary"
                            checked={asset ? asset.access : false}
                            onChange={(e) => setAsset({ ...asset, access: e.target.checked })}
                        />
                    }
                    label="Allow Access To Client"
                    labelPlacement="start"
                />
            </Grid>
            <Grid>
                <ButtonGroup variant="contained" aria-label="Basic button group">
                    <Button color={'secondary'} startIcon={<Cancel />}>
                        Cancel
                    </Button>
                    <Button
                        startIcon={asset?.id ? <Upgrade /> : <Save />}
                        onClick={handleSaveOrUpdateAsset}
                    >
                        {asset?.id ? 'update' : 'save'}
                    </Button>
                </ButtonGroup>
            </Grid>
        </Grid>
    )
}

export default NewAssetComponent
