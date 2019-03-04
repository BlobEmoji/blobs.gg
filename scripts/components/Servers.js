import React from 'react'
import PropTypes from 'prop-types'

import Server from './Server'

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export function Servers({ data }) {
  const { guilds: servers } = data

  return Object.entries(servers).map(([id, server]) => (
    <Server key={id} server={{ id, ...server }} />
  ))
}

export function CommunityServers({ data }) {
  const { community: servers } = data

  let server_list = Object.entries(servers).map(([id, server]) => (
    <Server key={id} server={{ id, ...server }} />
  ))

  return shuffleArray(server_list)
}

Servers.propTypes = {
  data: PropTypes.object.isRequired,
}
