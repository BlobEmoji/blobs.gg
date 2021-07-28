import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { useScrollNearEnd } from "../../hooks";
import SkeletonGuild from "./SkeletonGuild";
import GuildWrapper from "./Guild";

class GuildsWrapper extends PureComponent {
  static whyDidYouRender = true;
  render() {
    return <Guilds {...this.props} />;
  }
}

function Guilds(props) {
  const { guilds, perPage, slice, className } = props;
  const [upTo, setUpTo] = React.useState(perPage);

  let newGuilds = slice ? guilds.slice(0, upTo) : guilds;

  useScrollNearEnd(() => {
    if (!slice) {
      return;
    }
    if (upTo < guilds.length) {
      setUpTo((prev) => Math.min(prev + perPage, guilds.length));
    }
  });

  if (guilds.length === 0) {
    return (
      <Grid container spacing={3} className={className}>
        {Array.from({ length: props.skeletonCount }, (_, index) => (
          <SkeletonGuild key={index} />
        ))}
      </Grid>
    );
  }

  return (
    <Grid container spacing={3} className={className}>
      {newGuilds.map((guild) => (
        <GuildWrapper
          key={guild.id}
          guild={guild}
          communityRender={props.communityRender}
        />
      ))}
    </Grid>
  );
}

Guilds.defaultProps = {
  slice: false,
  perPage: 9,
};

Guilds.propTypes = {
  guilds: PropTypes.array.isRequired,
  slice: PropTypes.bool,
  perPage: PropTypes.number,
  className: PropTypes.string,
  skeletonCount: PropTypes.number.isRequired,
  communityRender: PropTypes.func,
};

GuildsWrapper.defaultProps = {
  slice: false,
  perPage: 9,
};

GuildsWrapper.propTypes = {
  guilds: PropTypes.array.isRequired,
  slice: PropTypes.bool,
  perPage: PropTypes.number,
  className: PropTypes.string,
  skeletonCount: PropTypes.number.isRequired,
  communityRender: PropTypes.func,
};

Guilds.whyDidYouRender = true;

export default GuildsWrapper;
