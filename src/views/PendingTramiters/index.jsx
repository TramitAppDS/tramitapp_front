/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import useAuth from "hooks/useAuth";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

// https://mui.com/material-ui/react-table/
function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function BasicTable() {
  const { currentUser } = useAuth();
  const [tramiters, setTramiters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRejectClick = async (tramiterId) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser?.access_token}`,
      },
    };
    fetch(`${process.env.REACT_APP_API_URL}/tramiters/${tramiterId}`, requestOptions)
      .then((response) => {
        if (response.status !== 200) {
          return [];
        }
        return response.json();
      })
      .catch(setErrorMessage)
      .finally(() => window.location.reload());
  };

  const handleApproveClick = async (tramiterId) => {
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser?.access_token}`,
      },
    };

    fetch(`${process.env.REACT_APP_API_URL}/tramiters/admin/approve/${tramiterId}`, requestOptions)
      .then((response) => {
        if (response.status !== 200) {
          return [];
        }
        return response.json();
      })
      .catch(setErrorMessage)
      .finally(() => window.location.reload());
  }

  useEffect(() => {
    setLoading(true);
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser?.access_token}`,
      },
    };
    fetch(`${process.env.REACT_APP_API_URL}/tramiters/`, requestOptions)
      .then((response) => {
        if (response.status !== 200) {
          return [];
        }
        return response.json();
      })
      .then(setTramiters)
      .catch(setErrorMessage)
      .finally(() => setLoading(false));
  }, []);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tramiters.length) : 0;

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
              <TableCell>ID</TableCell>
              <TableCell align="right">Nombre</TableCell>
              <TableCell align="right">Telefono</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Ciudad</TableCell>
              <TableCell align="right">Comuna</TableCell>
              <TableCell align="right">Aprobar</TableCell>
              <TableCell align="right">Rechazar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? tramiters.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : tramiters
            ).map((tramiter) => ( !(tramiter.approved) &&
              <TableRow
                key={tramiter.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {tramiter.id}
                </TableCell>
                <TableCell align="right">{tramiter.firstName + " " + tramiter.lastName}</TableCell>
                <TableCell align="right">{tramiter.phone}</TableCell>
                <TableCell align="right">{tramiter.email}</TableCell>
                <TableCell align="right">{tramiter.city}</TableCell>
                <TableCell align="right">{tramiter.commune}</TableCell>
          
                <TableCell align="right">
                  <button
                    type="button"
                    className="btn-icon"
                    onClick={() => handleApproveClick(tramiter)}
                  >
                    <CheckCircleIcon />
                  </button>
                </TableCell>
                <TableCell align="right">
                  <button
                    type="button"
                    className="btn-icon"
                    onClick={() => handleRejectClick(tramiter.id)}
                  >
                    <CancelIcon />
                  </button>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={tramiters.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}
