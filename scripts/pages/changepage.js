import Typography from "@mui/material/Typography";
import RecentChangesWrapper from "../components/RecentChanges/RecentChanges";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

function ChangePage() {
  return (
    <Container css={{ paddingBottom: 24 }} maxWidth="md">
      <Typography variant="h4">Global Blob Changelog</Typography>
      <Typography css={{ margin: "0.5rem 0 1rem 0" }} variant="body1">
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
