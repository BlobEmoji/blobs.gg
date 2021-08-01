import React, { memo } from "react";
import Grid from "@material-ui/core/Grid";
import CardHeader from "@material-ui/core/CardHeader";
import Card from "@material-ui/core/Card";
import Skeleton from "@material-ui/core/Skeleton";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";

export const SkeletonEmojiRow = memo(function SkeletonEmojiRow() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        margin: "0 0.3rem",
        gap: "0.6rem 0.3rem",
        justifyItems: "center",
      }}
    >
      {Array.from({ length: 7 }, (_, index) => (
        <Skeleton key={index} variant="circular" width={32} height={32} />
      ))}
    </Box>
  );
});

const SkeletonGuild = memo(function SkeletonGuild() {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <CardHeader
          avatar={<Skeleton variant="circular" width={40} height={40} />}
          title={<Skeleton height={22} width="80%" />}
          action={
            <IconButton disabled>
              <Skeleton variant="circular" width={24} height={24} />
            </IconButton>
          }
        />
        <CardContent>
          <SkeletonEmojiRow />
        </CardContent>
        <CardActions>
          <Skeleton height={31} width="25%" />
        </CardActions>
      </Card>
    </Grid>
  );
});

export default SkeletonGuild;
