import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { getDataMovie } from '../../app/apiService';
import { Container, IconButton } from '@mui/material';
import BasicCard from './card';
import ReactPlayer from 'react-player';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
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
   // console.log(params.detailId);
   const detailMovie = await getDataMovie(params.detailId);
   return detailMovie.data;
};
export default function BasicModal() {
   const [open, setOpen] = React.useState(true);
   const [playing, setPlaying] = React.useState(false);
   const [checkVolume, setCheckVolume] = React.useState(false);
   const dataDetailMovie = useLoaderData();
   const navigate = useNavigate();
   const location = useLocation();
   const urlMovie = dataDetailMovie?.videos?.results?.find((item) => {
      if (item.name.includes('Official Trailer')) {
         return item;
      } else {
         return dataDetailMovie.videos?.results[0];
      }
   });
   const handleClose = () => {
      let urlCallBack = location.state?.callBack.pathname;
      setOpen(false);
      setPlaying(false);
      navigate(urlCallBack);
   };
   // console.log(dataDetailMovie);
   // React.useEffect(() => {
   //    if (onReady) {
   //       setPlaying(true);
   //    }
   // }, []);

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
                  height: '80vh',
               }}
               disableGutters
            >
               <Box sx={{ height: 400 }} position='relative'>
                  <ReactPlayer
                     url={`https://www.youtube.com/watch?v=${urlMovie?.key}`}
                     width='100%'
                     height='100%'
                     playing={playing}
                     controls={true}
                     muted={checkVolume}
                     onReady={() => setPlaying(true)}
                  />
                  {/* <IconButton
                     onClick={() => {
                        setCheckVolume(!checkVolume);
                     }}
                     size='large'
                     sx={{
                        ml: 2,
                        bgcolor: 'white',
                        position: 'absolute',
                        bottom: 10,
                        zIndex:12
                     }}
                  >
                     {!checkVolume ? (
                        <VolumeDownIcon sx={{ color: 'red' }} />
                     ) : (
                        <VolumeOffIcon sx={{ color: 'red' }} />
                     )}
                  </IconButton> */}
               </Box>
               <BasicCard dataDetailMovie={dataDetailMovie} />
            </Container>
         </Modal>
      </div>
   );
}
