import React from 'react'
import ReactDOM from 'react-dom'

import Search from './components/Search'
import { CommunityServers, Servers } from './components/Servers'
import ViewMoreButton from './components/ViewMore'

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
  const serversNodes = document.getElementsByClassName('servers')
  const viewNode = document.querySelector('#view-button')

  ReactDOM.render(<Search data={data} />, searchNode)
  ReactDOM.render(<Servers data={data} />, serversNodes[0])
  ReactDOM.render(<CommunityServers data={data} />, serversNodes[1])
  ReactDOM.render(<ViewMoreButton />, viewNode)
}

function hide() {
  let community_servers = document.getElementsByClassName(
    'community-servers'
  )[0]
  let counter = 0
  for (let server of community_servers.getElementsByClassName('server')) {
    counter += 1
    if (counter > 6) {
      server.classList.add('hidden')
    }
  }
}

if (window.fetch) {
  fetch(BLOBS_ENDPOINT)
    .then((resp) => resp.json())
    .then((data) => {
      updatePageState(data)
      mount(data)
      hide()
    })
}
