import { Box, Grid } from '@mui/material';
import React, { useRef, useEffect, useState } from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import { getOptionData } from '../app/apiService';
import CardMovie from '../components/cardMovie';
import LinearLoading from '../components/linearLoading';
export async function loader({ params }) {
   const dataGenre = await getOptionData(
      '/discover',
      '/movie',
      '',
      1,
      `&sort_by=popularity.desc&with_genres=${params.genreId}`,
   );
   const genreId = params.genreId;
   return { dataGenre, genreId };
}
function GenrePage() {
   const { dataGenre, genreId } = useLoaderData();
   // console.log(dataGenre.results[1].id);
   const [movies, setMovies] = useState(dataGenre.results);
   const [page, setPage] = useState(2);
   const [progress, setProgress] = useState(10);
   const [loading, setLoading] = useState(false);
   const loadingRef = useRef(false);
   const progressLoading = useRef();
   const containerRef = useRef(0);
   // addEventListener for "scroll" event
   useEffect(() => {
      window.addEventListener('scroll', onScroll);

      return () => {
         window.removeEventListener('scroll', onScroll);
      };
   }, []);

   async function fetchPage() {
      setLoading(true);
      loadingRef.current = true;
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
      }, 1000);
      setLoading(false);
      loadingRef.current = false;
   }

   function onScroll(e) {
      // detect if user scroll to the end of the container
      //document.documentElement.scrollHeight // heigh all of page
      let heightScroll = window.innerHeight + window.scrollY; // window.innerHeight height you see + height you scroll
      if (containerRef.current) {
         if (heightScroll > (document.documentElement.scrollHeight * 19) / 20) {
            if (!loadingRef.current) {
               fetchPage();
               // console.log('should fetch next page');
            }
         }
      }
   }

   return (
      <div>
         <Grid
            container
            spacing={2}
            mt={15}
            pl={3}
            sx={{
               display: 'flex',
            }}
            ref={containerRef}
         >
            {movies.map((item, index) => (
               <Grid item lg={2} md={3} sm={4} xs={12} key={index}>
                  <CardMovie card={item} />
               </Grid>
            ))}
            <Outlet />
         </Grid>
         <Box p={2}>
            <LinearLoading progress={progress} />
         </Box>
      </div>
   );
}

export default GenrePage;
