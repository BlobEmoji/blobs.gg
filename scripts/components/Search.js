import React from 'react'
import PropTypes from 'prop-types'

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
      filters: {
        format: null,
        type: null,
        server: null
      },
    }

    this.allGuilds = { ...props.data.guilds, ...props.data.community }

    // Inject `invite` and `server` properties to all emoji objects.
    // TODO: Unify the invite and server properties into one property.
    //       We need the ID, too!

    this.officialBlobs = Object.values(props.data.guilds).reduce(
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

    this.communityBlobs = Object.values(props.data.community).reduce(
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

    this.allBlobs = [...this.officialBlobs, ...this.communityBlobs]
  }

  getSadBlob() {
    // TODO: Use the server ID once that's injected into emoji objects.
    const blob = this.allBlobs.find(
      ({ server, name }) => server === 'Blob Emoji' && name === 'blobsad'
    )
    return blob == null ? null : <Emoji {...blob} />
  }

  handleQueryChange = (event) => {
    this.setState({ query: event.currentTarget.value })
  }

  handleFilter = (event, key) => {
    this.setState({
      filters: {
        ...this.state.filters,
        [key]: event.currentTarget.value
      }
    })
  }

  filterBlobs(query, { format = 'all', type = 'all', server = 'all' }) {
    const filterFormat = (blob) => {
      if (format === 'static')
        return blob.animated === false
      else if (format === 'animated')
        return blob.animated === true
      else
        return true
    }
    // Function for filtering blobs and non-blobs
    // const filterType = (blob) => {
    //   if (type === 'blob')
    //     return blob.blob === true
    //   else if (type === 'non-blobs')
    //     return blob.blob === false
    //   else
    //     return true
    // }
    if (server === 'official')
      return this.officialBlobs
        .filter((blob) => blob.name.includes(query.toLowerCase()) && filterFormat(blob))
        .sort(({ name: a }, { name: b }) => a.length - b.length)
        .slice(0, 8 * 5)
    else if (server === 'community')
      return this.communityBlobs
        .filter((blob) => blob.name.includes(query.toLowerCase()) && filterFormat(blob))
        .sort(({ name: a }, { name: b }) => a.length - b.length)
        .slice(0, 8 * 5)
    else
      return this.allBlobs
        .filter((blob) => blob.name.includes(query.toLowerCase()) && filterFormat(blob))
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
    const { query, filters } = this.state

    const blobs = query === '' ? [] : this.filterBlobs(query, filters)
    const servers = query === '' ? {} : this.filterServers(query)
    const noResults =
      query !== '' && blobs.length === 0 && Object.keys(servers).length === 0

    return (
      <>
        <input
          id="search-field"
          type="text"
          placeholder="Search for blobs and servers"
          value={query}
          onChange={this.handleQueryChange}
        />
        {blobs.length ? (
          <>
            <select onChange={(e) => this.handleFilter(e, 'format')}>
              <option value='all' selected={filters.format === 'all'}>Filter all formats</option>
              <option value='static' selected={filters.format === 'static'}>Filter static emojis</option>
              <option value='animated' selected={filters.format === 'animated'}>Filter animated emojis</option>
            </select>
            {/* <select onChange={(e) => this.handleFilter(e, 'type')} disabled>
              <option value='all' selected={filters.type === 'all'}>Filter all types</option>
              <option value='blobs' selected={filters.type === 'blobs'}>Filter blobs</option>
              <option value='non-blobs' selected={filters.type === 'non-blobs'}>Filter non-blobs</option>
            </select> */}
            <select onChange={(e) => this.handleFilter(e, 'server')}>
              <option value='all' selected={filters.server === 'all'}>Filter all servers</option>
              <option value='official' selected={filters.server === 'official'}>Filter official servers</option>
              <option value='community' selected={filters.server === 'community'}>Filter community servers</option>
            </select>
          </>
        ) : null}
        <div id="search-results">
          {noResults ? (
            <div className="no-results">No results. {this.getSadBlob()}</div>
          ) : null}
          <div id="search-results-servers">
            <Servers servers={servers} />
          </div>
          <div id="search-results-blobs">
            {blobs.map((blob) => (
              <SearchResult key={blob.id} blob={blob} />
            ))}
          </div>
        </div>
      </>
    )
  }
}
