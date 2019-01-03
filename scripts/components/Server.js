import React from 'react'
import PropTypes from 'prop-types'

export default class Server extends React.Component {
  state = {
    opened: false,
  }

  render() {
    const { server } = this.props

    return (
      <div
        href={`https://${server.index + 1}.blobs.gg`}
        target="_blank"
        rel="noopener noreferrer"
        className="server"
      >
        <h3>
          <img
            alt={`${server.name} icon`}
            src={`https://cdn.discordapp.com/icons/${server.id}/${
              server.icon
            }.png?size=64`}
          />
          {server.name}
        </h3>
      </div>
    )
  }
}

Server.propTypes = {
  server: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    emoji: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        animated: PropTypes.bool.isRequired,
      })
    ).isRequired,
  }).isRequired,
}
