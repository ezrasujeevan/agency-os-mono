import React, { useEffect, useState } from 'react'
import { Autocomplete, Unstable_Grid2 as Grid, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import {
    useGetAllClientsQuery,
    useGetAllCompaniesQuery,
    useGetAllUsersQuery,
    useGetProjectByIdQuery,
    useUpdateProjectMutation
} from '~/store/api'
import { Moment } from 'moment'
import { User, Company, Client } from '@agency-os/class'
import { useAppDispatch } from '~/store'
import { setSnackAlertError } from '~/store/reducers'

interface NewProjectComponentProps {
    projectId?: string
}

const NewProjectComponent: React.FC = ({ projectId }: NewProjectComponentProps) => {
    const [trialName, setTrialName] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [opportunityDate, setOpportunityDate] = useState<Moment | null>()
    const [startDate, setStartDate] = useState<Moment | null>()
    const [endDate, setEndDate] = useState<Moment | null>()
    const [UserName, setUser] = useState<string>('')
    const [userID, setUserID] = useState<string>('')
    const [clientName, setClient] = useState<string>('')
    const [clientId, setClientId] = useState<string>('')
    const [companyName, setCompany] = useState<string>('')
    const [companyId, setCompanyId] = useState<string>('')
    const [userList, setUserList] = useState<User.User[]>([])
    const [companyList, setCompanyList] = useState<Company.Company[]>([])
    const [clientList, setClientList] = useState<Client.Client[]>([])
    const { data: clientRes } = useGetAllClientsQuery()
    const { data: companyRes } = useGetAllCompaniesQuery()
    const { data: usersRes } = useGetAllUsersQuery()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (clientRes) {
            const { status, client, error } = clientRes
            if (status === 200 && client && Array.isArray(client)) {
                setClientList(client)
            } else if(error) {
                const title = `Error - ${status}}`
                const message = JSON.stringify(error)
                dispatch(setSnackAlertError({ title, message }))
                setClientList([])
            }
        }
    }, [clientRes])

    if (projectId) {
        const {
            data: projectRes,
            isError,
            isLoading,
            isSuccess
        } = useGetProjectByIdQuery({ id: projectId })
        const { status, project } = projectRes!
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
        }
    }

    return (
        <Grid>
            <Grid>
                <TextField
                    fullWidth
                    required
                    label="ID"
                    defaultValue={trialName}
                    onChange={(e) => setTrialName(e.target.value)}
                    helperText="Must Be Unique"
                    margin="dense"
                    disabled
                />
            </Grid>
            <Grid>
                <TextField
                    fullWidth
                    required
                    label="Trial Name"
                    defaultValue={trialName}
                    onChange={(e) => setTrialName(e.target.value)}
                    helperText="Must Be Unique"
                    margin="dense"
                />
            </Grid>
            <Grid>
                <TextField
                    fullWidth
                    required
                    label="Name"
                    defaultValue={name}
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
                    slotProps={{ textField: { fullWidth: true, required: true, margin: 'dense' } }}
                />
            </Grid>

            <Grid>
                <DatePicker
                    label="Start Date"
                    value={startDate}
                    onChange={(newDate) => setStartDate(newDate)}
                    format="DD-MM-YYYY"
                    slotProps={{ textField: { fullWidth: true, required: true, margin: 'dense' } }}
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
                    fullWidth
                    required
                    label="Name"
                    defaultValue={name}
                    onChange={(e) => setName(e.target.value)}
                    margin="dense"
                />
            </Grid>
            <Grid>
                <TextField
                    fullWidth
                    required
                    label="Name"
                    defaultValue={name}
                    onChange={(e) => setName(e.target.value)}
                    margin="dense"
                />
            </Grid>
            <Grid>
                <TextField
                    fullWidth
                    required
                    label="Name"
                    defaultValue={name}
                    onChange={(e) => setName(e.target.value)}
                    margin="dense"
                />
            </Grid>
            <Grid>
                <Autocomplete
                    options={clientList}
                    fullWidth
                    renderInput={(params: object) => (
                        <TextField {...params} label="Project Manager" />
                    )}
                />
            </Grid>
        </Grid>
    )
}

export default NewProjectComponent
