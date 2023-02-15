import * as React from 'react';
import {
   useNavigate,
   Form,
   useLocation,
   useSubmit,
   Link,
} from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import AdbIcon from '@mui/icons-material/Adb';
import {
   ListItem,
   ListItemText,
   Container,
   Avatar,
   Tooltip,
   Button,
   MenuItem,
   Menu,
   InputBase,
   Typography,
   IconButton,
   Toolbar,
   Box,
   AppBar,
   styled,
   alpha,
} from '@mui/material';
import useAuth from '../hooks/useAuth';
import ScrollableTabsButtonAuto from '../components/scrollableTabsButtonAuto';

const Search = styled('div')(({ theme }) => ({
   position: 'relative',
   borderRadius: theme.shape.borderRadius,
   backgroundColor: alpha(theme.palette.common.white, 0.15),
   '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
   },
   marginLeft: 0,
   marginRight: 20,
   width: 'auto',
   [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
   },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
   padding: theme.spacing(0, 2),
   height: '100%',
   position: 'absolute',
   pointerEvents: 'none',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
   color: 'inherit',
   '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
         width: '50px',
         '&:focus': {
            width: '150px',
         },
      },
   },
}));
const pages = ['TV Shows'];
const settings = ['Profile', 'Logout'];

export default function MainHeader({ genres }) {
   const [anchorElNav, setAnchorElNav] = React.useState(null);
   const [anchorElUser, setAnchorElUser] = React.useState(null);
   const [selectedIndex, setSelectedIndex] = React.useState(3);
   const navigate = useNavigate();
   const { logout } = useAuth();
   let location = useLocation();
   const submit = useSubmit();
   const open = Boolean(anchorElNav);
   const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
   };
   const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
   };

   const handleCloseNavMenu = () => {
      setAnchorElNav(null);
   };
   const handleCloseUserMenu = () => {
      setAnchorElUser(null);
   };

   const handlePageItemClick = (event, index) => {
      setSelectedIndex(index);
      setAnchorElNav(null);
      navigate(index === 0 ? '/tv-shows' : '/tv-shows');
   };

   const handleUserItemClick = (event, setting) => {
      const actions = new Map([
         ['Profile', () => navigate('profile')],
         ['Favorite', () => navigate('/')],
         ['Playlist', () => navigate('/')],
         ['Logout', () => logout()],
      ]);
      let action = actions.get(setting) || '';
      action();
   };

   const handleNavigateGenre = (id) => {
      navigate(`/genre/${id}`);
   };

   React.useEffect(() => {
      document.getElementById('q').value = location.search.slice(3);
   }, [location]);
   React.useEffect(() => {
      if (location.pathname === '/tv-shows') {
         // let indexOfPage = pages.findIndex(
         //    (item) =>
         //       item.trim().toLocaleLowerCase() == location.pathname.slice(1),
         // );
         // console.log(indexOfPage);
         // if (indexOfPage > -1) {
         setSelectedIndex(0);
         // }
      } else {
         setSelectedIndex(false);
      }
   }, [location.pathname]);

   return (
      <AppBar position='fixed' sx={{ opacity: 0.7, backgroundColor: 'black' }}>
         <Container maxWidth='false'>
            <Toolbar disableGutters>
               {/* max width > 600px */}
               <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
               <Typography
                  variant='h5'
                  noWrap
                  component={Link}
                  to={'/'}
                  sx={{
                     mr: 2,
                     display: { xs: 'none', md: 'flex' },
                     fontFamily: 'monospace',
                     fontWeight: 700,
                     // letterSpacing: '.3rem',
                     color: 'inherit',
                     textDecoration: 'none',
                  }}
               >
                  Phim Hay
               </Typography>
               <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  {pages.map((page, index) => (
                     <MenuItem
                        sx={{
                           color: 'white',
                           '&.Mui-selected': {
                              background: (theme) => theme.palette.primary.dark,
                              opacity: 1,
                              filter: ' brightness(1.2)',
                              color: 'blue',
                              borderRadius: 2,
                           },
                        }}
                        key={page}
                        onClick={(event) => handlePageItemClick(event, index)}
                        selected={index === selectedIndex}
                     >
                        <Typography
                           textAlign='center'
                           color={(theme) => theme.palette.primary.contrastText}
                           sx={{ filter: ' brightness(1.5)' }}
                        >
                           {page}
                        </Typography>
                     </MenuItem>
                  ))}
               </Box>

               {/* max width < 600px */}
               <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
                  <ListItem
                     button
                     id='lock-button'
                     aria-haspopup='listbox'
                     aria-controls='lock-menu'
                     aria-expanded={open ? 'true' : undefined}
                     onClick={handleOpenNavMenu}
                     sx={{ width: '120px', color: 'white' }}
                  >
                     <ListItemText
                        component='Typography'
                        sx={{
                           '.css-6nwqjw-MuiTypography-root': {
                              color: 'white',
                           },
                        }}
                        primary={selectedIndex ? pages[selectedIndex] : 'Home'}
                     />
                  </ListItem>
                  <Menu
                     id='lock-menu'
                     anchorEl={anchorElNav}
                     open={open}
                     onClose={handleCloseNavMenu}
                     MenuListProps={{
                        'aria-labelledby': 'lock-button',
                        role: 'listbox',
                     }}
                  >
                     {pages.map((page, index) => (
                        <MenuItem
                           key={page}
                           onClick={(event) =>
                              handlePageItemClick(event, index)
                           }
                           selected={index === selectedIndex}
                        >
                           <Typography textAlign='center'>{page}</Typography>
                        </MenuItem>
                     ))}
                  </Menu>
               </Box>
               <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
               <Typography
                  variant='h5'
                  noWrap
                  component='a'
                  href=''
                  sx={{
                     mr: 2,
                     display: { xs: 'flex', md: 'none' },
                     flexGrow: 1,
                     fontFamily: 'monospace',
                     fontWeight: 700,
                     color: 'inherit',
                     textDecoration: 'none',
                  }}
               >
                  Phim Hay
               </Typography>

               {/* userMenu */}
               <Form role='search' method='get' action='/search'>
                  <Search>
                     <SearchIconWrapper>
                        <SearchIcon />
                     </SearchIconWrapper>
                     <StyledInputBase
                        id='q'
                        name='q'
                        placeholder='Search…'
                        inputProps={{ 'aria-label': 'search' }}
                        defaultValue={location.search.slice(3)}
                        onChange={(event) => {
                           const isFirstSearch =
                              location.search.slice(3) == null;
                           submit(event.currentTarget.form, {
                              replace: !isFirstSearch,
                           });
                        }}
                     />
                  </Search>
               </Form>
               <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title='Open settings'>
                     <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt='Remy Sharp' src='' />
                     </IconButton>
                  </Tooltip>
                  <Menu
                     sx={{ mt: '45px' }}
                     id='menu-appbar'
                     anchorEl={anchorElUser}
                     anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                     }}
                     keepMounted
                     transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                     }}
                     open={Boolean(anchorElUser)}
                     onClose={handleCloseUserMenu}
                  >
                     {settings.map((setting) => (
                        <MenuItem
                           key={setting}
                           onClick={(event) =>
                              handleUserItemClick(event, setting)
                           }
                        >
                           <Typography textAlign='center'>{setting}</Typography>
                        </MenuItem>
                     ))}
                  </Menu>
               </Box>
            </Toolbar>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
               <ScrollableTabsButtonAuto
                  data={genres}
                  handleNavigate={handleNavigateGenre}
               />
            </Box>
            <Box
               sx={{ display: { xs: 'flex', md: 'none' }, maxWidth: '500px' }}
            >
               <ScrollableTabsButtonAuto
                  data={genres}
                  handleNavigate={handleNavigateGenre}
               />
            </Box>
         </Container>
      </AppBar>
   );
}
