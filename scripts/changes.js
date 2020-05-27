import React from 'react'
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

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

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
        <Header />
        <Typography variant="h4">Global Blob Changelog</Typography>
        <p>
          This page tracks the changes of all blobs in any of our partnered
          servers.
        </p>
        <Grid container spacing={3}>
          <RecentChangesWrapper />
        </Grid>
      </Container>
    </ThemeProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
