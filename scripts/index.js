import React from 'react'
import ReactDOM from 'react-dom'

import { log } from './utils'
import Search from './components/Search'
import App from './App'

function mount(data) {
  log('Mounting search...')
  const searchNode = document.querySelector('#search')
  searchNode.removeAttribute('hidden')
  ReactDOM.render(<Search emojis={emojis} />, searchNode)
}

// if (typeof window.fetch !== 'undefined') {
//   log('Fetching data...')
//
//   fetch(BLOBS_ENDPOINT)
//     .then((resp) => resp.json())
//     .then((data) => {
//       updatePageState(data)
//       mount(data)
//     })
// } else {
//   log('No window.fetch.')
// }

ReactDOM.render(<App />, document.getElementById('root'))
