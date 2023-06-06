'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function MyFooter() {
  return (
    <footer>
      <AppBar position="static" style={{ backgroundColor: "lightgray", color: "black" }}>
        <Toolbar>
          <Typography variant="caption" component="div" sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80px' }}>
            <img src="/img/assets/pokeball.png" alt="logo" style={{ height: '50px', width: '50px', marginRight: '60px' }} />
            Travail TP2 - Techniques d’intégration 2
          </Typography>
        </Toolbar>
      </AppBar>
      <AppBar position="static" sx={{ height: '60px' }}>
        <Toolbar>
          <Typography variant="body1" component="div" sx={{ margin: '0 20px' }}>
            Aline
          </Typography>
          <Typography variant="body1" component="div" sx={{ margin: '0 20px' }}>
            Asmae
          </Typography>
          <Typography variant="body1" component="div" sx={{ margin: '0 20px' }}>
            Juliana
          </Typography>
          <Typography variant="body1" component="div" sx={{ margin: '0 20px' }}>
            Priscila
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="body2" component="div">
            © 2023 Pokémon
          </Typography>
        </Toolbar>
      </AppBar>
    </footer>
  );
}

export default MyFooter;
