import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
// import Autocomplete from "@mui/material/Autocomplete";
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

export default function SignUp() {
  const [state, setState] = React.useState("start");

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
            Regístrate como Tramiter
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {/* {state === "#" && (
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={options}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Movie" />}
              />
            )} */}
            {state === "start" && (
              <div>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="nombre"
                  label="Nombre"
                  name="nombre"
                  autoComplete="nombre"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="apellido"
                  label="Apellido"
                  name="apellido"
                  autoComplete="apellido"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="rut"
                  label="Rut"
                  name="rut"
                  autoComplete="rut"
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
                  id="telefono"
                  label="Teléfono"
                  name="telefono"
                  autoComplete="telefono"
                />
              </div>
            )}
            {state === "end" && (
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
            )}
            {state === "end" && (
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Recuérdame"
              />
            )}
            {state === "start" && (
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => setState("end")}
              >
                Continuar
              </Button>
            )}
            {state === "end" && (
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Continuar
              </Button>
            )}
            <Grid container>
              <Grid item xs>
                <Link href="/#" variant="body2">
                  Olvidé mi contraseña
                </Link>
              </Grid>
              <Grid item>
                <Link href="/tramiter-sign-in" variant="body2">
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
