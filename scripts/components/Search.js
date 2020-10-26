import React from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash.debounce'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import makeStyles from '@material-ui/core/styles/makeStyles'
import MaterialEmoji from './material/MaterialEmoji'
import { Guilds } from './material/guilds'
import CircularProgress from '@material-ui/core/CircularProgress'
import Tooltip from '@material-ui/core/Tooltip'

const useStyles = makeStyles({
  noResults: {
    margin: '3rem 0',
    textAlign: 'center',
  },
  guilds: {
    marginTop: '1rem',
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
        <Guilds guilds={props.filteredGuilds} className={classes.guilds} />
        {props.filteredBlobs.map((blob) => (
          <MaterialEmoji key={blob.id} invite showGuild {...blob} />
        ))}
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

class Search extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      query: '',
      isDebouncing: false,
      filteredBlobs: [],
      filteredGuilds: [],
      allEmoji: [],
      allGuilds: [],
      loading: true,
    }
  }

  getSadBlob() {
    const sadBlob = this.state.allEmoji.find(
      (emoji) =>
        emoji.guild.id === '272885620769161216' && emoji.name === 'blobsad',
    )
    return sadBlob == null ? null : sadBlob
  }

  calculateResultsDebounced = debounce(this.calculateResults, 150)

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
    return this.state.allEmoji
      .filter((blob) => insensitiveIncludes(blob.name, query))
      .sort(({ name: a }, { name: b }) => a.length - b.length)
      .slice(0, 8 * 5)
  }

  filterGuilds(query) {
    return this.state.allGuilds
      .filter((guild) => insensitiveIncludes(guild.name, query))
      .slice(0, 3)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.emojis !== prevProps.emojis) {
      // Calculate these values once, as they are fairly large.
      const allEmoji = this.props.emojis.getAllEmoji()
      const allGuilds = this.props.emojis.getAllGuilds()
      this.setState({ allEmoji: allEmoji, allGuilds: allGuilds, loading: false })
    }
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
        <Tooltip title={this.state.loading ? 'Loading' : ''} arrow>
          <TextField
            disabled={this.state.loading}
            type="text"
            placeholder="Search for blobs and servers"
            value={query}
            onChange={this.handleQueryChange}
            fullWidth
            variant="filled"
            color="secondary"
            InputProps={{
              endAdornment: this.state.loading ? <CircularProgress /> : null,
            }}
          />
        </Tooltip>
        <Box>
          {!this.state.loading && <Contents
            hasResults={hasResults}
            filteredBlobs={filteredBlobs}
            filteredGuilds={filteredGuilds}
            hideNoResults={hideNoResults}
            sadBlob={this.getSadBlob()}
          />}
        </Box>
      </>
    )
  }
}

Search.propTypes = {
  emojis: PropTypes.object.isRequired,
}

export default Search
