import React, { useEffect, useState } from 'react'
import {
    Typography,
    TextField,
    Button,
    Link,
    Unstable_Grid2 as Grid,
    Box,
    Paper
} from '@mui/material'
import { useAppDispatch } from '~/store'

import { useLoginUserMutation } from '~/store/api'
import { setSnackAlertError, setSnackAlertSuccess } from '~/store/reducers'
import { PasswordInputComponent } from '~/components'
import { useNavigate } from 'react-router-dom'

const LoginPage: React.FC = () => {
    const dispatch = useAppDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const [loginUserMutation, { data, isLoading, isError, error, isSuccess }] =
        useLoginUserMutation()

    useEffect(() => {
        if (isError) {
            if (error?.data.statusCode >= 500) {
                const title = `${error.data.statusCode} - ${error.data.error}`
                const message = error?.data?.message
                dispatch(setSnackAlertError({ title, message }))
            } else if (error?.data?.statusCode >= 400) {
                const title = `${error.data.statusCode} - ${error.data.error}`
                const message = error?.data?.message
                dispatch(setSnackAlertError({ title, message }))
            }
        }
        if (isSuccess) {
            const title = 'Success'
            const message = 'Login successful'
            dispatch(setSnackAlertSuccess({ title, message }))
            navigate('/dashboard')
        }
    }, [isError, isSuccess])

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        loginUserMutation({ email, password })
    }

    return (
        <Box>
            <Grid container>
                <Grid sx={{ p: 2, mt: 2 }} md={6} mdOffset={3}>
                    <Paper elevation={1} sx={{ p: 2 }}>
                        <Typography variant="h5">Login</Typography>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                        />

                        <PasswordInputComponent
                            password={password}
                            handlePasswordChange={handlePasswordChange}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            color="primary"
                            onClick={handleSubmit}
                        >
                            Sign In
                        </Button>
                        <Link>Forgot password?</Link>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    )
}

export default LoginPage
