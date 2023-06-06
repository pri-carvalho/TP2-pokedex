'use client'
import { useState, useEffect } from "react";
import { Card, CardActionArea, CardContent, CardMedia, Skeleton } from "@mui/material";
import Link from "next/link";
import { getData } from "@/api/pokemon-api";
import PokemonCardButton from "../atoms/PokemonCardButtom";


export interface PokemonCardProps {
  apiUrl: string;
  imageSrc: string;
}

export default function PokemonCard(props: PokemonCardProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [pokemon, setPokemon] = useState<any>(null);

  useEffect(() => {
    if (loading) {
      getData(props.apiUrl)
        .then((apiResult) => {
          setPokemon({
            id: apiResult.id,
            name: apiResult.name,
            imageUrl: apiResult.sprites.other["official-artwork"].front_default,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [loading, props.apiUrl]);

  return (
    <Link href={pokemon?.name ? `/pokemon/${pokemon?.name}` : "#"}>
      <Card>
        <CardActionArea>
          {loading ? (
            <>
              <Skeleton animation="wave" height={267} />
              <CardContent>
                <Skeleton animation="wave" height={68} />
              </CardContent>
            </>
          ) : (
            <>
              <CardMedia
                component="img"
                image={pokemon?.imageUrl || "/img/assets/pokeball.png"}
                alt="Pokemon"
              />
              <CardContent sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <PokemonCardButton
                  text={pokemon?.name}
                  href={pokemon?.name ? `/pokemon/${pokemon?.name}` : "#"}
                />
              </CardContent>
            </>
          )}
        </CardActionArea>
      </Card>
    </Link>
  );
}
