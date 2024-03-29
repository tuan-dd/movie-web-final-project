import React, { useRef, useEffect, useState } from 'react';
import { redirect, Outlet, useLoaderData } from 'react-router-dom';
import { Box, Grid, Typography } from '@mui/material';
import { getOptionData, search } from '../app/apiService';
import CardMovie from '../components/cardMovie';
import LinearLoading from '../components/linearLoading';

export async function loader({ request }) {
   const url = new URL(request.url);
   const q = url.searchParams.get('q');

   if (!q) {
      return redirect('/');
   }
   const dataSearch = await search('/movie', `&query=${q}`, 1, false);
   return { dataSearch, q };
}
function Search() {
   const { dataSearch, q } = useLoaderData();
   const [movies, setMovies] = useState([]);
   const [page, setPage] = useState(2);
   const [progress, setProgress] = useState(10);
   const progressLoading = useRef();
   const isFinish = useRef(true);
   async function fetchPage() {
      isFinish.current = false;
      progressLoading.current = setInterval(() => {
         setProgress((previousProgress) =>
            previousProgress <= 100 ? previousProgress + 10 : previousProgress,
         );
      }, 500);
      setPage(page + 1); // loading add movie
      const newData = await getOptionData(
         '/search',
         '/movie',
         '',
         `${page}`,
         `&query=${q}`,
      );
      clearInterval(progressLoading.current);
      setProgress(100);
      setTimeout(() => {
         setMovies((previousData) => [...previousData, ...newData.results]);
         setProgress(0);
      }, 500);
      isFinish.current = true;
   }

   // addEventListener for "scroll" event
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
      setMovies(dataSearch.results);
   }, [q, dataSearch.results]);

   return (
      <>
         {movies ? (
            <div>
               <Grid
                  container
                  spacing={2}
                  mt={15}
                  pl={3}
                  sx={{
                     display: 'flex',
                  }}
               >
                  {movies?.map((item, index) => (
                     <Grid item lg={2} md={3} sm={4} xs={12} key={index}>
                        <CardMovie card={item} />
                     </Grid>
                  ))}
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
            </div>
         ) : (
            <Box>
               <Typography
                  variant='h5'
                  marginTop={30}
                  color={(theme) => theme.palette.primary.contrastText}
                  textAlign='center'
               >
                  {`Your search for "${q}" did not have any matches`}
               </Typography>
            </Box>
         )}
      </>
   );
}

export default Search;
