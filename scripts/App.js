import React, { Component } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import CssBaseline from '@material-ui/core/CssBaseline'
import Homepage from './pages/homepage'

const theme = createMuiTheme({})

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Router>
          <Switch>
            <Route exact-path="/" children={<Homepage/>}/>
          </Switch>
        </Router>
      </ThemeProvider>
    )
  }
}

export default App
