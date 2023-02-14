import React, { useRef, useEffect, useState } from 'react';
import { redirect, Outlet, useLoaderData } from 'react-router-dom';
import { getOptionData, search } from '../app/apiService';
import CardMovie from '../components/cardMovie';
import LinearLoading from '../components/linearLoading';
import { Box, Grid, Typography } from '@mui/material';
export async function loader({ request }) {
   const url = new URL(request.url);
   const q = url.searchParams.get('q');
   const detail = url.searchParams.get('detail');

   if (!q) {
      return redirect('/');
   }
   const dataSearch = await search('/movie', `&query=${q}`, 1, false);
   return { dataSearch, q, detail };
}
export async function action(request, params) {
   let formData = await request.formData();
   let detail = formData.get('detail');
   console.log(detail);
}
function Search() {
   const { dataSearch, q } = useLoaderData();
   // console.log(dataSearch)
   const [movies, setMovies] = useState([]);
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
   useEffect(() => {
      setMovies(dataSearch.results);
      setPage(2);
   }, [q]);

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
                  ref={containerRef}
               >
                  {movies?.map((item, index) => (
                     <Grid item lg={2} md={3} sm={4} xs={12} key={index}>
                        <CardMovie card={item} />
                     </Grid>
                  ))}
                  {/* <Outlet /> */}
               </Grid>
               <Box p={2}>
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
                  Your search for '{q}' did not have any matches.
               </Typography>
               {/* <Outlet /> */}
            </Box>
         )}
      </div>
   );
}

export default Search;
