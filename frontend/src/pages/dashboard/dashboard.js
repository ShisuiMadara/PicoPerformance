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

import styles from "./dashboard.module.css";
import CreateUser from "../../components/createUser/createUser";
import Tasks from "../../components/tasks/tasks";

const Dashboard = (props) => {
  // set variables and hooks
  const [open, setOpen] = React.useState(false);
  const [location, setLocation] = React.useState("Tasks");
  const [userdata, setUserdata] = React.useState({});
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth > 768 ? window.innerWidth / 3 : window.innerWidth);
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

  // validate user
  const valid = true;
  const usertype = "admin";

  // define dashboard tabs
  // default ui for admin
  let locations = {
    Home:           [ "", "/"],
    "Tasks":        [ "", <Tasks />],
    "Create User":  [ "", <CreateUser />],
    "Profile":      [ "", <Profile userdata={userdata} />],
    Logout:         [ "", "Logout"],
  };
  if(usertype === 'employee') {
    // changed ui for employee
    locations = {
      Home:           [ "", "/"],
      "Tasks":        [ "", <CreateUser />],
      "Profile":      [ "", <Profile userdata={userdata} />],
      Logout:         [ "", "Logout"],
    };
  }

  // eventListeners
  window.addEventListener("resize", function(event) {
    let width = window.innerWidth;
    if(width > 768) {
      width = width / 3;
    }
    setScreenWidth(width);
  })

  // return component
  if (valid) {
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
              {/* <Footer className={styles.foot} /> */}
            </Main>
          </Box>
        </ThemeProvider>
      );
    }
  } else {
    window.location.href = "/";
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