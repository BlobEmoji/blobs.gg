import React from 'react'
import ReactDOM from 'react-dom'

import Search from './components/Search'
import Servers from './components/Servers'

// process.env.NODE_ENV is a magic variable that gets compiled away into the
// environment that we are in.
const BLOBS_ENDPOINT =
  process.env.NODE_ENV === 'development'
    ? 'https://blobs_testing.snowyluma.com/emoji/blobs'
    : 'https://api.mousey.app/emoji/blobs'

function updatePageState(data) {
  console.log(data)
  let total = 0
  for (const [key, value] of Object.entries(data.guilds)) {
      total += value["emoji"].length
  }
  document.querySelector('#emoji-count').textContent = total
}

function mount(data) {
  const searchNode = document.querySelector('#search')
  searchNode.removeAttribute('hidden')
  const serversNode = document.querySelector('.servers')

  ReactDOM.render(<Search data={data} />, searchNode)
  ReactDOM.render(<Servers data={data} />, serversNode)
}

if (window.fetch) {
  fetch(BLOBS_ENDPOINT)
    .then((resp) => resp.json())
    .then((data) => {
      updatePageState(data)
      mount(data)
    })
}
