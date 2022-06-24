/* eslint-disable react/jsx-no-bind */
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useAuth from "../hooks/useAuth";

const theme = createTheme();

export default function SolicitarTramite() {
  const navigate = useNavigate();
  const [select, setSelect] = useState(false);
  const [selected, setSelected] = useState("");
  const { currentUser } = useAuth();

  function refresh() {
    navigate("/home");
    window.location.reload();
  }

  const changeSelectOptionHandler = (event) => {
    setSelected(event.target.value);
    setSelect(true);
  };

  let form = null;

  if (selected === 0) {
    form = [
      <TextField
        margin="normal"
        required
        fullWidth
        id="plate"
        label="Patente"
        name="plate"
        autoFocus
        inputProps={{ maxLength: 200 }}
      />,
      <TextField
        margin="normal"
        required
        fullWidth
        id="address"
        label="Dirección donde estará el vehiculo"
        name="address"
        autoFocus
        inputProps={{ maxLength: 200 }}
      />,
    ];
  }

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const object = {};
    data.forEach((val, key) => {
      object[key] = val;
    });
    object.userId = currentUser.id;
    object.status = 0;
    if (object.type === 0) {
      object.price = 10000;
    }
    object.price = 20000;
    const body = JSON.stringify(object);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser?.access_token}`,
      },
      body,
    };
    fetch(`${process.env.REACT_APP_API_URL}/procedures`, requestOptions)
      .then((response) => {
        if (response.status !== 200) {
          return [];
        }
        return response.json();
      })
      .catch(refresh())
      .finally(refresh());
  }

  if (!currentUser) {
    return <Navigate to="/home" />;
  }

  if (currentUser.type === "tramiter") {
    return <Navigate to="/home" />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#00d1b2" }}>
            <FindInPageIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Solicita un trámite
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">Tipo</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="type"
                name="type"
                label="Tipo"
                onChange={changeSelectOptionHandler}
                // onChange={() => {setSelect(true); }}
                required
              >
                <MenuItem value={0}>Revisión Técnica</MenuItem>
                {/* <MenuItem value={1}>Permiso de Circulación</MenuItem> */}
              </Select>
            </FormControl>

            {form}

            <TextField
              margin="normal"
              fullWidth
              id="comments"
              multiline
              rows={4}
              label="Comentario adicional"
              name="comments"
              autoComplete="comentario"
              inputProps={{ maxLength: 200 }}
              autoFocus
            />

            <Button
              disabled={!select}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Solicitar
            </Button>

            <Link href="/home" variant="body2">
              Cancelar
            </Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
