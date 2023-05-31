'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


function MyFooter() {
  return (
    <footer>
      <AppBar position="static" style={{ backgroundColor: "lightgray", color: "black" }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src="../../app/assets/img/pokeball.png" alt="logo" height={50} width={50} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Travail TP2 - Techniques d’intégration 2
          </Typography>
        </Toolbar>
      </AppBar>
      <AppBar position="static">
        <Toolbar>
          {/* Ici, vous pouvez mettre votre liste horizontale pour le deuxième niveau */}
        </Toolbar>
      </AppBar>
    </footer>
  );
}

export default MyFooter;
