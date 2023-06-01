"use client"
import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Container, Grid, IconButton } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const CarouselBanner: React.FC = () => {
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrevious = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? 4 : prevIndex - 1));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === 4 ? 0 : prevIndex + 1));
  };

  // Styles de composant
  const styles = {
    container: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing(2),
    },
    imageContainer: {
      width: '100%',
      height: '100vh',
      position: 'relative',
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    arrowButton: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      backgroundColor: 'transparent',
      color: theme.palette.primary.main,
      zIndex: 1,
    },
    prevButton: {
      left: theme.spacing(2),
    },
    nextButton: {
      right: theme.spacing(2),
    },
  };

  return (
    <Container maxWidth="lg">
        <Box sx={styles.imageContainer}>
          <IconButton
            sx={{ ...styles.arrowButton, ...styles.prevButton }}
            onClick={handlePrevious}
          >
            <NavigateBeforeIcon />
          </IconButton>
          <IconButton
            sx={{ ...styles.arrowButton, ...styles.nextButton }}
            onClick={handleNext}
          >
            <NavigateNextIcon />
          </IconButton>
          <Box
            sx={{
              ...styles.image,
              backgroundImage: `url('/img/assets/banner${activeIndex + 1}.jpg')`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              opacity: 1,
              transition: 'opacity 0.5s ease-in-out',
            }}
          />
        </Box>
    </Container>
  );
};

export default CarouselBanner;