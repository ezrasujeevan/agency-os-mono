import { Snackbar, Alert, Typography, AlertTitle } from '@mui/material'
import React from 'react'
import { RootState, useAppDispatch, useAppSelector } from '~/store'
import { setSnackClose, setSnackDefault } from '~/store/reducers'

const SnackBar = () => {
    const {
        content: { title, message },
        open,
        type
    } = useAppSelector((state: RootState) => state.snack)

    const dispactch = useAppDispatch()

    const closeSnackAlert = () => {
        dispactch(setSnackClose())
        dispactch(setSnackDefault())
    }
    const Alertessage = () => {
        if (Array.isArray(message)) {
            return message.map((msg, index) => (
                <Typography key={index} variant="body1">{msg}</Typography>
            ))
        }
        return <Typography variant="body1">{message}</Typography>
    }

    // Rest of your component code

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={closeSnackAlert} anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
            <Alert onClose={closeSnackAlert} severity={type} variant="filled">
                <AlertTitle>{`${title.toUpperCase()}`}</AlertTitle>
                {Alertessage()}
            </Alert>
        </Snackbar>
    )
}

export default SnackBar
