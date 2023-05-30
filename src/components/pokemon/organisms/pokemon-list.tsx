'use client'

import { Box, Button, CircularProgress, Container, Grid, Pagination } from "@mui/material";
import PokemonCard from "@/components/pokemon/molecules/pokemon-card";
import { useEffect, useState } from "react";
import { PokemonListAPI } from "@/types/pokemon";
import { getData } from "@/api/pokemon-api";


interface PokemonListProps{
    data: PokemonListAPI
}

export default function PokemonList(props: PokemonListProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [pokemonList, setPokemonList] = useState<PokemonListAPI>(props.data);
  const [totalPages, setTotalPages] = useState<number>(props.data.count? Math.ceil(props.data.count/9) : 1)
  const [currentPage, setCurrentPage] = useState<number>(1)
 
  
  return (
      <Container fixed>

        {loading? (
        <Box sx={{ mb:2, display:"flex", justifyContent:"center" }}>
            <CircularProgress/>
        </Box>
        ) : (
            <>
        <Box sx={{ mb:2 }}>
        <Grid container spacing={4}>
          {pokemonList?.results.map((pokemon) => (
              <Grid item xs={4} key={pokemon.name}>
                <PokemonCard apiUrl={pokemon.url} />
              </Grid>
          ))}
        </Grid>
        </Box>
        </>
        )}
      </Container>    
  );
}
