import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

function Community() {
  return (
    <Container css={{ paddingBottom: 24 }} maxWidth="md">
      <Typography variant="h4">Blob Community</Typography>
      <Typography css={{ margin: "0.5rem 0 1rem 0" }} variant="body1">
        This page shows all the projects that have been created on the Blob Network.
      </Typography>
      <Grid container spacing={3}>
        
      </Grid>
    </Container>
  );
}

Community.whyDidYouRender = true;

export default Community;
