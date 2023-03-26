import React from 'react';
import { Box, Button, Container, Grid, Typography, Stack } from '@mui/material';
import { useNavigate, Outlet } from 'react-router-dom';
import CardMovie from '../components/cardMovie';
import Logo from '../components/logo';
import StyleName from '../components/styleName';
import useAuth from '../hooks/useAuth';

function Profile() {
   const { userFolder, logout, checkLogin, currentUser, verified } = useAuth();
   const navigate = useNavigate();
   const handChange = () => {
      if (checkLogin) {
         logout();
         navigate('/');
      } else {
         navigate('/login');
      }
   };
   const handleCallback = async () => {
      await verified(() => {
         navigate('/');
      });
   };
   return (
      <Container maxWidth='false' disableGutters>
         <Box
            sx={{
               width: '100%',
               height: '50vh',
               backgroundImage: 'url(netflixteaser.png)',
            }}
         >
            <Stack flexDirection='row' alignItems='center' spacing={3} pl={2}>
               <Logo sx={{ height: 100, width: 100 }} />
               <Button variant='text'>
                  <StyleName />
               </Button>
            </Stack>
            <Button
               sx={{
                  position: 'absolute',
                  right: 10,
                  top: 10,
                  cursor: 'pointer',
               }}
               variant='contained'
               onClick={handChange}
            >
               {checkLogin ? 'logout' : 'login'}
            </Button>
         </Box>
         {checkLogin && currentUser?.emailVerified ? (
            <Grid
               container
               spacing={2}
               mt={2}
               p={3}
               sx={{
                  display: 'flex',
               }}
            >
               {userFolder.map((item, index) => (
                  <Grid item lg={2} md={3} sm={4} xs={12} key={index}>
                     <CardMovie card={item} />
                  </Grid>
               ))}
               <Outlet />
            </Grid>
         ) : (
            <TypographyText
               checkLogin={checkLogin}
               handleCallback={handleCallback}
            />
         )}
      </Container>
   );
}

export default Profile;

function TypographyText({ checkLogin, handleCallback }) {
   return (
      <Box>
         {checkLogin ? (
            <Typography
               variant='h5'
               textAlign='center'
               color='ButtonFace'
               mt={10}
            >
               You have want create folder. Click on the
               <Button onClick={handleCallback} variant='contained'>
                  Link
               </Button>
               in your email to verify your account
            </Typography>
         ) : (
            <Typography
               variant='h5'
               textAlign='center'
               color='ButtonFace'
               mt={10}
            >
               Login to see more
            </Typography>
         )}
      </Box>
   );
}
