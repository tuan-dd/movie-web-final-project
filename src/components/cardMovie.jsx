import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Favorite from '@mui/icons-material/Favorite';
import Visibility from '@mui/icons-material/Visibility';
import CreateNewFolder from '@mui/icons-material/CreateNewFolder';
import Info from '@mui/icons-material/Info';
import {
   Link as LinkRouter,
   useLocation,
   useSearchParams,
} from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Notification from './modal/alert';

export default function CardMovie({
   card,
   handleShowOn = '',
   handleShowOff = '',
   idButton,
}) {
   const [addUserFolder, setAddUserFolder] = React.useState(false);
   const [isAlertShow, setIsAlertShow] = React.useState({
      value: false,
      isLogin: false,
   });

   const location = useLocation();
   let img = card.poster_path ? card.poster_path : card.backdrop_path;
   const {
      currentUser,
      userFolder,
      handleDeleteCardUser,
      handleUpdateFolderUser,
      checkLogin,
   } = useAuth();
   const handleUpdate = async () => {
      if (!checkLogin && !currentUser?.emailVerified) {
         //  alert('you must login to save your movie');
         setIsAlertShow({
            value: true,
            isLogin: true,
         });
      } else if (!currentUser?.emailVerified) {
         setIsAlertShow({
            value: true,
            isLogin: false,
         });
      }
      if (currentUser?.emailVerified) {
         setAddUserFolder((e) => !e);
         if (addUserFolder) {
            await handleDeleteCardUser(card);
         } else if (!addUserFolder) {
            await handleUpdateFolderUser(card);
         }
      }
   };

   React.useEffect(() => {
      const cardsId = userFolder.map((item) => item.id);
      const result = cardsId.includes(card.id);
      setAddUserFolder(result);
   }, [userFolder, card.id]);

   const [searchParams, setSearchParams] = useSearchParams();

   const q = searchParams.get('q');
   let searchParamsQuery;

   if (q) {
      searchParams.set('movieId', card.id);
      searchParamsQuery = [...searchParams.entries()]
         .map((i) => i.join('='))
         .join('&');
   } else {
      searchParamsQuery = `movieId=${card.id}`;
   }

   return (
      <Card
         sx={{
            bgcolor: 'initial',
            boxShadow: 'none',
            '--Card-padding': '0px',
            position: 'relative',
         }}
         onMouseOver={() => handleShowOn && handleShowOn(idButton)}
         onMouseOut={() => handleShowOff && handleShowOff(idButton)}
      >
         <Box
            sx={{
               position: 'relative',
               width: '200px',
               height: 'fit-content',
               transition: 'all 0.5s ease-out',
               ':hover': {
                  zIndex: 10,
                  position: 'absolute',
                  WebkitTransform: 'scale(1.2)',
               },
            }}
         >
            <AspectRatio ratio='2.5/3' objectFit='fill'>
               <figure>
                  <img
                     src={`https://image.tmdb.org/t/p/original/${img}`}
                     loading='lazy'
                     alt={card.title}
                  />
               </figure>
            </AspectRatio>
            <CardCover
               className='gradient-cover'
               sx={{
                  '&:hover, &:focus-within': {
                     opacity: 1,
                  },
                  height: '100%',
                  opacity: 0,
                  transition: '0.1s ease-in',
                  background:
                     'linear-gradient(180deg, transparent 62%, rgba(0,0,0,0.00345888) 63.94%, rgba(0,0,0,0.014204) 65.89%, rgba(0,0,0,0.0326639) 67.83%, rgba(0,0,0,0.0589645) 69.78%, rgba(0,0,0,0.0927099) 71.72%, rgba(0,0,0,0.132754) 73.67%, rgba(0,0,0,0.177076) 75.61%, rgba(0,0,0,0.222924) 77.56%, rgba(0,0,0,0.267246) 79.5%, rgba(0,0,0,0.30729) 81.44%, rgba(0,0,0,0.341035) 83.39%, rgba(0,0,0,0.367336) 85.33%, rgba(0,0,0,0.385796) 87.28%, rgba(0,0,0,0.396541) 89.22%, rgba(0,0,0,0.4) 91.17%)',
               }}
            >
               {/* The first box acts as a container that inherits style from the CardCover */}
               <Box>
                  <Box
                     sx={{
                        p: 2,
                        pb: 0.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        gap: 1.5,
                        flexGrow: 1,
                        alignSelf: 'flex-end',
                     }}
                  >
                     <IconButton
                        size='sm'
                        color={addUserFolder ? 'success' : 'neutral'}
                        onClick={handleUpdate}
                     >
                        <CreateNewFolder />
                     </IconButton>
                     <LinkRouter
                        to={`?${searchParamsQuery}`}
                        state={{ callBack: location }}
                     >
                        <IconButton
                           size='sm'
                           color='neutral'
                           defaultValue={`${card.id}`}
                        >
                           <Info />
                        </IconButton>
                     </LinkRouter>
                  </Box>
               </Box>
            </CardCover>
         </Box>
         <Box
            sx={{
               display: 'flex',
               gap: 1,
               mt: 1.5,
               alignItems: 'center',
               width: '200px',
            }}
         >
            <Typography
               level='body3'
               underline='none'
               startDecorator={<Favorite />}
               sx={{
                  fontWeight: 'md',
                  ml: 'auto',
                  color: 'white',
                  '&:hover': { color: 'danger.plainColor' },
               }}
            >
               {card.vote_count}
            </Typography>
            <Typography
               level='body3'
               underline='none'
               startDecorator={<Visibility />}
               sx={{
                  fontWeight: 'md',
                  color: 'white',
                  '&:hover': { color: 'primary.plainColor' },
               }}
            >
               {Math.floor(card.popularity)}00
            </Typography>
         </Box>
         <Notification
            isAlertShow={isAlertShow}
            setIsAlertShow={setIsAlertShow}
         />
      </Card>
   );
}
