import Image from 'next/image'
import styles from './page.module.css'
import CarouselBanner from '../components/molecules/banner/CarouselBanner';

export default function Home() {
  return (
    <div className={styles.container}>
      <CarouselBanner />
      <main className={styles.main}>
        {/* Conteúdo da main */}
      </main>
    </div>
  );
}
