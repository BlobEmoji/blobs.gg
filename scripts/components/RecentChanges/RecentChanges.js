import React, { Component } from 'react'
import SkeletalLoading from './SkeletalLoading'
import RenderChangeSet from './RenderChangeSet'

const HISTORY_ENDPOINT =
  window.location.host.endsWith('now.sh') ||
  process.env.NODE_ENV === 'development'
    ? 'https://api.mousey.app/v3/emoji/test/changes'
    : 'https://api.mousey.app/v3/emoji/blobs+community-blobs/changes'

function historyTransform(historyData) {
  let changes = {}
  for (const change of historyData) {
    if (
      ['EMOJI_CREATE', 'EMOJI_RENAME', 'EMOJI_UPDATE', 'EMOJI_REMOVE'].includes(
        change.event
      )
    ) {
      const date = new Date(change.changed_at)
      const key = [
        change.guild.id,
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
      ]
      changes[key] = changes[key] ?? []
      changes[key].push(change)
    }
  }

  return changes
}

export default class RecentChangesWrapper extends Component {
  constructor(props) {
    super(props)

    this.state = {
      changes: {},
    }
  }

  async fetchMoreChanges() {
    this.setState({ fetching: true })
    const response = await fetch(
      `${HISTORY_ENDPOINT}?before=${this.state.earliest}`
    )
    const json = await response.json()

    if (json.length === 0) {
      // catch end of data stream, this leaves fetching true, preventing any more requests
      return
    }

    let transformed = historyTransform(json)
    let merged = this.state.changes
    for (const key in transformed) {
      if (transformed.hasOwnProperty(key)) {
        const changeSet = transformed[key]
        if (merged.hasOwnProperty(key)) {
          merged[key].push(...changeSet)
        } else {
          merged[key] = changeSet
        }
      }
    }

    this.setState({
      changes: merged,
      earliest: json[json.length - 1].changed_at,
      fetching: false,
    })
  }

  listener = async () => {
    // The total scroll height of the page, minus the height of the screen.
    const ending = document.body.scrollHeight - window.innerHeight

    // `window.scrollY` refers to the distance from the top of the page of
    // the upper border of the viewport.
    if (
      ending - window.scrollY <= window.innerHeight / 2 &&
      !this.state.fetching
    ) {
      await this.fetchMoreChanges()
    }
  }
  componentDidMount = async () => {
    const response = await fetch(HISTORY_ENDPOINT)
    const json = await response.json()
    this.setState({
      changes: historyTransform(json),
      earliest: json[json.length - 1].changed_at,
    })
    window.addEventListener('scroll', this.listener)
    while (
      document.body.scrollHeight < window.innerHeight &&
      !this.state.fetching
    ) {
      // eslint-disable-next-line no-await-in-loop
      await this.fetchMoreChanges()
    }
  }
  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.listener)
  }

  render() {
    const { changes } = this.state
    const randomArrayLength = [3, 4, 5]
    const randomListAmount = [
      ...Array(
        randomArrayLength[Math.floor(Math.random() * randomArrayLength.length)]
      ).keys(),
    ]

    if (Object.keys(changes).length === 0) {
      return (
        <>
          {Object.keys(randomListAmount).map((item) => {
            return <SkeletalLoading key={`${item}-skeleton`} />
          })}
        </>
      )
    }

    return (
      <>
        {Object.keys(changes).map((item) => {
          return <RenderChangeSet changeSet={changes[item]} key={item} />
        })}
      </>
    )
  }
}
