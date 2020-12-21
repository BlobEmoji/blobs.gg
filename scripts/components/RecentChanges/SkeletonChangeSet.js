import React from 'react'
import Box from '@material-ui/core/Box'
import Skeleton from '@material-ui/lab/Skeleton'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles({
  card: {
    marginBottom: '2rem',
  },
  text: {
    padding: '0.25rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
})

export default function SkeletonChangeSet() {
  const amounts = [3, 4, 5, 6, 7]
  const classes = useStyles()
  const [length] = React.useState(
    amounts[Math.floor(Math.random() * amounts.length)],
  )

  const skeletons = Array.from({ length }, (_, index) => {
    const simple = Math.random() > 0.8

    return (
      <Box display="flex" alignItems="center" key={index}>
        <Box display="flex" alignItems="center" minWidth="5rem" margin="0.5rem">
          <Skeleton variant="circle" width={40} height={40} />
        </Box>
        <Box margin="0.5rem">
          <Skeleton variant="rect" width={32} height={32} />
        </Box>
        <Skeleton height={39} width={80} margin="0.25rem" />
        {simple &&
          <Box display="flex" alignItems="center" minWidth="5rem" marginLeft="2.5rem">
            <Box margin="0.5rem">
              <Skeleton variant="rect" width={32} height={32} />
            </Box>
            <Skeleton height={39} width={80} margin="0.25rem" />
          </Box>}
      </Box>
    )
  })

  return (
    <Grid item xs={12} sm={6}>
      <Card className={classes.card}>
        <CardHeader
          avatar={<Skeleton variant="circle" width={40} height={40} />}
          title={<Skeleton height={22} width="80%" />}
          subheader={<Skeleton height={22} width="60%" />}
        />
        {skeletons}
      </Card>
    </Grid>
  )
}
