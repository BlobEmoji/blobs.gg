import React from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash.debounce'
import { Guilds } from './Guilds'
import SearchResult from './SearchResult'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import makeStyles from '@material-ui/core/styles/makeStyles'
import MaterialEmoji from './material/MaterialEmoji'

const useStyles = makeStyles({
  noResults: {
    margin: '3rem 0',
    textAlign: 'center',
  },
})

function insensitiveIncludes(haystack, needle) {
  return haystack.toLowerCase().includes(needle.toLowerCase())
}

function Contents(props) {
  const classes = useStyles()
  if (props.hasResults) {
    return (
      <>
        <div id="search-results-guilds">
          <Guilds guilds={props.filteredGuilds} />
        </div>
        <div id="search-results-blobs">
          {props.filteredBlobs.map((blob) => (
            <SearchResult key={blob.id} blob={blob} />
          ))}
        </div>
      </>
    )
  }

  if (props.hideNoResults) {
    return null
  }

  return (
    <Box className={classes.noResults}>No results. {<MaterialEmoji baseSize={32} {...props.sadBlob} />}</Box>
  )
}

Contents.propTypes = {
  hasResults: PropTypes.bool.isRequired,
  filteredGuilds: PropTypes.array.isRequired,
  filteredBlobs: PropTypes.array.isRequired,
  hideNoResults: PropTypes.bool.isRequired,
  sadBlob: PropTypes.object.isRequired,
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
        emoji.guild.id === '272885620769161216' && emoji.name === 'blobsad',
    )
    return sadBlob == null ? null : sadBlob
  }

  handleQueryChange = (event, querySearch) => {
    const value = querySearch ? querySearch : event.currentTarget.value

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

  componentDidMount() {
    let search = new URL(window.location).searchParams
    if (search.has('name')) {
      this.handleQueryChange(null, search.get('name'))
    }
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
        <TextField
          type="text"
          placeholder="Search for blobs and servers"
          value={query}
          onChange={this.handleQueryChange}
          fullWidth
          variant="filled"
          color="secondary"
        />
        <Box>
          <Contents
            hasResults={hasResults}
            filteredBlobs={filteredBlobs}
            filteredGuilds={filteredGuilds}
            hideNoResults={hideNoResults}
            sadBlob={this.getSadBlob()}
          />
        </Box>
      </>
    )
  }
}
