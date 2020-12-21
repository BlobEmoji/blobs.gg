import React from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash.debounce'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import makeStyles from '@material-ui/core/styles/makeStyles'
import MaterialEmoji from './material/MaterialEmoji'
import Guilds from './material/guilds'
import CircularProgress from '@material-ui/core/CircularProgress'
import Tooltip from '@material-ui/core/Tooltip'
import Pagination from '@material-ui/lab/Pagination'

const useStyles = makeStyles({
  noResults: {
    margin: '3rem 0',
    textAlign: 'center',
  },
  guilds: {
    marginTop: '1rem',
  },
  paginationNav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '1rem',
  },
  blobSearchResult: {
    height: '64px',
    width: '64px',
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
        <Guilds guilds={props.filteredGuilds} className={classes.guilds} skeletonCount={0} />
        <Box display="flex" flexWrap="wrap" justifyContent="center">
          {props.filteredBlobs.map((blob) => (
            <MaterialEmoji className={classes.blobSearchResult} key={blob.id} invite showGuild {...blob} />
          ))}
        </Box>
        {(props.totalPages > 1) &&
        <Pagination
          className={classes.paginationNav}
          count={props.totalPages}
          page={props.page}
          onChange={props.onPageChange}
        />
        }
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
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
}

class Search extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      query: '',
      page: 1,
      totalPages: 1,
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

  handlePageChange = (event, newPage) => {
    const { query } = this.state
    this.handleQueryChange(event, query, newPage)
  }

  handleQueryChange = (event, querySearch, newPage) => {
    const value = querySearch ? querySearch : event.currentTarget.value
    const page = newPage ? newPage : 1

    this.setState({
      query: value,
      page: page,
      isDebouncing: true,
    })

    if (value.length <= 3) {
      this.calculateResultsDebounced()
    } else {
      this.calculateResults()
    }
  }

  calculateResults() {
    this.setState(({ query, page }) => {
      if (query === '') {
        return { page: 1, totalPages: 1, filteredBlobs: [], filteredGuilds: {}, isDebouncing: false }
      }

      return {
        filteredBlobs: this.filterBlobs(query, page),
        filteredGuilds: this.filterGuilds(query, page),
        totalPages: this.getTotalPages(query),
        isDebouncing: false,
      }
    })
  }

  filterBlobs(query, page) {
    return this.state.allEmoji
      .filter((blob) => insensitiveIncludes(blob.name, query))
      .sort(({ name: a }, { name: b }) => a.length - b.length)
      .slice(8 * 5 * (page - 1), 8 * 5 * page)
  }

  filterGuilds(query, page) {
    return this.state.allGuilds
      .filter((guild) => insensitiveIncludes(guild.name, query))
      .slice(3 * (page - 1), 3 * page)
  }

  getTotalPages(query) {
    const totalEmojiPages = Math.ceil((this.state.allEmoji)
      .filter((blob) => insensitiveIncludes(blob.name, query))
      .length / 40)
    const totalGuildPages = Math.ceil((this.state.allGuilds)
      .filter((guild) => insensitiveIncludes(guild.name, query))
      .length / 3)
    return Math.max(totalEmojiPages, totalGuildPages)
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.emojis !== prevProps.emojis) {
      // Calculate these values once, as they are fairly large.
      const allEmoji = this.props.emojis.getAllEmoji()
      const allGuilds = this.props.emojis.getAllGuilds()
      this.setState({ allEmoji: allEmoji, allGuilds: allGuilds, loading: false }, () => {
        let search = new URL(window.location).searchParams
        if (search.has('name')) {
          this.handleQueryChange(null, search.get('name'))
        }
      })
    }
  }

  componentDidMount() {
    if (this.props.emojis.groups.blobs.guilds.length > 0) {
      // Calculate these values once, as they are fairly large.
      const allEmoji = this.props.emojis.getAllEmoji()
      const allGuilds = this.props.emojis.getAllGuilds()
      this.setState({ allEmoji: allEmoji, allGuilds: allGuilds, loading: false })
    }
  }

  render() {
    const { query, page, totalPages, filteredBlobs, filteredGuilds, isDebouncing } = this.state

    const hasResults =
      totalPages !== 0 &&
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
            page={page}
            totalPages={totalPages}
            onPageChange={this.handlePageChange}
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
