import React from "react";
import { Button } from "@mui/material";

interface PokemonCardButtomProps {
  text?: string;
  href: string;
}

const PokemonCardButtom  = ({ text, href } : PokemonCardButtomProps) => {
  return (
    <Button href={href} sx={{ backgroundColor: '#0A58CA', color: 'white'}} variant="contained">
        {text}
    </Button>
  )
}

export default PokemonCardButtom;