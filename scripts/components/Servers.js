import React from 'react'
import PropTypes from 'prop-types'

import Server from './Server'
import { shuffleArray } from '../utils'

const SERVERS_PER_PAGE = 6

export function Servers({ servers, ...props }) {
  return servers.map((server) => (
    <Server key={server.id} server={server} {...props} />
  ))
}

Servers.propTypes = {
  servers: PropTypes.array.isRequired,
}

export function CommunityServers(props) {
  const { current: servers } = React.useRef(
    shuffleArray(Object.entries(props.servers))
  )
  const [upTo, setUpTo] = React.useState(SERVERS_PER_PAGE)

  const serverNodes = servers
    .slice(0, upTo)
    .map(([id, server]) => <Server key={id} server={{ id, ...server }} />)

  function handleViewMoreClick() {
    setUpTo((prev) => Math.min(prev + SERVERS_PER_PAGE, servers.length))
  }

  return (
    <>
      <div className="servers community-servers">{serverNodes}</div>
      {upTo < servers.length && (
        <div className="view-more">
          <button
            type="button"
            className="button"
            onClick={handleViewMoreClick}
          >
            View More
          </button>
        </div>
      )}
    </>
  )
}

CommunityServers.propTypes = {
  servers: PropTypes.array.isRequired,
}
