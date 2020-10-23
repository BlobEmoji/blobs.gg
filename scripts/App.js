import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import CssBaseline from '@material-ui/core/CssBaseline'
import Homepage from './pages/homepage'
import { calculateEmojiCount } from './utils'

const theme = createMuiTheme({})
const BLOBS_ENDPOINT = 'https://api.mousey.app/v3/emoji/blobs+community-blobs'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      blob_data: {},
      formattedCount: 0,
    }
  }


  async componentDidMount() {
    const resp = await fetch(BLOBS_ENDPOINT)
    const data = await resp.json()
    const count = calculateEmojiCount(data)
    const formattedCount = new Intl.NumberFormat().format(count)
    this.setState({ blob_data: data, formattedCount: formattedCount })
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Router>
          <Switch>
            <Route
              exact-path="/"
              children={<Homepage data={this.state.blob_data} formattedCount={this.state.formattedCount}/>}/>
          </Switch>
        </Router>
      </ThemeProvider>
    )
  }
}

export default App
