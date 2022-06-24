import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useAuth from "../../hooks/useAuth";

const theme = createTheme();

export default function SignIn() {
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
        `${process.env.REACT_APP_API_URL}/auth/login/user`,
        requestOptions
      );
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }
      const user = await response.json();
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              inputProps={{ maxLength: 200 }}
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
              inputProps={{ maxLength: 200 }}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Continuar
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/sign-up" variant="body2">
                  ¿No tienes una cuenta? Regístrate
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
