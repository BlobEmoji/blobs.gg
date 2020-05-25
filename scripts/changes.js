import React from 'react'
import ReactDOM from 'react-dom'
import RecentChangesWrapper from './components/RecentChanges'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import ThemeProvider from '@material-ui/styles/ThemeProvider'

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  )

  return (
    <ThemeProvider theme={theme}>
      <RecentChangesWrapper/>
    </ThemeProvider>
  )
}

ReactDOM.render(<App/>, document.getElementById('changestarget'))
