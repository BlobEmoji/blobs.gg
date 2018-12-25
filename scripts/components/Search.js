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

    return Object.entries(Object.values(guilds)).reduce(
      (acc, [index, guild]) => [
        ...guild.emoji.map((emoji) => ({
          ...emoji,
          invite: `https://${parseInt(index) + 1}.blobs.gg`,
        })),
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
    const { query } = this.state

    let results
    if (query === '') {
      results = this.allBlobs()
        .filter(({ name }) => name.includes('blobs'))
        .slice(0, 8 * 5)
    } else {
      results = this.filterBlobs()
    }

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
