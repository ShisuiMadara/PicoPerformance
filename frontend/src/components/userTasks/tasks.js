import {
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Pagination,
  TextField,
} from "@mui/material";
import react from "react";
import SearchIcon from "@mui/icons-material/Search";
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import UserGraphs from "../userGraphs/userGraphs";
import CollapsibleTable from "../taskTable/CollapsibleTable";
import axios from 'axios';
import styles from "./tasks.module.css";

export default class UTasks extends react.Component {
  initial = '';
  valueDateStart = '';
  valueDateEnd = '';
  handleStartDateChange = (newValue) => {
    this.valueDateStart = newValue;
  };
  handleEndDateChange = (newValue) => {
    this.valueDateEnd = newValue;
  };
  changeFilter = (event) => {
    if(event.target.value === 'Select Filter') {
      axios.post('http://picoperformance.centralindia.cloudapp.azure.com:5000/api/getAllTasks', {
        Search: false,
        EmployeeId: this.props.EmployeeId,
      }, {
          headers: {
              Authorization: `Bearer ${this.props.token}`
          }
      }).then((response) => {
          if(response.status === 200 && response.data !== null && response.data != undefined && response.data.success === true) {
            this.setState({
                tasks: response.data.data.Tasks,
                currentTasks: response.data.data.Tasks.slice(0, 5),
                filter: event.target.value,
                filterData: [this.initial, this.initial]
              });
          } else {
              alert('Unable to fetch tasks! please try later.');
          }
      }).catch((error) => {
          if(error.data !== null && error.data !== undefined && error.data.success === false) {
              alert(error.data.message);
          } else {
              alert('Server error!');
          }
      });
    } else {
      this.setState({
        filter: event.target.value,
      });
    }
  };

  changePage = (event, value) => {
    var tasks = [];
    for (var i = 5 * (value - 1); i < 5 * value && i < this.state.tasks.length; i++) {
      tasks.push(this.state.tasks[i]);
    }
    this.setState({
      page: value,
      currentTasks: tasks,
    });
  };

  filterDate = (event) => {
    event.preventDefault();
    var startDate = event.target.startDate.value;
    startDate = `${startDate.slice(6, 11)}-${startDate.slice(0, 2)}-${startDate.slice(3, 5)} 00:00:00`;
    var endDate = event.target.endDate.value;
    endDate = `${endDate.slice(6, 11)}-${endDate.slice(0, 2)}-${endDate.slice(3, 5)} 23:59:59`;
    axios.post('http://picoperformance.centralindia.cloudapp.azure.com:5000/api/getAllTasks', {
      Search: true,
      EmployeeId: this.props.EmployeeId,
      StartDate: startDate,
      EndDate: endDate
    }, {
        headers: {
            Authorization: `Bearer ${this.props.token}`
        }
    }).then((response) => {
        if(response.status === 200 && response.data !== null && response.data != undefined && response.data.success === true) {
          this.setState({
              tasks: response.data.data.Tasks,
              currentTasks: response.data.data.Tasks.slice(0, 5),
              filterData: [startDate, endDate]
            });
        } else {
            alert('Unable to fetch tasks! please try later.');
        }
    }).catch((error) => {
        if(error.data !== null && error.data !== undefined && error.data.success === false) {
            alert(error.data.message);
        } else {
            alert('Server error!');
        }
    });
  };

  constructor(props) {
    super(props);
    var now = new Date();
    now = new Date(now.getTime() + (5 * 60 * 60 * 1000) + (1 * 30 * 60 * 1000));
    this.initial = now.toISOString().substring(0,10);
    const userData = JSON.parse(sessionStorage.getItem("userInfo"));
    this.valueDateStart= this.initial;
    this.valueDateEnd = this.initial;
    this.state = {
      filter: "Select Filter",
      user: userData,
      tasks: [],
      currentTasks: [],
      page: 1,
      filterData: [this.initial, this.initial],
    };
  }

  render() {
    const taskCount = 5;
    return (
      <>
        <Grid
          container
          spacing={5}
          padding={{ xs: 1, md: 2, lg: 5 }}
          className={styles.container}
          style={{ display: "flex" }}
          alignContent={"center"}
          alignItems={"center"}
        >
          <Grid item xs={12} md={6} padding={2}>
            <FormControl fullWidth focused>
              <InputLabel>Filter By</InputLabel>
              <Select
                value={this.state.filter}
                label="Filter By"
                onChange={this.changeFilter}
                disabled = {this.state.tasks.length === 0 ? true : false}
              >
                <MenuItem value={"Select Filter"}>Select Filter</MenuItem>
                <MenuItem value={"Date"}>Date</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} padding={2} sx={{ textAlign: "center" }}>
            {this.state.filter === "Date" ? (
              <>
                <form onSubmit={this.filterDate}>
                  <Grid
                    container
                    spacing={0.5}
                    sx={{ display: "flex" }}
                    alignContent={"center"}
                    alignItems={"center"}
                  >
                    <Grid item xs={12} md={5}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="startDate"
                          className={styles.profileInput}
                          value={this.valueDateStart}
                          onChange={this.handleStartDateChange}
                          disableFuture={true}
                          renderInput={(params) => <TextField id='startDate' name='startDate' variant="outlined" focused sx={{display: 'flex', width: '100%'}} {...params} />}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} md={5}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="endDate"
                          className={styles.profileInput}
                          value={this.valueDateEnd}
                          onChange={this.handleEndDateChange}
                          disableFuture={true}
                          renderInput={(params) => <TextField id='endDate' name='endDate' variant="outlined" focused sx={{display: 'flex', width: '100%'}} {...params} />}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <Button
                        sx={{ width: "100%", textAlign: "center", padding: 2 }}
                        variant="contained"
                        type="submit"
                      >
                        <SearchIcon />
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </>
            ) : (
              <> No Filter Selected.</>
            )}
          </Grid>
          <Grid item xs={12}>
            <Divider variant="middle" />
          </Grid>
          <Grid item xs={0} md={3} lg={4}>
            {/* white space */}
          </Grid>
          {typeof this.state.selectedUser === "string" &&
          this.state.selectedUser === "Select User" ? (
            <></>
          ) : (
            <Grid item xs={12} sx={{textAlign: 'center'}} alignContent={'center'} alignItems={'center'}>
              <UserGraphs
                user={this.state.user}
                filter={this.state.filterData}
              />
            </Grid>
          )}

          <Grid item xs={12}>
            <Grid
              container
              sx={{ display: "flex" }}
              alignContent={"center"}
              alignItems={"center"}
              spacing={2}
              justifyContent="center"
              direction={"column"}
            >
              <Grid item xs={0} md={2} lg={3}>
                {/* white space */}
              </Grid>
              <Grid item xs={12} md={8} lg={3} justifyContent="center">
                <Pagination
                  onChange={this.changePage}
                  count={
                    typeof this.state.tasks.length === 0
                      ? 0
                      : this.state.tasks.length % taskCount === 0
                      ? parseInt(this.state.tasks.length / taskCount)
                      : parseInt(this.state.tasks.length / taskCount + 1)
                  }
                  color="primary"
                />
              </Grid>
              <Grid item xs={0} md={8} lg={3}>
                {/* white space */}
              </Grid>
            </Grid>
            <Grid item xs={12} textAlign="center">
              {this.state.tasks.length === 0 ? (
                <> No tasks available.</>
              ) : (
                <>
                  <CollapsibleTable
                    tasks={this.state.currentTasks}
                    user={this.state.user}
                  />
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }
  componentDidMount() {
    if (this.state.tasks.length === 0) {
      axios.post('http://picoperformance.centralindia.cloudapp.azure.com:5000/api/getAllTasks', {
        Search: false,
        EmployeeId: this.props.EmployeeId
      }, {
          headers: {
              Authorization: `Bearer ${this.props.token}`
          }
      }).then((response) => {
          if(response.status === 200 && response.data !== null && response.data != undefined && response.data.success === true) {
            this.setState({
                tasks: response.data.data.Tasks,
                currentTasks: response.data.data.Tasks
              })
          } else {
              alert('Unable to fetch tasks! please try later.');
          }
      }).catch((error) => {
          if(error.data !== null && error.data !== undefined && error.data.success === false) {
              alert(error.data.message);
          } else {
              alert('Server error!');
          }
      });
      this.changePage(null, 1);
    }
  }
}
