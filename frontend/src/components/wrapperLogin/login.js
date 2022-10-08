import { Box, Button, Grid, TextField } from "@mui/material";
import react from "react";
import CloseIcon from '@mui/icons-material/Close';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PasswordIcon from '@mui/icons-material/Password';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

import styles from "./login.module.css";

const inputStyle = {
    "& .MuiInputLabel-root": { color: "#CF7500" },
    "& .MuiInputLabel-root.Mui-focused": {
        color: '#CF7500'
    },
    '& .MuiInput-underline:before': { borderBottomColor: '#CF7500' },
    '& .MuiInput-underline:after': { borderBottomColor: '#CF7500' },
    '& .MuiInput-underline:hover:before': { borderBottomColor: '#CF7500' },
    '& .MuiInput-underline:hover:after': { borderBottomColor: '#CF7500' },
    input: { color: '#F4F4F4' }
};

export default class Login extends react.Component {
    closer = () => {
        this.props.onClose();
    };
    authenticate = (event) => {
        event.preventDefault();
        console.log("sending request");
        this.updateStatus('Login Successfull');
    }
    togglePassView = () => {
        this.setState({
            passwordVisibility: !this.state.passwordVisibility
        });
    }
    sendForgotLink = () => {
        console.log("email sent successfully");
    }
    updateStatus = (message) => {
        this.enableStatus();
        document.getElementById('statusMessage').innerHTML += message;
    }
    enableStatus = () => {
        const elements = document.getElementsByClassName(styles.statusBar);
        for(var i = 0; i < elements.length; i++) {
            elements[i].style.display = 'block';
        }
    }
    disableStatus = () => {
        const elements = document.getElementsByClassName(styles.statusBar);
        for(var i = 0; i < elements.length; i++) {
            elements[i].style.display = 'none';
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            passwordVisibility: false
        }
    }
    render() {
        return (
        <>
            <form onSubmit={(event) => this.authenticate(event)}>
            <Grid className={styles.container} container style={{ display: 'flex' }} alignContent={"center"} alignItems={"center"}>
                <Grid item xs={12}>
                    <Grid container className={styles.messageContainer} padding={2} >
                        <Grid padding={3} item xs={12} textAlign={'center'}>
                            <Grid container spacing={3}>
                                <Grid item xs={0} sm={1} md={2} lg={4}>
                                    {/* empty space */}
                                </Grid>
                                <Grid item xs={12} sm={10} md={8} lg={4} textAlign={'right'} paddingLeft={1} paddingRight={1}>
                                    <Button className={styles.loginButton} onClick={() => this.closer()}>
                                        <CloseIcon />
                                    </Button>
                                </Grid>
                                <Grid item xs={0} sm={1} md={2} lg={4}>
                                    {/* empty space */}
                                </Grid>
                                <Grid className={styles.statusBar} item xs={0} sm={1} md={2} lg={4}>
                                    {/* empty space */}
                                </Grid>
                                <Grid className={styles.statusBar} item xs={12} sm={10} md={8} lg={4} paddingLeft={4} paddingRight={4}>
                                    <Grid container className={styles.statusMessageConatiner} alignContent={'center'}>
                                        <Grid id='statusMessage' item padding={1.5} xs={10} md={11}>

                                        </Grid>
                                        <Grid item xs={2} md={1}>
                                            <Button sx={{color: '#F4F4F4'}} onClick={() => this.disableStatus()}>
                                                <CloseIcon />
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid className={styles.statusBar} item xs={0} sm={1} md={2} lg={4}>
                                    {/* empty space */}
                                </Grid>
                                <Grid item xs={0} sm={1} md={2} lg={4}>
                                    {/* empty space */}
                                </Grid>
                                <Grid className={styles.inputContainer} item xs={12} sm={10} md={8} lg={4} paddingLeft={{lg: 5, xs: 3}} paddingRight={{lg: 5, xs: 3}}>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <AlternateEmailIcon sx={{ mr: 2, my: 0.5 }} />
                                        <TextField sx={inputStyle} fullWidth autoComplete="off" id="email" label="Email" name="email" variant="standard" />
                                    </Box>
                                </Grid>
                                <Grid item xs={0} sm={1} md={2} lg={4}>
                                    {/* empty space */}
                                </Grid>
                                <Grid item xs={0} sm={1} md={2} lg={4}>
                                    {/* empty space */}
                                </Grid>
                                <Grid className={styles.inputContainer} item xs={12} sm={10} md={8} lg={4} paddingLeft={{lg: 5, xs: 3}} paddingRight={{lg: 5, xs: 3}}>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <PasswordIcon sx={{ mr: 2, my: 0.5 }} />
                                        <TextField sx={inputStyle} fullWidth autoComplete="off" id="password" label="Password"  ame="password" variant="standard" type={this.state.passwordVisibility === true ? ('text') : ('password')} />
                                        <Button sx={{color: '#F4F4F4'}} paddingLeft={2} onClick={() => this.togglePassView()}>
                                            {this.state.passwordVisibility === true ? (<VisibilityIcon />) : (<VisibilityOffIcon />)}
                                        </Button>
                                    </Box>
                                </Grid>
                                <Grid item xs={0} sm={1} md={2} lg={4}>
                                    {/* empty space */}
                                </Grid>
                                <Grid item xs={0} sm={1} md={2} lg={4}>
                                    {/* empty space */}
                                </Grid>
                                <Grid item xs={12} sm={10} md={8} lg={4} textAlign={"right"} paddingLeft={{lg: 5, xs: 0}} paddingRight={{lg: 5, xs: 0}}>
                                    <Button sx={{fontSize: 'small !important', color: '#F4F4F4'}} type="submit" onClick={this.sendForgotLink}>
                                        forgot password ?
                                    </Button>
                                </Grid>
                                <Grid item xs={0} sm={1} md={2} lg={4}>
                                    {/* empty space */}
                                </Grid>
                                <Grid item xs={0} sm={1} md={2} lg={4}>
                                    {/* empty space */}
                                </Grid>
                                <Grid item xs={12} sm={10} md={8} lg={4} paddingLeft={{lg: 5, xs: 0}} paddingRight={{lg: 5, xs: 0}}>
                                    <Button className={styles.loginButton} variant="outlined" type="submit">
                                        Login
                                    </Button>
                                </Grid>
                                <Grid item xs={0} sm={1} md={2} lg={4}>
                                    {/* empty space */}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            </form>
        </>
        );
    }
}
