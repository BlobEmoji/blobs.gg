import React from 'react'
import PropTypes from 'prop-types'

import Guild from './Guild'
import { shuffleArray } from '../utils'
import { useScrollNearEnd } from '../hooks'

const GUILDS_PER_PAGE = 9

export function Guilds({ guilds, ...props }) {
  return guilds.map((guild) => (
    <Guild key={guild.id} guild={guild} {...props} />
  ))
}

Guilds.propTypes = {
  guilds: PropTypes.array.isRequired,
}

export function CommunityGuilds(props) {
  const { current: guilds } = React.useRef(
    shuffleArray(Object.entries(props.guilds))
  )
  const [upTo, setUpTo] = React.useState(GUILDS_PER_PAGE)

  const guildNodes = guilds
    .slice(0, upTo)
    .map(([id, guild]) => <Guild key={id} guild={{ id, ...guild }} />)

  useScrollNearEnd(() => {
    if (upTo < guilds.length) {
      setUpTo((prev) => Math.min(prev + GUILDS_PER_PAGE, guilds.length))
    }
  })

  return <div className="guilds community-guilds">{guildNodes}</div>
}

CommunityGuilds.propTypes = {
  guilds: PropTypes.array.isRequired,
}
