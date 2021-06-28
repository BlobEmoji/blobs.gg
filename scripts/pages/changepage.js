import React from "react";
import Typography from "@material-ui/core/Typography";
import RecentChangesWrapper from "../components/RecentChanges/RecentChanges";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

function ChangePage() {
  return (
    <Container maxWidth="md">
      <Typography variant="h4">Global Blob Changelog</Typography>
      <Typography sx={{ margin: "0.5rem 0 1rem 0" }} variant="body1">
        This page tracks the changes of all blobs in any of our partnered
        servers.
      </Typography>
      <Grid container spacing={3}>
        <RecentChangesWrapper />
      </Grid>
    </Container>
  );
}

ChangePage.whyDidYouRender = true;

export default ChangePage;
