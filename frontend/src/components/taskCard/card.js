import react from "react";

import styles from "./card.component.css";
import { Button, Grid, Divider } from "@mui/material";

export default class Card extends react.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Grid
          container
          maxWidth={true}
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}
          sx={{ display: "flex", color: "white", fontSize: 16 }}
          alignContent="center"
          alignItems={"center"}
        >
          <Grid
            item
            xs={12}
            md={6}
            lg={3}
            textAlign="center"
            className={styles.center}
            sx={{ py: "1%" }}
          >
            <Grid
              item
              textAlign="center"
              className={styles.center}
              sx={{ py: "1%" }}
            >
              TaskId
            </Grid>
            <Grid
              item
              textAlign="center"
              className={styles.center}
              sx={{ py: "1%" }}
            >
              2
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            lg={3}
            textAlign="center"
            className={styles.center}
            sx={{ py: "1%" }}
          >
            <Grid
              item
              textAlign="center"
              className={styles.center}
              sx={{ py: "1%" }}
            >
              EmployeeId
            </Grid>

            <Grid
              item
              textAlign="center"
              className={styles.center}
              sx={{ py: "1%" }}
            >
              2020UCS0106
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            lg={3}
            textAlign="center"
            className={styles.center}
            sx={{ py: "1%" }}
          >
            <Grid
              item
              textAlign="center"
              className={styles.center}
              sx={{ py: "1%" }}
            >
              StartDate
            </Grid>

            <Grid
              item
              textAlign="center"
              className={styles.center}
              sx={{ py: "1%" }}
            >
              6 October 2022
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            lg={3}
            textAlign="center"
            className={styles.center}
            sx={{ py: "1%" }}
          >
            <Grid
              item
              textAlign="center"
              className={styles.center}
              sx={{ py: "1%" }}
            >
              TaskType
            </Grid>

            <Grid
              item
              textAlign="center"
              className={styles.center}
              sx={{ py: "1%" }}
            >
              Same
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }
}
