import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function createData(task, employee) {
  return {
    Taskid: task.TaskId,
    EmployeeId: task.EmployeeId,
    Name: employee.Name,
    EmailId: employee.EmailId,
    Task: [
      {
        Date: task.StartDate.slice(0, 10),
        'Time Taken': task.TimeTaken,
        'Task Type': task.TaskType,
        Description: task.TaskDescription
      }
    ],
  };
}

function Row(props) {
  const { task, employee } = props;
  const row = createData(task, employee);
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align='center'>
          {row.Taskid}
        </TableCell>
        <TableCell align="center">{row.EmployeeId}</TableCell>
        <TableCell align="center">{row.Name}</TableCell>
        <TableCell align="center">{row.EmailId}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Task Info
              </Typography>
              <Table size="small" aria-label="Task Info">
                <TableHead>
                  <TableRow>
                    <TableCell align='center'>Date</TableCell>
                    <TableCell align='center'>Time Taken</TableCell>
                    <TableCell align="center">Task Type</TableCell>
                    <TableCell align="center">Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row" align='center' sx={{width: '20%'}}>
                      {row.Task[0].Date}
                    </TableCell>
                    <TableCell align='center' sx={{width: '25%'}}>{row.Task[0]['Time Taken']}</TableCell>
                    <TableCell align='center' sx={{width: '20%'}}>{row.Task[0]['Task Type']}</TableCell>
                    <TableCell align='center' sx={{width: '35%'}}>{row.Task[0].Description}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    EmployeeId: PropTypes.string.isRequired,
    Name: PropTypes.string.isRequired,
    EmailId: PropTypes.string.isRequired,
    Task: PropTypes.arrayOf(
      PropTypes.shape({
        Date: PropTypes.number.isRequired,
        'Time Taken': PropTypes.string.isRequired,
        'Take Type': PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired
      }),
    ).isRequired,
    TaskId: PropTypes.string.isRequired
  }).isRequired,
};

export default function CollapsibleTable(props) {
    var tasks = props.tasks;
    var user = props.user;
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="center">Task ID</TableCell>
            <TableCell align="center">Employee ID</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Email ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task, index) => (
            <Row key={`task#${index}`} task={task} employee={user} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
