import React, { useEffect, useState } from 'react'
import {
    Autocomplete,
    Button,
    ButtonGroup,
    Unstable_Grid2 as Grid,
    InputAdornment,
    TextField
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import {
    useGetAllClientsQuery,
    useGetAllCompaniesQuery,
    useGetAllUsersQuery,
    useGetClientByIdQuery,
    useGetCompanyByIdQuery,
    useGetProjectByIdQuery,
    useGetUserByIdQuery,
    useUpdateProjectMutation
} from '~/store/api'
import { Cancel, Save, Upgrade } from '@mui/icons-material'
import moment, { Moment } from 'moment'
import { User, Company, Client, Project } from '@agency-os/class'
import { useAppDispatch } from '~/store'
import { setSnackAlertError } from '~/store/reducers'
import { i } from 'vitest/dist/reporters-LqC_WI4d'
import { useNavigate } from 'react-router-dom'
import { skipToken } from '@reduxjs/toolkit/query'

interface NewProjectComponentProps {
    projectId?: string
}

const NewProjectComponent: React.FC = ({ projectId }: NewProjectComponentProps) => {
    const [project, setProject] = useState<Project.Project>()
    // const [id, setId] = useState<string>('')
    // const [trialName, setTrialName] = useState<string>('')
    // const [name, setName] = useState<string>('')
    // const [projectValue, setProjectValue] = useState<number>(0.0)
    // const [opportunityDate, setOpportunityDate] = useState<Moment | null>()
    // const [startDate, setStartDate] = useState<Moment | null>()
    // const [endDate, setEndDate] = useState<Moment | null>()
    const [user, setUser] = useState<User.User | null>(null)
    const [client, setClient] = useState<Client.Client | null>(null)
    const [company, setCompany] = useState<Company.Company | null>(null)

    const [errorTrialName, setErrorTrialName] = useState<boolean>(false)
    const [errorName, setErrorName] = useState<boolean>(false)
    const [errorProjectValue, setErrorProjectValue] = useState<boolean>(false)
    const [errorOpportunityDate, setErrorOpportunityDate] = useState<boolean>(false)
    const [errorStartDate, setErrorStartDate] = useState<boolean>(false)
    const [errorEndDate, setErrorEndDate] = useState<boolean>(false)
    const [errorUser, setErrorUser] = useState<boolean>(false)
    const [errorClient, setErrorClient] = useState<boolean>(false)
    const [errorCompany, setErrorCompany] = useState<boolean>(false)

    const [userList, setUserList] = useState<User.User[]>([])
    const [companyList, setCompanyList] = useState<Company.Company[]>([])
    const [clientList, setClientList] = useState<Client.Client[]>([])

    const {
        data: dataClientList,
        isSuccess: isSuccessClientList,
        isLoading: isLoadingClientList
    } = useGetAllClientsQuery({
        companyId: company ? company.id : ''
    })
    const {
        data: dataCompanyList,
        isSuccess: isSuccessCompanyList,
        isLoading: isLoadingCompanyList
    } = useGetAllCompaniesQuery()
    const {
        data: dataUserList,
        isSuccess: isSuccessUserList,
        isLoading: isLoadingUserList
    } = useGetAllUsersQuery()
    const [updateProject, { data: projectRes }] = useUpdateProjectMutation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { data: dataUser, isSuccess: isSuccessUser } = useGetUserByIdQuery(
        project?.userId ? { id: project.userId } : skipToken
    )
    const { data: dataClient, isSuccess: isSuccessClient } = useGetClientByIdQuery(
        project?.clientId ? { id: project.clientId } : skipToken
    )
    const { data: dataCompany, isSuccess: isSuccessCompany } = useGetCompanyByIdQuery(
        project?.companyId ? { id: project.companyId } : skipToken
    )

    const { data: dataProject, isSuccess: isSuccessProject } = useGetProjectByIdQuery(
        projectId ? { id: projectId } : skipToken
    )

    const handleSaveOrUpdateProject = () => {}

    useEffect(() => {
        if (isSuccessClientList) {
            const { status, client, error } = dataClientList
            if (status === 200 && client && Array.isArray(client)) {
                setClientList(client)
            } else if (error) {
                const title = `Error - ${status}`
                const message = JSON.stringify(error)
                dispatch(setSnackAlertError({ title, message }))
                setClientList([])
            }
        }
        if (isSuccessUserList) {
            const { status, user, error } = dataUserList
            if (status === 200 && user && Array.isArray(user)) {
                setUserList(user)
            } else if (error) {
                const title = `Error - ${status}`
                const message = JSON.stringify(error)
                dispatch(setSnackAlertError({ title, message }))
                setUserList([])
            }
        }
        if (isSuccessCompanyList) {
            const { status, company, error } = dataCompanyList
            if (status === 200 && company && Array.isArray(company)) {
                setCompanyList(company)
            } else if (error) {
                const title = `Error - ${status}`
                const message = JSON.stringify(error)
                dispatch(setSnackAlertError({ title, message }))
                setCompanyList([])
            }
        }
        if (isSuccessUser) {
            const { status, user } = dataUser
            if (status === 200 && user && !Array.isArray(user)) {
                setUser(user)
            }
        }
        if (isSuccessClient) {
            const { status, client } = dataClient
            if (status === 200 && client && !Array.isArray(client)) {
                setClient(client)
            }
        }
        if (isSuccessCompany) {
            const { status, company } = dataCompany
            if (status === 200 && company && !Array.isArray(company)) {
                setCompany(company)
            }
        }
        if (isSuccessProject) {
            const { status, project } = dataProject
            if (status === 200 && project && !Array.isArray(project)) {
                setProject(project)
            } else {
                dispatch(
                    setSnackAlertError({
                        title: 'Error',
                        message: 'Failed to fetch project details'
                    })
                )
                navigate(-1)
            }
        }
    }, [
        dataClientList,
        dataUserList,
        dataCompanyList,
        dataCompany,
        dataClient,
        dataClient,
        dataProject
    ])

    return (
        <Grid>
            <Grid>
                <TextField
                    fullWidth
                    required
                    label="ID"
                    value={project ? project.id : ''}
                    // helperText={
                    //     project?
                    //         ? 'Generated Project ID'
                    //         : 'Project ID will be generated automatically'
                    // }
                    margin="dense"
                    disabled
                />
            </Grid>
            <Grid>
                <TextField
                    error={errorTrialName}
                    fullWidth
                    required
                    label="Trial Name"
                    value={project ? project.trialName : ''}
                    onChange={(e) => setProject({ ...project, trialName: e.target.value })}
                    helperText="Must Be Unique"
                    margin="dense"
                />
            </Grid>
            <Grid>
                <TextField
                    error={errorName}
                    fullWidth
                    required
                    label="Name"
                    value={project? project.name :''}
                    onChange={(e) => setProject({ ...project, name: e.target.value })}
                    margin="dense"
                />
            </Grid>
            <Grid>
                <DatePicker
                    label="Opportunity Date"
                    value={moment(project?.opportunityDate)}
                    onChange={(newDate) =>
                        setProject({ ...project, opportunityDate: newDate.toDate() })
                    }
                    format="DD-MM-YYYY"
                    slotProps={{
                        textField: {
                            fullWidth: true,
                            required: true,
                            margin: 'dense',
                            error: errorOpportunityDate
                        }
                    }}
                />
            </Grid>

            <Grid>
                <DatePicker
                    label="Start Date"
                    value={moment(project?.startDate)}
                    onChange={(newDate) => setProject({ ...project, startDate: newDate.toDate() })}
                    format="DD-MM-YYYY"
                    slotProps={{
                        textField: {
                            fullWidth: true,
                            required: true,
                            margin: 'dense',
                            error: errorStartDate
                        }
                    }}
                />
            </Grid>

            <Grid>
                <DatePicker
                    label="End Date"
                    value={moment(project?.endDate)}
                    onChange={(newValue) => setProject({ ...project, endDate: newValue.toDate() })}
                    format="DD-MM-YYYY"
                    slotProps={{ textField: { fullWidth: true, margin: 'dense' } }}
                />
            </Grid>
            <Grid>
                <TextField
                    error={errorProjectValue}
                    fullWidth
                    required
                    label="Project Value"
                    type="number"
                    value={project?.projectValue}
                    onChange={(e) => {
                        const value: number = parseFloat(parseFloat(e.target.value).toFixed(2))
                        setProject({ ...project, projectValue: value })
                    }}
                    // sx={{ m: 1, width: '25ch' }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                    }}
                    inputProps={{ step: '0.01', min: '0' }}
                    margin="dense"
                />
            </Grid>
            <Grid>
                <Autocomplete
                    disabled={isLoadingUserList}
                    options={userList}
                    fullWidth
                    renderInput={(params: object) => (
                        <TextField
                            {...params}
                            label="Project Manager"
                            margin={'dense'}
                            required
                            error={errorUser}
                        />
                    )}
                    getOptionLabel={(option: User.User) =>
                        `${option.firstName} ${option.lastName} (${option.email})`
                    }
                    getOptionKey={(option: User.User) => option.id}
                    onChange={(e, value) => {
                        setUser(value)
                        setErrorUser(false)
                    }}
                    isOptionEqualToValue={(option: User.User, value: User.User) =>
                        option.id === value.id
                    }
                    value={user}
                />
            </Grid>
            <Grid>
                <Autocomplete
                    disabled={isLoadingCompanyList}
                    options={companyList}
                    fullWidth
                    renderInput={(params: object) => (
                        <TextField
                            {...params}
                            label="Company"
                            margin={'dense'}
                            required
                            error={errorCompany}
                        />
                    )}
                    getOptionLabel={(option: Company.Company) => `${option.name}  (${option.code})`}
                    getOptionKey={(option: Company.Company) => option.id}
                    onChange={(e, value, reason, details) => {
                        if (
                            reason === 'selectOption' &&
                            value &&
                            company &&
                            value.id !== company.id
                        ) {
                            setClient(null)
                        }
                        setCompany(value)
                        setErrorCompany(false)
                    }}
                    isOptionEqualToValue={(option: Company.Company, value: Company.Company) =>
                        option.id === value.id
                    }
                    value={company}
                />
            </Grid>
            <Grid>
                <Autocomplete
                    disabled={isLoadingClientList}
                    options={clientList}
                    fullWidth
                    renderInput={(params: object) => (
                        <TextField
                            {...params}
                            label="Client"
                            margin={'dense'}
                            required
                            error={errorClient}
                        />
                    )}
                    getOptionLabel={(option: Client.Client) =>
                        `${option.firstName} ${option.lastName} (${option.email})`
                    }
                    getOptionKey={(option: Client.Client) => option.id}
                    onChange={(event, value, reason, details) => {
                        setClient(value)
                        setErrorClient(false)
                        companyList.filter((company) => {
                            if (company.id === value?.companyId) {
                                setCompany(company)
                            }
                        })
                    }}
                    isOptionEqualToValue={(option: Client.Client, value: Client.Client) =>
                        option.id === value.id
                    }
                    value={client}
                />
            </Grid>
            <Grid>
                <ButtonGroup variant="contained" aria-label="Basic button group">
                    <Button color={'secondary'} startIcon={<Cancel />}>
                        Cancel
                    </Button>
                    <Button
                        startIcon={project?.id ? <Upgrade /> : <Save />}
                        onClick={handleSaveOrUpdateProject}
                    >
                        {project?.id ? 'update' : 'save'}
                    </Button>
                </ButtonGroup>
            </Grid>
        </Grid>
    )
}

export default NewProjectComponent
