import PropTypes from "prop-types";
import SkeletonSubmissions from "./SkeletonSubmissions";
import Chip from "@mui/material/Chip";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";

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

function ApprovedCell({ approvedSubmissions, promptData }) {
  return (
    <TableCell>
      {approvedSubmissions.map((submission) => {
        function onClick() {
          return window.open(submission.image_url, "_blank");
        }
        return (
          <Tooltip
            title={promptData[submission.prompt_id]}
            key={submission.prompt_id}
            arrow
          >
            <Chip
              label={submission.prompt_id + 1}
              css={{ marginRight: 1 }}
              clickable
              onClick={onClick}
            />
          </Tooltip>
        );
      })}
    </TableCell>
  );
}

ApprovedCell.propTypes = {
  approvedSubmissions: PropTypes.arrayOf(
    PropTypes.shape({
      prompt_id: PropTypes.number,
      image_url: PropTypes.string,
    })
  ).isRequired,
  promptData: PropTypes.array.isRequired
};

function DrawfestSubmissionsBody({ submissions, promptData }) {
  return (
    <TableBody>
      {submissions.map((row) => (
        <TableRow key={row.id}>
          <TableCell>
            <Avatar
              alt={row.username}
              src={`https://cdn.discordapp.com/avatars/${row.id}/${row.avatar}.webp?size=64`}
              css={{ width: 64, height: 64 }}
            />
          </TableCell>
          <TableCell>{`${row.username}#${row.discriminator}`}</TableCell>
          <ApprovedCell approvedSubmissions={row.submissions} promptData={promptData} />
        </TableRow>
      ))}
    </TableBody>
  );
}

DrawfestSubmissionsBody.propTypes = {
  submissions: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string,
      discriminator: PropTypes.string,
      approved_submissions: PropTypes.arrayOf(PropTypes.number),
      id: PropTypes.string,
      avatar: PropTypes.string,
    })
  ).isRequired,
  promptData: PropTypes.array.isRequired
};

function DrawfestSubmissions({ submissions, promptData }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="Drawfest Submissions">
        <DrawfestSubmissionsHead />
        {submissions.length === 0 ? (
          <SkeletonSubmissions />
        ) : (
          <DrawfestSubmissionsBody submissions={submissions} promptData={promptData} />
        )}
      </Table>
    </TableContainer>
  );
}

DrawfestSubmissions.propTypes = {
  submissions: PropTypes.array.isRequired,
  promptData: PropTypes.array.isRequired,
};

export default DrawfestSubmissions;
