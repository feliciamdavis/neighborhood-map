import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { App } from './App'
import './index.css'

let started = false
function startApp() {
    if (started) return
    started = true

    ReactDOM.render(<App />, document.getElementById('root'))
}

serviceWorker.register()

navigator.serviceWorker.ready.then(() => startApp())
setTimeout(() => startApp(), 5000)