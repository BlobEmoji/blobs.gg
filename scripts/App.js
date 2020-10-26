import React, { useEffect, useState } from 'react'
import Homepage from './pages/homepage'
import { log } from './utils'
import { Emojis } from './emojis'

const BLOBS_ENDPOINT = 'https://api.mousey.app/v3/emoji/blobs+community-blobs'

function App() {
  const [emojis, setEmojis] = useState({ groups: { blobs: { guilds: [] }, 'community-blobs': { guilds: [] } } })
  const [apiData, setApiData] = useState({})

  useEffect(() => {
    if (apiData.hasOwnProperty('blobs')) {
      return
    }
    const fetchData = async () => {
      const resp = await fetch(BLOBS_ENDPOINT)
      const data = await resp.json()
      setApiData(data)
    }
    fetchData()
  }, [apiData])

  useEffect(() => {
    if (!apiData.hasOwnProperty('blobs')) {
      return
    }
    const newEmojis = new Emojis(apiData)
    log('Emojis:', newEmojis)
    setEmojis(newEmojis)
  }, [apiData])

  return (
    <Homepage emojis={emojis} />
  )
}

export default App
