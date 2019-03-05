import React from 'react'
import ReactDOM from 'react-dom'

import Search from './components/Search'
import { CommunityServers, Servers } from './components/Servers'

// process.env.NODE_ENV is a magic variable that gets compiled away into the
// environment that we are in.
const BLOBS_ENDPOINT =
  process.env.NODE_ENV === 'development'
    ? 'https://api.mousey.app/emoji/blobs-testing'
    : 'https://api.mousey.app/emoji/blobs'

function updatePageState(data) {
  document.querySelector('#emoji-count').textContent = data.emoji_count
}

function mount(data) {
  const searchNode = document.querySelector('#search')
  searchNode.removeAttribute('hidden')
  const servers = document.querySelector('.servers')
  const communityServersWrapper = document.querySelector(
    '.community-servers-wrapper'
  )

  ReactDOM.render(<Search data={data} />, searchNode)
  ReactDOM.render(<Servers servers={data.guilds} />, servers)
  ReactDOM.render(
    <CommunityServers servers={data.community} />,
    communityServersWrapper
  )
}

if (window.fetch) {
  fetch(BLOBS_ENDPOINT)
    .then((resp) => resp.json())
    .then((data) => {
      updatePageState(data)
      mount(data)
    })
}
