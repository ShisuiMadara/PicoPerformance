import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Pagination,
} from "@mui/material";
import react from "react";
import SearchIcon from "@mui/icons-material/Search";
import UserGraphs from "../userGraphs/userGraphs";
import CollapsibleTable from "../taskTable/CollapsibleTable";

import styles from "./tasks.module.css";

export default class UTasks extends react.Component {
  wrapLoginOpen = () => {
    const element = document.getElementsByClassName(styles.loginWrapper);
    element[0].style.zIndex = "100";
  };
  wrapLoginClose = () => {
    const element = document.getElementsByClassName(styles.loginWrapper);
    element[0].style.zIndex = "-100";
  };

  changeFilter = (event) => {
    this.setState({
      filter: event.target.value,
    });
  };

  changePage = (event, value) => {
    var tasks = [];
    for (
      var i = 5 * (value - 1);
      i < 5 * value && i < this.state.tasks.length;
      i++
    ) {
      tasks.push(this.state.tasks[i]);
    }
    this.setState({
      page: value,
      currentTasks: tasks,
    });
  };

  filterDate = (event) => {
    event.preventDefault();
    console.log(event);
  };
  constructor(props) {
    super(props);
    this.state = {
      filter: "Select Filter",
      user: sessionStorage.getItem("userInfo"),
      tasks: [],
      currentTasks: [],
      page: 1,
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
                      <TextField
                        name="startDate"
                        type="date"
                        sx={{ width: "100%" }}
                        label="From"
                        variant="outlined"
                        focused
                      />
                    </Grid>
                    <Grid item xs={12} md={5}>
                      <TextField
                        name="endDate"
                        type="date"
                        sx={{ width: "100%" }}
                        label="To"
                        variant="outlined"
                        focused
                      />
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
            <Grid item xs={12}>
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
    if (this.state.tasks.length !== 0) {
      this.changePage(null, 1);
    }
  }
}
