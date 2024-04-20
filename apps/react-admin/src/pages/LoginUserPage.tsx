import React, { useState } from 'react'
import { Container, Typography, TextField, Button, makeStyles, Theme, Link, Card, Unstable_Grid2 as Grid, Box, Paper } from '@mui/material'
import { RootState, useAppDispatch, useAppSelector } from '~/store/reducers/store'
import { getData } from '~/store/actions/thunkActions'

const LoginPage: React.FC = () => {
    const dispatch = useAppDispatch()
    const state = useAppSelector((state: RootState) => state.data)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        
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
                            value={email}
                            onChange={handleEmailChange}
                        />

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <Button type="submit" variant="contained" fullWidth color="primary" onClick={handleSubmit}>
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
