import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(4),
  },
}))

const ErrorTemplate: React.FC<{ children: React.ReactNode }> = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const classes = useStyles()
  return (
    <div>
      <div className={classes.content}>{children}</div>
    </div>
  )
}

export default ErrorTemplate
