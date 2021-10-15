import { PureComponent } from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import GuildsWrapper from "./Guilds";

class OfficialServers extends PureComponent {
  static whyDidYouRender = true;
  render() {
    const { emojis, communityRender } = this.props;
    return (
      <>
        <Typography variant="h5">The Official Blob Emoji Servers</Typography>
        <GuildsWrapper
          guilds={emojis.guilds}
          skeletonCount={6}
          communityRender={communityRender}
        />
        <Box sx={{ margin: "2rem 0" }}>
          <Typography variant="body2">
            All blobs that are uploaded to official Blob Emoji servers are
            licensed under the{" "}
            <Link href="https://www.apache.org/licenses/LICENSE-2.0.html">
              Apache License 2.0
            </Link>
            , the same license that{" "}
            <Link href="https://www.google.com/get/noto/help/emoji/">
              Noto Emoji
            </Link>{" "}
            by Google are licensed under.
          </Typography>
          <Typography variant="body2">
            All blobs from the official servers can be downloaded{" "}
            <Link href="https://files.lostluma.dev/blobs.zip">here</Link>. Make
            sure to follow the license.
          </Typography>
        </Box>
      </>
    );
  }
}

OfficialServers.propTypes = {
  emojis: PropTypes.object.isRequired,
  communityRender: PropTypes.func.isRequired,
};

OfficialServers.whyDidYouRender = true;

export default OfficialServers;
