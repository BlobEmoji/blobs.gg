import React from 'react'
import ReactDOM from 'react-dom'
import RecentChangesWrapper from './components/RecentChanges/RecentChanges'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import Grid from '@material-ui/core/Grid'
import grey from '@material-ui/core/colors/grey'
import Container from '@material-ui/core/Container'
import server1 from '../assets/server_icons/server1.svg'
import Typography from '@material-ui/core/Typography'
import CssBaseline from '@material-ui/core/CssBaseline'
import useMediaQuery from '@material-ui/core/useMediaQuery'

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
          background: {
            paper: prefersDarkMode ? grey[800] : grey[100],
            default: prefersDarkMode ? grey[900] : grey[50]
          },
        },
      }),
    [prefersDarkMode],
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Container maxWidth="md">
        <main>
          <nav>
            <h1>
              <img
                alt="Blob Emoji server icon"
                src={server1}
              />
              Blob Emoji
            </h1>
            <div className="links"/>
          </nav>
        </main>
        <Typography variant="h4">Global Blob Changelog</Typography>
        <p>
          This page tracks the changes of all blobs in any of our partnered
          servers.
        </p>
        <Grid container spacing={3}>
          <RecentChangesWrapper/>
        </Grid>
      </Container>
    </ThemeProvider>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'))
