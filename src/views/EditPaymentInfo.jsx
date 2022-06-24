/* eslint-disable react/jsx-no-bind */
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "hooks/useAuth";
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
import Avatar from "@mui/material/Avatar";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export default function EditPaymentInfo() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  function refresh() {
    navigate("/profile");
    window.location.reload();
  }

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const object = {};
    data.forEach((val, key) => {
      object[key] = val;
    });
    const body = JSON.stringify(object);
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser?.access_token}`,
      },
      body,
    };
    fetch(
      `${process.env.REACT_APP_API_URL}/tramiters/transfer_data/${currentUser?.id}`,
      requestOptions
    )
      .then((response) => {
        if (response.status !== 200) {
          return [];
        }
        return response.json();
      })
      .catch(refresh())
      .finally(refresh());
  }

  if (!currentUser) return <Navigate to="/home" />;

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
            Editar Datos de Pago
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">Banco</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="bank"
                name="bank"
                label="Banco"
                required
              >
                <MenuItem value="Banco de Chile">Banco de Chile</MenuItem>
                <MenuItem value="Banco BICE">Banco BICE</MenuItem>
                <MenuItem value="Banco Estado">Banco Estado</MenuItem>
                <MenuItem value="Banco Falabella">Banco Falabella</MenuItem>
                <MenuItem value="Banco Santander">Banco Santander</MenuItem>
                <MenuItem value="Banco Security">Banco Security</MenuItem>
                <MenuItem value="BCI">BCI</MenuItem>
                <MenuItem value="Itau Chile">Itau Chile</MenuItem>
                <MenuItem value="Scotiabank">Scotiabank</MenuItem>
              </Select>
            </FormControl>

            <FormControl variant="standard" sx={{ m: 1, minWidth: 160 }}>
              <InputLabel id="demo-simple-select-standard-label">Tipo de Cuenta</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="accountType"
                name="accountType"
                label="Tipo de Cuenta"
                required
              >
                <MenuItem value="Cuenta Corriente">Cuenta Corriente</MenuItem>
                <MenuItem value="Cuenta Vista">Cuenta Vista</MenuItem>
                <MenuItem value="Ahorro">Ahorro</MenuItem>
              </Select>
            </FormControl>

            <TextField
              margin="normal"
              fullWidth
              id="accountNumber"
              label="Numero de Cuenta"
              name="accountNumber"
              autoFocus
              required
              inputProps={{ maxLength: 200 }}
            />

            <TextField
              margin="normal"
              fullWidth
              id="rut"
              label="RUT"
              name="rut"
              autoFocus
              required
              inputProps={{ maxLength: 200 }}
            />

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Actualizar
            </Button>

            <Link href="/profile" variant="body2">
              Cancelar
            </Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
