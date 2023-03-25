import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Container, IconButton } from '@mui/material';
import ReactPlayer from 'react-player';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import { getDataMovie } from '../../app/apiService';
import BasicCard from './card';

const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   bgcolor: 'background.paper',
   border: '2px solid #000',
   boxShadow: 24,
   m: 2,
};
export const loader = async ({ params }) => {
   const detailMovie = await getDataMovie(params.detailId);
   return detailMovie.data;
};
export default function BasicModal({ dataDetailMovie, isOpen: open, setOpen }) {
   const [playing, setPlaying] = React.useState(false);
   //  const [checkVolume, setCheckVolume] = React.useState(false);
   const [searchParams, setSearchParams] = useSearchParams();

   const navigate = useNavigate();
   const urlMovie = dataDetailMovie?.videos?.results?.find((item) => {
      if (item.name.includes('Official Trailer')) {
         return item;
      }
      return dataDetailMovie.videos?.results[0];
   });

   const handleClose = () => {
      // let urlCallBack = location.state?.callBack.pathname || '/';
      searchParams.delete('movieId');
      setSearchParams(searchParams);
      setOpen(false);
      setPlaying(false);
      // navigate(urlCallBack);
   };

   return (
      <div>
         <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
         >
            <Container
               maxWidth='md'
               sx={{
                  ...style,
                  m: 2,
                  overflowY: 'auto',
                  width: 1400,
                  height: '80vh',
               }}
               disableGutters
            >
               <Box sx={{ height: 500 }} position='relative'>
                  <ReactPlayer
                     url={`https://www.youtube.com/watch?v=${urlMovie?.key}`}
                     width='100%'
                     height='100%'
                     playing={playing}
                     controls
                     onReady={() => setPlaying(true)}
                  />
               </Box>
               <BasicCard dataDetailMovie={dataDetailMovie} />
            </Container>
         </Modal>
      </div>
   );
}
