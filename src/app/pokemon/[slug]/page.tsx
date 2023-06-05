'use client'

import PokemonCard from "@/components/pokemon/molecules/pokemon-card";
import { Box, Breadcrumbs, Container, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getData } from "@/api/pokemon-api";
import { PokemonEvolutionChain } from "@/types/pokemon";
import { Home } from "@mui/icons-material";

interface PokemonPageParams{
  params: {
    slug: string
  }
}

export default function PokemonPage({ params }: PokemonPageParams){
  const apiPokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${params.slug}`
  const apiPokemonUrl = `https://pokeapi.co/api/v2/pokemon/${params.slug}` 
  const [pokemonEvolutionChain, setPokemonEvolutionChain] = useState<PokemonEvolutionChain>()

  useEffect(() => {
    getData(apiPokemonSpeciesUrl).then((apiResult) => {
      setPokemonEvolutionChain(apiResult.evolution_chain);
    });
  }, []);

  const renderEvolutionChain = () => {
    if (pokemonEvolutionChain) {
      // Render the necessary information from the evolution chain object
      return <h1>{pokemonEvolutionChain.url}</h1>;
    }
    return null;
  };

  return (
    <>
    <Container fixed>
      <Box sx={{
        mt: 2,
        mb: 2,
      }}>
      <Breadcrumbs aria-label="breadcrumb">
      <Link href="/">
        Home
      </Link>
      <Typography color="text.primary">{params.slug}</Typography>
    </Breadcrumbs>
      </Box>
      <Grid container spacing={2}>
      <Grid item xs={8}>
        <h1>{params.slug}</h1>
        {renderEvolutionChain()}
        <PokemonCard apiUrl={apiPokemonUrl}/>
      </Grid>
      <Grid item xs={8}>
      
       <hr></hr>
       <Box>
          <h2>Types</h2>
       </Box>
      </Grid>
    </Grid>
    </Container>
    </>
    )
}
