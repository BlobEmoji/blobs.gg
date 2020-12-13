import React from 'react'
import PropTypes from 'prop-types'
import Guilds from './material/guilds'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import { Trans, withTranslation } from 'react-i18next'

const useStyles = makeStyles({
  licenceContainer: {
    margin: '2rem 0',
  },
})

function OfficialServers(props) {
  const classes = useStyles()
  const { t } = props

  return (
    <>
      <Typography variant="h5">{t('officialServers.title')}</Typography>
      <Guilds guilds={props.emojis.guilds} skeletonCount={6} communityRender={props.communityRender} />
      <Box className={classes.licenceContainer}>
        <Typography variant="body2">
          <Trans
            i18nKey="officialServers.license.1"
            components={{
              1: <Link href="http://www.apache.org/licenses/LICENSE-2.0.html" />,
              3: <Link href="https://www.google.com/get/noto/help/emoji/" />,
            }}
          />
        </Typography>
        <Typography variant="body2">
          <Trans
            i18nKey="officialServers.license.2"
            components={{
              1: <Link href="https://blobs.gg/blobs.zip"/>
            }}
          />
        </Typography>
      </Box>
    </>
  )
}

OfficialServers.propTypes = {
  emojis: PropTypes.object.isRequired,
  communityRender: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export default withTranslation()(OfficialServers)
