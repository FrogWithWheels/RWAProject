'use client';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {useState, useEffect} from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';

export default function Home() {
  const handleSubmit = (event) => {

  console.log("Handling submit");

  event.preventDefault();

  const data = new FormData(event.currentTarget);

   let username = data.get('username');

   let pass = data.get('pass');

   console.log("Sent username:" + username);

   console.log("Sent pass:" + pass);

   runDBCallAsync(`/api/login?username=${username}&pass=${pass}`);
 }; // end handle submit

async function runDBCallAsync(url) {
    console.log("Async Running in Register");
    const res = await fetch(url);

    const data = await res.json();
    console.log(data);
    if(data.data == "true"){
      console.log("login is valid!");
    } 
    else {
      console.log("not valid  ");
    }
  }

  return (
    <Container sx={{ backgroundColor: "white" }} maxWidth="sm">
      <Box sx={{ height: '100vh' }}>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Email Address"
            name="username"
            autoComplete="email"
            autoFocus
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="pass"
            label="Pass"
            type="pass"
            id="pass"
            autoComplete="current-password"
          />

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
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
    </Container>
  ); // end return
}