import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Emoji from './Emoji'
import ServerIcon from './ServerIcon'
import chevron from '../../assets/chevron-down-solid.svg'
import { shuffleArray } from '../utils'

const RANDOM_SAMPLE_SIZE = 6

export default class Server extends React.Component {
  constructor(props) {
    super(props)

    // When the panel is not expanded, we show a random selection of blobs.
    // Here, we determine at which index we should select random blobs from.
    this.state = {
      expanded: false,
      randomSample: shuffleArray(this.emoji).slice(0, RANDOM_SAMPLE_SIZE),
    }
  }

  get emoji() {
    return this.props.server.emoji
  }

  get empty() {
    return this.props.server.emoji.length === 0
  }

  get expandable() {
    return this.props.server.emoji.length > RANDOM_SAMPLE_SIZE
  }

  handleClick = () => {
    if (!this.expandable) {
      return
    }

    this.setState(({ expanded }) => ({ expanded: !expanded }))
  }

  handleJoinClick = (event) => {
    // Prevent a click of the "Join Server" button from expanding the server.
    event.stopPropagation()
  }

  renderBlobSample() {
    const { expanded, randomSample } = this.state

    // Show all emoji when expanded, or else show a random sample.
    let blobs = expanded ? this.emoji : randomSample

    return blobs.map((blob) => <Emoji key={blob.id} baseSize={32} {...blob} />)
  }

  render() {
    const { server } = this.props
    const { expanded } = this.state

    const sample = (
      <>
        {!this.empty && this.renderBlobSample()}
        {!expanded && this.expandable ? (
          <span className="more">...</span>
        ) : null}
      </>
    )

    return (
      <div
        className={classnames('server', {
          expanded,
          expandable: this.expandable,
        })}
        onClick={this.handleClick}
        aria-expanded={expanded}
      >
        <h3>
          <ServerIcon server={server} />
          <span className="name" title={server.name}>
            {server.name}
          </span>

          {this.expandable && (
            <img
              className="expanded-status"
              alt="Show more"
              title="Click to show more blobs from this server!"
              src={chevron}
            />
          )}
        </h3>

        <div className="sample">{sample}</div>
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
