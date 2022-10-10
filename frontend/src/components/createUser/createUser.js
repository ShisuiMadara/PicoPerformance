import React from "react";
import { Grid, TextField, FormControl, NativeSelect, InputLabel} from "@mui/material";
import Button from '@mui/material/Button';
import axios from 'axios';

import styles from "./createUser.module.css";

export default function CreateUser(props) {
        const [submitState, setSubmit] = React.useState(false);
        var now = new Date();
        now = new Date(now.getTime() + (24 * 60 * 60 * 1000));
        var maxDate = now.toISOString().substring(0,10);
        const formArray = {
            'Name' : "text",
            'Contact' : 'phone',
            'Email' : "text",
            'Password' : "password",
        }

        const HandleInput = (event) => {
            let elements = document.getElementsByClassName(styles.profileInputs);
            let count = 0;
            for(let i = 0; i < elements.length - 1; i++){
                const value = elements[i].children[1].children[0].value;
                if(value !== '' && value !== null && value !== undefined){
                    count++;
                }
            }
            if(elements[elements.length - 1].children[0].value !== '0') {
                count++;
            }
            if(count === elements.length) {
                setSubmit(true);
            } else {
                setSubmit(false);
            }
            return true;
        }
        const getDepartment = (value) => {
            value = parseInt(value);
            if(value === 1) {
                return 'Software Developement';
            } else if(value === 2) {
                return 'Human Resource';
            } else if(value === 3) {
                return 'Management';
            } else if(value === 4) {
                return 'Finance';
            }
            return 'invalid';
        }
        const validate = (email) => {
            const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
            if(email.match(regex).length === 1) {
                return email;
            }
            return 'invalid';
        }
        const handleSubmit = (event) => {
            event.preventDefault();
            let elements = document.getElementsByClassName(styles.profileInputs);
            const data = {
                Name: elements[0].children[1].children[0].value,
                ContactNo: parseInt(elements[1].children[1].children[0].value),
                EmailId: validate(elements[2].children[1].children[0].value),
                Password: elements[3].children[1].children[0].value,
                JoiningDate: elements[4].children[1].children[0].value,
                Department: getDepartment(elements[5].children[0].value),
            }
            if(data.Department === 'invalid' || data.EmailId === 'invalid') {
                alert('Invalid Data.');
                return false;
            } else {
                axios.post('http://picoperformance.centralindia.cloudapp.azure.com:5000/api/register', data, {
                    headers: {
                        Authorization: `Bearer ${props.token}`
                    }
                }).then((response) => {
                    if(response.status === 200 && response.data !== null && response.data != undefined && response.data.success === true) {
                        alert(response.data.message);
                    } else {
                        alert('Unable to add task! please try later.');
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

        return(
            <>
            <h1>Create New Employee</h1>
            <form onSubmit={handleSubmit} style = {{width: "100%"}} >
                    <Grid container maxWidth sx = {{display: "flex", width: "100%"}} justifyContent = "center" alignContent = "center">
                        {
                            Object.keys(formArray).map((key, index) =>{
                                return(
                                    <Grid item sx = {{display: "flex", width: "100%"}} md={6} lg={6} px={3} py={4} key={key}>
                                        <TextField className={styles.profileInputs} name={key} type={formArray[key]} sx={{width: "100%"}} onKeyUp={HandleInput} resize={ {fontSize: 50} }label={key} variant="outlined" focused />
                                    </Grid>
                                );
                            })
                        }
                        <Grid item sx = {{display: "flex", width: "100%"}} md={6} lg={6} px={3} py={4} key={'Date'}>
                            <TextField className={styles.profileInputs} name={'Date'} inputProps={{max: maxDate}} type={'date'} sx={{width: "100%"}} onKeyUp={HandleInput} resize={ {fontSize: 50} } label={'Joining Date'} variant="outlined" focused />
                        </Grid>
                        <Grid item sx = {{display: "flex", width: "100%"}} md={6} lg={6} px={3} py={4}>
                            <FormControl fullWidth focused>
                            <InputLabel variant="standard" sx = {{display: "flex", width: "100%"}}   >
                                Department
                            </InputLabel>
                            <NativeSelect
                                className={styles.profileInputs}
                                name="department"
                                defaultValue={0}
                                inputProps={{
                                name: 'Department',
                                id: 'uncontrolled-native',
                                }}
                                onChange={HandleInput}
                            >
                                <option value={0}>None</option>
                                <option value={1}>Software Developement</option>
                                <option value={2}>Human Resource</option>
                                <option value={3}>Management</option>
                                <option value={4}>Finance</option>
                            </NativeSelect>
                            </FormControl>

                            </Grid>
                    </Grid>
                    <Grid container maxWidth sx = {{display: "flex", width: "100%"}} justifyContent="center" alligncontent="center">
                        <Grid item sx = {{display: "flex", width: "100%"}} xs={12} md={6} lg = {4} padding = {1}>
                            {
                                submitState ? (<Button className={styles.submitButton} type='submit' variant="contained">Submit</Button>):(<Button className={styles.submitButton} variant="outlined" disabled>Submit</Button>)
                            }
                        </Grid>
                    </Grid>
                </form>
            </>
        );
}
