import React, { memo } from "react";
import Box from "@material-ui/core/Box";
import Skeleton from "@material-ui/lab/Skeleton";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";

const SkeletonChangeSet = memo(function SkeletonChangeSet() {
  const amounts = [3, 4, 5, 6, 7];
  const [length] = React.useState(
    amounts[Math.floor(Math.random() * amounts.length)]
  );

  const skeletons = Array.from({ length }, (_, index) => {
    const simple = Math.random() > 0.8;

    return (
      <Box display="flex" alignItems="center" key={index}>
        <Box display="flex" alignItems="center" minWidth="7.1rem">
          <Box margin="0.5rem">
            <Skeleton variant="circle" width={35} height={35} />
          </Box>
          <Box margin="0.5rem">
            <Skeleton variant="text" width={50} />
          </Box>
        </Box>
        <Box margin="0.5rem">
          <Skeleton variant="rect" width={32} height={32} />
        </Box>
        {simple ? (
          <>
            <Skeleton variant="text" width={20} />
            <Box display="flex" alignItems="center">
              <Box margin="0.5rem">
                <Skeleton variant="rect" width={32} height={32} />
              </Box>
              <Skeleton variant="text" width={80} />
            </Box>
          </>
        ) : (
          <Skeleton variant="text" width={80} />
        )}
      </Box>
    );
  });

  return (
    <Grid item xs={12} sm={6}>
      <Card>
        <CardHeader
          avatar={<Skeleton variant="circle" width={40} height={40} />}
          title={<Skeleton variant="text" width="40%" />}
          subheader={<Skeleton variant="text" width="50%" />}
        />
        {skeletons}
      </Card>
    </Grid>
  );
});

export default SkeletonChangeSet;
