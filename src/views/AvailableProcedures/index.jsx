/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(id, userId, status, type) {
  return { id, userId, status, type };
}

const rows = [
  createData(1, 159, 6.0, 24, 4.0),
  createData(2, 237, 9.0, 37, 4.3),
  createData(3, 262, 16.0, 24, 6.0),
];

export default function BasicTable({ currentUser }) {
  const [procedures, setProcedures] = useState([]);
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser.access_token}`,
      },
    };

    fetch(`${process.env.REACT_APP_API_URL}/procedures`, requestOptions)
      .then((response) => response.json())
      .then((response) => setProcedures(response));
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Tramite</TableCell>
            <TableCell align="right">Usuario</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Tipo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {procedures.map((procedure) => (
            <TableRow key={procedure.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                {procedure.id}
              </TableCell>
              <TableCell align="right">{procedure.userId}</TableCell>
              <TableCell align="right">{procedure.status}</TableCell>
              <TableCell align="right">{procedure.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
