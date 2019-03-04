import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Emoji from './Emoji'
import chevron from '../../assets/chevron-down-solid.svg'

const RANDOM_SAMPLE_SIZE = 5

export default class Server extends React.Component {
  constructor(props) {
    super(props)

    // When the panel is not expanded, we show a random selection of blobs.
    // Here, we determine at which index we should select random blobs from.
    this.state = {
      expanded: false,
      sampleIndex: Math.floor(
        Math.random() * Math.floor(this.emojis().length / RANDOM_SAMPLE_SIZE)
      ),
    }
  }

  handleClick = () => {
    this.setState(({expanded}) => ({expanded: !expanded}))
  }

  handleJoinClick = (event) => {
    // Prevent a click of the "Join Server" button from expanding the server.
    event.stopPropagation()
  }

  emojis() {
    const {
      server: {emoji},
    } = this.props
    return emoji.filter(({name}) => !name.includes('tick'))
  }

  renderBlobSample() {
    const emoji = this.emojis()
    const {expanded, sampleIndex} = this.state

    let blobs
    if (expanded) {
      // Show all blobs.
      blobs = emoji
    } else {
      // Show a portion of blobs.
      blobs = emoji.slice(sampleIndex, sampleIndex + RANDOM_SAMPLE_SIZE)
    }

    return blobs.map((blob) => <Emoji key={blob.id} {...blob} />)
  }

  render() {
    const { server } = this.props
    const { expanded } = this.state

    return (
      <div
        className={classnames('server', { expanded })}
        onClick={this.handleClick}
        aria-expanded={expanded}
      >
        <h3>
          <img
            className="icon"
            alt={`${server.name} icon`}
            src={`https://cdn.discordapp.com/icons/${server.id}/${
              server.icon
              }.png?size=64`}
          />
          {server.name}

          <img
            className="expanded-status"
            alt="Show more"
            title="Click to show more blobs from this server!"
            src={chevron}
          />
        </h3>

        <div className="sample">
          {this.renderBlobSample()}
          {!expanded ? <span className="more">...</span> : null}
        </div>
        <a
          href={server.invite}
          target="_blank"
          className="button join-server"
          rel="noopener noreferrer"
          onClick={this.handleJoinClick}
        >
          Join Server
        </a>
      </div>
    )
  }
}

Server.propTypes = {
  server: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    emoji: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        animated: PropTypes.bool.isRequired,
      })
    ).isRequired,
  }).isRequired,
}
