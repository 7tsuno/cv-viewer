import React, { useEffect, useState } from 'react'
import Viewer from 'components/pages/Viewer'
import Error from 'components/pages/Error'
import { report } from 'components/elements/display/CV'
import { useSender } from 'utils/axios'
import marked from 'marked'
import dayjs from 'dayjs'
import DOMPurify from 'dompurify'
import { API } from 'constants/api'
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'
import { PAGE } from 'constants/page'

const Redirect: React.FC = () => {
  const history = useHistory()
  useEffect(() => {
    history.push(PAGE.viewer.path)
  })
  return <div>redirect</div>
}

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
        setError('認証エラー')
        setLoading(false)
        return
      }
      if (result.status !== 200) {
        setError('不明なエラー')
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
    return <div>loading</div>
  }

  return (
    <BrowserRouter>
      <CssBaseline />
      <Switch>
        <Route path={PAGE.home.path} exact>
          <Redirect />
        </Route>
        <Route path={PAGE.viewer.path} exact>
          <Viewer items={items} />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
