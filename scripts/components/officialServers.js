import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Guilds } from './material/guilds'

class OfficialServers extends Component {
  render() {
    return (
      this.props.emojis.hasOwnProperty('guilds') && <Guilds guilds={this.props.emojis.guilds} />
    )
  }
}

OfficialServers.propTypes = {
  emojis: PropTypes.object.isRequired,
}

export default OfficialServers
