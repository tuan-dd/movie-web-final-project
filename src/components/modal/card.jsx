import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
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
   return (
      <Card>
         <CardContent>
            <Typography
               sx={{ fontSize: 14 }}
               color='text.secondary'
               gutterBottom
            >
               Views :{Math.floor(dataDetailMovie.popularity)}00
            </Typography>
            <Typography variant='h6' component='div'>
               {dataDetailMovie.production_countries[0].name}
               {bull}
               {dataDetailMovie.release_date}
               {bull}Vietsub
            </Typography>
            <Box display='flex' height='100%'>
               <Typography
                  component={'p'}
                  color='text.secondary'
                  width='70%'
                  p={1}
               >
                  {dataDetailMovie.overview}
               </Typography>
               <Typography
                  component={'p'}
                  width='30%'
                  p={1}
                  color='text.secondary'
               >
                  Genres:
                  {dataDetailMovie.genres
                     .map((item) => item.name)
                     .toString()}{' '}
                  <br />
                  IMBD:{dataDetailMovie.vote_average.toFixed(1)}
               </Typography>
            </Box>
         </CardContent>
      </Card>
   );
}
