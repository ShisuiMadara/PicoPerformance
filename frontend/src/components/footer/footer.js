import { Grid } from "@mui/material";
import React from "react";

import styles from "./footer.module.css";

export default class Header extends React.Component {
    render() {
        return (
            <div className={styles.container}>
                <Grid container spacing={0} style={{ display: 'flex' , padding: 1}} alignContent={"center"} alignItems={"center"}>
                    <Grid item xs={12} textAlign={"center"}>
                        Footer
                    </Grid>
                </Grid>
            </div>
        );
    }
}

