import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import RecentChangesWrapper from '../components/RecentChanges/RecentChanges'
import Container from '@material-ui/core/Container'

class Changepage extends Component {
  render() {
    return (
      <Container maxWidth="md">
        <Typography variant="h4">Global Blob Changelog</Typography>
        <p>
          This page tracks the changes of all blobs in any of our partnered
          servers.
        </p>
        <RecentChangesWrapper />
      </Container>
    )
  }
}

export default Changepage
