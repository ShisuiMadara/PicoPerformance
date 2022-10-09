import { Button, Divider, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Pagination, Select, Switch, TextField } from '@mui/material';
import react from 'react';
import ReactDOM from "react-dom/client";
import SearchIcon from '@mui/icons-material/Search';
import Card from '../taskCard/card';
import CloseIcon from '@mui/icons-material/Close';

import styles from './tasks.module.css';

export default class ATasks extends react.Component {
    previosPage = 0;
    handleSubmit = (event) => {
        event.preventDefault();
        console.log(event);
        event.target.email.value = '';
        var recievedData = [];
        // update tasks
        this.setState({
            tasks: recievedData
        });
    }
    changeFilter = (event) => {
        this.setState({
            filter: event.target.value
        });
    }
    changeUser = (event) => {
        if(typeof event.target.value === 'string' && event.target.value === 'Select User') {
            this.setState({
                filter: 'Select Filter'
            });
        }
        this.setState({
            selectedUser: event.target.value
        });
    }
    toggleUserState = (event) => {
        // send request

        // update localdata
        let userData = this.state.users;
        userData[this.state.selectedUser].IsBlocked = !userData[this.state.selectedUser].IsBlocked;
        this.setState({
            users: userData
        });

    }
    changePage = (event, value) => {
        var elements = document.getElementsByClassName(`taskPage#${this.previosPage - 1}`);
        for(var i = 0; i < elements.length; i++) {
            elements[i].style.display = 'none';
        }
        elements = document.getElementsByClassName(`taskPage#${value - 1}`);
        for(var i = 0; i < elements.length; i++) {
            elements[i].style.display = 'block';
        }
        this.previosPage = value;
    }
    filterDate = (event) => {
        event.preventDefault();
        console.log(event);
    }
    loadTask = (event) => {
        document.getElementById('taskViewer').style.zIndex = '100';
        ReactDOM.createRoot(document.getElementById('taskViewer')).render(<TaskViewer onClose={this.unloadTask} task={this.state.tasks[event.target.value]} />);
    }
    unloadTask = (event) => {
        document.getElementById('taskViewer').style.zIndex = '-100';
    }
    constructor(props) {
        super(props);
        this.state = {
            tasks:  [],
            users:  [],
            filter: "Select Filter",
            selectedUser: 'Select User'
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
                                <TextField name='startDate' type='date' sx={{width: "100%"}} label='From' variant="outlined" focused />
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <TextField name='endDate' type='date' sx={{width: "100%"}} label='To' variant="outlined" focused />
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
                    <Grid item xs={12}>
                        <Grid container sx={{display: 'flex'}} alignContent={'center'} alignItems={'center'} spacing={2} justifyContent="center" direction={'column'} >
                            <Grid item xs={0} md={2} lg={3}>
                                {/* white space */}
                            </Grid>
                            <Grid item xs={12} md={8} lg={3} justifyContent='center'>
                                <Pagination onChange={this.changePage} count={this.state.tasks.length % taskCount === 0 ? parseInt(this.state.tasks.length / taskCount) : parseInt((this.state.tasks.length / taskCount) + 1)} color="primary" />
                            </Grid>
                            <Grid item xs={0} md={8} lg={3}>
                                    {/* white space */}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} textAlign='center'>
                        <Grid container sx={{display: 'flex'}} alignContent={'center'} alignItems={'center'} spacing={2} justifyContent="center" direction={'column'}>
                        {
                            this.state.tasks.length === 0 ? (
                                <Grid item xs={12} sx={{textAlign: 'center'}}>No tasks available.</Grid>
                            ) : (this.state.tasks.map((task, index) => {
                                return (
                                    <Grid item xs={12} className={`taskPage#${parseInt(index/taskCount)}`} key={`taskPage#${index}`} sx={{display: 'none'}}>
                                        <Grid container sx={{display: 'flex'}} alignContent={'center'} alignItems={'center'} spacing={2} justifyContent="center" direction={'column'}>
                                            <Grid item xs={0} md={1} lg={2}>
                                                    {/* white space */}
                                            </Grid>
                                            <Grid className={styles.cardContainer} item xs={12} md={10} lg={8}>
                                                <Button onClick={this.loadTask} value={index}>
                                                    <Card task={task} />
                                                </Button>
                                            </Grid>
                                            <Grid item xs={0} md={1} lg={2}>
                                                    {/* white space */}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                );
                            }))
                        }
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        </>
        );
    }
    componentDidMount() {
        if(this.state.tasks.length !== 0) {
            this.changePage(null, 1);
        }
    }
}
class TaskViewer extends react.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <>
                <Grid container className={styles.taskContainer} sx={{display: 'flex'}} alignContent={'center'} alignItems={'center'}>
                    <Grid item xs={0} md={4}>
                        {/* white space */}
                    </Grid>
                    <Grid item xs={12} md={4} sx={{textAlign: 'right'}}>
                        {/* close button */}
                        <Button sx={{color: '#F4F4F4'}} onClick={this.props.onClose}>
                            <CloseIcon />
                        </Button>
                    </Grid>
                    <Grid item xs={0} md={4}>
                        {/* white space */}
                    </Grid>
                    <Grid item xs={0} md={4}>
                        {/* white space */}
                    </Grid>
                    {
                        Object.keys(this.props.task).length === 0 ? (<Grid item xs={12} md={4} sx={{textAlign: 'center'}}>Invalid task object.</Grid>) : (Object.keys(this.props.task).map((key, index) => {
                            return (
                                <Grid item xs={12} md={4}>
                                <Grid container maxWidth={true} sx={{display: 'flex'}} alignContent={'center'} alignItems={'center'}>
                                    <Grid item xs={8} md={5} sx={{textAlign: 'center'}}>
                                        {key}
                                    </Grid>
                                    <Grid item xs={2} md={2} sx={{textAlign: 'center'}}>
                                        :
                                    </Grid>
                                    <Grid item xs={12} md={5} sx={{textAlign: 'center'}}>
                                        {this.props.task[key]}
                                    </Grid>
                                </Grid>
                            </Grid>
                            );
                        }))
                    }
                    <Grid item xs={0} md={4}>
                        {/* white space */}
                    </Grid>
                </Grid>
            </>
        );
    }
}
