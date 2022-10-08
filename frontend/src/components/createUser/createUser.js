import React from "react";
import { Grid, Avatar, Typography, Divider, TextField, Button } from "@mui/material";
import styles from "./createUser.module.css";

export default function CreateUser(props){
        const formArray = {
            'Name' : "text",
            'Contact' : 'phone',
            'Department' : "text",
            'Joining Date' : 'date',
            'Email' : "text",
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
            <h1>Create New Employee</h1>
            <form style = {{width: "100%"}}>
                    <Grid container maxWidth sx = {{display: "flex"}} justifyContent = "center" alignContent = "center">
                        {
                            Object.keys(formArray).map((key, index) =>{
                                return(
                                    <Grid item sx={12} md={6} lg={6} px={3} py={4} key={key}>
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
            </>
        );
}