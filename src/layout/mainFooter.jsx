import React from 'react';
import { Link, Typography, Box } from '@mui/material';
import { useNavigation } from 'react-router-dom';

function MainFooter() {
   const navigation = useNavigation();
   return (
      <>
         {navigation.state === 'idle' && (
            <Box bgcolor='pink'>
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
                  {'.'}
               </Typography>
            </Box>
         )}
      </>
   );
}

export default MainFooter;
