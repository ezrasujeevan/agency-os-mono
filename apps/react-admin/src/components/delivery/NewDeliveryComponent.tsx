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
    useGetUserByIdQuery
} from '~/store/api'
import { RootState, useAppDispatch, useAppSelector } from '~/store'
import { setSnackAlertError, setSnackAlertWarning } from '~/store/reducers'
import { Cancel, Save, Upgrade } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

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
    const [CreateDeliveryMutation, { data: deliverRes, isSuccess: deliveryIsSuccess }] =
        useCreateDeliveryMutation()

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
                    error={nameError}
                    fullWidth
                    required
                    label="Name"
                    value={delivery ? delivery.deliverableName : ''}
                    onChange={(e) => setDelivery({ ...delivery, deliverableName: e.target.value })}
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
                    value={delivery ? delivery.deliverableType : ''}
                    onChange={(e) => setDelivery({ ...delivery, deliverableType: e.target.value })}
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
