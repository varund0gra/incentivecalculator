import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../Footer";
import e from "cors";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AddUserStats() {
  // states

  const [month, setMonth] = useState("fdvfd");
  const [sliderVal, setSliderVal] = useState({});
  const [employeeStats, setEmployeeStats] = useState({});
  const [statsLocalstorgeData, setStatsLocalstorgeData] = useState([]);
  const [indexdata, setindexdata] = useState({});
  const index = localStorage.getItem("index");
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [apiData, setApiData] = useState("");

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(employeeStats));
  }, [employeeStats]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  function HandleSubmit(e) {
    window.location.reload(true);
    const sliderValueArray = statsLocalstorgeData.map((val) => ({
      type: val.statsTypeValue,
      value: sliderVal[val.statsTypeValue] || 0,
    }));

    const newStat = {
      month,
      sliderValueArray,
    };

    const updatedIndexData = {
      ...indexdata,
      E_stats: [...indexdata.E_stats, newStat],
    };

    axios
      .put(`http://localhost:4000/api/products/${index}`, updatedIndexData)
      .then((res) => {
        setApiData(res.data);
      });
    setOpen(true);
  }
  useEffect(() => {
    axios.get("http://localhost:4000/api/products").then((res) => {
      setApiData(res.data);
    });
    axios.get(`http://localhost:4000/api/products/${index}`).then((res) => {
      setindexdata(res.data);
    });
    const g = JSON.parse(localStorage.getItem("cardStatsData"));
    setStatsLocalstorgeData(g);
  }, []);

  return (
    <>
      <Box
        width={300}
        sx={{
          margin: "0 auto",
          marginTop: "10px",
          width: "90%",
          borderRadius: "1px",
          padding: "30px",
          boxShadow: "20px 20px 50px grey",
        }}
      >
        <div style={{ margin: "0 auto", textAlign: "center" }}>
          <h2>Select Month</h2>
          <input
            type="month"
            style={{ width: "200px", height: "30px" }}
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
        </div>
        <div
          className="Container"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          {statsLocalstorgeData.map((val) => (
            <Card
              key={val.statsTypeValue}
              sx={{
                maxWidth: 350,
                m: 4,
                boxShadow: "20px 20px 50px grey",
              }}
            >
              <CardMedia
                component="img"
                height="70"
                style={{ backgroundColor: "#756595" }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {val.statsTypeValue}
                </Typography>
              </CardContent>
              <CardActions>
                <Box sx={{ width: 290 }}>
                  <Typography gutterBottom>
                    Score Value: {sliderVal[val.statsTypeValue] || 0}
                  </Typography>
                  <Slider
                    min={0}
                    max={Number(val.statsMaxValue)}
                    value={sliderVal[val.statsTypeValue] || 0}
                    onChange={(e) =>
                      setSliderVal((prevSliderVal) => ({
                        ...prevSliderVal,
                        [val.statsTypeValue]: e.target.value,
                      }))
                    }
                    style={{ marginLeft: 5 }}
                    valueLabelDisplay="auto"
                  />
                </Box>
              </CardActions>
            </Card>
          ))}
        </div>
        <br />

        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <Button
            variant="contained"
            onClick={HandleSubmit}
            style={{
              backgroundColor: "#756595",
              width: "20%",
              fontSize: "14px",
            }}
          >
            Submit
          </Button>
        </div>
        <br />
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Snackbar open={open} autoHideDuration={900} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              You submitted {month} Data
            </Alert>
          </Snackbar>
        </Stack>
      </Box>
      <Footer />
    </>
  );
}
