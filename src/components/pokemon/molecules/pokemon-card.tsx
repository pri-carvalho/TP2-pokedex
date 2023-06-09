'use client'
import { getData } from "@/api/pokemon-api";
import { PokemonApi } from "@/types/pokemon";
import { 
  Card,
  CardActionArea,  
  CardContent,
  CardMedia,
  Skeleton,
} from "@mui/material";
import Link from "next/link";
import { useState, useEffect } from "react";
import PokemonCardButtom from "../atoms/PokemonCardButtom";

export interface PokemonCardProps {
  apiUrl: string;
  imageSrc: string;
  showButton?: boolean;
  type?: string;
}

export default function PokemonCard(props: PokemonCardProps) {
  const [loading, setLoading] = useState<boolean>(true)
  const [pokemon, setPokemon] = useState<PokemonApi>()

  useEffect(() => {
    if(loading){
      getData(props.apiUrl)
      .then((apiResult) => {
        setPokemon({
          id: apiResult.id,
          name: apiResult.name,
          imageUrl: apiResult.sprites.other["official-artwork"].front_default
        })
      }).finally(() => {
        setLoading(false)
      })
    }
  }, [loading, props.apiUrl])

  function hiddenButton(): boolean {
    if(props.showButton == undefined || props.showButton) {
      return true;
    }
    else  {
      return false;
    }
  }

  return (
    <Link href={pokemon?.name ? `/pokemon/${pokemon?.name}`: "#"}>
      <Card>
        <CardActionArea>
          {loading ? (
            <>
            <Skeleton animation="wave" height={267}/>
            <CardContent>            
            <Skeleton animation="wave" height={68}/>
            </CardContent>
            </>
          )  : (    
          <> 
          <CardMedia
            component="img"
            image={pokemon?.imageUrl}
            alt="green iguana"
          /> 
            {hiddenButton() ? 
              <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <PokemonCardButtom text={pokemon?.name} href={pokemon?.name ? `/pokemon/${pokemon?.name}`: "#"} />
              </CardContent>  
              : ''}
          </>
        )}     
        </CardActionArea>
      </Card>
    </Link>
  );
}
