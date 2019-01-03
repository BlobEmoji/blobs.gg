import React from 'react'
import PropTypes from 'prop-types'

import SearchResult from './SearchResult'

export default class Search extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      query: '',
    }
  }

  handleQueryChange = (event) => {
    this.setState({ query: event.currentTarget.value })
  }

  allBlobs() {
    const {
      data: { guilds },
    } = this.props

    // Inject an `invite` property to all emoji objects, so that they may be
    // linked to.
    return Object.values(guilds).reduce(
      (acc, guild) => [
        ...guild.emoji.map((emoji) => ({ ...emoji, invite: guild.invite })),
        ...acc,
      ],
      []
    )
  }

  filterBlobs() {
    const { query } = this.state

    return this.allBlobs()
      .filter((blob) => blob.name.includes(query.toLowerCase()))
      .slice(0, 8 * 5)
      .sort(({ name: a }, { name: b }) => {
        // Sort alphabetically by name.

        if (a < b) {
          return -1
        }
        if (a > b) {
          return 1
        }
        return 0
      })
  }

  render() {
    const { query, hasTyped } = this.state

    const results = query === '' ? [] : this.filterBlobs()

    return (
      <React.Fragment>
        <input
          id="search-field"
          type="text"
          placeholder="Search blobs..."
          value={query}
          onChange={this.handleQueryChange}
        />
        <div id="search-results">
          {results.map((blob) => (
            <SearchResult key={blob.id} blob={blob} />
          ))}
        </div>
      </React.Fragment>
    )
  }
}
