import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Button, Stack, Box } from '@mui/material';
import useAuth from '../hooks/useAuth';
import StyleName from '../components/styleName';
import Logo from '../components/logo';

function BlankLayout() {
   const { navigateHome } = useAuth();
   return (
      <Container
         maxWidth='100%'
         sx={{
            height: '100%',
            backgroundImage: 'url(netflixteaser.png)',
            padding: 2,
         }}
      >
         <Stack flexDirection='row' alignItems='center' spacing={3}>
            <Logo sx={{ height: 100, width: 100 }} />
            <Button onClick={navigateHome} variant='text'>
               <StyleName />
            </Button>
         </Stack>
         <Outlet />
      </Container>
   );
}

export default BlankLayout;
