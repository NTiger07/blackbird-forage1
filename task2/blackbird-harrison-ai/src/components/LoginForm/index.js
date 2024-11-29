import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
import logo from "../../assets/logo.svg";

var validator = require("email-validator");

export default function LoginForm() {
  const [showAlert, setShowAlert] = useState(false);
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

  const [email, setEmail] = useState("")
  const [emailValid, setEmailValid] = useState(true)
  
  const [password, setPassword] = useState("")
  const [passwordValid, setPasswordValid] = useState(true)

  const validateForm = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    const emailValid = validator.validate(email);
    const passwordValid = passwordRegex.test(password);

    if (passwordValid && emailValid) {
      setShowAlert("Login Successful");
    } else {
      setShowAlert("Login Unsuccessful");
    }
  };

  useEffect(() => {
    if (validator.validate(email) === false){
      setEmailValid(false)
    }
    if (validator.validate(email) === true){
      setEmailValid(true)
    }
    if (email === ""){
      setEmailValid(true)
    }
  } ,[email])

  useEffect(() => {
    if (passwordRegex.test(password) === false){
      setPasswordValid(false)
    }
    if (passwordRegex.test(password) === true){
      setPasswordValid(true)
    }
    if (password === ""){
      setPasswordValid(true)
    }
  } ,[password, passwordRegex])

  return (
    <>
      {showAlert && (
        <Snackbar
          open={showAlert}
          autoHideDuration={6000}
          onClose={() => setShowAlert(false)}
          message={showAlert}
        >
          <Alert>{showAlert}</Alert>
        </Snackbar>
      )}
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              my: 2,
            }}
          >
            <img src={logo} width="147" alt="harrison.ai" />
          </Box>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={validateForm}
            sx={{ mt: 1 }}
          >
            <TextField
              error={!emailValid}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              helperText={
                emailValid ? "Enter your email" : "Email is not valid"
              }
            />
            <TextField
              error={!passwordValid}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              helperText={
                passwordValid ? "Enter your password" : "Password doesn't meet requirements"
              }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Grid>
    </>
  );
}
