import React from "react";
import PropTypes from "prop-types";
import SkeletonSubmissions from "./SkeletonSubmissions";
import {
  Chip,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";

const mappings = {
  0: "Coffee Nightmare",
  1: "Cute Cheese",
  2: "Chaos Duck",
  3: "Cyberpunk Owl",
  4: "Ring Collector",
  5: "Turtle Chase",
  6: "Angel Light",
  7: "Potion Trouble",
  8: "Suspicious Doll",
  9: "Broken Dragon",
  10: "Collage",
};

function DrawfestSubmissionsHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell width={64} />
        <TableCell>User</TableCell>
        <TableCell width={64 * 11}>Approved Submissions</TableCell>
      </TableRow>
    </TableHead>
  );
}

function ApprovedCell({ approvedSubmissions }) {
  return (
    <TableCell>
      {approvedSubmissions.map((submission) => {
        return (
          <Tooltip title={mappings[submission]} key={submission} arrow>
            <Chip label={submission + 1} sx={{ marginRight: 1 }} clickable />
          </Tooltip>
        );
      })}
    </TableCell>
  );
}

ApprovedCell.propTypes = {
  approvedSubmissions: PropTypes.arrayOf(PropTypes.number).isRequired,
};

function DrawfestSubmissionsBody({ submissions }) {
  return (
    <TableBody>
      {submissions.map((row) => (
        <TableRow key={row.id}>
          <TableCell>
            <Avatar
              alt={row.name}
              src={`https://cdn.discordapp.com/avatars/${row.id}/${row.avatar}.webp?size=64`}
              sx={{ width: 64, height: 64 }}
            />
          </TableCell>
          <TableCell>{`${row.name}#${row.discriminator}`}</TableCell>
          <ApprovedCell approvedSubmissions={row.approved_submissions} />
        </TableRow>
      ))}
    </TableBody>
  );
}

DrawfestSubmissionsBody.propTypes = {
  submissions: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      discriminator: PropTypes.string,
      approved_submissions: PropTypes.arrayOf(PropTypes.number),
      id: PropTypes.string,
      avatar: PropTypes.string,
    })
  ).isRequired,
};

function DrawfestSubmissions({ submissions }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="Drawfest Submissions">
        <DrawfestSubmissionsHead />
        {submissions.length === 0 ? (
          <SkeletonSubmissions />
        ) : (
          <DrawfestSubmissionsBody submissions={submissions} />
        )}
      </Table>
    </TableContainer>
  );
}

DrawfestSubmissions.propTypes = {
  submissions: PropTypes.array.isRequired,
};

export default DrawfestSubmissions;
