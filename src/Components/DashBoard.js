import React from "react";
import AddPerformance from "./AddPerformance";
import Box from "@mui/material/Box";
import Footer from "./Footer";
import Card from "./Card";
import Header from "./navbar";
import { Button } from "@mui/material";
const DashBoard = () => {
  const profilePIcDefault =
    "https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg";
  return (
    <div className="border  p-2">
   
      <br />

      {/* getting user details data */}

      {/* <div className="row">
        <div className="col-md-6 d-flex align-items-center">
          <div className="ms-4">
            <h4>
              Name :{" "}
              {localStorage.getItem("name")
                ? localStorage.getItem("name")
                : "NA"}
            </h4>
            <h4>
              Email :{" "}
              {localStorage.getItem("email")
                ? localStorage.getItem("email")
                : "NA"}
            </h4>
            <h4>
              Gender :{" "}
              {localStorage.getItem("gender")
                ? localStorage.getItem("gender")
                : "NA"}
            </h4>
          </div>
        </div>
        <div className="col-md-6 d-flex justify-content-end">
          <img
            src={
              localStorage.getItem("img")
                ? localStorage.getItem("img")
                : profilePIcDefault
            }
            alt="profile_pic"
            className="img-thumbnail"
            height={200}
            width={200}
          />
        </div>
      </div> */}

      <br />
       <Card/>
       <br />
      <Footer />
      </div>
  );
};
export default DashBoard;
