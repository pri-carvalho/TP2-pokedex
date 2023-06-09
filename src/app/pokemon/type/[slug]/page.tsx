'use client'

import PokemonList from "@/components/pokemon/organisms/pokemon-list";
import styles from "@/app/page.module.css";
import Image from 'next/image'
import { getData } from "@/api/pokemon-api";
import { useState, useEffect } from "react";
import { PokemonType, types } from '@/types/pokemon'

interface FilterProps{
  params: {
    slug: string;
  }
}

export default function Filter({ params }: FilterProps){ 
  const [type, setType] = useState<PokemonType>({ id: params.slug, text: params.slug })

  
  useEffect(() => {
    const typePokemon:PokemonType = types.find(type => type.id === params.slug) || { id: '', text: params.slug }
    setType(typePokemon)
  }, [params.slug])

 return (
   <div className={styles.container}>
     <main className={styles.main}>
        <div className={styles.categoryAndLogo}>
          <Image src={`/img/pokedex/${type.id}.png`} alt={type.text} width={60} height={60}/>
          <h1>{type.text}</h1>
        </div>
       <PokemonList type={type.id}/>
     </main>
   </div>
 );
}

