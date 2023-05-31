// Image.tsx
import React, { FC, ReactNode } from 'react';
import pokeball from './src/app/assets/img/pokeball.png';

const Image: FC = (): ReactNode => {
  return (
    <img src={pokeball} alt="logo" height={50} width={50} />
  );
}

export default Image;
