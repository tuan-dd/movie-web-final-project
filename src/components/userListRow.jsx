import * as React from 'react';
import { IconButton, Stack, Typography, Divider, Box } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import CardMovie from './cardMovie';

const styleArrow = {
   position: 'absolute',
   display: 'flex',
   zIndex: 15,
   justifyContent: 'center',
   alignContent: 'center',
   height: '100%',
   width: 'auto',
   opacity: 0.2,
   ':hover': {
      opacity: 1,
   },
};
export default function UserListRow({ allMoviesOfUser, index }) {
   const [numberScroll, setNumberScroll] = useState(1);
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
      if (numberScroll <= 3) {
         let value = (listRef.current.scrollWidth / 4) * numberScroll;
         if (id === 'right') {
            setNumberScroll((e) => (e < 3 ? e + 1 : e));
            listRef.current.scrollTo({
               left: value,
               behavior: 'smooth',
            });
         } else if (id === 'left') {
            setNumberScroll(1);
            listRef.current.scrollTo({
               left: -listRef.current.scrollWidth,
               behavior: 'smooth',
            });
         }
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
            My Folder
            <Link to='/folder'>
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
               paddingTop: '30px',
               // width: 'max-content',
               height: 'auto',
               overflowX: 'hidden',
               ml: 'auto',
               mr: 'auto',
               // transform: 'translateX(0px)',
               transition: 'all 1s ease',
            }}
         >
            {allMoviesOfUser.map((card, i) => (
               <CardMovie
                  key={i}
                  card={card}
                  handleShowOn={handleShowOn}
                  handleShowOff={handleShowOff}
                  idButton={`button_${index}`}
               />
            ))}
         </Stack>
         <IconButton
            className={`button_${index}`}
            onClick={() => scroll('right')}
            sx={{
               ...styleArrow,
               top: '12px',
               right: '0vw',
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
               ...styleArrow,
               top: '12px',
               left: '3vw',
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
