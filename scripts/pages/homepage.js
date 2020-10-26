import React from 'react'
import OfficialServers from '../components/officialServers'
import PropTypes from 'prop-types'

function Homepage(props) {
  const { emojis } = props
  const officialEmojis = emojis.groups.blobs

  return (
    <OfficialServers emojis={officialEmojis} />
  )
}

Homepage.propTypes = {
  emojis: PropTypes.object.isRequired,
}

export default Homepage
