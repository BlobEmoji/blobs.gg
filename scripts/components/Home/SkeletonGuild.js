import React, { memo } from 'react'
import Grid from '@material-ui/core/Grid'
import CardHeader from '@material-ui/core/CardHeader'
import Card from '@material-ui/core/Card'
import Skeleton from '@material-ui/lab/Skeleton'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box'

const SkeletonGuild = memo(function SkeletonGuild() {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <CardHeader
          avatar={<Skeleton variant="circle" width={40} height={40} />}
          title={<Skeleton height={22} width="80%" />}
          action={<IconButton disabled><Skeleton variant="circle" width={32} height={32} /></IconButton>}
        />
        <CardContent>
          <Box display="flex" justifyContent="space-around" margin="-0.3rem 0px">
            {Array.from({ length: 7 }, (_, index) => (
              <Skeleton key={index} variant="circle" width={32} height={32} />
            ))}
          </Box>
        </CardContent>
        <CardActions>
          <Skeleton height={33} width="25%" />
        </CardActions>
      </Card>
    </Grid>
  )
})

export default SkeletonGuild
