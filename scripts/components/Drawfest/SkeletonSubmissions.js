import React, { memo } from "react";
import Skeleton from "@mui/material/Skeleton";
import TableBody from "@mui/material/TableBody";
import { arrayRange } from "../../utils";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

function SkeletonApprovedSubmissions() {
  const amounts = arrayRange(3, 8);
  const [length] = React.useState(
    amounts[Math.floor(Math.random() * amounts.length)]
  );
  return (
    <TableCell width={64 * 11}>
      {Array.from({ length }, (_, index) => (
        <Skeleton
          variant="circular"
          width={32}
          height={32}
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

const SkeletonSubmissions = memo(function SkeletonSubmissions() {
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
        <SkeletonApprovedSubmissions />
      </TableRow>
    );
  });

  return <TableBody>{skeletons}</TableBody>;
});

export default SkeletonSubmissions;
