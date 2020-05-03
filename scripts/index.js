import React from 'react'
import ReactDOM from 'react-dom'

import { log } from './utils'
import { Emojis } from './emojis'
import Search from './components/Search'
import { CommunityServers, Servers } from './components/Servers'

const BLOBS_ENDPOINT =
  window.location.host.endsWith('now.sh') ||
  process.env.NODE_ENV === 'development'
    ? 'https://blobs-gg-test-data.slc.now.sh/data.json'
    : 'https://api.mousey.app/emoji/blobs+community-blobs'

function calculateEmojiCount(data) {
  let count = 0

  // Using nested `for` loops here instead of `Array.prototype.reduce` for
  // the sake of readability.
  for (const servers of Object.values(data)) {
    for (const server of Object.values(servers)) {
      count += server.emoji.length
    }
  }

  return count
}

function updatePageState(data) {
  const count = calculateEmojiCount(data)
  const formattedCount = new Intl.NumberFormat().format(count)
  document.querySelector('#emoji-count').textContent = formattedCount
}

function mount(data) {
  const emojis = new Emojis(data)

  log('Emojis:', emojis)

  log('Mounting search...')
  const searchNode = document.querySelector('#search')
  searchNode.removeAttribute('hidden')
  ReactDOM.render(<Search emojis={emojis} />, searchNode)

  log('Mounting servers...')
  const servers = document.querySelector('.servers')
  const communityServers = document.querySelector('.community-servers-wrapper')
  ReactDOM.render(<Servers servers={emojis.groups.blobs.guilds} />, servers)
  ReactDOM.render(
    <CommunityServers servers={emojis.groups['community-blobs'].guilds} />,
    communityServers
  )
}

if (typeof window.fetch !== 'undefined') {
  log('Fetching data...')

  fetch(BLOBS_ENDPOINT)
    .then((resp) => resp.json())
    .then((data) => {
      updatePageState(data)
      mount(data)
    })
} else {
  log('No window.fetch.')
}
