import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Grid, TextField } from "@mui/material";
import styles from "./taskCardDesc.module.css";

export default class TaskCardDesc extends React.Component {
  closer = () => {
    this.props.onClose();
  };
  render() {
    return (
      <>
        <Grid
          className={styles.container}
          container
          style={{ display: "flex", marginTop: "5%" }}
          alignContent={"center"}
          alignItems={"center"}
        >
          <Grid item xs={12}>
            <Grid container className={styles.messageContainer} padding={2}>
              <Grid padding={3} item xs={12} textAlign={"center"}>
                <Grid container spacing={3}>
                  <Grid item xs={0} sm={1} md={2} lg={4}>
                    {/* empty space */}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={10}
                    md={8}
                    lg={4}
                    textAlign={"right"}
                    paddingLeft={1}
                    paddingRight={1}
                  >
                    <Button
                      className={styles.loginButton}
                      onClick={() => this.closer()}
                    >
                      <CloseIcon />
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          
        </Grid>
        <Grid container maxWidth sx = {{display: "flex", px: "20%"}} justifyContent = "center" alignContent = "center" className = {styles.setbackGround}>
          <Grid item xs={12} md={12} lg={12} px={3} py={4} > 
            TaskId : 1
          </Grid>
          <Grid item xs={12} md={12} lg={12} px={3} py={4} > 
            EmployeeId : 1
          </Grid>
          <Grid item xs={12} md={12} lg={12} px={3} py={4} > 
            StartDate : 1
          </Grid>
          <Grid item xs={12} md={12} lg={12} px={3} py={4} > 
            TaskType : 1
          </Grid>
          <Grid item xs={12} md={12} lg={12} px={3} py={4} > 
            Task Description : 1
          </Grid>
          <Grid item xs={12} md={12} lg={12} px={3} py={4} > 
            Time Taken : 1
          </Grid>
            </Grid>
      </>
    );
  }
}
