import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import InfoIcon from '@mui/icons-material/Info';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Pagination from '@mui/material/Pagination';
import { Button, CardMedia, IconButton, Stack } from '@mui/material';
import { getDataMovie } from '../../app/apiService';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import Video from './video';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
export default function VideoCardOfHeader({ popular, ids }) {
   const [playing, setPlaying] = React.useState(false);
   const [index, setIndex] = React.useState(0);
   const [detailMovie, setDetailMovie] = React.useState(null);
   const [showVideo, setShowVideo] = React.useState(false);
   const [checkVolume, setCheckVolume] = React.useState(false);
   let location = useLocation();
   useEffect(() => {
      if (location.pathname !== '/'){
          setPlaying(false);
          setShowVideo(false)
         }
   }, [location?.pathname]);

   React.useEffect(() => {
      const getDetailMovie = async () => {
         const dataMovie = await getDataMovie(ids[index]);
         const filter = {
            ...dataMovie.data,
            videos: dataMovie.data.videos.results,
            videoTrailer: dataMovie.data.videos.results.find((item) =>
               item.name === 'Official Trailer' ? item.name : '',
            ),
         };
         setDetailMovie(filter);
      };
      getDetailMovie();
   }, [index]);
   const img = popular?.results.map(
      (item) => `https://image.tmdb.org/t/p/original${item.backdrop_path}`,
   );
   const handlePlayVideo = () => {
      setShowVideo(!showVideo);
      setPlaying((e) => !e);
   };

   return (
      <Card
         sx={{
            background: 'white',
            width: '100%',
            height: '90vh',
            position: 'relative',
         }}
      >
         <Box
            sx={{
               display: 'flex',
               flexDirection: 'column',
               position: 'absolute',
               bottom: '2px',
               zIndex: 10,
            }}
         >
            <CardContent sx={{ flex: '1 0 auto' }}>
               <Typography
                  component='div'
                  variant='h4'
                  color={(theme) => theme.palette.secondary.contrastText}
                  sx={{ fontFamily: 'Dancing Script, cursive' }}
               >
                  {popular?.results[index].original_title}
               </Typography>
               <Typography
                  variant='subtitle1'
                  color={(theme) => theme.palette.secondary.contrastText}
                  component='div'
               >
                  {detailMovie?.overview}
               </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
               <Button
                  sx={{ background: 'white', color: 'black', mr: 3 }}
                  size='large'
                  onClick={handlePlayVideo}
                  startIcon={<PlayArrowIcon sx={{ color: 'black' }} />}
               >
                  Play
               </Button>
               <Button
                  sx={{ background: 'black', opacity: 1, color: 'white' }}
                  size='large'
                  startIcon={<InfoIcon sx={{ color: 'white' }} />}
               >
                  Detail
               </Button>
               <IconButton
                  onClick={() => {
                     setCheckVolume(!checkVolume);
                  }}
                  size='large'
                  sx={{ ml: 2, bgcolor: 'white' }}
               >
                  {!checkVolume ? <VolumeDownIcon /> : <VolumeOffIcon />}
               </IconButton>
            </Box>
         </Box>
         <CardMedia
            component='img'
            sx={{
               height: '100%',
               width: '100%',
               objectFit: 'fill',
               display: showVideo ? 'none' : 'flex',
            }}
            image={`${img[index]}`}
            alt='Live from space album cover'
         />
         <Box
            sx={{
               height: '100%',
               width: '100%',
               objectFit: 'fill',
               position: 'absolute',
               zIndex: 1,
            }}
         >
            {/* <ReactPlayer
               url={`https://www.youtube.com/watch?v=${detailMovie?.videoTrailer?.key}`}
               width='100%'
               height='100%'
               playing={playing}
               controls={false}
               ref={videoRef}
               muted={checkVolume}
            /> */}
            <Video
               keyMovie={detailMovie?.videoTrailer?.key}
               playing={playing}
               checkVolume={checkVolume}
               handlePlayVideo={handlePlayVideo}
               setPlaying={setPlaying}
            />
         </Box>
         <Stack
            spacing={2}
            sx={{
               position: 'absolute',
               zIndex: '10',
               right: '0px',
               bottom: '0px',
            }}
         >
            <Pagination
               count={10}
               color='primary'
               onChange={(event, value) => {
                  setIndex(value - 1);
                  console.log(value);
                  if (playing) {
                     setPlaying(!playing);
                     setShowVideo(!showVideo);
                  }
               }}
               sx={{
                  '.MuiPaginationItem-textPrimary': {
                     color: 'white',
                  },
               }}
            />
         </Stack>
      </Card>
   );
}
