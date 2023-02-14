import * as React from 'react';
import CardMovie from './cardMovie';
import { IconButton, Stack, Typography, Divider, Box } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
export default function MovieListRow({ dataGenres, allMoviesOfGenre, index }) {
   // console.log(allMoviesOfGenre)
   const listRef = useRef(null);
   const handleShowOn = async (idButton) => {
      const button = document.querySelectorAll(`.${idButton}`);
      button.forEach((item) => (item.style.opacity = 1));
      setTimeout(() => {
         button.forEach((item) => (item.style.opacity = null));
      }, 1500);
   };
   const handleShowOff = (idButton) => {
      const button = document.querySelectorAll(`.${idButton}`);
      button.forEach((item) => (item.style.opacity = null));
   };
   const scroll = (id) => {
      console.log(listRef.current.scrollWidth);
      console.log(listRef.current);
      if (id === 'right') {
         // console.log(listRef.current.scrollTo);
         listRef.current.scrollTo({
            left: listRef.current.scrollWidth,
            behavior: 'smooth',
         });
      } else if ((id = 'left')) {
         listRef.current.scrollTo({
            left: -listRef.current.scrollWidth,
            behavior: 'smooth',
         });
      }
   };
   return (
      <Box m={2} mb={2} position='relative'>
         <Typography
            variant='h4'
            color={(theme) => theme.palette.primary.contrastText}
            pl={6}
            sx={{ cursor: 'pointer' }}
            position='relative'
         >
            {dataGenres[index].name}{' '}
            <Link to={`genre/${dataGenres[index].id}`}>
               <Typography
                  variant='caption'
                  textAlign='end'
                  sx={{
                     opacity: 0.1,
                     width: 220,
                     transition: 'all 0.4 ease-out',
                     ':hover': {
                        opacity: 1,
                     },
                  }}
               >
                  Explore All
               </Typography>
            </Link>
         </Typography>
         <Stack
            ref={listRef}
            id={`slider_${index}`}
            p={2}
            pt={1}
            pl={6}
            direction='row'
            divider={<Divider orientation='vertical' flexItem width='1px' />}
            spacing={1}
            style={{
               // width: 'max-content',
               height: 'auto',
               overflowX: 'hidden',
               ml: 'auto',
               mr: 'auto',
               // transform: 'translateX(0px)',
               transition: 'all 1s ease',
            }}
         >
            {allMoviesOfGenre.results?.map((card, i) => (
               <CardMovie
                  key={i}
                  card={card}
                  handleShowOn={handleShowOn}
                  handleShowOff={handleShowOff}
                  idButton={`button_${index}`}
               />
            ))}
         </Stack>
         {/* <Swiper
            slidesPerView={7}
            spaceBetween={6}
            freeMode={true}
            navigation={true}
            modules={[FreeMode, Navigation]}
            className='mySwiper'
            style={{ paddingLeft: '40px' }}
         >
            {allMoviesOfGenre.results?.map((card, i) => (
               <SwiperSlide key={i}>
                  <VideoCard
                     card={card}
                     handleShowOn={handleShowOn}
                     handleShowOff={handleShowOff}
                     idButton={`button_${index}`}
                  />
               </SwiperSlide>
            ))}
         </Swiper> */}
         <IconButton
            className={`button_${index}`}
            onClick={() => scroll('right')}
            sx={{
               position: 'absolute',
               display: 'flex',
               zIndex: 15,
               justifyContent: 'center',
               alignContent: 'center',
               top: '12px',
               right: '0vw',
               height: '100%',
               width: 'auto',
               opacity: 0.2,
               ':hover': {
                  opacity: 1,
               },
            }}
         >
            <ArrowForwardIosIcon
               sx={{
                  fontSize: 40,
                  color: 'white',
               }}
            />
         </IconButton>
         <IconButton
            className={`button_${index}`}
            onClick={() => scroll('left')}
            sx={{
               position: 'absolute',
               display: 'flex',
               justifyContent: 'center',
               alignContent: 'center',
               top: '12px',
               left: '3vw',
               zIndex: 15,
               height: '100%',
               width: 'auto',
               opacity: 0.2,
               ':hover': {
                  opacity: 1,
               },
            }}
         >
            <ArrowBackIosIcon
               sx={{
                  fontSize: 40,
                  color: 'white',
               }}
            />
         </IconButton>
      </Box>
   );
}
