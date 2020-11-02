import React from 'react'
import Typography from '@material-ui/core/Typography'
import RecentChangesWrapper from '../components/RecentChanges/RecentChanges'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

function ChangePage() {
  return (
    <Container maxWidth="md">
      <Typography variant="h4">Global Blob Changelog</Typography>
      <p>
        This page tracks the changes of all blobs in any of our partnered
        servers.
      </p>
      <Grid container spacing={3}>
        <RecentChangesWrapper />
      </Grid>
    </Container>
  )
}

export default ChangePage
