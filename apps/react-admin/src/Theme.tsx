import { PaletteMode, ThemeOptions } from '@mui/material'
import { deepPurple, lime } from '@mui/material/colors'

const Theme = (paletteMode: PaletteMode): ThemeOptions => {
    return {
        palette: {
            mode: paletteMode,
            primary: deepPurple,
            secondary: lime,
        },
        components: {
            MuiLink: {
                defaultProps: {
                    fontFamily: `'Roboto Mono', monospaced`
                },
                styleOverrides: {
                    root: {
                        color: lime[500]
                    }
                }
            },
            MuiTypography: {
                defaultProps: {
                    fontFamily: `'Oswald', sans-serif`,
                    fontWeight: 700
                }
            }
        }
    }
}

export default Theme
