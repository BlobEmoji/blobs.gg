import React from "react";
import PropTypes from "prop-types";
import Guilds from "./Guilds";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles({
  licenceContainer: {
    margin: "2rem 0",
  },
});

function OfficialServers(props) {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h5">The Official Blob Emoji Servers</Typography>
      <Guilds
        guilds={props.emojis.guilds}
        skeletonCount={6}
        communityRender={props.communityRender}
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

OfficialServers.propTypes = {
  emojis: PropTypes.object.isRequired,
  communityRender: PropTypes.func.isRequired,
};

export default OfficialServers;
