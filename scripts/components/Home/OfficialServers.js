import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Guilds from "./Guilds";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

class OfficialServers extends PureComponent {
  render() {
    const { emojis, classes, communityRender } = this.props;
    return (
      <>
        <Typography variant="h5">The Official Blob Emoji Servers</Typography>
        <Guilds
          guilds={emojis.guilds}
          skeletonCount={6}
          communityRender={communityRender}
        />
        <div className={classes.licenceContainer}>
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
            <Link href="https://files.snowyluma.dev/blobs.zip">here</Link>. Make
            sure to follow the license.
          </Typography>
        </div>
      </>
    );
  }
}

OfficialServers.propTypes = {
  emojis: PropTypes.object.isRequired,
  communityRender: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

OfficialServers.whyDidYouRender = true;

export default OfficialServers;
