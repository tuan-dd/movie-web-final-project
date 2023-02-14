import React from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import { Container } from '@mui/material';
import MainHeader from './mainHeader';
import { getGenres } from '../app/apiService';
import DataMoviesProvider from '../contexts/dataMoviesProvider';
export const loader = async () => {
   const genres = await getGenres('vi');
   return genres;
};
function MainLayout() {

   const genres = useLoaderData();
   return (
      <DataMoviesProvider>
         <Container
            maxWidth='xl'
            disableGutters
            sx={{
               height: '100%',
            }}
         >
            <MainHeader genres={genres} />
            <Outlet />
         </Container>
      </DataMoviesProvider>
   );
}

export default MainLayout;
