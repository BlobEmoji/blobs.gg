import React from 'react'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Skeleton from '@material-ui/lab/Skeleton'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'

export default function SkeletonChangeSet() {
  const amounts = [3, 4, 5, 6, 7]
  const [length] = React.useState(
    amounts[Math.floor(Math.random() * amounts.length)]
  )

  const skeletons = Array.from({ length }, (_, index) => {
    const simple = Math.random() > 0.8

    return (
      <TableRow key={index}>
        <TableCell>
          <Skeleton variant="circle" width={40} height={40} />
        </TableCell>
        <TableCell>
          <Skeleton height={39} width={80} />
        </TableCell>
        <TableCell>
          <Skeleton variant="rect" width={32} height={32} />
        </TableCell>
        <TableCell>
          {simple ? <Skeleton height={39} width="100%" /> : null}
        </TableCell>
        <TableCell>
          {simple ? <Skeleton variant="circle" width={40} height={40} /> : null}
        </TableCell>
      </TableRow>
    )
  })

  return (
    <Card>
      <CardHeader
        avatar={<Skeleton variant="circle" width={40} height={40} />}
        title={<Skeleton height={22} width="80%" />}
        subheader={<Skeleton height={22} width="60%" />}
      />
      <TableContainer>
        <Table>
          <TableBody>{skeletons}</TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}
