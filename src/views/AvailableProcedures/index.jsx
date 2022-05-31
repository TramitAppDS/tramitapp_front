/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useAuth from "../../hooks/useAuth";
import SingleUser from "../../components/SingleUser";

export default function BasicTable() {
  const { currentUser } = useAuth();
  const [procedures, setProcedures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setLoading(true);
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser?.access_token}`,
      },
    };
    fetch(`${process.env.REACT_APP_API_URL}/procedures`, requestOptions)
      .then((response) => {
        if (response.status !== 200) {
          return [];
        }
        return response.json();
      })
      .then(setProcedures)
      .catch(setErrorMessage)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <p>{errorMessage}</p>
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
              <TableRow
                key={procedure.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {procedure.id}
                </TableCell>
                <TableCell align="right">
                  <SingleUser key={procedure.userId} id={procedure.userId} />
                </TableCell>
                <TableCell align="right">{procedure.status}</TableCell>
                <TableCell align="right">{procedure.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
