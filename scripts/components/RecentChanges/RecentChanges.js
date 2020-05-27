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
      fetching: false,
    }
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const a = { ...this.state }
    delete a.fetching
    delete nextState.fetching

    return JSON.stringify(a) !== JSON.stringify(nextState)
  }

  async fetchMoreChanges() {
    let i,
      j,
      chunk = 5

    if (this.state.fetching) {
      console.error("Don't call fetchMoreChanges when already fetching")
      return
    }

    let merged = JSON.parse(JSON.stringify(this.state.changes))
    await this.setState({ fetching: true })
    const response = await fetch(
      `${HISTORY_ENDPOINT}?before=${this.state.earliest}`
    )
    const json = await response.json()

    if (json.length === 0) {
      // catch end of data stream, this leaves fetching true, preventing any more requests
      return
    }

    let transformed = historyTransform(json)
    for (const [key, value] of Object.entries(transformed)) {
      const changeSet = value
      if (merged.hasOwnProperty(key)) {
        if (changeSet.length > 5) {
          for (i = 0, j = changeSet.length; i < j; i += chunk) {
            let chunkData = changeSet.slice(i, i + chunk)
            merged[key].push(...chunkData)
            // eslint-disable-next-line no-await-in-loop
            await this.setState({ changes: merged })
          }
        } else {
          merged[key].push(...changeSet)
          // eslint-disable-next-line no-await-in-loop
          await this.setState({ changes: merged })
        }
      } else {
        merged[key] = changeSet
        // eslint-disable-next-line no-await-in-loop
        await this.setState({ changes: merged })
      }
    }

    await this.setState({
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
      this.state.fetching === false
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

    let before = performance.now()
    await this.screenHeight()
    let after = performance.now()

    console.log(`Mount Screen took ${after - before}ms`)

    window.addEventListener('scroll', this.listener)
  }

  screenHeight = async () => {
    if (
      document.body.scrollHeight < window.innerHeight &&
      !this.state.fetching
    ) {
      await this.fetchMoreChanges()
      await this.screenHeight()
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
