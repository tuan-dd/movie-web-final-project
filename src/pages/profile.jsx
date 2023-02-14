import { Box, Button, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import CardMovie from '../components/cardMovie';
import LinearLoading from '../components/linearLoading';
import UserListRow from '../components/userListRow';
import useAuth from '../hooks/useAuth';

const style = {
   display: 'inline-flex',
   color: '#A7DD3C',
   m: 2,
   cursor: 'pointer',
   textShadow:
      '2px 0 0px #800040, 3px 2px 0px rgba(77,0,38,0.5), 3px 0 3px #FF002B, 5px 0 3px #800015, 6px 2px 3px rgba(77,0,13,0.5), 6px 0 9px #FF5500, 8px 0 9px #802A00, 9px 2px 9px rgba(77,25,0,0.5), 9px 0 18px #FFD500, 11px 0 18px #806A00, 12px 2px 18px rgba(77,66,0,0.5), 12px 0 30px #D4FF00, 14px 0 30px #6A8000, 15px 2px 30px rgba(64,77,0,0.5), 15px 0 45px #80FF00, 17px 0 45px #408000, 17px 2px 45px rgba(38,77,0,0.5)',
};
function Profile() {
   const { userFolder, logout, checkLogin, currentUser } = useAuth();
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
            <Typography variant='h3' sx={style} onClick={()=> navigate('/')}>
               Phim Hay
            </Typography>
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
               mt={5}
               pl={3}
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

const TypographyText = ({ checkLogin, handleCallback }) => {
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
};
