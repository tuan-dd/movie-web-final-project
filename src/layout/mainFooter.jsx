import React, { useContext } from 'react';
import { Link, Typography, Box } from '@mui/material';
import { useNavigation } from 'react-router-dom';
import { VideoContext } from '../contexts/dataMoviesProvider';

function MainFooter() {
   // const navigation = useNavigation();
   const { isLoading } = useContext(VideoContext);
   return (
      <>
         {!isLoading && (
            <Box bgcolor='pink' sx={{ position: 'absolute', width: '100%' }}>
               <Typography
                  variant='body2'
                  color={(theme) => theme.palette.primary.contrastText}
                  align='center'
                  p={1}
               >
                  {'Copyright © '}
                  <Link color='inherit' href='tuandd.310797@gmail.com'>
                     Make by Anh Tuấn
                  </Link>{' '}
                  {new Date().getFullYear()}
               </Typography>
            </Box>
         )}
      </>
   );
}

export default MainFooter;
