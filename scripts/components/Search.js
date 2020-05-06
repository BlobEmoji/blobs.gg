import React from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash.debounce'

import Emoji from './Emoji'
import { Guilds } from './Guilds'
import SearchResult from './SearchResult'
import SearchPage from './SearchPage'

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
      currentPage: 1,
      isDebouncing: false,
      filteredBlobs: [],
      filteredGuilds: {},
      searchPages: [],
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
      currentPage: 1,
      isDebouncing: true,
    })

    if (value.length <= 3) {
      this.calculateResultsDebounced()
    } else {
      this.calculateResults()
    }
  }

  handlePageChange = (event) => {
    const page = event.currentTarget.value

    this.setState({
      currentPage: parseInt(page, 10),
      isDebouncing: true,
    })

    if (this.state.query.length <= 3) {
      this.calculateResultsDebounced()
    } else {
      this.calculateResults()
    }
  }

  calculateResults() {
    this.setState(({ query, currentPage }) => {
      if (query === '') {
        return { currentPage: 1, filteredBlobs: [], filteredGuilds: {}, searchPages: [], isDebouncing: false }
      }

      return {
        filteredBlobs: this.filterBlobs(query, currentPage),
        filteredGuilds: this.filterGuilds(query, currentPage),
        searchPages: this.getPages(query),
        isDebouncing: false,
      }
    })
  }

  filterBlobs(query, page) {
    return this.allEmoji
      .filter((blob) => insensitiveIncludes(blob.name, query))
      .sort(({ name: a }, { name: b }) => a.length - b.length)
      .slice(40 * (page - 1), (8 * 5) * page)
  }

  filterGuilds(query, page) {
    return this.allGuilds
      .filter((guild) => insensitiveIncludes(guild.name, query))
      .slice(3 * (page - 1), 3 * page)
  }

  getPages(query) {
    let pageArray = [];
    const totalFilteredBlobs = this.allEmoji.filter((blob) => insensitiveIncludes(blob.name, query));
    for (let i = 1; i <= Math.ceil(totalFilteredBlobs.length / 40); i++) {
      pageArray.push(i);
    }
    return pageArray;
  }

  render() {
    const { query, currentPage, filteredBlobs, filteredGuilds, searchPages, isDebouncing } = this.state

    const hasResults =
      filteredBlobs != null &&
      filteredGuilds != null &&
      searchPages != null &&
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
              <div id="search-results-guilds">
                <Guilds guilds={filteredGuilds} />
              </div>
              <div id="search-results-blobs">
                {filteredBlobs.map((blob) => (
                  <SearchResult key={blob.id} blob={blob} />
                ))}
              </div>
              {searchPages.length > 1 ? (
                <div id="search-results-pages">
                  {searchPages.map((page) => (
                    <SearchPage key={page} className={page === currentPage ? 'selected' : null} page={page} value={page} onClick={this.handlePageChange} />
                  ))}
                </div>
              ) : null}
            </>
          )}
        </div>
      </>
    )
  }
}
