import React from 'react'
import App from 'App'
import { ThemeProvider } from '@material-ui/core/styles'
import { createTheme } from '@material-ui/core/styles'
import { cyan } from '@material-ui/core/colors'
import CssBaseline from '@material-ui/core/CssBaseline'

const AppWrapper: React.FC = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: cyan[700],
      },
      type: 'dark',
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  )
}

export default AppWrapper
