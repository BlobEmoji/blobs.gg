import React, { useEffect, useMemo, useState } from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import CssBaseline from '@material-ui/core/CssBaseline'
import Homepage from './pages/homepage'
import { calculateEmojiCount, getDefaultHourFormat, getKeyWrapper, log } from './utils'
import { Emojis } from './emojis'
import Changepage from './pages/changepage'
import Header from './components/Header'
import Container from '@material-ui/core/Container'
import grey from '@material-ui/core/colors/grey'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import SettingsDialog from './components/SettingsDialog'
import green from '@material-ui/core/colors/green'
import ReactGA from 'react-ga'
import { createBrowserHistory } from 'history'

function getConfig() {
  let prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)', {
    noSsr: true,
  })
  const defaultHoursFormat = getDefaultHourFormat()
  const [resPDM, resPDMLS] = getKeyWrapper('darkTheme', prefersDarkMode)
  const [resHF, resHFLS] = getKeyWrapper('prefers12Hour', defaultHoursFormat)
  return { prefersDarkMode: resPDM, prefersHour12: resHF }
}

const BLOBS_ENDPOINT = 'https://api.mousey.app/v3/emoji/blobs+community-blobs'
const history = createBrowserHistory()

ReactGA.initialize('UA-124174886-4')
ReactGA.pageview(window.location.pathname + window.location.search)

history.listen((location) => {
  ReactGA.set({ page: location.pathname })
  ReactGA.pageview(location.pathname)
})

function App() {
  const [formattedCount, setFormattedCount] = useState('0')
  const [emojis, setEmojis] = useState({ groups: { blobs: { guilds: [] }, 'community-blobs': { guilds: [] } } })
  const [apiData, setApiData] = useState({})
  const [settingsOpen, toggleSettingsOpen] = useState(false)
  const [, handleReload] = useState(0)
  const { prefersDarkMode } = getConfig()

  useEffect(() => {
    if (formattedCount === '0') {
      const newFormattedCount = new Intl.NumberFormat().format(4400)
      setFormattedCount(`Over ${newFormattedCount}`)
    }
  }, [formattedCount])

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
    const count = calculateEmojiCount(apiData)
    const newFormattedCount = new Intl.NumberFormat().format(count)
    const newEmojis = new Emojis(apiData)
    log('Emojis:', newEmojis)
    setFormattedCount(newFormattedCount)
    setEmojis(newEmojis)
  }, [apiData])

  const theme = useMemo(() => createMuiTheme({
    overrides: {
      MuiAccordion: {
        root: {
          '&:before': {
            display: 'none',
          },
          '&$expanded': {
            marginTop: '0',
          },
        },
      },
      MuiAccordionSummary: {
        root: {
          borderBottom: '1px solid rgba(224, 224, 224, 1)',
        },
      },
      MuiLink: {
        root: {
          color: prefersDarkMode ? 'white' : 'black',
        },
      },
      MuiFilledInput: {
        input: {
          paddingTop: '19px',
          paddingBottom: '18px',
        },
      },
      MuiCardHeader: {
        content: {
          maxWidth: 'calc(100% - 99px)',
        },
        title: {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        },
      },
      MuiTooltip: {
        tooltipPlacementBottom: {
          margin: '6px 0',
        },
      },
      MuiAppBar: {
        positionStatic: {
          margin: '2em 0',
        },
      },
    },
    palette: {
      type: prefersDarkMode ? 'dark' : 'light',
      background: {
        paper: prefersDarkMode ? grey[800] : grey[100],
        default: prefersDarkMode ? grey[900] : grey[50],
      },
      primary: green,
      secondary: {
        main: '#FCC21B',
      },
    },
    typography: {
      body2: {
        color: prefersDarkMode ? '#CCC' : 'rgba(0, 0, 0, 0.87)',
      },
      h5: {
        margin: '2rem 0',
        fontWeight: 'bold',
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 750,
        md: 1100,
        lg: 1280,
        xl: 1920,
      },
    },
  }), [prefersDarkMode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router history={history}>
        <Container maxWidth="md">
          <Header handleOpen={toggleSettingsOpen} />
        </Container>
        <Switch>
          <Route path="/changes" children={<Changepage />} />
          <Route
            exact-path="/"
            children={<Homepage formattedCount={formattedCount} emojis={emojis} />} />
        </Switch>
        <SettingsDialog
          open={settingsOpen}
          onClose={toggleSettingsOpen}
          handleReload={handleReload}
        />
      </Router>
    </ThemeProvider>
  )
}

export default App
