import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // Borrar Después, está solo para que no webee el linter
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

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
          <Avatar sx={{ m: 1, bgcolor: "#f44336" }}>
            <MonetizationOnRoundedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Hora de tramitar
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
                <Link href="/tramiter-sign-up" variant="body2">
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
