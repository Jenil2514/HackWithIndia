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
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import Form from 'react-bootstrap/Form';

// import BackgroundVideo from '../Context/backgroundVideo';

import Alert from "@mui/material/Alert";
import axios from "axios";
// import Alert from 'react-bootstrap/Alert';
// import '../CSS/Login.css';

import { Select, MenuItem } from "@mui/material";

const defaultTheme = createTheme();

export default function Register() {
  const [loading, setloading] = useState(false);
  const [Emailcheck, setEmailcheck] = useState(false);
  const [passwordcheck, setpasswordcheck] = useState(false);
  const [justVerify, setJustVerify] = useState(false);
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  //   const navigate = useNavigate();

  const handlePasswordofLogin = (e) => {
    const input = e.target.value;
    setpasswordcheck(true);
    setPassword(input);
    if (input.length < 8) {
      setValidPassword(false);
      return;
    } else {
      setValidPassword(true);
    }
  };

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    if (password === repassword) {
      await axios
        .post("http://localhost:8000/signup", {
          username: username,
          email: email,
          name: name,
          password: password,
          role: role,
        })
        .then((response) => {
          if (response.status === 201) {
            navigate("/login");
          }
        })
        .catch((error) => {
          if (error.response.status === 409) {
            // setUsername("");
            // setEmail("");
            // setName("");
            // setPassword("");
            // setRePassword("");
            // setRole("");
            setJustVerify(true);
          } else {
            console.error("Error: ", error);
          }
        });
    } else {
      setPassword("");
      setRePassword("");
      alert("Passwords do not match!");
    }
    setloading(false);
  };

  return (
    <div className="my-glass-effect" style={{ backgroundColor: "lightblue" }}>
      <ThemeProvider theme={defaultTheme}>
        <Container
          component="main"
          maxWidth="sm"
          sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
        >
          <CssBaseline />
          <Box
            sx={{
              marginTop: 12,
              marginBottom: 12,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              borderRadius: "2em",
              padding: "3em",
              height: "auto",
            }}
          >
            <Avatar sx={{ m: 1 }} style={{ backgroundColor: "#25396F" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              component="h1"
              variant="h5"
              sx={{ fontFamily: "Quicksand", fontWeight: "bold" }}
            >
              Create A New Account
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1, width: "100%" }}
            >
              <TextField
                id="standard-basic-1"
                variant="standard"
                margin="normal"
                required
                fullWidth
                label="Username"
                name="username"
                autoFocus
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                value={username}
                InputProps={{
                  style: {
                    fontFamily: "Quicksand",
                    fontWeight: "bold",
                  },
                }}
                error={username === null}
                helperText={
                  username === null ? "This field cannot be empty." : ""
                }
                autoComplete="off"
              />
              <TextField
                id="standard-basic-1"
                variant="standard"
                margin="normal"
                required
                fullWidth
                label="Name"
                name="name"
                autoFocus
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                InputProps={{
                  style: {
                    fontFamily: "Quicksand",
                    fontWeight: "bold",
                  },
                }}
                error={name === null}
                helperText={name === null ? "This field cannot be empty." : ""}
                autoComplete="off"
              />
              <TextField
                id="standard-basic-1"
                variant="standard"
                margin="normal"
                required
                fullWidth
                label="Email Address"
                name="email"
                autoFocus
                onChange={(e) => {
                  setEmailcheck(true);
                  setEmail(e.target.value);
                }}
                value={email}
                InputProps={{
                  style: {
                    fontFamily: "Quicksand",
                    fontWeight: "bold",
                    color: !email && Emailcheck ? "#f44336" : "#25396F",
                  },
                }}
                error={!email && Emailcheck}
                helperText={
                  !email && Emailcheck ? "This field cannot be empty." : ""
                }
                autoComplete="off"
              />

              <TextField
                id="standard-basic-2"
                variant="standard"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                onChange={handlePasswordofLogin}
                value={password}
                InputProps={{
                  style: {
                    fontFamily: "Quicksand",
                    fontWeight: "bold",
                    color: !validPassword ? "#f44336" : "#25396F", // Change color to red if there's an error
                  },
                }}
                error={
                  (!password && passwordcheck) || (!validPassword && password)
                }
                helperText={
                  !password && passwordcheck
                    ? "This field cannot be empty."
                    : !validPassword && password
                    ? "The password must contain at least 8 digits."
                    : ""
                }
                autoComplete="off"
              />

              <TextField
                id="standard-basic-2"
                variant="standard"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Confirm - Password"
                type="password"
                onChange={(e) => {
                  setRePassword(e.target.value);
                }}
                value={repassword}
                InputProps={{
                  style: {
                    fontFamily: "Quicksand",
                    fontWeight: "bold",
                    color: repassword !== password ? "#f44336" : "#25396F",
                  },
                }}
                error={repassword !== password}
                helperText={
                  repassword !== password && "password is not mathing"
                }
                autoComplete="off"
              />
              <Select
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                fullWidth
              >
                <MenuItem value="compostAgency">Compost Agency</MenuItem>
                <MenuItem value="ngo">NGO</MenuItem>
                <MenuItem value="donor">Donor</MenuItem>
              </Select>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{
                  fontFamily: "Quicksand",
                  fontWeight: "bold",
                  backgroundColor: "#25396F",
                }}
              >
                {!loading ? "Sign Up" : "Signing Up...."}
              </Button>
              <Grid container>
                <Grid item xs={12}>
                  {justVerify && (
                    <Alert
                      variant="filled"
                      severity="error"
                      style={{ fontFamily: "Quicksand", fontWeight: "600" }}
                    >
                      User Already Exist !!
                    </Alert>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Button
                    color="secondary"
                    onClick={() => {
                      navigate("/login");
                    }}
                    variant="text"
                    style={{
                      fontFamily: "Quicksand",
                      fontWeight: "bold",
                      color: "ghostwhite",
                      textDecoration: "underline",
                    }}
                  >
                    Already have an account? Sign In
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
