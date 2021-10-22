import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import red from "@mui/material/colors/red";
import AddIcon from "@mui/icons-material/Add";
import green from "@mui/material/colors/green";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import lightBlue from "@mui/material/colors/lightBlue";
import BrushIcon from "@mui/icons-material/Brush";
import Tooltip from "@mui/material/Tooltip";

export function GuildAvatar(props) {
  const { name, src } = props;
  const { id, icon } = src;

  return (
    <Tooltip title={name} arrow>
      <Avatar
        alt={name}
        src={`https://cdn.discordapp.com/icons/${id}/${icon}.png?size=64`}
      />
    </Tooltip>
  );
}

GuildAvatar.propTypes = {
  name: PropTypes.string.isRequired,
  src: PropTypes.object.isRequired,
};

const changelogAvatarStyle = {
  verticalAlign: "middle",
};

export function RemoveAvatar() {
  return (
    <DeleteIcon
      fontSize="large"
      css={[
        {
          color: red[500],
        },
        changelogAvatarStyle,
      ]}
    />
  );
}

export function CreateAvatar() {
  return (
    <AddIcon
      fontSize="large"
      css={[
        {
          color: green[500],
        },
        changelogAvatarStyle,
      ]}
    />
  );
}

export function RenameAvatar() {
  return (
    <EditOutlinedIcon
      fontSize="large"
      css={[
        {
          color: lightBlue[500],
        },
        changelogAvatarStyle,
      ]}
    />
  );
}

export function UpdateAvatar() {
  return (
    <BrushIcon
      fontSize="large"
      css={[
        {
          color: lightBlue[500],
        },
        changelogAvatarStyle,
      ]}
    />
  );
}
