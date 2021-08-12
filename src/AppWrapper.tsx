import React from 'react'
import App from 'App'
import { Auth0Provider } from '@auth0/auth0-react'
import { AUTH } from 'constants/auth'
import { ThemeProvider } from '@material-ui/core/styles'
import { createTheme } from '@material-ui/core/styles'
import { cyan } from '@material-ui/core/colors'
import CssBaseline from '@material-ui/core/CssBaseline'
import Error from 'components/pages/Error'

const AppWrapper: React.FC = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: cyan[700],
      },
      type: 'dark',
    },
  })

  if (!AUTH.domain || !AUTH.clientId || !AUTH.audience) {
    return <Error message="Unhandled Error" />
  }

  const providerConfig = {
    domain: AUTH.domain,
    clientId: AUTH.clientId,
    audience: AUTH.audience,
    redirectUri: window.location.origin,
  }

  return (
    <ThemeProvider theme={theme}>
      <Auth0Provider {...providerConfig}>
        <CssBaseline />
        <App />
      </Auth0Provider>
    </ThemeProvider>
  )
}

export default AppWrapper
