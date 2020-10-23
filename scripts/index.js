import React from 'react'
import ReactDOM from 'react-dom'

import { log } from './utils'
import { Emojis } from './emojis'
import Search from './components/Search'
import { CommunityGuilds, Guilds } from './components/Guilds'
import App from './App'

function mount(data) {
  log('Mounting search...')
  const searchNode = document.querySelector('#search')
  searchNode.removeAttribute('hidden')
  ReactDOM.render(<Search emojis={emojis} />, searchNode)

  log('Mounting guilds...')
  const communityGuildsNode = document.querySelector(
    '.community-guilds-wrapper'
  )
  ReactDOM.render(
    <CommunityGuilds guilds={emojis.groups['community-blobs'].guilds} />,
    communityGuildsNode
  )
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

ReactDOM.render(<App/>, document.getElementById('root'))
