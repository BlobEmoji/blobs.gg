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

    const allGuilds = { ...props.data.guilds, ...props.data.community }

    // Inject `invite` and `server` properties to all emoji objects.
    this.allBlobs = Object.values(allGuilds).reduce(
      (acc, guild) => [
        ...guild.emoji.map((emoji) => ({
          ...emoji,
          invite: guild.invite,
          server: guild.name,
        })),
        ...acc,
      ],
      []
    )
  }

  handleQueryChange = (event) => {
    this.setState({ query: event.currentTarget.value })
  }

  filterBlobs(query) {
    return this.allBlobs
      .filter((blob) => blob.name.includes(query.toLowerCase()))
      .sort(({ name: a }, { name: b }) => a.length - b.length)
      .slice(0, 8 * 5)
  }

  render() {
    const { query } = this.state

    const blobs = query === '' ? [] : this.filterBlobs(query)

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
          <div id="search-results-blobs">
            {blobs.map((blob) => (
              <SearchResult key={blob.id} blob={blob} />
            ))}
          </div>
        </div>
      </React.Fragment>
    )
  }
}
