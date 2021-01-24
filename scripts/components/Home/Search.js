import React from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash.debounce'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Emoji from '../Emoji'
import Guilds from './Guilds'
import CircularProgress from '@material-ui/core/CircularProgress'
import Tooltip from '@material-ui/core/Tooltip'
import Pagination from '@material-ui/lab/Pagination'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'

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
    justifyContent: 'center',
    marginTop: '1rem',
  },
  filterContainer: {
    marginTop: '0.5rem',
  },
  formControl: {
    minWidth: '12.5rem',
    marginRight: '1rem'
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
        <Guilds
          guilds={props.filteredGuilds}
          className={classes.guilds}
          skeletonCount={0}
        />
        <Box
          display="grid"
          justifyContent="space-between"
          gridTemplateColumns="repeat(auto-fill, 96px)"
        >
          {props.filteredBlobs.map((blob) => (
            <Emoji key={blob.id} invite showGuild {...blob} enlarge />
          ))}
        </Box>
        {props.totalPages > 1 && (
          <Pagination
            className={classes.paginationNav}
            count={props.totalPages}
            page={props.page}
            onChange={props.onPageChange}
          />
        )}
      </>
    )
  }

  if (props.hideNoResults) {
    return null
  }

  return (
    <div className={classes.noResults}>
      No results. {<Emoji baseSize={32} {...props.sadBlob} />}
    </div>
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

function Filters(props) {
  const classes = useStyles()
  if (props.hasQuery) {
    return (
      <div className={classes.filterContainer}>
        <FormControl className={classes.formControl}>
          <InputLabel>Filter emojis by format</InputLabel>
          <Select defaultValue='all' onChange={props.onFilterChange}>
            <MenuItem value='all'>
                All
            </MenuItem>
            <MenuItem value='static'>
                Static
            </MenuItem>
            <MenuItem value='animated'>
                Animated
            </MenuItem>
            <MenuItem value='none'>
                None
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel>Filter servers by type</InputLabel>
          <Select defaultValue='all'>
            <MenuItem value='all'>
                All
            </MenuItem>
            <MenuItem value='official'>
                Official
            </MenuItem>
            <MenuItem value='community'>
                Community
            </MenuItem>
          </Select>
        </FormControl>
      </div>
    )
  } 
  
  return null;
}

Filters.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  hasQuery: PropTypes.bool.isRequired,
}

class Search extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      query: '',
      page: 1,
      totalPages: 1,
      filters: {
        format: 'all',
        guild: 'all',
      },
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
        emoji.guild.id === '272885620769161216' && emoji.name === 'blobsad'
    )
    return sadBlob == null ? null : sadBlob
  }

  calculateResultsDebounced = debounce(this.calculateResults, 150)

  handlePageChange = (event, newPage) => {
    const { query } = this.state
    this.handleQueryChange(event, query, newPage)
  }

  handleFilter = (event, key) => {
    const { query, page } = this.state
    this.setState({
      filters: {
        ...this.state.filters,
        [key]: event.target.value
      }
    })
    this.handleQueryChange(null, query, page)
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
    this.setState(({ query, page, filters }) => {
      if (query === '') {
        return {
          page: 1,
          totalPages: 1,
          filteredBlobs: [],
          filteredGuilds: {},
          isDebouncing: false,
        }
      }

      return {
        filteredBlobs: this.filterBlobs(query, page, filters),
        filteredGuilds: this.filterGuilds(query, page, filters),
        totalPages: this.getTotalPages(query, filters),
        isDebouncing: false,
      }
    })
  }

  filterBlobs(query, page, filters) {
    const filterFormat = (blob) => {
      if (filters.format === 'static') {
        return blob.animated === false
      } else if (filters.format === 'animated') {
        return blob.animated === true
      } else if (filters.format === 'none') {
        return false
      }

      return true
    }
    
    return this.state.allEmoji
      .filter((blob) => insensitiveIncludes(blob.name, query) && filterFormat(blob))
      .sort(({ name: a }, { name: b }) => a.length - b.length)
      .slice(8 * 5 * (page - 1), 8 * 5 * page)
  }

  filterGuilds(query, page, filters) {
    /*
    const filterGuildType = (guild) => {
      return true
    }
    */

    return this.state.allGuilds
      .filter((guild) => insensitiveIncludes(guild.name, query))
      .slice(3 * (page - 1), 3 * page)
  }

  getTotalPages(query, filters) {
    const filterFormat = (blob) => {
      if (filters.format === 'static') {
        return blob.animated === false
      } else if (filters.format === 'animated') {
        return blob.animated === true
      } 

      return true
    }

    const totalEmojiPages = Math.ceil(
      this.state.allEmoji.filter((blob) =>
        insensitiveIncludes(blob.name, query) && filterFormat(blob)
      ).length / 40
    )
    const totalGuildPages = Math.ceil(
      this.state.allGuilds.filter((guild) =>
        insensitiveIncludes(guild.name, query)
      ).length / 3
    )
    return Math.max(totalEmojiPages, totalGuildPages)
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.emojis !== prevProps.emojis) {
      // Calculate these values once, as they are fairly large.
      const allEmoji = this.props.emojis.getAllEmoji()
      const allGuilds = this.props.emojis.getAllGuilds()
      this.setState(
        { allEmoji: allEmoji, allGuilds: allGuilds, loading: false },
        () => {
          let search = new URL(window.location).searchParams
          if (search.has('name')) {
            this.handleQueryChange(null, search.get('name'))
          }
        }
      )
    }
  }

  componentDidMount() {
    if (this.props.emojis.groups.blobs.guilds.length > 0) {
      // Calculate these values once, as they are fairly large.
      const allEmoji = this.props.emojis.getAllEmoji()
      const allGuilds = this.props.emojis.getAllGuilds()
      console.log(allGuilds);
      this.setState({
        allEmoji: allEmoji,
        allGuilds: allGuilds,
        loading: false,
      })
    }
  }

  render() {
    const {
      query,
      page,
      totalPages,
      filteredBlobs,
      filteredGuilds,
      isDebouncing,
    } = this.state

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
              disableUnderline: true,
            }}
          />
        </Tooltip>
        <div>
          {!this.state.loading && (
            <>
              <Filters
                onFilterChange={(e) => this.handleFilter(e, 'format')}
                hasQuery={this.state.query !== ''}
              />
              <Contents
                hasResults={hasResults}
                filteredBlobs={filteredBlobs}
                filteredGuilds={filteredGuilds}
                hideNoResults={hideNoResults}
                sadBlob={this.getSadBlob()}
                page={page}
                totalPages={totalPages}
                onPageChange={this.handlePageChange}
              />
            </>
          )}
        </div>
      </>
    )
  }
}

Search.propTypes = {
  emojis: PropTypes.object.isRequired,
}

export default Search
