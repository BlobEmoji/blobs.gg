import { PureComponent } from "react";
import nitro from "../../../assets/discord/nitro.png";
import PropTypes from "prop-types";
import { shuffleArray } from "../../utils";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import GuildsWrapper from "./Guilds";
import { css } from "@emotion/react";

const inlineIconStyle = (theme) =>
  css({
    height: "0.8em",
    width: "auto",
    margin: "0 0.25em",
    filter: theme.palette.mode === "light" && "invert(1)",
  });

class CommunityServers extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      shuffledGuilds: [],
    };
  }
  static whyDidYouRender = true;

  componentDidMount() {
    const { shuffledGuilds } = this.state;
    const { waiting, emojis } = this.props;
    if (shuffledGuilds.length === 0) {
      if (!waiting) {
        this.setState({
          shuffledGuilds: shuffleArray(emojis.guilds),
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.waiting !== this.props.waiting) {
      this.setState({
        shuffledGuilds: shuffleArray(this.props.emojis.guilds),
      });
    }
  }

  render() {
    const { emojis, waiting } = this.props;
    const { shuffledGuilds } = this.state;
    return (
      <>
        <div css={{ marginBottom: "1rem" }}>
          <Typography variant="h5">Community Blob Servers</Typography>
          <Typography variant="body2">
            To add your Blob Server to our Community Servers section, join the
            official{" "}
            <Link href="https://1.blobs.gg" target="_blank" rel="noreferrer">
              Blob Emoji server
            </Link>{" "}
            and message our Blob Mail bot.
          </Typography>
          <Typography variant="body2">
            In order to use custom emoji in other Discord Servers you need an
            active
            <img
              css={inlineIconStyle}
              src={nitro}
              alt="Discord Nitro icon"
              height={11}
              width={16}
            />
            <Link
              href="https://discord.com/nitro"
              target="_blank"
              rel="noopener"
            >
              Discord Nitro
            </Link>{" "}
            subscription.
          </Typography>
        </div>
        <GuildsWrapper guilds={shuffledGuilds} slice skeletonCount={9} />
      </>
    );
  }
}

CommunityServers.propTypes = {
  emojis: PropTypes.object.isRequired,
  waiting: PropTypes.bool.isRequired,
};

export default CommunityServers;
