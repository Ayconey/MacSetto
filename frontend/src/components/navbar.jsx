import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Stack } from '@mui/material';
import '../css/navbar.css'

export default function Navbar() {
  return (
    <div>
        <Box sx={{ flexGrow: 1 }} id='navbar'>
        <Grid container spacing={2}>
        <Grid item xs={6} id='logo' >
          <h1 >MacSet</h1>
        </Grid>
        <Grid item xs={6} id='Nav'>
        <li><h2><a href='/'>Mac Sets</a></h2></li>
        <li><h2><a href='menu'>Mac Menu</a></h2></li>
        <li><h2><a href='calc'>Calories Calculator</a></h2></li>
        </Grid>
      </Grid>
        </Box>
    </div>
  )
}
