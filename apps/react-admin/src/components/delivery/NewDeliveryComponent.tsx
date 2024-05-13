import React, { useEffect, useState } from 'react'
import { skipToken } from '@reduxjs/toolkit/query'
import { Delivery, Project, User } from '@agency-os/class'
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
    useGetDeliveryByIdQuery,
    useGetProjectByIdQuery,
    useGetUserByIdQuery,
    useUpdateDeliveryMutation
} from '~/store/api'
import { RootState, useAppDispatch, useAppSelector } from '~/store'
import { setSnackAlertError, setSnackAlertSuccess, setSnackAlertWarning } from '~/store/reducers'
import { Cancel, Save, Upgrade } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { create } from 'domain'
import { ROUTES } from '~/resources/routes-constants'

interface NewDeliveryComponentProps {
    deliveryId?: string
    projectId: string
}

const NewDeliveryComponent: React.FC<NewDeliveryComponentProps> = ({
    deliveryId,
    projectId
}: NewDeliveryComponentProps) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { user } = useAppSelector((state: RootState) => state.auth)
    const [delivery, setDelivery] = useState<Delivery.Delivery>()
    const [project, setProject] = useState<Project.Project>()
    const [creator, setCreator] = useState<User.User>()

    const [nameError, setNameError] = useState<boolean>(false)
    const [typeError, setTypeError] = useState<boolean>(false)
    const [descriptionError, setDescriptionError] = useState<boolean>(false)
    const [tagsError, setTagsError] = useState<boolean>(false)

    const { data: dataUser, isSuccess: isSuccessUser } = useGetUserByIdQuery(
        user ? { id: user } : skipToken
    )
    const { data: dataProject, isSuccess: isSuccessProject } = useGetProjectByIdQuery(
        projectId ? { id: projectId } : skipToken
    )
    const { data: dataDelivery, isSuccess: isSuccessDelivery } = useGetDeliveryByIdQuery(
        deliveryId ? { id: deliveryId } : skipToken
    )
    const [
        createDelivery,
        {
            data: dataCreate,
            isSuccess: isSuccessCreate,
            error: errorCreate,
            isLoading: isLoadingCreate
        }
    ] = useCreateDeliveryMutation()
    const [
        updateDelivery,
        {
            data: dataUpdate,
            isSuccess: isSuccessUpdate,
            error: errorUpdate,
            isLoading: isLoadingUpdate
        }
    ] = useUpdateDeliveryMutation()

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
    }, [dataUser, dataDelivery, dataProject])

    const handleSaveOrUpdateDelivery = () => {
        //TODO: Validate
        const { id, name, type, description, tags, access }: Delivery.Delivery = delivery
        name ? setNameError(false) : setNameError(true)
        type ? setTypeError(false) : setTypeError(true)
        description ? setDescriptionError(false) : setDescriptionError(true)
        tags.length > 0 ? setTagsError(false) : setTagsError(true)

        if (!name || !type || !description || tags.length <= 0) return

        if (!delivery) return
        //TODO: Save or Update
        if (id) {
            const update: Delivery.UpdateDeliveryRequestDto = {
                id,
                name,
                type,
                description,
                tags,
                access,
                createdBy: creator.id
            }
            updateDelivery(update)
        } else {
            const create: Delivery.CreateDeliveryRequestDto = {
                name,
                type,
                description,
                tags,
                createdBy: creator.id,
                projectId: project.id
            }
            createDelivery(create)
        }
    }
    useEffect(() => {
        if (isSuccessCreate) {
            const { status, delivery, error } = dataCreate
            //TODO: Toasty
            if (status === 200 && delivery && !Array.isArray(delivery)) {
                dispatch(
                    setSnackAlertSuccess({ title: status.toString(), message: 'Delivery Created' })
                )
                navigate(ROUTES.PROJECT_PAGE.replace(':projectId', project.id))
            } else {
                dispatch(
                    setSnackAlertError({
                        title: status.toString(),
                        message: error ? error : 'unknown'
                    })
                )
            }
        } else if (errorCreate) {
            dispatch(
                setSnackAlertError({
                    title: 'Error',
                    message: errorCreate ? errorCreate : 'unknown'
                })
            )
        }

        if (isSuccessUpdate) {
            const { status, delivery, error } = dataUpdate
            //TODO: Toasty
            if (status === 200 && delivery && !Array.isArray(delivery)) {
                dispatch(
                    setSnackAlertSuccess({ title: status.toString(), message: 'Delivery Updated' })
                )
                navigate(
                    ROUTES.DELIVERY_PAGE.replace(':projectId', project.id).replace(
                        ':deliveryId',
                        delivery.id
                    )
                )
            } else {
                dispatch(
                    setSnackAlertError({
                        title: status.toString(),
                        message: error ? error : 'unknown'
                    })
                )
            }
        } else if (errorUpdate) {
            dispatch(
                setSnackAlertError({
                    title: 'Error',
                    message: errorUpdate ? errorUpdate : 'unknown'
                })
            )
        }
    }, [dataCreate, dataUpdate])

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
                    label="Delivery ID"
                    value={delivery ? delivery.id : ''}
                    helperText={
                        delivery
                            ? 'Generated Delivery ID'
                            : 'Delivery ID will be generated automatically'
                    }
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
                    value={delivery ? delivery.name : ''}
                    onChange={(e) => setDelivery({ ...delivery, name: e.target.value })}
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
                    value={delivery ? delivery.type : ''}
                    onChange={(e) => setDelivery({ ...delivery, type: e.target.value })}
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
                    value={delivery ? delivery.description : ''}
                    onChange={(e) => setDelivery({ ...delivery, description: e.target.value })}
                    helperText=""
                    margin="dense"
                />
            </Grid>
            <Grid>
                <Grid>
                    <Autocomplete
                        options={[]}
                        multiple
                        id="tags-filled"
                        freeSolo
                        renderTags={(value: readonly string[], getTagProps) =>
                            value.map((option: string, index: number) => (
                                <Chip
                                    variant="outlined"
                                    label={option}
                                    {...getTagProps({ index })}
                                />
                            ))
                        }
                        renderInput={(params) => (
                            <TextField {...params} label="Tags" required margin="dense" />
                        )}
                        onChange={(e, value) => {
                            setDelivery({ ...delivery, tags: value })
                        }}
                        value={delivery ? delivery.tags : []}
                    />
                </Grid>
                <Grid>
                    <FormControlLabel
                        control={
                            <Switch
                                color="primary"
                                checked={delivery ? delivery.access : false}
                                onChange={(e) =>
                                    setDelivery({ ...delivery, access: e.target.checked })
                                }
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
                            startIcon={delivery?.id ? <Upgrade /> : <Save />}
                            onClick={handleSaveOrUpdateDelivery}
                        >
                            {delivery?.id ? 'update' : 'save'}
                        </Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default NewDeliveryComponent
