import React from 'react'
import Typography from '@material-ui/core/Typography'
import RecentChangesWrapper from '../components/RecentChanges/RecentChanges'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'

function ChangePage(props) {
  return (
    <Container maxWidth="md">
      <Typography variant="h4">Global Blob Changelog</Typography>
      <p>
        This page tracks the changes of all blobs in any of our partnered
        servers.
      </p>
      <Grid container spacing={3}>
        <RecentChangesWrapper isTime12={props.isTime12} />
      </Grid>
    </Container>
  )
}

ChangePage.propTypes = {
  isTime12: PropTypes.bool.isRequired,
}

export default ChangePage
