import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import SemiCircleProgressBar from "react-progressbar-semicircle";
import { makeStyles } from "@mui/styles";
import axios from "axios";
const useStyles = makeStyles({
  textfield: {
    textAlign: "center",
    fontWeight: "600 !important",
  },
});
const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));
const mdTheme = createTheme();
function DashBoardContent() {
  const [open, setOpen] = React.useState(true);
  const [apiData, setApiData] = useState([]);
  const classes = useStyles();
  const [sliderValueArray, setSliderValueArray] = useState([]);
  const [cardStatsData, setCardStatsData] = useState([]);
  const [index, setIndex] = useState(apiData.length - 1);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  // fetching api data
  useEffect(() => {
    setIndex(Number(localStorage.getItem("index")));
    axios.get("http://localhost:4000/api/products").then((res) => {
      setApiData(res.data);
    });
    setCardStatsData(JSON.parse(localStorage.getItem("cardStatsData")));
  }, []);

  useEffect(() => {
    if (apiData.length > 0) {
      setSliderValueArray(apiData[index]?.E_stats[0]?.sliderValueArray);
    }
  }, [apiData, index]);
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", 
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <React.Fragment>
              <ListItemButton>
                <h5>Filter Month Data</h5>
              </ListItemButton>
              <ListItemButton>
                <DashboardIcon />

                {/* filter dropdown  */}
                <FormControl sx={{ ml: 4, minWidth: 120 }}>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    label="Age"
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  ></Select>
                </FormControl>
              </ListItemButton>
            </React.Fragment>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <h2
                  style={{
                    textAlign: "center",
                    color: "#1976D2",
                    fontSize: 30,
                    fontWeight: 800,
                  }}
                >
                  Month Performance :
                </h2>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 390,
                  }}
                >
                  {sliderValueArray.map((result) => {
                    return (
                      <>
                        <div>
                          {" "}
                          <SemiCircleProgressBar
                            percentage={result.value}
                            showPercentValue
                          />
                          <Typography className={classes.textfield}>
                            {" "}
                            {result.type}
                          </Typography>{" "}
                        </div>
                      </>
                    );
                  })}
                </Paper>
              </Grid>

              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <h2
                  style={{
                    textAlign: "center",
                    color: "#1976D2",
                    fontSize: 30,
                    fontWeight: 800,
                  }}
                >
                  {" "}
                  Score
                </h2>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 390,
                  }}
                >
                  <Stack sx={{ width: "100%", mt: 4 }} spacing={2}>
                    <Alert severity="info">
                      Total Calculated Incentive Rs:
                    </Alert>
                  </Stack>
                </Paper>
              </Grid>

              {/* Recent Orders */}
              <Grid item xs={12}>
                <h2
                  style={{
                    textAlign: "center",
                    color: "#1976D2",
                    fontSize: 40,
                    fontWeight: 700,
                  }}
                >
                  {" "}
                  Overall Score
                </h2>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <br />
                  <br />
                  <progress
                    min="0"
                    max={1200}
                    style={{ display: "flex" }}
                  ></progress>
                  <br />
                  <h5>Maximum Score : 1200</h5>
                  <h5>Your Score : </h5>
                  <br />
                </Paper>
              </Grid>
            </Grid>
            {/* <Copyright sx={{ pt: 4 }} /> */}
          </Container>
          {/* <Footer /> */}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
export default function Dashboard() {
  return <DashBoardContent />;
}