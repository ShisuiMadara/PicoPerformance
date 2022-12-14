import { Button, Divider, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Pagination, Select, Switch, TextField } from '@mui/material';
import react from 'react';
import CollapsibleTable from '../taskTable/CollapsibleTable';
import SearchIcon from '@mui/icons-material/Search';
import UserGraphs from '../userGraphs/userGraphs';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import axios from 'axios';

import styles from './tasks.module.css';

export default class ATasks extends react.Component {
    initial = '';
    handleSubmit = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        event.target.email.value = '';
        axios.post('http://picoperformance.centralindia.cloudapp.azure.com:5000/api/listEmployees', {
            Search: email
        }, {
            headers: {
                Authorization: `Bearer ${this.props.token}`
            }
        }).then((response) => {
            if(response.status === 200 && response.data !== null && response.data != undefined && response.data.success === true) {
                this.setState({
                    users: response.data.data.list,
                    selectedUser: 'Select User',
                })
            } else {
                alert('Unable to fetch user! please try later.');
            }
        }).catch((error) => {
            if(error.data !== null && error.data !== undefined && error.data.success === false) {
                alert(error.data.message);
            } else {
                alert('Server error!');
            }
        });

    }
    changeFilter = (event) => {
        if(event.target.value === 'Select Filter') {
          axios.post('http://picoperformance.centralindia.cloudapp.azure.com:5000/api/getAllTasks', {
            Search: false,
            EmployeeId: this.state.users[this.state.selectedUser].EmployeeId,
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
    changeUser = (event) => {
        if(typeof event.target.value === 'string' && event.target.value === 'Select User') {
            this.setState({
                filter: 'Select Filter',
                selectedUser: 'Select User',
                tasks: {},
                currentTasks: {}
            });
            return false;
        }
        axios.post('http://picoperformance.centralindia.cloudapp.azure.com:5000/api/getAllTasks', {
            Search: false,
            EmployeeId: this.state.users[event.target.value].EmployeeId
        }, {
            headers: {
                Authorization: `Bearer ${this.props.token}`
            }
        }).then((response) => {
            if(response.status === 200 && response.data !== null && response.data != undefined && response.data.success === true) {
                this.setState({
                    tasks: response.data.data.Tasks,
                    currentTasks: response.data.data.Tasks.slice(0, 5),
                    selectedUser: event.target.value,
                    filter: 'Select Filter'
                })
            } else {
                alert('Unable to fetch tasks! please try later.');
                this.setState({
                    selectedUser: 'Select User',
                    filter: 'Select Filter'
                })
            }
        }).catch((error) => {
            if(error.data !== null && error.data !== undefined && error.data.success === false) {
                alert(error.data.message);
                this.setState({
                    selectedUser: 'Select User',
                    filter: 'Select Filter'
                })
            } else {
                alert('Server error!');
                this.setState({
                    selectedUser: 'Select User',
                    filter: 'Select Filter'
                })
            }
        });
    }
    toggleUserState = (event) => {
        // send request
        axios.post('http://picoperformance.centralindia.cloudapp.azure.com:5000/api/block', {
            Block: !this.state.users[this.state.selectedUser].IsBlocked,
            EmailId: this.state.users[this.state.selectedUser].EmailId
        }, {
            headers: {
                Authorization: `Bearer ${this.props.token}`
            }
        }).then((response) => {
            if(response.status === 200 && response.data !== null && response.data != undefined && response.data.success === true) {
                let userData = this.state.users;
                userData[this.state.selectedUser].IsBlocked = !userData[this.state.selectedUser].IsBlocked;
                this.setState({
                    users: userData
                })
            } else {
                alert('Unable to update status! please try later.');
            }
        }).catch((error) => {
            if(error.data !== null && error.data !== undefined && error.data.success === false) {
                alert(error.data.message);
            } else {
                alert('Server error!');
            }
        });

    }
    changePage = (event, value) => {
        var tasks = [];
        for(var i = 5 * (value - 1); i < 5 * value && i < this.state.tasks.length; i++) {
            tasks.push(this.state.tasks[i]);
        }
        this.setState({
            page: value,
            currentTasks: tasks
        });
    }
    handleStartDateChange = (newValue) => {
        this.setState({
            valueDateStart : newValue
        });
    };
    handleEndDateChange = (newValue) => {
        this.setState({
            valueDateEnd : newValue
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
          EmployeeId: this.state.users[this.state.selectedUser].EmployeeId,
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
        this.state = {
            valueDateStart : this.initial,
            valueDateEnd : this.initial,
            tasks:  [],
            currentTasks: [],
            users:  [],
            filter: "Select Filter",
            selectedUser: 'Select User',
            page: 1,
            filterData: [this.initial, this.initial],
        };
    }
    render() {
        const taskCount = 5;
        return (
        <>
        <div id='taskViewer' className={styles.wrapper}>

        </div>
        <Grid container spacing={5} padding={{xs: 1, md: 2, lg: 5}} className={styles.container} style={{ display: 'flex' }} alignContent={"center"} alignItems={"center"}>
            <Grid item xs={12} md={4} padding={2}>
                <form onSubmit={this.handleSubmit}>
                    <Grid container spacing={2} sx={{display: 'flex'}} alignContent={"center"} alignItems={"center"}>
                        <Grid item xs={12} md={10}>
                            <TextField name='email' type='text' sx={{width: "100%"}} label='Email / Name' variant="outlined" focused autoComplete='off' />
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <Button sx={{width: '100%', textAlign: 'center', padding: 2}} variant="contained" type='submit'>
                                <SearchIcon />
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
            <Grid item xs={12} md={4} padding={2}>
            <FormControl fullWidth focused>
            <InputLabel>Filter By</InputLabel>
            <Select
                value={this.state.filter}
                label="Filter By"
                onChange={this.changeFilter}
                disabled={this.state.selectedUser === 'Select User' ? true : false}
            >
                <MenuItem value={'Select Filter'}>Select Filter</MenuItem>
                <MenuItem value={'Date'}>Date</MenuItem>
            </Select>
            </FormControl>
            </Grid>
            <Grid item xs={12} md={4} padding={2} sx={{textAlign: 'center'}}>
                {
                    this.state.filter === 'Date' ? (
                    <>
                    <form onSubmit={this.filterDate}>
                        <Grid container spacing={0.5} sx={{display: 'flex'}} alignContent={"center"} alignItems={"center"}>
                            <Grid item xs={12} md={5}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                    label="startDate"
                                    className={styles.profileInput}
                                    value={this.state.valueDateStart}
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
                                    value={this.state.valueDateEnd}
                                    onChange={this.handleEndDateChange}
                                    disableFuture={true}
                                    renderInput={(params) => <TextField id='endDate' name='endDate' variant="outlined" focused sx={{display: 'flex', width: '100%'}} {...params} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <Button sx={{width: '100%', textAlign: 'center', padding: 2}} variant="contained" type='submit'>
                                    <SearchIcon />
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                    </>
                    ) : (
                        <> No Filter Selected.</>
                    )
                }
            </Grid>
            <Grid item xs={12}>
                <Divider variant="middle" />
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2} className={styles.pageContainer} style={{ display: 'flex' }} alignContent={"center"} alignItems={"center"}>
                    <Grid item xs={0} md={3} lg={4}>
                        {/* white space */}
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <Grid container spacing={1} sx={{display: 'flex'}} alignContent={'center'} alignItems={'center'} padding={2}>
                            <Grid item xs={this.state.selectedUser === 'Select User' ? 12 : 10}>
                                <FormControl fullWidth focused>
                                    <InputLabel>Select User</InputLabel>
                                    <Select
                                        value={this.state.users.length === 0 ? 'No Users available' : this.state.selectedUser}
                                        label="Select User"
                                        onChange={this.changeUser}
                                        disabled={this.state.users.length === 0 ? true : false}
                                    >
                                        <MenuItem value={this.state.users.length === 0 ? 'No Users available' : 'Select User'}>{this.state.users.length === 0 ? 'No Users available' : 'Select User'}</MenuItem>
                                        {
                                            this.state.users.length === 0 ? (<></>) : (
                                                this.state.users.map((item, index) => {
                                                    return (
                                                        <MenuItem id={`user#${index}`} key={`user#${index}`} value={index}>{`${item.Name} ( ${item.EmailId} )`}</MenuItem>
                                                    );
                                                })
                                            )
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={this.state.selectedUser === 'Select User' ? 0 : 2}>
                                {this.state.selectedUser === 'Select User' ? (<></>) : (
                                    <Grid container spacing={0} sx={{display: 'flex'}} alignContent={'center'} alignItems={'center'}>
                                        <Grid item xs={12}>
                                            <FormGroup>
                                                <FormControlLabel onChange={this.toggleUserState} control={<Switch checked={!this.state.users[this.state.selectedUser].IsBlocked} />} />
                                            </FormGroup>
                                        </Grid>
                                        <Grid item xs={12} sx={{fontSize: 'x-small', paddingLeft: 0.5}}>
                                            {this.state.users[this.state.selectedUser].IsBlocked ? 'Blocked' : "Active"}
                                        </Grid>
                                    </Grid>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={0} md={3} lg={4}>
                        {/* white space */}
                    </Grid>
                    {
                        (((typeof this.state.selectedUser === 'string') && this.state.selectedUser === 'Select User') || this.state.tasks.length === 0) ? (<></>) : (
                            <Grid item xs={12} sx={{textAlign: 'center'}} alignContent={'center'} alignItems={'center'}>
                                <UserGraphs
                                    user={this.state.users[this.state.selectedUser]}
                                    filter={this.state.filterData}
                                />
                            </Grid>
                        )
                    }
                    <Grid item xs={12}>
                        <Grid container sx={{display: 'flex'}} alignContent={'center'} alignItems={'center'} spacing={2} justifyContent="center" direction={'column'} >
                            <Grid item xs={0} md={2} lg={3}>
                                {/* white space */}
                            </Grid>
                            <Grid item xs={12} md={8} lg={3} justifyContent='center'>
                                <Pagination onChange={this.changePage} count={typeof this.state.selectedUser === 'string' ? 0 : this.state.tasks.length % taskCount === 0 ? parseInt(this.state.tasks.length / taskCount) : parseInt((this.state.tasks.length / taskCount) + 1)} color="primary" />
                            </Grid>
                            <Grid item xs={0} md={8} lg={3}>
                                    {/* white space */}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} textAlign='center'>
                        {
                            this.state.tasks.length === 0 || (typeof this.state.selectedUser === 'string')? (
                                <> No tasks available.</>
                            ) : (
                                <>
                                <CollapsibleTable tasks={this.state.currentTasks} user={this.state.users[this.state.selectedUser]}/>
                                </>
                            )
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        </>
        );
    }
    componentDidMount() {
        if(this.state.users.length === 0) {
            axios.post('http://picoperformance.centralindia.cloudapp.azure.com:5000/api/listEmployees', {
                Search: ''
            }, {
                headers: {
                    Authorization: `Bearer ${this.props.token}`
                }
            }).then((response) => {
                if(response.status === 200 && response.data !== null && response.data != undefined && response.data.success === true) {
                    for(var i = 0; i < response.data.data.list.length; i++){
                        response.data.data.list[i]['token'] = this.props.token;
                    }
                    this.setState({
                        users: response.data.data.list
                    })
                } else {
                    alert('Unable to fetch user! please try later.');
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
