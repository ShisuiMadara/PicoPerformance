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

import Admin from "../../components/Admin/Admin";
import User from "../../components/User/User";

import styles from "./dashboard.module.css";
import CreateUser from "../../components/createUser/createUser";

const Dashboard = () => {
  // set variables and hooks
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [location, setLocation] = React.useState("My Profile");
  const [auth, setAuth] = React.useState(true);
  const [userdata, setUserdata] = React.useState({});
  const loginStatus = sessionStorage.getItem("loginStatus");
  const token = sessionStorage.getItem("authToken");
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#F0A500",
      },
      secondary: {
        main: "#CF7500",
      },
    },
  });

  // handler functions
  const handleContent = (key) => {
    if (key === "Home") {
      window.location.replace("/");
    } else if (key === "Logout") {
      sessionStorage.clear();
      window.location.replace("/");
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
  const locations = {
    Home: [, "/"],
    "My Profile": ["", <Profile userdata={userdata} />],
    "Create User": ["", <CreateUser />],
    Logout: ["", "Logout"],
  };
  const valid = true;
  const usertype = "admin";
  if (valid) {
    if (usertype === "admin") {
      return (
        <ThemeProvider theme={darkTheme}>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
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
                  color="white"
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
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                  width: drawerWidth,
                  boxSizing: "border-box",
                },
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
              <List>
                {Object.keys(locations).map((key) => (
                  <ListItem
                    key={key}
                    Padding={1}
                    onClick={() => {
                      handleContent(key);
                    }}
                  >
                    <ListItemButton>
                      <ListItemIcon>{locations[key][0]}</ListItemIcon>
                      <ListItemText primary={key} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              <Divider />
            </Drawer>
            <Main open={open}>
              <DrawerHeader />
              {locations[location][1]}
              {/* <Footer className={styles.foot} /> */}
            </Main>
          </Box>
        </ThemeProvider>
      );
    }
  } else {
    window.location.replace("/");
  }
};

const drawerWidth = 425;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
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
