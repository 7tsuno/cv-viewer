import React from 'react'
import ReactDOM from 'react-dom'
import AppWrapper from 'AppWrapper'
import * as serviceWorker from './serviceWorkerRegistration'

ReactDOM.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
  document.getElementById('root')
)

serviceWorker.unregister()
