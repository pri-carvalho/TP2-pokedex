'use client'

import PokemonList from "@/components/pokemon/organisms/pokemon-list";
import styles from "@/app/page.module.css";
import Image from 'next/image'
import { getData } from "@/api/pokemon-api";
import { useState, useEffect } from "react";


interface FilterProps{
  params: {
    slug: string;
  }
}

export default function Filter({ params }: FilterProps){ 
  const [type, setType] = useState<string>(params.slug)

 return (
   <div className={styles.container}>
     <main className={styles.main}>
        <div className={styles.categoryAndLogo}>
          <Image src={`/img/pokedex/${type}.png`} alt={type} width={60} height={60}/>
          <h1>{type}</h1>
        </div>
       <PokemonList type={type}/>
     </main>
   </div>
 );
}

