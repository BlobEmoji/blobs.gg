import React from 'react'
import PropTypes from 'prop-types'

import Server from './Server'
import { shuffleArray } from '../utils'
import { useScrollNearEnd } from '../hooks'

const SERVERS_PER_PAGE = 9

export function Servers({ servers, ...props }) {
  return Object.entries(servers).map(([id, server]) => (
    <Server key={id} server={{ id, ...server }} {...props} />
  ))
}

Servers.propTypes = {
  servers: PropTypes.object.isRequired,
}

export function CommunityServers(props) {
  const { current: servers } = React.useRef(
    shuffleArray(Object.entries(props.servers))
  )
  const [upTo, setUpTo] = React.useState(SERVERS_PER_PAGE)

  const serverNodes = servers
    .slice(0, upTo)
    .map(([id, server]) => <Server key={id} server={{ id, ...server }} />)

  useScrollNearEnd(() => {
    if (upTo < servers.length) {
      setUpTo((prev) => Math.min(prev + SERVERS_PER_PAGE, servers.length))
    }
  })

  return <div className="servers community-servers">{serverNodes}</div>
}
