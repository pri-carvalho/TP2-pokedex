'use client'

import React, { useState, useEffect } from "react";
import PokemonCard from "@/components/pokemon/molecules/pokemon-card";
import { Box, Breadcrumbs, Container, Grid, Typography, Paper } from "@mui/material";
import Link from "next/link";
import { getData } from "@/api/pokemon-api";
import { Home } from "@mui/icons-material";
import { useState, useEffect } from "react";

interface PokemonPageParams{
  params: {
    slug: string;
  };
}

export default function PokemonPage({ params }: PokemonPageParams) {
  const [pokemonData, setPokemonData] = useState<any>(null);
  const [evolutionData, setEvolutionData] = useState<any>(null);
  const apiPokemonUrl = `https://pokeapi.co/api/v2/pokemon/${params.slug}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData(apiPokemonUrl);
        setPokemonData(data);

        if (data.species && data.species.url) {
          const speciesData = await getData(data.species.url);
          if (speciesData.evolution_chain && speciesData.evolution_chain.url) {
            const evolutionChainData = await getData(speciesData.evolution_chain.url);
            setEvolutionData(evolutionChainData);
          }
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données du Pokémon :", error);
      }
    };

    fetchData();
  }, [apiPokemonUrl]);

  function getCardsEvolution(evolutionData: any) {
    if (evolutionData && evolutionData.chain) {
      let evolutionChain = evolutionData.chain;
      let evolutionName: any[] = [];
      while (evolutionChain) {
        evolutionName.push(evolutionChain.species.name);
        if (evolutionChain.evolves_to.length > 1) {
          evolutionChain.evolves_to.forEach((evolution: any) => {
            evolutionName.push(evolution.species.name);
          });
        }
        evolutionChain = evolutionChain.evolves_to[0];
      }
      return ( 
        <Grid container spacing={2} justifyContent="center" sx={{ mt: 2, mb: 2 }}>
        {evolutionName.map((name: any) => (
          <Grid item key={name} xs={5} sm={5} md={3} lg={3}>
            <PokemonCard apiUrl={`https://pokeapi.co/api/v2/pokemon/${name}/`} />
          </Grid>
        ))}
      </Grid>       
      );
    }
  }

  return (
    <>
      <Container fixed>
        <Box sx={{ mt: 2, mb: 2 }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link href="/">
              <Home />
            </Link>
            <Typography color="text.primary">{params.slug}</Typography>
          </Breadcrumbs>
        </Box>
        {/* Selected Pokemon */}
        {pokemonData && (
                <>
                  <Typography variant="h1">{pokemonData.name}</Typography>
                  <Box sx={{ mt: 2, mb: 2 }}>
                  </Box>
                </>
              )}
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={4}>
            <PokemonCard apiUrl={apiPokemonUrl} showButton={false} />
          </Grid>
        </Grid>
        {/* Image evolution */}
        <Typography variant="h2" align="center" sx={{ mt: 4}}>Évolutions</Typography>
        <Grid container spacing={2}>
            <Grid>          
            {getCardsEvolution(evolutionData)}
          </Grid>
        </Grid>
        {/* Informations du Pokémon */}
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={10} sx={{ mt: 2, mb: 4 }} >
            <div>
              <Typography variant="h3">Informations du Pokémon</Typography>
              {pokemonData && (
                <ul>
                  <li>Numéro du Pokédex : {pokemonData.id}</li>
                  <li>Nom : {pokemonData.name}</li>
                  <li>Type : {pokemonData.types.map((type: any) => type.type.name).join(", ")}</li>
                  <li>Hauteur : {pokemonData.height} m</li>
                </ul>
              )}
              <Typography variant="h3">Autres informations</Typography>
              {pokemonData && (
                <ul>
                  <li>Habilité : {pokemonData.abilities.map((ability: any) => ability.ability.name).join(", ")}</li>
                  <li>Statistiques : {pokemonData.stats.map((stat: any) => `${stat.stat.name} : ${stat.base_stat}`).join(", ")}</li>
                </ul>
              )}
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
    )
}
