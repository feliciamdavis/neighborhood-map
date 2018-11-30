import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { App } from './App'
import './index.css'

const app = ReactDOM.render(<App />, document.getElementById('root'))

serviceWorker.register()

navigator.serviceWorker.ready.then(() => app.start())
setTimeout(() => app.start(), 250)