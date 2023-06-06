'use client'

import { Box, CircularProgress, Container, Grid, Pagination } from "@mui/material";
import PokemonCard from "@/components/pokemon/molecules/pokemon-card";
import { useEffect, useState } from "react";
import { PokemonListResultat } from "@/types/pokemon";
import { PokemonListAPI } from "@/types/pokemon";
import { getData } from "@/api/pokemon-api";

interface PokemonListProps {
  type?: string;
}

interface FiltreRecherche {
  type?: string;
  currentePage:number;
}

const PokemonList = (props: PokemonListProps) => {
  const LIMITE_PAR_PAGE:number = 9
  const [pokemonList, setPokemonList] = useState<PokemonListResultat[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const rechercherPokemons = async (config:FiltreRecherche) => {
    try {
      setLoading(true)
      const offset = (config.currentePage - 1) * LIMITE_PAR_PAGE
      let pokemons:PokemonListResultat[] = [];
      let count:number = 0
      if (config.type) {
        const typeData = await getData(`https://pokeapi.co/api/v2/type/${config.type}`);
        const tousLesPokemons = typeData.pokemon.map((p: { pokemon: { name: string; url: string; }; }) => {
                            return {
                              name: p.pokemon.name,
                              url: p.pokemon.url
                            }
                          })
        count = tousLesPokemons.length
        pokemons = tousLesPokemons.slice(offset, offset + LIMITE_PAR_PAGE)
      } else {
        const data:PokemonListAPI = await getData(`https://pokeapi.co/api/v2/pokemon?limit=${LIMITE_PAR_PAGE}&offset=${offset}`)
        pokemons = data.results
        count = data.count || 0
      }
      setPokemonList(pokemons)
      setTotalPages(count ? Math.ceil(count / LIMITE_PAR_PAGE) : 1)
    } catch (error) {
      console.error("Error fetching Pokemon list:", error);
    }
    setLoading(false);
  }
  useEffect(() => {
    const fetchPokemonList = async () => {
      rechercherPokemons({type: props.type, currentePage: 1})
    };

    fetchPokemonList();
  }, []);

  return (
    <Container fixed>
      {loading ? (
        <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box sx={{ mb: 2 }}>
            <Grid container spacing={4}>
              {pokemonList.map((pokemon) => (
                <Grid item xs={4} key={pokemon.name}>
                  <PokemonCard apiUrl={pokemon.url} type={props.type}/>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box sx={{ pt: 2, display: "flex", justifyContent: "center" }}>
            <Pagination
              siblingCount={1}
              count={totalPages}
              page={currentPage}
              onChange={(e, page: number) => {
                setCurrentPage(page);
                if (page !== currentPage)
                  rechercherPokemons({type: props.type, currentePage: page})
              }}
              color="primary"
            />
          </Box>
        </>
      )}
    </Container>
  );
};

export default PokemonList;
