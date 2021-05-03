import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import red from "@material-ui/core/colors/red";
import AddIcon from "@material-ui/icons/Add";
import green from "@material-ui/core/colors/green";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import lightBlue from "@material-ui/core/colors/lightBlue";
import BrushIcon from "@material-ui/icons/Brush";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Tooltip from "@material-ui/core/Tooltip";

export function GuildAvatar(props) {
  const { name, src } = props;
  const { id, icon } = src;

  return (
    <Tooltip title={name} arrow>
      <Avatar alt={name}>
        <picture>
          <source
            type="image/webp"
            srcSet={`https://cdn.discordapp.com/icons/${id}/${icon}.webp?size=64`}
          />
          <img
            src={`https://cdn.discordapp.com/icons/${id}/${icon}.png?size=64`}
            alt={name}
            style={{ height: 40, width: 40 }}
          />
        </picture>
      </Avatar>
    </Tooltip>
  );
}

GuildAvatar.propTypes = {
  name: PropTypes.string.isRequired,
  src: PropTypes.object.isRequired,
};

const useStyles = makeStyles({
  delete: {
    color: red[500],
    verticalAlign: "middle",
  },
  create: {
    color: green[500],
    verticalAlign: "middle",
  },
  rename: {
    color: lightBlue[500],
    verticalAlign: "middle",
  },
});

export function RemoveAvatar() {
  const classes = useStyles();

  return <DeleteIcon fontSize="large" className={classes.delete} />;
}

export function CreateAvatar() {
  const classes = useStyles();

  return <AddIcon fontSize="large" className={classes.create} />;
}

export function RenameAvatar() {
  const classes = useStyles();

  return <EditOutlinedIcon fontSize="large" className={classes.rename} />;
}

export function UpdateAvatar() {
  const classes = useStyles();

  return <BrushIcon fontSize="large" className={classes.rename} />;
}
