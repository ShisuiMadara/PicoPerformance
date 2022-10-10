import { Box, Button, Grid, TextField } from "@mui/material";
import react from 'react';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PasswordIcon from '@mui/icons-material/Password';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';

import styles from './forgotpassword.module.css';

const inputStyle = {
    "& .MuiInputLabel-root": { color: "#CF7500" },
    "& .MuiInputLabel-root.Mui-focused": {
        color: '#CF7500'
    },
    '& .MuiInput-underline:before': { borderBottomColor: '#CF7500' },
    '& .MuiInput-underline:after': { borderBottomColor: '#CF7500' },
    '& .MuiInput-underline:hover:before': { borderBottomColor: '#CF7500' },
    '& .MuiInput-underline:hover:after': { borderBottomColor: '#CF7500' },
    input: { color: '#000000' }
};


export default class Fpassword extends react.Component {
    togglePassView = () => {
        this.setState({
            passwordVisibility: !this.state.passwordVisibility
        });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        event.target.email.value = '';
        event.target.password.value = '';
        if(email === '' || email === null || email === undefined || password === '' || password === null || password === undefined) {
            alert('Email and Password can not be empty.');
        } else {
            axios.post('http://picoperformance.centralindia.cloudapp.azure.com:5000/api/reset-password', {
                EmailId: email,
                Password: password,
                Token: this.state.Token
            }).then((response) => {
                if(response.status === 200 && response.data.success === true) {
                    sessionStorage.clear();
                    window.location.href = '/dashboard';
                }
                return true;
            }).catch((result) => {
                if(result.response.data !== undefined && result.response.data.success === false) {
                    alert(result.response.data.message);
                } else {
                    alert('Server-side error!');
                }
                return true;
            });
        }
    }
    constructor(props) {
        super(props);
        const token = new URL(window.location.href).searchParams.get('token');
        this.state = {
            passwordVisibility: false,
            Token: token
        }
    }
    render() {
        return (
        <div style={{flexGrow: 1}}>
            <form onSubmit={this.handleSubmit}>
            <Grid className={styles.container} padding={3} container spacing={3} style={{ display: 'flex' }} alignContent={"center"} alignItems={"center"}>
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
                        <TextField sx={inputStyle} fullWidth autoComplete="off" id="password" label="New Password" name="password" variant="standard" type={this.state.passwordVisibility === true ? ('text') : ('password')} />
                        <Button sx={{color: '#000000'}} paddingLeft={2} onClick={() => this.togglePassView()}>
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
                <Grid item xs={12} sm={10} md={8} lg={4} paddingLeft={{lg: 5, xs: 3}} paddingRight={{lg: 5, xs: 3}} marginTop={2}>
                    <Button sx={{width: '100%'}} className={styles.loginButton} variant="outlined" type="submit">
                        Update Password
                    </Button>
                </Grid>
                <Grid item xs={0} sm={1} md={2} lg={4}>
                    {/* empty space */}
                </Grid>
            </Grid>
            </form>
        </div>
        );
    }
}
