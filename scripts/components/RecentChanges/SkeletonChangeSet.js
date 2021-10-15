import React, { memo } from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";

const SkeletonChangeSet = memo(function SkeletonChangeSet() {
  const amounts = [3, 4, 5, 6, 7];
  const [length] = React.useState(
    amounts[Math.floor(Math.random() * amounts.length)]
  );

  const skeletons = Array.from({ length }, (_, index) => {
    const simple = Math.random() > 0.8;

    return (
      <Box sx={{ display: "flex", alignItems: "center", key: { index } }}>
        <Box sx={{ display: "flex", alignItems: "center", minWidth: "7.1rem" }}>
          <Skeleton
            sx={{ margin: "0.5rem" }}
            variant="circular"
            width={35}
            height={35}
          />
          <Skeleton sx={{ margin: "0.5rem" }} variant="text" width={50} />
        </Box>
        <Skeleton
          sx={{ margin: "0.5rem" }}
          variant="rectangular"
          width={32}
          height={32}
        />
        {simple ? (
          <>
            <Skeleton variant="text" width={20} />
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Skeleton
                sx={{ margin: "0.5rem" }}
                variant="rectangular"
                width={32}
                height={32}
              />
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
          avatar={<Skeleton variant="circular" width={40} height={40} />}
          title={<Skeleton variant="text" width="40%" />}
          subheader={<Skeleton variant="text" width="50%" />}
        />
        {skeletons}
      </Card>
    </Grid>
  );
});

export default SkeletonChangeSet;
