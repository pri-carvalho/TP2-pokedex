'use client'

import { Box, CircularProgress, Container, Grid, Pagination } from "@mui/material";
import PokemonCard from "@/components/pokemon/molecules/pokemon-card";
import { useState } from "react";
import { PokemonListAPI } from "@/types/pokemon";


interface PokemonListProps{
    data: PokemonListAPI
}

export default function PokemonList(props: PokemonListProps) {
  const [pokemonList, setPokemonList] = useState<PokemonListAPI>(props.data);
 
  
  return (
      <Container fixed>
        <Box sx={{ mb:2 }}>
        <Grid container spacing={4}>
          {pokemonList?.results.map((pokemon) => (
              <Grid item xs={4} key={pokemon.name}>
                <PokemonCard apiUrl={pokemon.url} />
              </Grid>
          ))}
        </Grid>
        </Box>
      </Container>    
  );
}
