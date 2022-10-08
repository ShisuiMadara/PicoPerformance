import { Button, Grid } from "@mui/material";
import react from "react";
import CloseIcon from '@mui/icons-material/Close';

import styles from "./login.module.css";

export default class Login extends react.Component {
    closer = () => {
        this.props.onClose();
    };
    constructor(props) {
        super(props);
    }
    render() {
        return (
        <>
            <Grid className={styles.container} container style={{ display: 'flex' }} alignContent={"center"} alignItems={"center"}>
                <Grid item xs={12}>
                    <Grid container className={styles.messageContainer} padding={2} spacing={5}>
                        <Grid padding={3} item xs={12} textAlign={'center'}>
                            <Grid container>
                                <Grid item xs={0} sm={4} md={4}>
                                    {/* empty space */}
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Button className={styles.loginButton} onClick={() => this.closer()}>
                                        <CloseIcon />
                                    </Button>
                                </Grid>
                                <Grid item xs={0} sm={4} md={4}>
                                    {/* empty space */}
                                </Grid>
                                <Grid item xs={0} sm={4} md={4}>
                                    {/* empty space */}
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Button className={styles.loginButton} variant="outlined" onClick={() => console.log(1)}>
                                        Login
                                    </Button>
                                </Grid>
                                <Grid item xs={0} sm={4} md={4}>
                                    {/* empty space */}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
        );
    }
}
