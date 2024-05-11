import { AddCircle } from '@mui/icons-material'
import {
    Box,
    Button,
    FormControl,
    Unstable_Grid2 as Grid,
    InputLabel,
    MenuItem,
    Select,
    Typography
} from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ProjectCollection, DeliveryCollection } from '~/components'
import { ROUTES } from '~/resources/routes-constants'

const DashboardPage: React.FC = () => {
    const navigate = useNavigate()
    return (
        <Grid container>
            <Grid xs={12} flexDirection={'row'}>
                <Typography variant="h4">Projects </Typography>
                <Button
                    variant={'contained'}
                    startIcon={<AddCircle />}
                    size="large"
                    onClick={() => {
                        navigate(ROUTES.PROJECT_NEW_PAGE)
                    }}
                >
                    New
                </Button>
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Age">
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid xs={12}>
                <ProjectCollection.RootComponent />
            </Grid>
        </Grid>
    )
}

export default DashboardPage
