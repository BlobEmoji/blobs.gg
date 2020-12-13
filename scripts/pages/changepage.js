import React from 'react'
import Typography from '@material-ui/core/Typography'
import RecentChangesWrapper from '../components/RecentChanges/RecentChanges'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

function ChangePage(props) {
  return (
    <Container maxWidth="md">
      <Typography variant="h4">{props.t('changepage.title')}</Typography>
      <Typography variant="body2">{props.t('changepage.description')}</Typography>
      <Grid container spacing={3}>
        <RecentChangesWrapper />
      </Grid>
    </Container>
  )
}

ChangePage.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation()(ChangePage)
