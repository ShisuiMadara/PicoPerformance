import React from "react";
import {Grid, Button} from "@mui/material";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import image from "../../icons/progress.jpeg";

import styles from "./home.module.css";
import Login from "../../components/wrapperLogin/login";


const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: 300,
    [theme.breakpoints.down('sm')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &.Mui-focusVisible': {
      zIndex: 1,
      '& .MuiImageBackdrop-root': {
        opacity: 0.15,
      },
      '& .MuiImageMarked-root': {
        opacity: 0,
      },
      '& .MuiTypography-root': {
        border: '4px solid currentColor',
      },
    },
}));
const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  });

const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
}));


export default class Home extends React.Component {
    target = 'Know your employees better.';
    counter = 0;
    wrapLoginOpen = () => {
        const element = document.getElementsByClassName(styles.loginWrapper);
        element[0].style.zIndex = '100';
    }
    wrapLoginClose = () => {
        const element = document.getElementsByClassName(styles.loginWrapper);
        element[0].style.zIndex = '-100';
    }
    type = () => {
        if(this.startType && this.counter <= this.target.length) {
            this.setState({quote: this.target.substring(0, this.counter)});
            this.counter += 1;
        } else {
            clearInterval(this.timerId);
        }
    }
    timerId = setInterval(this.type, 100);
    startType = false;
    constructor(props) {
        super(props);
        this.state = {
            quote:  ''
        };
    }
    render() {
        const userinfo = JSON.parse(sessionStorage.getItem("userInfo"));
        return (
            <>
                <div className={styles.loginWrapper}>
                    <Login onClose={this.wrapLoginClose}/>
                </div>
                <div>
                    <div className={styles.body}>
                        <Grid className={styles.container} container style={{ display: 'flex' }} alignContent={"center"} alignItems={"center"}>
                            <Grid item xs={12}>
                                <Grid container className={styles.messageContainer} marginTop={5} padding={1}>
                                    <Grid item xs={1} sm={2} md={3}>
                                        {/* blank space */}
                                    </Grid>
                                    <Grid padding={3} item xs={10} sm={8} md={6} textAlign={'center'}>
                                        <ImageButton
                                        focusRipple
                                        key={"PicoPerformance"}
                                        style={{
                                            width: "100%",
                                        }}
                                        href="/"
                                        >
                                            <ImageSrc style={{ backgroundImage: `url(${image})` }} />
                                            <ImageBackdrop className="MuiImageBackdrop-root" />
                                            <Image>
                                                <Typography
                                                component="span"
                                                variant="subtitle1"
                                                color="#F4F4F4"
                                                sx={{
                                                    position: 'relative',
                                                    p: 4,
                                                    pt: 2,
                                                    pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                                                }}
                                                >
                                                {"Pico Performance"}
                                                <ImageMarked className="MuiImageMarked-root" />
                                                </Typography>
                                            </Image>
                                        </ImageButton>
                                    </Grid>
                                    <Grid item xs={0} sm={1} md={3}>
                                        {/* blank space */}
                                    </Grid>
                                    <Grid padding={3} item xs={12} textAlign={'center'}>
                                        {this.state.quote}
                                    </Grid>
                                    <Grid padding={3} item xs={12} textAlign={'center'}>
                                        <Grid container>
                                            <Grid item xs={0} sm={3} md={4}>
                                                {/* empty space */}
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={4}>
                                                {(userinfo === null || userinfo.authorized === undefined || userinfo.authorized === false) ? (
                                                    <Button className={styles.loginButton} variant="outlined" color="error" onClick={this.wrapLoginOpen}>
                                                        Login
                                                    </Button>
                                                ) : (
                                                    <Button className={styles.loginButton} variant="outlined" color="error" href="/dashboard">
                                                        Dashboard
                                                    </Button>
                                                )}
                                            </Grid>
                                            <Grid item xs={0} sm={3} md={4}>
                                                {/* empty space */}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid padding={3} item xs={12} textAlign={'center'}>
                                        What does it offer ?
                                    </Grid>
                                    <Grid padding={3} item xs={12} textAlign={'center'}>
                                        <Grid container padding={5} spacing={3}>
                                            <Grid className={styles.login} item xs={12} md={6}>
                                                {/* content part 1 */}
                                                The deadlines approach but the work progress stands still… Tired of seeing employees struggle at work? People are unable to manage time and resources while companies stand helpless. Millions are wasted on organizing workshops and hiring “motivators”. But what if there is a FREE and elegant solution to it?
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {/* content part 2 */}
                                                Introducing PicoPerformance, a free task management and time analyzer tool. We provide you indepth information about the time break of the employee.
Fed up of numbers? We provide interactive and dynamic graphs for better visualization and comparison. Now the employee as well as the employer can improve on how they spend their time.

                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </>
        );
    }
    componentDidMount() {
        this.startType = true;
    }
}
