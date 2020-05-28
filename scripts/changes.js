import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom'
import RecentChangesWrapper from './components/RecentChanges/RecentChanges'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import Grid from '@material-ui/core/Grid'
import grey from '@material-ui/core/colors/grey'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import CssBaseline from '@material-ui/core/CssBaseline'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Header from './components/Header'
import { log, storageAvailable, warn } from './utils'
import SettingsDialog from './components/SettingsDialog'

export const Settings = createContext({
  // eslint-disable-next-line no-empty-function
  handleOpen: () => {},
  // eslint-disable-next-line no-empty-function
  handleReload: () => {},
})

function storageHandler() {
  let prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)', {
    noSsr: true,
  })

  if (storageAvailable('localStorage')) {
    log('Fetching Automatic check')
    const localStorageAutomatic = localStorage.getItem('automated')
    if (localStorageAutomatic === 'false') {
      log('Is not automated. Fetching local storage')
      const localStorageTheme = localStorage.getItem('theme')
      if (localStorageTheme === null) {
        log('No theme detected. Using automatic')
        localStorage.setItem('theme', prefersDarkMode.toString())
        localStorage.setItem('automatic', 'true')
      } else {
        log('Using theme in local storage')
        prefersDarkMode = localStorageTheme === 'true'
      }
    } else {
      log('Is automated. Using user preference')
    }
  } else {
    warn('Local Storage unsupported. Using automatic detection fallback')
  }

  return prefersDarkMode
}

function App() {
  let prefersDarkMode = storageHandler()
  const [dialogOpen, toggleDialogOpen] = useState(false)
  const [reload, handleReload] = useState(0)

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
          background: {
            paper: prefersDarkMode ? grey[800] : grey[100],
            default: prefersDarkMode ? grey[900] : grey[50],
          },
        },
      }),
    [prefersDarkMode]
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Settings.Provider value={{ handleOpen: toggleDialogOpen }}>
          <Header />
        </Settings.Provider>
        <Typography variant="h4">Global Blob Changelog</Typography>
        <p>
          This page tracks the changes of all blobs in any of our partnered
          servers.
        </p>
        <Grid container spacing={3}>
          <RecentChangesWrapper />
        </Grid>
      </Container>
      <SettingsDialog
        open={dialogOpen}
        onClose={toggleDialogOpen}
        handleReload={handleReload}
      />
    </ThemeProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
