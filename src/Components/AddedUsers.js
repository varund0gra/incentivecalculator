import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { NavLink, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { UserList } from ".";
const Tabs = styled(NavLink)`
  color: #ffffff;
  margin-right: 20px;
  text-decoration: none;
  font-size: 20px;
`;
const drawerWidth = 240;
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
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
      width: 1000,
      [theme.breakpoints.up("sm")]: {
        width: 200,
      },
    }),
  },
}));
const mdTheme = createTheme();
function DashboardContent() {
  const [modal, setModal] = React.useState(false);
  const handleClose = () => setModal(false);
  const [statsData, setStatsData] = React.useState(
    JSON.parse(localStorage.getItem("cardStatsData") || "[]")
  );
  const [statsTypeValue, setStatsTypeValue] = React.useState();
  const [statsMaxValue, setStatsMaxValue] = React.useState();
  function handleOpen() {
    setModal(true);

  }

  function handleSaveData() {
    setStatsData((prev) => [
      ...prev,
      {
        statsTypeValue,
        statsMaxValue,
      },
    ]);
    handleClose();
  }
  React.useEffect(() => {
    localStorage.setItem("cardStatsData", JSON.stringify(statsData));
  }, [statsData]);
  const navigate=useNavigate();
  function openCreateUserPage(){
    navigate("/admin/createuser")
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute">
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
        <Drawer variant="permanent">
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
          {/*  */}
          <Button
            variant="contained"
            style={{ marginTop: 10, fontSize: 20, fontWeight: 300 , backgroundColor:"#f5f5f5",color:"#ffa07a" }}
            onClick={handleOpen}
          >
            Add Parameter
          </Button>
          <Button
            variant="contained"
            style={{ marginTop: 10, fontSize: 20, fontWeight: 300 , backgroundColor:"#f5f5f5" ,color:"#ffa07a" }}
            onClick={openCreateUserPage}
          >
            Create User
          </Button>
          <Modal
            open={modal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <TextField
                style={{ width: "200px", margin: "5px" }}
                type="text"
                label="stat type"
                onChange={(e) => {
                  setStatsTypeValue(e.target.value);
                }}
                value={statsTypeValue}
                variant="outlined"
              />
              <br />
              <TextField
                style={{ width: "200px", margin: "5px" }}
                type="number"
                label="Max range"
                value={statsMaxValue}
                onChange={(e) => {
                  setStatsMaxValue(e.target.value);
                }}
                variant="outlined"
              />
              <br />
              <br />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveData}
              >
                save
              </Button>
            </Box>
          </Modal>
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
          {/* <AllUsers/> */}
          <UserList />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
export default function AddedUsers() {
  return <DashboardContent />;
}
