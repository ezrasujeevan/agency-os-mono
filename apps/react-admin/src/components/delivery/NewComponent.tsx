import React, { useEffect, useState } from 'react'
import { skipToken } from '@reduxjs/toolkit/query'
import { Project, User } from '@agency-os/class'
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
import { useCreateDeliveryMutation, useGetProjectByIdQuery, useGetUserByIdQuery } from '~/store/api'
import { RootState, useAppDispatch, useAppSelector } from '~/store'
import { setSnackAlertError, setSnackAlertWarning } from '~/store/reducers'

interface NewDeliveryComponentProps {
    id?: string
    projectId?: string
}

const NewDeliveryComponent: React.FC<NewDeliveryComponentProps> = ({
    id,
    projectId
}: NewDeliveryComponentProps) => {
    const dispatch = useAppDispatch()
    const { user } = useAppSelector((state: RootState) => state.auth)

    const [project, setProject] = useState<Project.Project>()
    const [name, setName] = useState<string>('')
    const [nameError, setNameError] = useState<boolean>(false)
    const [type, setType] = useState<string>('')
    const [typeError, setTypeError] = useState<boolean>(false)
    const [description, setDescription] = useState<string>('')
    const [descriptionError, setDescriptionError] = useState<boolean>(false)
    const [versionMajor, setVersionMajor] = useState<number>(0)
    const [versionMinor, setVersionMinor] = useState<number>(0)
    const [versionPatch, setVersionPatch] = useState<number>(0)
    const [fileUrl, setFileUrl] = useState<string>('')
    const [fileUrlError, setFileUrlError] = useState<boolean>(false)
    const [tags, setTags] = useState<string[]>([])
    const [tagsError, setTagsError] = useState<boolean>(false)
    const [access, setAccess] = useState<boolean>(true)
    const [creator, setCreator] = useState<User.User>()
    const { data: userRes, isSuccess: userSuccess } = useGetUserByIdQuery(
        user ? { id: user } : skipToken
    )

    const [CreateDeliveryMutation, { data: deliverRes, isSuccess: deliveryIsSuccess }] =
        useCreateDeliveryMutation()

    useEffect(() => {
        if (user) {
            if (userSuccess) {
                const { status, user } = userRes
                if (status === 200 && user && !Array.isArray(user)) {
                    setCreator(user)
                }
            }
        }
    }, [user])

    if (projectId) {
        const { data: ProjectRes, isSuccess: ProjectSuccess } = useGetProjectByIdQuery({
            id: projectId
        })
        if (ProjectSuccess) {
            if (ProjectRes) {
                const { status, project, error } = ProjectRes
                if (status === 200 && project && !Array.isArray(project)) {
                    setProject(project)
                } else {
                    if (error) {
                        dispatch(setSnackAlertError({ title: status.toString(), message: error }))
                    }
                }
            }
        }
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    value={type}
                    onChange={(e) => setType(e.target.value)}
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
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    helperText=""
                    margin="dense"
                />
            </Grid>
            <Grid>
                <FormLabel>Version</FormLabel>
                <TextField
                    required
                    type="number"
                    label="Major"
                    value={versionMajor}
                    onChange={(e) => setVersionMajor(parseInt(e.target.value))}
                    margin="dense"
                    inputProps={{ min: '0' }}
                />
                <TextField
                    required
                    type="number"
                    label="Minor"
                    value={versionMinor}
                    onChange={(e) => setVersionMinor(parseInt(e.target.value))}
                    margin="dense"
                    inputProps={{ min: '0' }}
                />
                <TextField
                    required
                    type="number"
                    label="Patch"
                    value={versionPatch}
                    onChange={(e) => setVersionPatch(parseInt(e.target.value))}
                    margin="dense"
                    inputProps={{ min: '0' }}
                />
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
                            setTags(value)
                        }}
                        value={tags}
                    />
                </Grid>
                <Grid>
                    <FormControlLabel
                        control={
                            <Switch
                                color="primary"
                                checked={access}
                                onChange={(e) => setAccess(e.target.checked)}
                            />
                        }
                        label="Allow Access To Client"
                        labelPlacement="start"
                    />
                </Grid>
                <Grid></Grid>
            </Grid>
        </Grid>
    )
}

export default NewDeliveryComponent
