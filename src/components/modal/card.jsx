import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const bull = (
   <Box
      component='span'
      sx={{ display: 'inline-block', mx: '5px', transform: 'scale(0.8)' }}
   >
      •
   </Box>
);
export default function BasicCard({ dataDetailMovie }) {
   //  console.log(dataDetailMovie);
   let img = dataDetailMovie.poster_path
      ? dataDetailMovie.poster_path
      : dataDetailMovie.backdrop_path;
   return (
      <Box
         sx={{
            // backgroundColor: 'black',
            color: 'white',
            width: '100%',
            height: 500,
            pd: 2,
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${img})`,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
         }}
      >
         <CardContent>
            <Typography variant='h6' color='secondary.contrastText'>
               {dataDetailMovie.production_countries[0]?.name}
            </Typography>
            <Typography
               sx={{ fontSize: 14 }}
               color='secondary.contrastText'
               gutterBottom
            >
               Views :{Math.floor(dataDetailMovie.popularity)}00
               {new Date(dataDetailMovie.release_date).getFullYear()}
               {bull}Vietsub{bull}IMBD:{dataDetailMovie.vote_average.toFixed(1)}
            </Typography>
            <Typography component='p' color='secondary.contrastText'>
               {dataDetailMovie.genres
                  .map((item) => item.name)
                  .join(',')
                  .replace(/,/g, ' • ')}
               <br />
            </Typography>

            <Typography component='p' color='secondary.contrastText'>
               {dataDetailMovie.overview}
            </Typography>
         </CardContent>
      </Box>
   );
}
