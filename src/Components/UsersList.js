import react, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Button,
  styled,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const StyledTable = styled(Table)`
  width: 90%;
  margin: 80px 0 0 50px;
`;
const THead = styled(TableRow)`
  & > th {
    font-size: 22px;
    background: lightsalmon;
    color: #ffffff;
  }
`;
const TRow = styled(TableRow)`
  & > td {
    font-size: 12px;
  }
`;
const AllUsers = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchuser();
  }, []);

  function fetchuser() {
    axios.get("http://localhost:4000/api/products").then(function (response) {
      setUsers(response.data);
    });
  }












  

  function handleDelete(index) {
    axios
      .delete(`http://localhost:4000/api/products/${users[index]._id}`)
      .then((res) => {
        fetchuser();
      });
  }
  const navigate = useNavigate();

  function handleclick(index) {
    localStorage.setItem("index", users[index]._id);
    navigate("/admin/addstats");
  }
  return (
    <StyledTable>
      <TableHead>
        <THead>
          <TableCell>Id</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Password</TableCell>
          <TableCell>ADD/DELETE</TableCell>
        </THead>
      </TableHead>
      <TableBody>
        {users.map((user, index) => (
          <TRow key={user._id}>
            <TableCell>{user._id}</TableCell>
            <TableCell>{user.E_mail}</TableCell>
            <TableCell>{user.E_password}</TableCell>
            <TableCell>
              <Button
                color="primary"
                variant="contained"
                style={{ marginRight: 10 }}
                onClick={() => handleclick(index)}
              >
                stats
              </Button>
           
              <Button
                color="secondary"
                variant="contained"
                onClick={() => handleDelete(index)}
              >
                Delete
              </Button>
            </TableCell>
          </TRow>
        ))}
      </TableBody>
    </StyledTable>
  );
};
export default AllUsers;
