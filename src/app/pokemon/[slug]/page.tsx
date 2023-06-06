'use client'

import PokemonCard from "@/components/pokemon/molecules/pokemon-card";
import { Box, Breadcrumbs, Container, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { getData } from "@/api/pokemon-api";
import { Home } from "@mui/icons-material";

interface PokemonPageParams{
  params: {
    slug: string
  }
}

export default function PokemonPage({ params }: PokemonPageParams){
  const data = getData("https://pokeapi.co/api/v2/pokemon/ivysaur")
  const apiPokemonUrl = `https://pokeapi.co/api/v2/pokemon/${params.slug}` 
    
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
        <PokemonCard imageSrc="" apiUrl={apiPokemonUrl}/>
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
