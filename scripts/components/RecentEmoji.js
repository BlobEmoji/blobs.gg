import React from 'react'
import PropTypes from 'prop-types'
import SearchResult from "./SearchResult";


export default class RecentEmoji extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.sortedEmoji = this.sortEmojiNewest(props.data)
    this.count = props.count || 30
  }

  render() {
    return this.sortedEmoji.slice(0, this.count).map((blob) => <SearchResult key={blob.id} blob={blob} />)
  }


  sortEmojiNewest(data) {
    let blobs = []
    for (const servers of Object.values(data)) {
      for (const server of Object.values(servers)) {
        let se = [...server.emoji]
        se.map(blob => {
          blob.server = server.name
          blob.invite = server.invite
        })
        blobs.push(...server.emoji) // get all blobs in a list
      }
    }
    blobs.sort((a, b) => b.id - a.id); // sort blobs, newest first 

    return blobs;
  }
}