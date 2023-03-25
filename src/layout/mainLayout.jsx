import React from 'react';
import { Outlet, useSearchParams, useLoaderData } from 'react-router-dom';
import { Container } from '@mui/material';
import MainHeader from './mainHeader';
import { getDataMovie, getGenres } from '../app/apiService';
import MainFooter from './mainFooter';

import DetailModal from '../components/modal/detailModal';

export const loader = async () => {
   const genres = await getGenres('vi');
   return genres;
};

function MainLayout() {
   const genres = useLoaderData();

   const [isDetailModalOpen, setDetailModalOpen] = React.useState(false);

   const [searchParams, setSearchParams] = useSearchParams();

   const detailId = searchParams.get('movieId');

   const [dataDetailMovie, setDataDetailMovie] = React.useState();

   React.useEffect(() => {
      if (detailId) {
         getDataMovie(detailId).then((res) => {
            setDataDetailMovie(res.data);
            setDetailModalOpen(true);
         });
      }
   }, [detailId]);

   return (
      <Container
         maxWidth='100%'
         disableGutters
         sx={{
            width: '100%',
            height: '100%',
            position: 'relative',
         }}
      >
         <MainHeader genres={genres} />

         <Outlet />
         <MainFooter />
         <DetailModal
            isOpen={isDetailModalOpen}
            setOpen={setDetailModalOpen}
            dataDetailMovie={dataDetailMovie}
         />
      </Container>
   );
}

export default MainLayout;
