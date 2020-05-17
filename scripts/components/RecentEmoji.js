import React from 'react'
import PropTypes from 'prop-types'
import SearchResult from './SearchResult';


export default class RecentEmoji extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    count: PropTypes.number
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
    for (const group of Object.values(data)) {
      for (const server of Object.values(group)) {
        let se = [...server.emoji]
        se.map((blob) => {
          blob.guild = server
          return blob
        })
        blobs.push(...se) // get all blobs in a list
      }
    }
    blobs.sort((a, b) => b.id - a.id); // sort blobs, newest first 

    return blobs;
  }
}