import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function ImgMediaCard() {
  // states
  const [comunicationSkill, setComunicationSkill] = useState(0);
  const [employePerformance, setemployePerformance] = useState(0);
  const [punctuality, setPunctuality] = useState(0);
  const [productivity, setProductivity] = useState(0);
  const [month, setMonth] = useState("");
  const [employeeStats, setEmployeeStats] = useState(
    JSON.parse(localStorage.getItem("data") || "[]")
  );

  const navigate = useNavigate();
  function HandleSubmit() {
    setEmployeeStats((prev) => [
      ...prev,
      {
        comunicationSkill,
        employePerformance,
        punctuality,
        productivity,
        month,
      },
    ]);
    setComunicationSkill(0);
    setemployePerformance(0)
    setPunctuality(0)
    setProductivity(0);
    setMonth("");
    setOpen(true)
  }
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(employeeStats));
  }, [employeeStats]);

  function handleRedirect(e) {
    e.preventDefault();
    navigate("/app/dashboard");
  }
  const [open, setOpen] = React.useState(false);

const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpen(false);
};
  return (
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
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Card
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
              Communication Skill
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Communication skills are the abilities you use when giving and
              receiving different kinds of information. Some examples include
              communicating new ideas, feelings or even an update on your
              project.
            </Typography>
          </CardContent>
          <CardActions>
            <Box sx={{ width: 290 }}>
              <Typography id="non-linear-slider" gutterBottom >
                Score Value:{comunicationSkill}
              </Typography>
              <Slider
                min={0}
                max={100}
                value={comunicationSkill}
                style={{marginLeft:"10px"}}
                onChange={(e) => setComunicationSkill(e.target.value)}
                valueLabelDisplay="auto"
                aria-labelledby="non-linear-slider"
              />
            </Box>
          </CardActions>
        </Card>
        <br />
        <Card
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
              Punctuality
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Punctuality is the ability to be prompt, attend appointments on
              time and submit your assignments by the deadline. In a
              professional environment, being punctual involves planning ahead
              and making arrangements to ensure that you can fulfill your
              obligations on a strict schedule.
            </Typography>
          </CardContent>
          <CardActions>
            <Box sx={{ width: 290 }}>
              <Typography id="non-linear-slider" gutterBottom>
                Score Value:{punctuality}
              </Typography>
              <Slider
                min={0}
                max={100}
                value={punctuality}
                style={{marginLeft:"10px"}}
                onChange={(e) => setPunctuality(e.target.value)}
                valueLabelDisplay="auto"
                aria-labelledby="non-linear-slider"
              />
            </Box>
          </CardActions>
        </Card>
        <br />
        <Card
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
              Performance
            </Typography>
            <Typography variant="body2" color="text.secondary">
              There are many ways to appear confident such as making eye contact
              when you’re addressing someone, sitting up straight with your
              shoulders open and preparing ahead of time so your thoughts are
              polished.
            </Typography>
          </CardContent>
          <CardActions>
            <Box sx={{ width: 290 }}>
              <Typography id="non-linear-slider" gutterBottom>
                 Score Value:{employePerformance}
              </Typography>
              <Slider
                min={0}
                max={100}
                value={employePerformance}
                style={{marginLeft:"10px"}}
                onChange={(e) => setemployePerformance(e.target.value)}
                valueLabelDisplay="auto"
                aria-labelledby="non-linear-slider"
              />
            </Box>
          </CardActions>
        </Card>
        <br />
        <Card
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
              Productivity
            </Typography>
            <Typography variant="body2" color="text.secondary">
              It allows employees to complete their tasks efficiently. Companies
              often measure employees productivity to assess how long it takes
              to complete their tasks and determine whether they are
              consistently meeting deadlines. This allows them to identify
              potential areas for improvement.
            </Typography>
          </CardContent>
          <CardActions>
            <Box sx={{ width: 290 }}>
              <Typography id="non-linear-slider" gutterBottom>
                 Score Value:{productivity}
              </Typography>
              <Slider
                min={0}
                max={100}
                style={{marginLeft:"10px"}}
                value={productivity}
                onChange={(e) => setProductivity(e.target.value)}
                valueLabelDisplay="auto"
                aria-labelledby="non-linear-slider"
              />
            </Box>
          </CardActions>
        </Card>
      </div>
      <br />

      <div style={{ display: "flex" , justifyContent:"space-evenly" }}>
        
        <Button
          variant="contained"
          onClick={HandleSubmit}
          style={{
            backgroundColor: "#756595",
            width:"20%",
            fontSize: "14px",
          }}
        >
          Submit
        </Button>
       
          <Button
            variant="contained"
           
            onClick={handleRedirect}
            style={{
              fontSize: "14px",
              width:"20%",
              backgroundColor:"  rgb(180 98 189)"
           
             
            }}
          >
            Dashboard
          </Button>
     
      </div>
      <br />
      <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={900} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Data Saved!
        </Alert>
      </Snackbar>
    </Stack>

    </Box>
  );
}
