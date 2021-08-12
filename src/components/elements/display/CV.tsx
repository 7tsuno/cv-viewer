import React from 'react'
import {
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(3),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  content: {
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
  line: {
    margin: theme.spacing(2, 0),
  },
  text: {
    margin: theme.spacing(2, 0),
  },
  chip: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(0.5),
  },
  chips: {
    margin: theme.spacing(0, 1),
  },
}))

const Chips: React.FC<{ title: string; items: string[]; category: string }> = ({
  title,
  items,
  category,
}) => {
  const classes = useStyles()
  return (
    <Grid container className={classes.line}>
      <Grid item xs={12} md={2}>
        <Typography variant="h5">{title}</Typography>
      </Grid>
      <Grid item xs={12} md={10}>
        {items.map((name, index) => (
          <Chip
            color="primary"
            label={name}
            className={classes.chip}
            key={`${category}_${index}`}
          />
        ))}
      </Grid>
    </Grid>
  )
}

const CV: React.FC<report> = ({
  title,
  startDate,
  endDate,
  text,
  language,
  skill,
  db,
  memberAndRole,
  os,
}) => {
  const classes = useStyles()
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h4" className={classes.title} color="textPrimary">
          {title}
        </Typography>
        <div className={classes.content}>
          <Typography variant="h5" className={classes.line}>
            {`${startDate} ～ ${endDate}`}
          </Typography>
          <Typography variant="h6" className={classes.line}>
            {`メンバーとロール : ${memberAndRole}`}
          </Typography>
          <Divider />
          <div
            dangerouslySetInnerHTML={{ __html: text }}
            className={classes.text}
          />
          <Divider />
          {language && (
            <Chips title="言語" items={language} category="language" />
          )}
          {os && <Chips title="OS" items={os} category="os" />}
          {skill && <Chips title="利用技術" items={skill} category="skill" />}
          {db && <Chips title="DB" items={db} category="db" />}
        </div>
      </CardContent>
    </Card>
  )
}

export type report = {
  title: string
  startDate: string
  endDate: string
  text: string
  language?: string[]
  skill?: string[]
  db?: string[]
  memberAndRole: string
  os?: string[]
}

export default CV
