import { Typography } from '@material-ui/core'
import ErrorTemplate from 'components/templates/ErrorTemplate'
import React from 'react'
const Error: React.FC<{ message: string }> = ({ message }) => {
  return (
    <ErrorTemplate>
      <Typography variant="h2">Error</Typography>
      <Typography variant="body1">{message}</Typography>
    </ErrorTemplate>
  )
}

export default Error
