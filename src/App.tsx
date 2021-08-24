import React, { useEffect, useState } from 'react'
import Home from 'components/pages/Home'
import Error from 'components/pages/Error'
import { report } from 'components/elements/display/CV'
import { useSender } from 'utils/axios'
import marked from 'marked'
import dayjs from 'dayjs'
import DOMPurify from 'dompurify'
import { API } from 'constants/api'

const App: React.FC = () => {
  const [items, setItems] = useState<report[]>([])
  const [error, setError] = useState('')
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
      if (result.status === 401) {
        setError('認証エラー')
        return
      }
      if (result.status !== 200) {
        setError('不明なエラー')
        return
      }
      setItems(
        result.data.reports
          .sort((itemA: report, itemB: report) =>
            dayjs(itemB.startDate).diff(itemA.startDate)
          )
          .map(transform)
      )
    }
    callSender()
  }, [])

  if (error) {
    return <Error message={error} />
  }

  return <Home items={items} />
}

export default App
