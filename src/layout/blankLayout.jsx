import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Button } from '@mui/material';
import useAuth from '../hooks/useAuth';
import StyleName from '../components/styleName';

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
         <Button onClick={navigateHome} variant='text'>
            <StyleName />
         </Button>
         <Outlet />
      </Container>
   );
}

export default BlankLayout;
