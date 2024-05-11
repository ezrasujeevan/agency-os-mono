import { Alert, AlertTitle, Typography } from '@mui/material'
import { MuiAlertType } from '~/store/reducers'

export interface ToastAlertBoxProps {
    type: MuiAlertType
    title: string
    message: string | string[]
    closeToast: () => void
}

const ToastAlertBoxComponent: React.FC<ToastAlertBoxProps> = ({
    type,
    title,
    message
}: ToastAlertBoxProps) => {
    const AlertMessage = (message: string | string[]) => {
        if (Array.isArray(message)) {
            return message.map((msg, index) => (
                <Typography key={index} variant="body1">
                    {msg}
                </Typography>
            ))
        }
        return <Typography variant="body1">{message}</Typography>
    }
    return (
        <Alert severity={type} variant="filled">
            <AlertTitle>{`${title.toUpperCase()}`}</AlertTitle>
            {AlertMessage(message)}
        </Alert>
    )
}

export default ToastAlertBoxComponent
