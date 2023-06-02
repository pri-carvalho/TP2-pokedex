
import Image from 'next/image'

import CarouselBanner from '../components/molecules/banner/CarouselBanner';

import styles from "./page.module.css";
import PokemonList from "@/components/pokemon/organisms/pokemon-list";
import { getData } from "@/api/pokemon-api";

export default async function Home() {
   const data = await getData("https://pokeapi.co/api/v2/pokemon?limit=9&offset=0")  

  return (

    <div className={styles.container}>
      <CarouselBanner />
      <main className={styles.main}>
    <PokemonList data={data}/>
    </main>
    </div>
  );
}
