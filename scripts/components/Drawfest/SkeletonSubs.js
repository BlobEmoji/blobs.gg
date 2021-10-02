import React, { memo } from "react";
import Skeleton from "@material-ui/core/Skeleton";
import TableBody from "@material-ui/core/TableBody";
import { arrayRange } from "../../utils";
import { TableCell, TableRow } from "@material-ui/core";

function SkeletonSubmissions() {
  const amounts = arrayRange(3, 8);
  const [length] = React.useState(
    amounts[Math.floor(Math.random() * amounts.length)]
  );
  return (
    <TableCell>
      {Array.from({ length }, (_, index) => (
        <Skeleton
          variant="circular"
          width={35}
          height={35}
          key={index}
          sx={{ display: "inline-block", marginRight: 1 }}
        />
      ))}
    </TableCell>
  );
}

function SkeletonNames() {
  const amounts = [50, 70, 90, 110, 130];
  const [length] = React.useState(
    amounts[Math.floor(Math.random() * amounts.length)]
  );
  return (
    <TableCell>
      <Skeleton variant="rectangular" width={length} height={20} />
    </TableCell>
  );
}

const SkeletonSubs = memo(function SkeletonSubs() {
  const amounts = arrayRange(8, 14);
  const [length] = React.useState(
    amounts[Math.floor(Math.random() * amounts.length)]
  );

  const skeletons = Array.from({ length }, (_, index) => {
    return (
      <TableRow key={index}>
        <TableCell>
          <Skeleton variant="circular" width={64} height={64} />
        </TableCell>
        <SkeletonNames />
        <SkeletonSubmissions />
      </TableRow>
    );
  });

  return <TableBody>{skeletons}</TableBody>;
});

export default SkeletonSubs;
