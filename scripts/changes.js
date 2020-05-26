import React from 'react'
import ReactDOM from 'react-dom'
import RecentChangesWrapper from './components/RecentChanges'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import Grid from '@material-ui/core/Grid'

function App() {
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: 'dark',
        },
      }),
    [true]
  )

  return (
    <ThemeProvider theme={theme}>
      <h2>Global Blob Change Log</h2>
      <p>
        This page tracks the changes of all blobs in any of our partnered
        servers.
      </p>
      <Grid container spacing={3}>
        <RecentChangesWrapper />
      </Grid>
    </ThemeProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('changestarget'))
