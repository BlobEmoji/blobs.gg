import React from 'react'
import ReactDOM from 'react-dom'

import { log } from './utils'
import { Emojis } from './emojis'
import Search from './components/Search'
import { CommunityGuilds, Guilds } from './components/Guilds'

const BLOBS_ENDPOINT = 'https://api.mousey.app/v3/emoji/blobs+community-blobs'

function calculateEmojiCount(data) {
  let count = 0

  // Using nested `for` loops here instead of `Array.prototype.reduce` for
  // the sake of readability.
  for (const guilds of Object.values(data)) {
    for (const guild of Object.values(guilds)) {
      count += guild.emoji.length
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

  log('Mounting guilds...')
  const guildsNode = document.querySelector('.guilds')
  const communityGuildsNode = document.querySelector(
    '.community-guilds-wrapper'
  )
  ReactDOM.render(<Guilds guilds={emojis.groups.blobs.guilds} />, guildsNode)
  ReactDOM.render(
    <CommunityGuilds guilds={emojis.groups['community-blobs'].guilds} />,
    communityGuildsNode
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
