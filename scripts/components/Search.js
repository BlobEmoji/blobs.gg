import React from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash.debounce'

import Emoji from './Emoji'
import { Servers } from './Servers'
import SearchResult from './SearchResult'

function insensitiveIncludes(haystack, needle) {
  return haystack.toLowerCase().includes(needle.toLowerCase())
}

export default class Search extends React.Component {
  static propTypes = {
    emojis: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      query: '',
      isDebouncing: false,
      filteredBlobs: [],
      filteredGuilds: {},
    }

    // Calculate these values once, as they are fairly large.
    this.allEmoji = this.props.emojis.getAllEmoji()
    this.allGuilds = this.props.emojis.getAllGuilds()

    this.calculateResultsDebounced = debounce(this.calculateResults, 150)
  }

  getSadBlob() {
    const sadBlob = this.allEmoji.find(
      (emoji) =>
        emoji.guild.id === '272885620769161216' && emoji.name === 'blobsad'
    )
    return sadBlob == null ? null : <Emoji {...sadBlob} />
  }

  handleQueryChange = (event) => {
    const value = event.currentTarget.value

    this.setState({
      query: value,
      isDebouncing: true,
    })

    if (value.length <= 3) {
      this.calculateResultsDebounced()
    } else {
      this.calculateResults()
    }
  }

  calculateResults() {
    this.setState(({ query }) => {
      if (query === '') {
        return { filteredBlobs: [], filteredGuilds: {}, isDebouncing: false }
      }

      return {
        filteredBlobs: this.filterBlobs(query),
        filteredGuilds: this.filterGuilds(query),
        isDebouncing: false,
      }
    })
  }

  filterBlobs(query) {
    return this.allEmoji
      .filter((blob) => insensitiveIncludes(blob.name, query))
      .sort(({ name: a }, { name: b }) => a.length - b.length)
      .slice(0, 8 * 5)
  }

  filterGuilds(query) {
    return this.allGuilds
      .filter((guild) => insensitiveIncludes(guild.name, query))
      .slice(0, 3)
  }

  render() {
    const { query, filteredBlobs, filteredGuilds, isDebouncing } = this.state

    const hasResults =
      filteredBlobs != null &&
      filteredGuilds != null &&
      (filteredBlobs.length !== 0 || Object.keys(filteredGuilds).length !== 0)
    const hideNoResults = query.length === 0 || isDebouncing

    return (
      <>
        <input
          id="search-field"
          type="text"
          placeholder="Search for blobs and servers"
          value={query}
          onChange={this.handleQueryChange}
        />
        <div id="search-results">
          {!hasResults ? (
            hideNoResults ? null : (
              <div className="no-results">No results. {this.getSadBlob()}</div>
            )
          ) : (
            <>
              <div id="search-results-servers">
                <Servers servers={filteredGuilds} />
              </div>
              <div id="search-results-blobs">
                {filteredBlobs.map((blob) => (
                  <SearchResult key={blob.id} blob={blob} />
                ))}
              </div>
            </>
          )}
        </div>
      </>
    )
  }
}
