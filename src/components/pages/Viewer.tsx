import React from 'react'
import MainTemplate from 'components/templates/MainTemplate'
import CV, { report } from 'components/elements/display/CV'
import { makeStyles } from '@material-ui/core'
import marked from 'marked'

marked.setOptions({
  breaks: true,
})

const useStyles = makeStyles((theme) => ({
  cv: {
    margin: theme.spacing(2, 0),
  },
}))

const Viewer: React.FC<{ items: Array<report> }> = ({ items }) => {
  const classes = useStyles()

  return (
    <MainTemplate>
      {items.map((item, index) => (
        <div className={classes.cv} key={index}>
          <CV {...item} />
        </div>
      ))}
    </MainTemplate>
  )
}

export default Viewer
