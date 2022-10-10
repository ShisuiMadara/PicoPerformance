// react and mui components
import * as React from "react";
import {
  styled,
  ThemeProvider,
  useTheme,
  createTheme,
} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Breadcrumbs, Link } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Profile from "../../components/profile/Profile";
import CreateUser from "../../components/createUser/createUser";
import ATasks from "../../components/adminTasks/tasks";
import UTasks from "../../components/userTasks/tasks";
import CreateTasks from "../../components/createTasks/createTasks";
import axios from 'axios';

import styles from "./dashboard.module.css";

const Dashboard = (props) => {
  const [allowAccess, setAllowAccess] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth > 768 ? window.innerWidth / 3 : window.innerWidth);
  const validate = () => {
    axios.post('http://picoperformance.centralindia.cloudapp.azure.com:5000/api/hello', {}, {
      headers: {
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('userInfo')).token}`
      }
    }).catch((error) => {
      setAllowAccess(false);
    }).then((response) => {
      if(response.data !== null && response.data !== undefined && response.data.success === true) {
        setAllowAccess(true);
      } else {
        setAllowAccess(false);
      }
    })
  }
  // validate user
  const userdata = JSON.parse(sessionStorage.getItem('userInfo'));
  let usertype = '';
  if(userdata !== null && userdata !== undefined && userdata !== {}) {
    usertype = (JSON.parse(sessionStorage.getItem('userInfo')).IsAdmin === 1 ? 'admin' : 'employee')
  }

  // define dashboard tabs
  // default ui for admin
  let locations = null;
  if(usertype === 'employee') {
    // changed ui for employee
    locations = {
      Home:           [ "", "/"],
      "Tasks":        [ "", <UTasks token={userdata.token} EmployeeId={userdata.EmployeeId} />],
      "Profile":      [ "", <Profile userdata={userdata} />],
      "Create Task":              ["", <CreateTasks token={userdata.token} EmployeeId={userdata.EmployeeId}/>],
      Logout:         [ "", "Logout"],
    };
  } else if(usertype === 'admin') {
    locations = {
      Home:                       [ "", "/"],
      "Manage Employees":         [ "", <ATasks token={userdata.token}/>],
      "Create Employee":              [ "", <CreateUser token={userdata.token} />],
      "Profile":                  [ "", <Profile userdata={userdata} />],
      Logout:                     [ "", "Logout"],
    };
  }
  const [location, setLocation] = React.useState(locations !== null ? Object.keys(locations)[1] : 'invalid');
  if(allowAccess === false || location == 'invalid') {
    sessionStorage.clear();
    window.location.replace('/404');
    return (<>Invalid Access!</>);
  }
  if(allowAccess === null) {
    validate();
    return (
      <>Validating... please wait!</>
    );
  }
  // set variables and hooks
  const Theme = createTheme({
    palette: {
      primary: {
        main: "#CF7500",
      },
      secondary: {
        main: "#CF7500",
      },
    },
  });

  // handler functions
  const handleContent = (key) => {
    if (key === "Home") {
      window.location.href = "/";
    } else if (key === "Logout") {
      sessionStorage.clear();
      window.location.href = "/";
    } else {
      setLocation(key);
      setOpen(false);
    }
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // eventListeners
  window.addEventListener("resize", function(event) {
    let width = window.innerWidth;
    if(width > 768) {
      width = width / 3;
    }
    setScreenWidth(width);
  })

  // return component
  if (usertype === "admin" || usertype === 'employee') {
    return (
      <ThemeProvider theme={Theme}>
        <Box className={styles.dashboardContainer} sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar width={screenWidth} position="fixed" open={open}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: "none" }) }}
              >
                <MenuIcon className={styles.icon} />
              </IconButton>
              <Breadcrumbs
                aria-label="breadcrumb"
                color="#F4F4F4"
                variant="h6"
                separator=">"
                padding={1}
              >
                <Link underline="hover" color="inherit" href="/dashboard">
                  Dashboard
                </Link>
                <Typography variant="h6" noWrap component="div">
                  {location}
                </Typography>
              </Breadcrumbs>
            </Toolbar>
          </AppBar>
          <Drawer
            sx={{
              width: screenWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: screenWidth,
                boxSizing: "border-box",
                background: '#F4F4F4'
              }
            }}
            variant="persistent"
            anchor="left"
            open={open}
          >
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                <MenuIcon />
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List className={styles.menu}>
              {
                Object.keys(locations).map((key) => (
                  <ListItem
                    className={styles.menuItem}
                    key={key}
                    Padding={1}
                    onClick={() => {
                      handleContent(key);
                    }}
                  >
                    <ListItemButton sx={{textAlign: 'center'}}>
                      <ListItemIcon>{locations[key][0]}</ListItemIcon>
                      <ListItemText primary={key} />
                    </ListItemButton>
                  </ListItem>
                ))
              }
            </List>
            <Divider />
          </Drawer>
          <Main width={screenWidth} open={open}>
            <DrawerHeader />
            {locations[location][1]}
          </Main>
        </Box>
      </ThemeProvider>
    );
  }
};

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" }) (
  ({ theme, open, width }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${width}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== "open", }) (({ theme, open, width }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${width}px)`,
    marginLeft: `${width}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default Dashboard;
