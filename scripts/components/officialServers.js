import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Guilds } from './material/guilds'
import Typography from '@material-ui/core/Typography'

class OfficialServers extends Component {
  render() {
    return (
      <>
        <Typography variant="h5">The Official Blob Emoji Servers</Typography>
        {this.props.emojis.hasOwnProperty('guilds') && <Guilds guilds={this.props.emojis.guilds} />}
      </>
    )
  }
}

OfficialServers.propTypes = {
  emojis: PropTypes.object.isRequired,
}

export default OfficialServers
