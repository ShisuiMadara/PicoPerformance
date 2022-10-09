import { Button, Divider, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Select, Switch, TextField } from '@mui/material';
import react from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Card from '../taskCard/card';

import styles from './tasks.module.css';

export default class UTasks extends react.Component {
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
    filterDate = (event) => {
        event.preventDefault();
        console.log(event);
    }
    constructor(props) {
        super(props);
        this.state = {
            tasks:  [],
            users:  [{'Name': 'Gourav Bidhuri', 'EmailId': '2020ucs0101@iitjammu.ac.in', 'IsBlocked': false},],
            filter: "Select Filter",
            selectedUser: 'Select User'
        };
    }
    render() {
        var counter = 0;
        return (
        <>
         <Button style={{width: '100%'}}  className = {styles.cardframe} sx = {{marginBottom: 2}}> 
            <Card/>
        </Button>
        <Divider variant = "middle"  />
        
        </>
        );
    }
}
