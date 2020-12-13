import React from 'react'
import nitro from 'url:../../assets/discord/nitro.png'
import PropTypes from 'prop-types'
import Guilds from './material/guilds'
import { shuffleArray } from '../utils'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Trans, withTranslation } from 'react-i18next'

const useStyles = makeStyles({
  boxMargin: {
    margin: '2rem 0',
  },
  h5Margin: {
    margin: '0 0 1rem 0',
  },
})

function CommunityServers(props) {
  const classes = useStyles()
  let shuffled = props.waiting ? [] : shuffleArray(props.emojis.guilds)
  const { t } = props

  return (
    <>
      <Box className={classes.boxMargin}>
        <Typography variant="h5" className={classes.h5Margin}>{t('communityServers.title')}</Typography>
        <Typography variant="body2">
          <Trans
            i18nKey="communityServers.note.1"
            components={{
              1: <Link href="https://1.blobs.gg" target="_blank" rel="noreferrer"/>
            }}
          />
        </Typography>
        <Typography variant="body2">
          <Trans
            i18nKey="communityServers.note.2"
            components={{
              1: <img className="inline-icon" src={nitro} alt="Discord Nitro icon" />,
              2: <Link href="https://discord.com/nitro" target="_blank" rel="noopener"/>
            }}
          />
        </Typography>
      </Box>
      <Guilds guilds={shuffled} slice skeletonCount={9} />
    </>
  )
}

CommunityServers.propTypes = {
  emojis: PropTypes.object.isRequired,
  waiting: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
}

export default withTranslation()(CommunityServers)
