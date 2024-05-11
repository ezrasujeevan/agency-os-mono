import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Container, Box, IconButton, Menu, MenuItem, Button, Tooltip, Avatar, Unstable_Grid2 as Grid, Switch, FormControlLabel, Icon } from '@mui/material'
import { Adb, Menu as MenuIcon, Pets } from '@mui/icons-material'
import MaterialUISwitch from './MaterialUISwitch'
import { log } from 'console'
import { useAppDispatch, useAppSelector } from '~/store'
import { THEME_ACTION } from '~/resources/action-constants'

const HeaderComponent: React.FC = () => {
    const pages = ['Products', 'Pricing', 'Blog']
    const settings = ['Profile', 'Account', 'Dashboard', 'Logout']
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)

    const dispatch = useAppDispatch()

    const handeleDarkModeChange = (event: any) => {
        event.target.checked ? dispatch({ type: THEME_ACTION.SET_THEME, payload: 'dark' }) : dispatch({ type: THEME_ACTION.SET_THEME, payload: 'light' })
    }
    const { mode } = useAppSelector((state) => state.theme)

    return (
        <AppBar position="static">
            <Container>
                <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Grid display={'flex'} direction={'row'} flexGrow={1} alignContent={'center'}>
                        <Pets fontSize={'large'} />
                        <Typography
                            variant="h6"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'oswald',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none'
                            }}
                        >
                            Agency OS
                        </Typography>
                    </Grid>
                    <Grid>
                        <FormControlLabel
                            control={<MaterialUISwitch sx={{ m: 1 }} />}
                            label="DarkMode"
                            onChange={handeleDarkModeChange}
                            checked={mode === 'dark'}
                        />
                    </Grid>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default HeaderComponent
