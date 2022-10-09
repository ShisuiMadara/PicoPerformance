import React from "react";
import { Grid, TextField, FormControl, NativeSelect, InputLabel} from "@mui/material";
import Button from '@mui/material/Button';

import styles from "./createUser.module.css";

export default function CreateUser(props){
        const formArray = {
            'Name' : "text",
            'Contact' : 'phone',
            'Joining Date' : 'date',
            'Email' : "text",
            'Password' : "password",
        }

        const HandleInput = (event) => {
            let elements = document.getElementsByClassName("ProfileInputs");
            for(let i = 0; i < elements.length; i++){
                const value = elements[i].children[1].children[0].value;
                if(value !== "" && value!=null){
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
            <form style = {{width: "100%"}} >
                    <Grid container maxWidth sx = {{display: "flex", width: "100%"}} justifyContent = "center" alignContent = "center">
                        {
                            Object.keys(formArray).map((key, index) =>{
                                return(
                                    <Grid item sx = {{display: "flex", width: "100%"}} md={6} lg={6} px={3} py={4} key={key}>
                                        <TextField className="ProfileInputs" name={key} type={formArray[key]} sx={{width: "100%"}}  onKeyUp={HandleInput} resize={ {fontSize: 50} }label={key} variant="outlined" focused />
                                    </Grid>
                                );
                            })
                        }
                        <Grid item sx = {{display: "flex", width: "100%"}} md={6} lg={6} px={3} py={4}>
                            <FormControl fullWidth focused>
                            <InputLabel variant="standard" sx = {{display: "flex", width: "100%"}}   >
                                Department
                            </InputLabel>
                            <NativeSelect
                                defaultValue={"SELECT"}
                                inputProps={{
                                name: 'Department',
                                id: 'uncontrolled-native',
                                }}
                            >
                                <option value="">
                                    <em>None</em>
                                </option>
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
                                submitState?(<Button className={styles.submitButton} onClick={handleSubmit} variant="contained">Submit</Button>):(<Button className={styles.submitButton} variant="outlined">Submit</Button>)
                            }
                        </Grid>
                    </Grid>
                </form>
            </>
        );
}
