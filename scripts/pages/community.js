import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Masonry from "@mui/lab/Masonry";
import CommunityWrapper from "../components/communityWrapper/communityWrapper";
import useMediaQuery from "@mui/material/useMediaQuery";

function Community() {
  const md = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const xsm = useMediaQuery((theme) => theme.breakpoints.only("xs"));
  let columns = md ? 3 : xsm ? 1 : 2;

  return (
    <Container css={{ paddingBottom: 24 }} maxWidth="md">
      <Typography variant="h4">Blob Community</Typography>
      <Typography css={{ margin: "0.5rem 0 1rem 0" }} variant="body1">
        This page shows all the projects that have been created on the Blob
        Network.
      </Typography>
      <Masonry columns={columns} spacing={3} css={{ minHeight: 900 }}>
        <CommunityWrapper />
      </Masonry>
    </Container>
  );
}

Community.whyDidYouRender = true;

export default Community;
