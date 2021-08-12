import React from 'react'
import Home from 'components/pages/Home'
import Error from 'components/pages/Error'
import { useAuth0 } from '@auth0/auth0-react'
import Loading from 'components/elements/display/Loading'

const App: React.FC = () => {
  const { error, isAuthenticated, isLoading, loginWithRedirect } = useAuth0()

  if (error) {
    return <Error message={error.message} />
  }

  if (isLoading) {
    return <Loading />
  }

  if (!isAuthenticated) {
    loginWithRedirect()
    return <div />
  }

  return <Home />
}

export default App
