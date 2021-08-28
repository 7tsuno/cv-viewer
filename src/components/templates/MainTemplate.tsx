import React, { createRef, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Box,
  Container,
  Fab,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { ArrowUpward } from '@material-ui/icons'

const useStyles = makeStyles(() => ({
  container: {
    padding: 0,
  },
  fab: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  },
}))

const MainTemplate: React.FC<{ children: React.ReactNode }> = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const classes = useStyles()
  const ref = createRef<HTMLDivElement>()

  const scrollToTop = useCallback(() => {
    ref?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }, [ref])

  return (
    <>
      <div id="top" ref={ref} />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            CV Viewer
          </Typography>
        </Toolbar>
      </AppBar>
      <Fab className={classes.fab} color="secondary" onClick={scrollToTop}>
        <ArrowUpward />
      </Fab>
      <Container maxWidth="lg" className={classes.container}>
        <Box>{children}</Box>
      </Container>
    </>
  )
}

export default MainTemplate
