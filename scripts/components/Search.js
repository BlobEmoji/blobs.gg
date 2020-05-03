import React from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash.debounce'

import { log } from '../utils'
import Emoji from './Emoji'
import { Servers } from './Servers'
import SearchResult from './SearchResult'
import { fromEntries } from '../utils'

export default class Search extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      query: '',

      isDebouncing: false,
      blobs: [],
      servers: {},
    }

    this.allGuilds = Object.assign({}, ...Object.values(props.data))

    // Inject `invite` and `server` properties to all emoji objects.
    // TODO: Unify the invite and server properties into one property.
    //       We need the ID, too!
    this.allBlobs = Object.values(this.allGuilds).reduce(
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

    this.calculateResultsDebounced = debounce(this.calculateResults, 150)
  }

  getSadBlob() {
    // TODO: Use the server ID once that's injected into emoji objects.
    const blob = this.allBlobs.find(
      ({ server, name }) => server === 'Blob Emoji' && name === 'blobsad'
    )
    return blob == null ? null : <Emoji {...blob} />
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
        return { blobs: [], servers: {}, isDebouncing: false }
      }

      return {
        blobs: this.filterBlobs(query),
        servers: this.filterServers(query),
        isDebouncing: false,
      }
    })
  }

  filterBlobs(query) {
    return this.allBlobs
      .filter((blob) => blob.name.includes(query.toLowerCase()))
      .sort(({ name: a }, { name: b }) => a.length - b.length)
      .slice(0, 8 * 5)
  }

  filterServers(query) {
    return fromEntries(
      Object.entries(this.allGuilds)
        .filter(([id, guild]) =>
          guild.name.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 3)
    )
  }

  render() {
    const { query, blobs, servers, isDebouncing } = this.state

    const hasResults =
      blobs != null &&
      servers != null &&
      (blobs.length !== 0 || Object.keys(servers).length !== 0)
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
                  <Servers servers={servers} />
                </div>
                <div id="search-results-blobs">
                  {blobs.map((blob) => (
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
