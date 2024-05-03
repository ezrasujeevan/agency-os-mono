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

interface NewProjectComponentProps {
    projectId?: string
}

const NewProjectComponent: React.FC = ({ projectId }: NewProjectComponentProps) => {
    const [id, setId] = useState<string>('')
    const [trialName, setTrialName] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [projectValue, setProjectValue] = useState<number>(0.0)
    const [opportunityDate, setOpportunityDate] = useState<Moment | null>()
    const [startDate, setStartDate] = useState<Moment | null>()
    const [endDate, setEndDate] = useState<Moment | null>()
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

    const { data: clientRes, isLoading: clientLoading } = useGetAllClientsQuery({
        companyId: company ? company.id : ''
    })
    const { data: companyRes, isLoading: companyLoading } = useGetAllCompaniesQuery()
    const { data: usersRes, isLoading: userLoading } = useGetAllUsersQuery()
    const [updateProject, { data: projectRes }] = useUpdateProjectMutation()
    const dispatch = useAppDispatch()

    const handleSaveOrUpdateProject = () => {
        if (!trialName) {
            setErrorTrialName(true)
        }
        if (!name) {
            setErrorName(true)
        }
        if (!projectValue) {
            setErrorProjectValue(true)
        }
        if (!opportunityDate) {
            setErrorOpportunityDate(true)
        }
        if (!startDate) {
            setErrorStartDate(true)
        }
        if (!user) {
            setErrorUser(true)
        }
        if (!client) {
            setErrorClient(true)
        }
        if (!company) {
            setErrorCompany(true)
        }

        if (
            trialName &&
            name &&
            projectValue &&
            opportunityDate &&
            startDate &&
            user &&
            client &&
            company
        ) {
            if (id) {
                const updateProject: Project.UpdateProjectRequestDto = {
                    id: id
                }
            } else {
                const newProject: Project.CreateProjectRequestDto = {
                    trialName,
                    name,
                    opportunityDate: opportunityDate.toDate(),
                    startDate: startDate.toDate(),
                    endDate: endDate.toDate(),
                    projectValue,
                    clientId: client.id,
                    userId: user.id,
                    companyId: company.id
                }
            }
        }
    }

    useEffect(() => {
        if (clientRes) {
            const { status, client, error } = clientRes
            if (status === 200 && client && Array.isArray(client)) {
                setClientList(client)
            } else if (error) {
                const title = `Error - ${status}`
                const message = JSON.stringify(error)
                dispatch(setSnackAlertError({ title, message }))
                setClientList([])
            }
        }
        if (usersRes) {
            const { status, user, error } = usersRes
            if (status === 200 && user && Array.isArray(user)) {
                setUserList(user)
            } else if (error) {
                const title = `Error - ${status}`
                const message = JSON.stringify(error)
                dispatch(setSnackAlertError({ title, message }))
                setUserList([])
            }
        }
        if (companyRes) {
            const { status, company, error } = companyRes
            if (status === 200 && company && Array.isArray(company)) {
                setCompanyList(company)
            } else if (error) {
                const title = `Error - ${status}`
                const message = JSON.stringify(error)
                dispatch(setSnackAlertError({ title, message }))
                setCompanyList([])
            }
        }
    }, [clientRes, usersRes, companyRes])

    if (projectId) {
        const { data: projectRes, isSuccess } = useGetProjectByIdQuery({ id: projectId })
        if (isSuccess) {
            const { status, project } = projectRes
            if (status === 200 && project && !Array.isArray(project)) {
                const {
                    id,
                    name,
                    trialName,
                    opportunityDate,
                    projectValue,
                    startDate,
                    endDate,
                    userId,
                    clientId,
                    companyId
                } = project
                setId(id)
                setTrialName(trialName)
                setName(name)
                setProjectValue(projectValue)
                setOpportunityDate(moment(opportunityDate))
                setStartDate(moment(startDate))
                if (endDate) {
                    setEndDate(moment(endDate))
                }
                const { data: userRes, isSuccess: userIsSuccess } = useGetUserByIdQuery({
                    id: userId
                })
                const { data: clientRes, isSuccess: clientIsSuccess } = useGetClientByIdQuery({
                    id: clientId
                })
                const { data: companyRes, isSuccess: companyIsSuccess } = useGetCompanyByIdQuery({
                    id: companyId
                })
                if (userIsSuccess) {
                    const { status, user } = userRes
                    if (status === 200 && user && !Array.isArray(user)) {
                        setUser(user)
                    }
                }
                if (clientIsSuccess) {
                    const { status, client } = clientRes
                    if (status === 200 && client && !Array.isArray(client)) {
                        setClient(client)
                    }
                }
                if (companyIsSuccess) {
                    const { status, company } = companyRes
                    if (status === 200 && company && !Array.isArray(company)) {
                        setCompany(company)
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
                    label="ID"
                    value={id}
                    helperText={
                        id ? 'Generated Project ID' : 'Project ID will be generated automatically'
                    }
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
                    value={trialName}
                    onChange={(e) => setTrialName(e.target.value)}
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    margin="dense"
                />
            </Grid>
            <Grid>
                <DatePicker
                    label="Opportunity Date"
                    value={opportunityDate}
                    onChange={(newDate) => setOpportunityDate(newDate)}
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
                    value={startDate}
                    onChange={(newDate) => setStartDate(newDate)}
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
                    value={endDate}
                    onChange={(newValue) => setEndDate(newValue)}
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
                    value={projectValue}
                    onChange={(e) => {
                        const value: number = parseFloat(e.target.value).toFixed(2)
                        setProjectValue(value)
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
                    disabled={userLoading}
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
                    disabled={companyLoading}
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
                    disabled={clientLoading}
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
                        startIcon={id ? <Upgrade /> : <Save />}
                        onClick={handleSaveOrUpdateProject}
                    >
                        {id ? 'update' : 'save'}
                    </Button>
                </ButtonGroup>
            </Grid>
        </Grid>
    )
}

export default NewProjectComponent
