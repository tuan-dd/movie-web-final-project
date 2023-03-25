import { Box, Grid } from '@mui/material';
import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import { Outlet, useLoaderData, useNavigation } from 'react-router-dom';
import { getOptionData } from '../app/apiService';
import CardMovie from '../components/cardMovie';
import LinearLoading from '../components/linearLoading';
import LoadingScreen from '../components/loadingScreen';

export async function loader({ params }) {
   const dataGenre = await getOptionData(
      '/discover',
      '/movie',
      '',
      1,
      `&sort_by=popularity.desc&with_genres=${params.genreId}`,
   );
   const { genreId } = params;
   return { dataGenre, genreId };
}
function GenrePage() {
   const { dataGenre, genreId } = useLoaderData();
   const [movies, setMovies] = useState(null);
   const [page, setPage] = useState(2);
   const [progress, setProgress] = useState(10);
   const progressLoading = useRef();
   const isFinish = useRef(true);
   const navigation = useNavigation();

   // addEventListener for "scroll" event
   async function fetchPage() {
      isFinish.current = false;
      progressLoading.current = setInterval(() => {
         setProgress((previousProgress) =>
            previousProgress <= 100 ? previousProgress + 10 : previousProgress,
         );
      }, 500);
      setPage(page + 1); // loading add movie
      const newData = await getOptionData(
         '/discover',
         '/movie',
         '',
         `${page}`,
         `&sort_by=popularity.desc&with_genres=${genreId}`,
      );
      clearInterval(progressLoading.current);
      setProgress(100);
      setTimeout(() => {
         setMovies((previousData) => [...previousData, ...newData.results]);
         setProgress(0);
      }, 500);
      isFinish.current = true;
   }

   function onScroll(e) {
      // detect if user scroll to the end of the container
      // document.documentElement.scrollHeight // heigh all of page
      let heightScroll = window.innerHeight + window.scrollY; // window.innerHeight height you see + height you scroll
      if (heightScroll > (document.documentElement.scrollHeight * 19) / 20) {
         if (isFinish.current) fetchPage();
      }
   }
   useEffect(() => {
      window.addEventListener('scroll', onScroll);

      return () => {
         window.removeEventListener('scroll', onScroll);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useEffect(() => {
      setMovies(dataGenre.results);
   }, [dataGenre.results]);

   return (
      <>
         {movies && navigation.state === 'idle' ? (
            <Box>
               <Grid container spacing={2} mt={15} pl={3}>
                  {movies.map((item, index) => (
                     <Grid item lg={2} md={3} sm={4} xs={12} key={index}>
                        <CardMovie card={item} />
                     </Grid>
                  ))}
                  <Outlet />
               </Grid>
               <Box
                  p={2}
                  sx={{
                     display: 'flex',
                     justifyContent: 'center',
                     alignContent: 'center',
                     width: '90%',
                  }}
               >
                  <LinearLoading progress={progress} />
               </Box>
            </Box>
         ) : (
            <Box
               sx={{
                  height: '100vh',
               }}
            >
               <LoadingScreen />
            </Box>
         )}
      </>
   );
}

export default GenrePage;
