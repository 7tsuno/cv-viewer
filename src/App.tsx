import React, { useEffect, useState } from 'react'
import Viewer from 'components/pages/Viewer'
import Error from 'components/pages/Error'
import { report } from 'components/elements/display/CV'
import { useSender } from 'utils/axios'
import marked from 'marked'
import dayjs from 'dayjs'
import DOMPurify from 'dompurify'
import { API } from 'constants/api'
import Loading from 'components/elements/display/Loading'

const App: React.FC = () => {
  const [items, setItems] = useState<report[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
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
        setError('認証されていません。')
        setLoading(false)
        return
      }
      if (result.error) {
        setError('不明なエラーが発生しました。')
        setLoading(false)
        return
      }
      setItems(
        result.data.reports
          .sort((itemA: report, itemB: report) =>
            dayjs(itemB.startDate).diff(itemA.startDate)
          )
          .map(transform)
      )
      setLoading(false)
    }
    callSender()
  }, [])

  if (error) {
    return <Error message={error} />
  }

  if (loading) {
    return <Loading />
  }

  return <Viewer items={items} />
}

export default App
