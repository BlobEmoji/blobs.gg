import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import red from "@mui/material/colors/red";
import AddIcon from "@mui/icons-material/Add";
import green from "@mui/material/colors/green";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import lightBlue from "@mui/material/colors/lightBlue";
import BrushIcon from "@mui/icons-material/Brush";
import makeStyles from "@mui/styles/makeStyles";
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
