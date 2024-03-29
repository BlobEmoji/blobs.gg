import React from "react";
import PropTypes from "prop-types";
import debounce from "lodash.debounce";
import TextField from "@mui/material/TextField";
import Emoji from "../Emoji";
import Guilds from "./Guilds";
import CircularProgress from "@mui/material/CircularProgress";
import Tooltip from "@mui/material/Tooltip";
import Pagination from "@mui/material/Pagination";

function insensitiveIncludes(haystack, needle) {
  return haystack.toLowerCase().includes(needle.toLowerCase());
}

function Contents(props) {
  if (props.hasResults) {
    return (
      <>
        <Guilds
          guilds={props.filteredGuilds}
          css={{ marginTop: "1rem" }}
          skeletonCount={0}
        />
        <div
          css={{
            display: "grid",
            justifyContent: "space-between",
            gridTemplateColumns: "repeat(auto-fill, 96px)",
          }}
        >
          {props.filteredBlobs.map((blob) => (
            <Emoji key={blob.id} invite showGuild {...blob} enlarge />
          ))}
        </div>
        {props.totalPages > 1 && (
          <Pagination
            css={{
              display: "flex",
              justifyContent: "center",
              marginTop: "1rem",
            }}
            count={props.totalPages}
            page={props.page}
            onChange={props.onPageChange}
          />
        )}
      </>
    );
  }

  if (props.hideNoResults) {
    return null;
  }

  return (
    <div
      css={{
        margin: "3rem 0",
        textAlign: "center",
      }}
    >
      No results. {<Emoji baseSize={32} {...props.sadBlob} />}
    </div>
  );
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
};

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      page: 1,
      totalPages: 1,
      isDebouncing: false,
      filteredBlobs: [],
      filteredGuilds: [],
      allEmoji: [],
      allGuilds: [],
      loading: true,
    };
  }

  getSadBlob() {
    const sadBlob = this.state.allEmoji.find(
      (emoji) =>
        emoji.guild.id === "272885620769161216" && emoji.name === "blobsad"
    );
    return sadBlob == null ? null : sadBlob;
  }

  calculateResultsDebounced = debounce(this.calculateResults, 150);

  handlePageChange = (event, newPage) => {
    const { query } = this.state;
    this.handleQueryChange(event, query, newPage);
  };

  handleQueryChange = (event, querySearch, newPage) => {
    const value = querySearch ? querySearch : event.currentTarget.value;
    const page = newPage ? newPage : 1;

    this.setState({
      query: value,
      page: page,
      isDebouncing: true,
    });

    if (value.length <= 3) {
      this.calculateResultsDebounced();
    } else {
      this.calculateResults();
    }
  };

  calculateResults() {
    this.setState(({ query, page }) => {
      if (query === "") {
        return {
          page: 1,
          totalPages: 1,
          filteredBlobs: [],
          filteredGuilds: [],
          isDebouncing: false,
        };
      }

      return {
        filteredBlobs: this.filterBlobs(query, page),
        filteredGuilds: this.filterGuilds(query, page),
        totalPages: this.getTotalPages(query),
        isDebouncing: false,
      };
    });
  }

  filterBlobs(query, page) {
    return this.state.allEmoji
      .filter((blob) => insensitiveIncludes(blob.name, query))
      .sort(({ name: a }, { name: b }) => a.length - b.length)
      .slice(8 * 5 * (page - 1), 8 * 5 * page);
  }

  filterGuilds(query, page) {
    return this.state.allGuilds
      .filter((guild) => insensitiveIncludes(guild.name, query))
      .slice(3 * (page - 1), 3 * page);
  }

  getTotalPages(query) {
    const totalEmojiPages = Math.ceil(
      this.state.allEmoji.filter((blob) =>
        insensitiveIncludes(blob.name, query)
      ).length / 40
    );
    const totalGuildPages = Math.ceil(
      this.state.allGuilds.filter((guild) =>
        insensitiveIncludes(guild.name, query)
      ).length / 3
    );
    return Math.max(totalEmojiPages, totalGuildPages);
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.emojis !== prevProps.emojis) {
      // Calculate these values once, as they are fairly large.
      const allEmoji = this.props.emojis.getAllEmoji();
      const allGuilds = this.props.emojis.getAllGuilds();
      this.setState(
        { allEmoji: allEmoji, allGuilds: allGuilds, loading: false },
        () => {
          let search = new URL(window.location).searchParams;
          if (search.has("name")) {
            this.handleQueryChange(null, search.get("name"));
          }
        }
      );
    }
  }

  componentDidMount() {
    if (this.props.emojis.groups.blobs.guilds.length > 0) {
      // Calculate these values once, as they are fairly large.
      const allEmoji = this.props.emojis.getAllEmoji();
      const allGuilds = this.props.emojis.getAllGuilds();
      this.setState({
        allEmoji: allEmoji,
        allGuilds: allGuilds,
        loading: false,
      });
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
    } = this.state;

    const hasResults =
      totalPages !== 0 &&
      filteredBlobs != null &&
      filteredGuilds != null &&
      (filteredBlobs.length !== 0 || Object.keys(filteredGuilds).length !== 0);
    const hideNoResults = query.length === 0 || isDebouncing;

    return (
      <>
        <Tooltip title={this.state.loading ? "Loading" : ""} arrow>
          <TextField
            name="Search for blobs and servers"
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
            inputProps={{
              "aria-label": "Search for blobs and servers",
            }}
          />
        </Tooltip>
        <div>
          {!this.state.loading && (
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
          )}
        </div>
      </>
    );
  }
}

Search.propTypes = {
  emojis: PropTypes.object.isRequired,
};

export default Search;
