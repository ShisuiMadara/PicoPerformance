import react from "react";
import { Button, FormControl, Grid, InputLabel, TextField, NativeSelect } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers';
import axios from 'axios';

import styles from "./createTasks.module.css";


export default function CreateTasks(props) {
    const [valueDate, setValueDate] = react.useState(dayjs(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}T00:00:00`));
    const [valueTime, setValueTime] = react.useState(dayjs(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}T00:00:00`));
    var selectHours = -1, selectedMinutes = -1;
    const handleDateChange = (newValue) => {
        setValueDate(newValue);
    };
    const handleTimeChange = (newValue) => {
        setValueTime(newValue);
    };
    const formArray = {
        'Task Description' : 'textarea',
        'Time Taken ( in minutes )' : 'number',
    };
    const HandleInput = (event) => {
        let elements = document.getElementsByClassName(styles.profileInput);
        var counter = 0;
        for(let i = 0; i < elements.length - 1; i++){
            const value = elements[i].children[1].children[0].value;
            if(value !== "" && value !== null && value !== undefined){
                counter++;
            }
        }
        if(elements[elements.length - 1].childNodes[0].value !== 0) {
            counter++;
        }
        if(counter === elements.length) {
            setSubmit(true);
        }
        else {
            setSubmit(false);
        }
        return false;
    }
    const convertTime12to24 = (time12h) => {
        const [time, modifier] = time12h.split(' ');

        let [hours, minutes] = time.split(':');

        if (hours === '12') {
          hours = '00';
        }

        if (modifier === 'PM') {
          hours = parseInt(hours, 10) + 12;
        }

        return `${hours}:${minutes}`;
    }
    const getType = (value) => {
        value = parseInt(value);
        if(value === 1) {
            return 'Break';
        } else if(value === 2) {
            return 'Meeting';
        } else if(value === 3) {
            return 'Work';
        }
        return 'invalid';
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        let elements = document.getElementsByClassName(styles.profileInput);
        const date = `${elements[2].children[1].children[0].value.slice(6, 11)}-${elements[2].children[1].children[0].value.slice(0, 2)}-${elements[2].children[1].children[0].value.slice(3, 5)}`;
        const time = convertTime12to24(elements[3].children[1].children[0].value);
        const data = {
            EmployeeId: props.EmployeeId,
            TaskDescription: elements[0].children[1].children[0].value,
            StartDate: `${date} ${time}`,
            TimeTaken: elements[1].children[1].children[0].value,
            TaskType: getType(elements[4].children[0].value),
        }
        if(data.TaskType === 'invalid') {
            alert('Invalid Task Details.');
            return false;
        } else {
            axios.post('http://picoperformance.centralindia.cloudapp.azure.com:5000/api/addtask', data, {
                headers: {
                    Authorization: `Bearer ${props.token}`
                }
            }).then((response) => {
                if(response.status === 200 && response.data !== null && response.data != undefined && response.data.success === true) {
                    alert(response.data.message);
                } else {
                    alert('Unable to register user! please try later.');
                }
            }).catch((error) => {
                if(error.data !== null && error.data !== undefined && error.data.success === false) {
                    alert(error.data.message);
                } else {
                    alert('Server error!');
                }
            })
        }
    }

    const [submitState, setSubmit] = react.useState(false);
    return(
        <>
        <h1>Create New Task</h1>
        <form onSubmit={handleSubmit} style = {{width: "100%"}}>
                <Grid container maxWidth sx = {{display: "flex"}} justifyContent = "center" alignContent = "center">
                    {
                        Object.keys(formArray).map((key, index) =>{
                            return(
                                <Grid item sx = {{display: "flex", width: "100%"}} md={6} lg={6} px={3} py={4} key={key}>
                                    <TextField className={styles.profileInput} name={key} type={formArray[key]} sx={{width: "100%"}} onKeyUp={HandleInput} label={key} variant="outlined" focused />
                                </Grid>
                            );
                        })
                    }
                    <Grid item sx = {{display: "flex", width: "100%"}} md={6} lg={6} px={3} py={4}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                            label="Start Date"
                            className={styles.profileInput}
                            value={valueDate}
                            onChange={handleDateChange}
                            disableFuture={true}
                            renderInput={(params) => <TextField id='date' name='date' variant="outlined" onChange={HandleInput} focused sx={{display: 'flex', width: '100%'}} {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item sx = {{display: "flex", width: "100%"}} md={6} lg={6} px={3} py={4}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker
                            className={styles.profileInput}
                            label="Start Time"
                            value={valueTime}
                            onChange={handleTimeChange}
                            disableFuture={true}
                            shouldDisableTime={(time, type) => {
                                var currentHours = new Date().getHours();
                                var currentMinutes = new Date().getMinutes();
                                var date = `${new Date().getMonth() + 1}/${new Date().getDate()}/${new Date().getFullYear()}`;
                                if(document.getElementById('date') === null || document.getElementById('date').value < date) {
                                    return false;
                                }
                                if(type === 'hours') {
                                    selectHours = time;
                                    return !((selectHours < currentHours) || (selectHours == currentHours && selectedMinutes < currentMinutes));
                                } else if(type === 'minutes') {
                                    selectedMinutes = time;
                                    return !((selectHours < currentHours) || (selectHours == currentHours && selectedMinutes < currentMinutes))
                                }
                                return false;
                            }}
                            renderInput={(params) => <TextField name='time' variant="outlined" onChange={HandleInput} focused sx={{display: 'flex', width: '100%'}} {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item sx = {{display: "flex", width: "100%"}} md={6} lg={6} px={3} py={4} >
                        <FormControl fullWidth focused>
                        <InputLabel variant="standard" sx = {{display: "flex", width: "100%"}}   >
                            Task Type
                        </InputLabel>
                        <NativeSelect
                            className={styles.profileInput}
                            defaultValue={"SELECT"}
                            inputProps={{
                            name: 'Department',
                            id: 'uncontrolled-native',
                            }}
                        >
                            <option value={0}>None</option>
                            <option value={1}>Break</option>
                            <option value={2}>Meeting</option>
                            <option value={3}>Working</option>
                        </NativeSelect>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container maxWidth sx = {{display: "flex"}} justifyContent="center" alligncontent="center">
                    <Grid item xs={12} md={6} lg = {4} padding = {1}>
                        {
                            submitState ? (<Button className={styles.submitButton} type='submit' variant="contained">Submit</Button>):(<Button className={styles.submitButton} variant="outlined" disabled>Submit</Button>)
                        }
                    </Grid>
                </Grid>
            </form>
        </>
    );
}
