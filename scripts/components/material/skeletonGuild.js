import React, { memo } from 'react'
import Grid from '@material-ui/core/Grid'
import CardHeader from '@material-ui/core/CardHeader'
import Card from '@material-ui/core/Card'
import Skeleton from '@material-ui/lab/Skeleton'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import makeStyles from '@material-ui/core/styles/makeStyles'
import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles({
  cell: {
    padding: '0 0.3rem',
  },
})

const SkeletonGuild = memo(function SkeletonGuild() {
  const classes = useStyles()

  return (
    <Grid item xs={4}>
      <Card>
        <CardHeader
          avatar={<Skeleton variant="circle" width={40} height={40} />}
          title={<Skeleton height={22} width="80%" />}
          action={<IconButton disabled><Skeleton variant="circle" width={32} height={32} /></IconButton>}
        />
        <CardContent>
          {Array.from({ length: 7 }, (_, index) => (
            <Box key={index} display="inline-block" className={classes.cell}>
              <Skeleton variant="circle" width={32} height={32} />
            </Box>
          ))}
        </CardContent>
        <CardActions>
          <Skeleton height={24} width="25%" />
        </CardActions>
      </Card>
    </Grid>
  )
})

export default SkeletonGuild
