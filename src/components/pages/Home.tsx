import React, { useState } from 'react'
import MainTemplate from 'components/templates/MainTemplate'
import { useEffect } from 'react'
import { useSender } from 'utils/axios'
import { API } from 'constants/api'
import CV, { report } from 'components/elements/display/CV'
import dayjs from 'dayjs'
import { makeStyles } from '@material-ui/core'
import marked from 'marked'
import DOMPurify from 'dompurify'

marked.setOptions({
  breaks: true,
})

const useStyles = makeStyles((theme) => ({
  cv: {
    margin: theme.spacing(2, 0),
  },
}))

const Home: React.FC = () => {
  const classes = useStyles()
  const [items, setItems] = useState<report[]>([])
  const sender = useSender(API.GET_REPORTS)

  const transform = (item: report) => {
    return {
      ...item,
      text: marked(DOMPurify.sanitize(item.text)),
      startDate: dayjs(item.startDate).format('YYYY/MM'),
      endDate: item.endDate ? dayjs(item.endDate).format('YYYY/MM') : '現在',
    }
  }

  useEffect(() => {
    const callSender = async () => {
      const result = await sender({})
      setItems(
        result?.data?.reports
          .sort((itemA: report, itemB: report) =>
            dayjs(itemB.startDate).diff(itemA.startDate)
          )
          .map(transform)
      )
    }
    callSender()
  }, [])

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

export default Home
