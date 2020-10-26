import React from 'react'
import PropTypes from 'prop-types'
import { Guilds } from './material/guilds'

function OfficialServers(props) {
  return (
    <Guilds guilds={props.emojis.guilds} skeletonCount={6} />
  )
}

OfficialServers.propTypes = {
  emojis: PropTypes.object.isRequired,
}

export default OfficialServers
