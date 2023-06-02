import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

// To render app component into the div container in index.html
ReactDOM.render(
  <React.StrictMode value={false}>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

