import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useAuth from "../../hooks/useAuth";

const theme = createTheme();

export default function SignUp() {
  const { currentUser, handleUserLogin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    try {
      setLoading(true);
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const object = {};
      data.forEach((value, key) => {
        object[key] = value;
      });
      const body = JSON.stringify(object);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      };
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/register/user`,
        requestOptions
      );
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }
      const requestOptionsLogin = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: object.email, password: object.password }),
      };
      const responseLogin = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/login/user`,
        requestOptionsLogin
      );
      if (!responseLogin.ok) {
        const error = await response.text();
        throw new Error(error);
      }
      const user = await responseLogin.json();
      user.type = "user";
      handleUserLogin(user);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (currentUser) return <Navigate to="/home" />;

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <p>{errorMessage}</p>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#f44336" }}>
            <LockOpenOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Crea tu cuenta
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="Nombre"
              name="firstName"
              autoComplete="nombre"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Apellido"
              name="lastName"
              autoComplete="apellido"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Teléfono"
              name="phone"
              autoComplete="telefono"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recuérdame"
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Continuar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/#" variant="body2">
                  Olvidé mi contraseña
                </Link>
              </Grid>
              <Grid item>
                <Link href="/sign-in" variant="body2">
                  ¿Ya tienes cuenta? Inicia sesión
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
