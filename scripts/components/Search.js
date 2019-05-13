import React from 'react'
import PropTypes from 'prop-types'

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
    }

    this.allGuilds = { ...props.data.guilds, ...props.data.community }

    // Inject `invite` and `server` properties to all emoji objects.
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
    const { query } = this.state

    const blobs = query === '' ? [] : this.filterBlobs(query)
    const servers = query === '' ? {} : this.filterServers(query)

    return (
      <React.Fragment>
        <input
          id="search-field"
          type="text"
          placeholder="Search for blobs and servers"
          value={query}
          onChange={this.handleQueryChange}
        />
        <div id="search-results">
          <div id="search-results-servers">
            <Servers servers={servers} />
          </div>
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
