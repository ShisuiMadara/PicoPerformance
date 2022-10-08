import * as React from "react";
import { Grid, Avatar, Typography, Divider, TextField, Button } from "@mui/material";
// import EfficiencyHistory from "../Charts/EfficiencyHistory";
// import CompanyComparision from "../Charts/CompanyComparision";
// stylesheets
import styles from "./Profile.module.css";
// import axios from "axios";

function capitalize( value){
    let str = `${value}`.toLowerCase();
    return str.slice(0,1).toUpperCase() + str.slice(1);
}

export default function Profile(props){
    const sampledata = {
        'Name' : "Ashutosh Gangwar",
        'Eamil' : "Ashutosh Gangwar",
        'Contact' : "Ashutosh Gangwar",
        'Password' : "Ashutosh Gangwar",
        'Employee Id' : "Ashutosh Gangwar"
    }
    const formArray = {
        'Email' : "text",
        'Contact' : 'phone',
        'Password' : "password",
    }
    const HandleInput = (event) => {
        let elements = document.getElementsByClassName("ProfileInputs");
        for(let i = 0; i < elements.length; i++){
            const value = elements[i].children[1].children[0].value;
            if(value!="" && value!=null){
                setSubmit(true);
                return true;
            }
        }
        setSubmit(false);
        return false;
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event.target);
    }
 
    const [submitState, setSubmit] = React.useState(false);
    return(
        <>
        <Grid container maxWidth padding = {{
            xs: 2,
            md: 3,
            lg: 5,
        }} classname = {styles.container}>
            <Grid item xs={12}>
                <Divider variant = "middle" />
            </Grid>
            <Grid item xs = {12} padding={{
                xs: 2,
                md: 3,
                lg: 5,
            }}>
                <Grid container maxWidth>
                    <Grid item xs={12} padding = {1}>
                        <Typography variant = "h5" padding = {1}>
                            <b>Your Profile</b>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md = {4} padding = {{
                        xs: 2,
                        md: 3,
                        lg: 5,
                    }} sx = {{display: "flex"}} alignContent = "center" justifyContent="center">
                        <Avatar sx = {{width: 200, height: 200, bgcolor: "orange"}}></Avatar>
                    </Grid>
                    <Grid item xs={12} md={8} padding={{
                        xs: 2,
                        md: 3,
                        lg: 5,
                    }}>
                          {Object.keys(sampledata).map((key, index) =>{
                                    return(
                                        <Grid container maxWidth key={index} padding={1}>
                                            <Grid item xs={2} sx={{display: "flex"}} alignContent="left" justifyContent="left">
                                                <Typography variant="h6">
                                                    <b>{capitalize(`${key}`)}</b>
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={2} sx={{display: "flex"}} alignContent="center" justifyContent="center">
                                                <Typography variant="h6">
                                                    <b>:</b>
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={8} sx={{display: "flex"}} alignContent="left" justifyContent="left">
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
                <form style = {{width: "100%"}}>
                    <Grid container maxWidth sx = {{display: "flex"}} justifyContent = "center" alignContent = "center">
                        {
                            Object.keys(formArray).map((key, index) =>{
                                return(
                                    <Grid item sx={12} md={6} lg={4} padding={1} key={key}>
                                        <TextField className="ProfileInputs" name={key} type={formArray[key]} sx={{width: "100%"}}  onKeyUp={HandleInput} label={key} variant="outlined" />
                                    </Grid>
                                );
                            })
                        }
                    </Grid>
                    <Grid container maxWidth sx = {{display: "flex"}} justifyContent="center" alligncontent="center">
                        <Grid item xs={12} md={6} lg = {4} padding = {1}>
                            {
                                submitState?(<Button className={styles.submitButton} onClick={handleSubmit} variant="contained">Submit</Button>):(<Button className={styles.submitButton} disabled variant="outlined">Submit</Button>)
                            }
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Grid>
        </>
    );
}
