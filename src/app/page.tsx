import CarouselBanner from '../components/molecules/banner/CarouselBanner';

import styles from "./page.module.css";
import PokemonList from "@/components/pokemon/organisms/pokemon-list";

export default async function Home() {
  return (

    <div>
      <CarouselBanner />
      <div className={styles.container}>
      <main className={styles.main}>
        <PokemonList/>
      </main>
    </div>
    </div>
  );
}
