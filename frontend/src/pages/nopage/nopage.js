import React from "react";
import Grid from "@mui/material/Grid";
import styles from "./nopage.module.css";
import logo from "../../icons/error-404.png";

export default class NoPage extends React.Component {
    render() {
        return (
            <div style={{flexGrow: 1}}>
            <Grid className={styles.nopageContainer} container spacing={1} style={{ display: 'flex' }} alignContent={"center"} alignItems={"center"}>
                <Grid item xs={12} sm={6} textAlign={'center'}>
                    <img src={logo} height = "200vh" width = "auto" alt = "404" />
                </Grid>
                <Grid className={styles.messageConatiner} item xs={12} sm={6} textAlign={'center'}>
                    Oops, <br />page not found.
                </Grid>
            </Grid>
            </div>
        );
    }
}
