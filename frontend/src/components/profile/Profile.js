import * as React from "react";
import { Grid, Avatar, Typography, Divider, TextField, Button } from "@mui/material";
import axios from "axios";
// stylesheets
import styles from "./Profile.module.css";

function capitalize( value){
    let str = `${value}`.toLowerCase();
    return str.slice(0,1).toUpperCase() + str.slice(1);
}

export default function Profile(props){
    console.log(props.userdata);
    const [submitState, setSubmit] = React.useState(false);
    const [sampledata, setSampleData] = React.useState({
        'Employee Id' : props.userdata.EmployeeId,
        'Name' : props.userdata.Name,
        'Eamil ID' : props.userdata.EmailId,
        'Contact' : props.userdata.ContactNo
    });
    const formArray = {
        'Name' : "text",
        'Contact' : "phone",
        'New Password' : "password"
    }
    const handleInput = (event) => {
        var elements = document.getElementsByClassName(styles.profileInputs);
        if((elements[0].childNodes[1].childNodes[0].value !== '' && elements[0].childNodes[1].childNodes[0].value != undefined && elements[0].childNodes[1].childNodes[0].value != null) ||
        (elements[1].childNodes[1].childNodes[0].value !== '' && elements[1].childNodes[1].childNodes[0].value != undefined && elements[1].childNodes[1].childNodes[0].value != null) ||
        (elements[2].childNodes[1].childNodes[0].value !== '' && elements[2].childNodes[1].childNodes[0].value != undefined && elements[2].childNodes[1].childNodes[0].value != null)) {
            setSubmit(true);
        } else {
            setSubmit(false);
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        var newData = props.userdata;
        var oldName = newData.Name, oldContact = newData.ContactNo;
        newData.Name = (event.target['Name'].value === '' || event.target['Name'].value === null || event.target['Name'].value === undefined) ? newData.Name : event.target['Name'].value;
        newData.ContactNo = (event.target['Contact'].value === '' || event.target['Contact'].value === null || event.target['Contact'].value === undefined) ? newData.ContactNo : event.target['Contact'].value;
        if(newData.Name !== oldName || newData.ContactNo != oldContact) {
            axios.post('http://picoperformance.centralindia.cloudapp.azure.com:5000/api/update', newData, {
                headers: {
                    Authorization: `Bearer ${newData.token}`
                }
            }).then((response) => {
                if(response.status === 200 && response.data !== null && response.data != undefined && response.data.success === true) {
                    setSampleData({
                        'Employee Id' : newData.EmployeeId,
                        'Name' : newData.Name,
                        'Eamil ID' : newData.EmailId,
                        'Contact' : newData.ContactNo
                    });
                    sessionStorage.setItem('userInfo', JSON.stringify(newData));
                } else {
                    alert('Unable to update data! please try later.');
                }
            }).catch((error) => {
                if(error.data !== null && error.data !== undefined && error.data.success === false) {
                    alert(error.data.message);
                } else {
                    alert('Server error!');
                }
            })
        }
        if(event.target['New Password'].value !== '' && event.target['New Password'].value !== null && event.target['New Password'].value !== undefined) {
            axios.post('http://picoperformance.centralindia.cloudapp.azure.com:5000/api/changePassword', {
                EmailId: newData.EmailId,
                Password: event.target['New Password'].value
            }, {
                headers: {
                    Authorization: `Bearer ${newData.token}`
                }
            }).then((response) => {
                if(response.status === 200 && response.data !== null && response.data != undefined && response.data.success === true) {
                    alert(response.data.message);
                    sessionStorage.clear();
                    window.location.replace('/');
                } else {
                    alert('Unable to update data! please try later.');
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
        <Grid container maxWidth padding = {{
            xs: 2,
            md: 3,
            lg: 5,
        }} className = {styles.container}>
            <Grid item xs={12}>
                <Divider variant = "middle" />
            </Grid>
            <Grid item xs = {12} padding={{
                xs: 2,
                md: 3,
                lg: 5,
            }}>
                <Grid container maxWidth sx = {{display: "flex", width: "100%"}}>
                    <Grid sx = {{display: "flex", width: "100%"}} item xs={12} padding = {1}>
                        <Typography variant = "h5" padding = {1}>
                            <b>Your Profile</b>
                        </Typography>
                    </Grid>
                    <Grid sx = {{ width: "100%"}} item xs={12} md = {4} padding = {{
                        xs: 2,
                        md: 3,
                        lg: 5,
                    }} alignContent = "center" justifyContent="center">
                        <Avatar sx = {{width: 200, height: 200, bgcolor: "orange"}}></Avatar>
                    </Grid>
                    <Grid sx = {{ width: "100%"}} item xs={12} md={8} padding={{
                        xs: 2,
                        md: 3,
                        lg: 5,
                    }}>

                          {Object.keys(sampledata).map((key, index) =>{
                                    return(
                                        <Grid container maxWidth  key={index} padding={1}>
                                            <Grid item xs={6} lg={4} sx={{display: "flex", width: "100%", textAlign: 'center'}} alignContent="left" justifyContent="left">
                                                <Typography variant="h6">
                                                    <b>{capitalize(`${key}`)}</b>
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} lg={2} sx = {{display: "flex", width: "100%", textAlign: 'left'}} padding={1} alignContent="center" justifyContent="center">
                                                <Typography variant="h6">
                                                    <b>:</b>
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} lg={6} sx = {{display: "flex", width: "100%", textAlign: 'center'}}  padding={1} alignContent="left" justifyContent="left">
                                                <Typography variant="h6">
                                                    {sampledata[key]}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    );
                                })}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Divider variant = "middle" />
            </Grid>
            <Grid item xs={12}  padding = {{
                xs: 2,
                md: 3,
                lg: 5,
            }}>
                <Typography variant="h5" padding={1}>
                    <b>Update Profile</b>
                </Typography>
                <form onSubmit={handleSubmit} style = {{width: "100%"}}>
                    <Grid container maxWidth sx = {{display: "flex", width: "100%"}} justifyContent = "center" alignContent = "center">
                        {
                            Object.keys(formArray).map((key) =>{
                                return(
                                    <Grid item sx = {{display: "flex", width: "100%"}}  md={6} lg={4} padding={1} key={key}>
                                        <TextField className={styles.profileInputs} name={key} type={formArray[key]} sx={{width: "100%"}} onKeyUp={handleInput} label={key} variant="outlined" />
                                    </Grid>
                                );
                            })

                        }
                    </Grid>

                    <Grid container maxWidth sx = {{display: "flex", width: "100%"}} justifyContent="center" alligncontent="center">
                        <Grid item xs={12} md={6} lg = {4} padding = {1}>
                            {
                                submitState?(<Button className={styles.submitButton} type='submit' variant="contained">Submit</Button>):(<Button className={styles.submitButton} variant="outlined">Submit</Button>)
                            }
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Grid>
        </>
    );
}
