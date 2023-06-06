'use client'
import React, { useState, useEffect } from "react";
import PokemonCard from "@/components/pokemon/molecules/pokemon-card";
import { Box, Breadcrumbs, Container, Grid, Paper, Typography } from "@mui/material";
import Link from "next/link";
import { getData } from "@/api/pokemon-api";
import { Home } from "@mui/icons-material";

interface PokemonPageParams {
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

  function getEvolutionText(evolutionData: any): string {
    if (evolutionData && evolutionData.chain) {
      let evolutionChain = evolutionData.chain;
      let evolutionText = "";
      while (evolutionChain) {
        evolutionText += `${evolutionChain.species.name} -> `;
        evolutionChain = evolutionChain.evolves_to[0];
      }
      evolutionText = evolutionText.slice(0, -4); // Supprimer le dernier "-> " 
      return evolutionText;
    }
    return "(informations d'évolution ici)";
  }

  function getCardsEvolution(evolutionData: any) {
    if (evolutionData && evolutionData.chain) {
      let evolutionChain = evolutionData.chain;
      let evolutionName = [];
      while (evolutionChain) {
        evolutionName.push(evolutionChain.species.name);
        evolutionChain = evolutionChain.evolves_to[0];
      }
      console.log(evolutionName);
      return ( 
        <Grid container spacing={2} justifyContent="center" sx={{ mt: 2, mb: 2 }}>
        {evolutionName.map((name: any) => (
          <Grid item key={name} xs={6} sm={6} md={3} lg={3}>
            <PokemonCard apiUrl={`https://pokeapi.co/api/v2/pokemon/${name}/`} imageSrc={""} />
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
        {/* Pokemon selecionado */}
        {pokemonData && (
                <>
                  <Typography variant="h1">{pokemonData.name}</Typography>
                  <Box sx={{ mt: 2, mb: 2 }}>
                  </Box>
                </>
              )}
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={4}>
            <PokemonCard imageSrc={""} apiUrl={apiPokemonUrl} />
          </Grid>
        </Grid>
        {/* Imagens de evolução */}
        <Grid container spacing={2}>
            <Grid>          
            {getCardsEvolution(evolutionData)}
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ mt: 2, mb: 4 }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h2">Informations du Pokémon</Typography>
              {pokemonData && (
                <ul>
                  <li>Numéro du Pokédex : {pokemonData.id}</li>
                  <li>Nom : {pokemonData.name}</li>
                  <li>Type : {pokemonData.types.map((type: any) => type.type.name).join(", ")}</li>
                  <li>Hauteur : {pokemonData.height} m</li>
                  <li>Évolution : {getEvolutionText(evolutionData)}</li>
                </ul>
              )}
              <Typography variant="h2">Autres informations</Typography>
              {pokemonData && (
                <ul>
                  <li>Habilité : {pokemonData.abilities.map((ability: any) => ability.ability.name).join(", ")}</li>
                  <li>Statistiques : {pokemonData.stats.map((stat: any) => `${stat.stat.name} : ${stat.base_stat}`).join(", ")}</li>
                </ul>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
