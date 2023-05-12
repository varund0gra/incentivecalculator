import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
function AddPerformance() {
  const [comunicationSkill, setComunicationSkill] = useState(0);
  const [employePerformance, setemployePerformance] = useState(0);
  const [punctuality, setPunctuality] = useState(0);
  const [productivity, setProductivity] = useState(0);
  const [employeeStats, setEmployeeStats] = useState(
    JSON.parse(localStorage.getItem("data") || "[]")
  );
  const [month, setMonth] = useState();
  const [renderRedirectBtn, setRenderRedirectBtn] = useState(false);
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
    setRenderRedirectBtn(true);
  }
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(employeeStats));
  }, [employeeStats]);

  function handleRedirect(e) {
    e.preventDefault();
    navigate("/output");
  }
  console.log(typeof JSON.parse(localStorage.getItem("data")));

  return (
    <Box 
      width={300}
      sx={{
        margin: "0 auto",
        marginTop: "30px",
        width: "60%",
        border: "2px solid grey",
        borderRadius: "10px",
        padding: "30px",
        backgroundColor: "#c9d6d6",
      }}
    >
      <input
        type="month"
        style={{ width: "200px", height: "30px" }}
        value={month}
        onChange={(e) => setMonth(e.target.value)}
      />
      <Typography variant="h5" mt={2} style={{ fontWeight: "600" }}>
        Communication Skill
      </Typography>
      <Slider
        defaultValue={10}
        aria-label="Default"
        valueLabelDisplay="auto"
        value={comunicationSkill}
        onChange={(e) => setComunicationSkill(e.target.value)}
      />

      <Typography variant="h5" mt={2} style={{ fontWeight: "600" }}>
        Performance
      </Typography>
      <Slider
        defaultValue={10}
        aria-label="Default"
        valueLabelDisplay="auto"
        value={employePerformance}
        onChange={(e) => setemployePerformance(e.target.value)}
      />

      <Typography variant="h5" mt={2} style={{ fontWeight: "600" }}>
        Punctuality
      </Typography>
      <Slider
        defaultValue={10}
        aria-label="Default"
        valueLabelDisplay="auto"
        value={punctuality}
        onChange={(e) => setPunctuality(e.target.value)}
      />

      <Typography variant="h5" mt={2} style={{ fontWeight: "600" }}>
        Productivity
      </Typography>
      <Slider
        defaultValue={10}
        aria-label="Default"
        valueLabelDisplay="auto"
        value={productivity}
        onChange={(e) => setProductivity(e.target.value)}
      />

      <br />
      <br />
      {renderRedirectBtn == false ? (
        <Button variant="contained" onClick={HandleSubmit}>
          Submit
        </Button>
      ) : (
        <>
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="success">
              Your data is successfully stored — check it out!
            </Alert>
          </Stack>
          <br />
          <Button variant="contained" onClick={handleRedirect}>
            Redirect Output
          </Button>
        </>
      )}
      <br />
  
    </Box>
  );
}

export default AddPerformance;
