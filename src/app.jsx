import './css/app.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout, { loader as mainLayoutLoader } from './layout/mainLayout';
import Login from './pages/login';
import { AuthProvider } from './contexts/authProvider';
import AuthRequire from './routes/authRequire';
import BlankLayout from './layout/blankLayout';
import SignUp from './pages/signUp';
import theme from './contexts/theme';
import GenrePage, { loader as genreLoader } from './pages/genrePage';
import TvShows from './pages/tvShows';
import HomePage from './pages/homepage';
import CssBaseline from '@mui/material/CssBaseline';
import IsLoading from './routes/isLoading';
import DetailModal, {
   loader as detailLoader,
} from './components/modal/detailModal';
import Search, { loader as searchLoader } from './pages/search';
import { deepmerge } from '@mui/utils';
import {
   Experimental_CssVarsProvider as CssVarsProvider,
   experimental_extendTheme as extendMuiTheme,
   shouldSkipGeneratingVar as muiShouldSkipGeneratingVar,
} from '@mui/material/styles';
import {
   extendTheme as extendJoyTheme,
   shouldSkipGeneratingVar as joyShouldSkipGeneratingVar,
} from '@mui/joy/styles';
import Profile from './pages/profile';

const muiTheme = extendMuiTheme(theme);
const joyTheme = extendJoyTheme({
   // This is required to point to `var(--mui-*)` because we are using
   // `CssVarsProvider` from Material UI.
   cssVarPrefix: 'mui',
   colorSchemes: {
      light: {
         palette: {
            primary: {
               // ...blue,
               solidColor: 'var(--mui-palette-primary-contrastText)',
               solidBg: 'var(--mui-palette-primary-main)',
               solidHoverBg: 'var(--mui-palette-primary-dark)',
               plainColor: 'var(--mui-palette-primary-main)',
               plainHoverBg:
                  'rgba(var(--mui-palette-primary-mainChannel) / var(--mui-palette-action-hoverOpacity))',
               plainActiveBg:
                  'rgba(var(--mui-palette-primary-mainChannel) / 0.3)',
               outlinedBorder:
                  'rgba(var(--mui-palette-primary-mainChannel) / 0.5)',
               outlinedColor: 'var(--mui-palette-primary-main)',
               outlinedHoverBg:
                  'rgba(var(--mui-palette-primary-mainChannel) / var(--mui-palette-action-hoverOpacity))',
               outlinedHoverBorder: 'var(--mui-palette-primary-main)',
               outlinedActiveBg:
                  'rgba(var(--mui-palette-primary-mainChannel) / 0.3)',
            },
            neutral: {
               // ...grey,
            },
            // Do the same for the `danger`, `info`, `success`, and `warning` palettes,
            divider: 'var(--mui-palette-divider)',
            text: {
               tertiary: 'rgba(0 0 0 / 0.56)',
            },
         },
      },
      // Do the same for dark mode
      // dark: { ... }
   },
   fontFamily: {
      display: '"Roboto","Helvetica","Arial",sans-serif',
      body: '"Roboto","Helvetica","Arial",sans-serif',
   },
   shadow: {
      xs: `var(--mui-shadowRing), ${muiTheme.shadows[1]}`,
      sm: `var(--mui-shadowRing), ${muiTheme.shadows[2]}`,
      md: `var(--mui-shadowRing), ${muiTheme.shadows[4]}`,
      lg: `var(--mui-shadowRing), ${muiTheme.shadows[8]}`,
      xl: `var(--mui-shadowRing), ${muiTheme.shadows[12]}`,
   },
});

// Note: you can't put `joyTheme` inside Material UI's `extendMuiTheme(joyTheme)`
// because some of the values in the Joy UI theme refers to CSS variables and
// not raw colors.
const allTheme = deepmerge(joyTheme, muiTheme);
const router = createBrowserRouter([
   {
      path: '/',
      element: (
         <AuthRequire>
            <MainLayout />
         </AuthRequire>
      ),
      loader: mainLayoutLoader,
      children: [
         {
            path: '/',
            element: (
               <IsLoading>
                  <HomePage />
               </IsLoading>
            ),
            // loader: homePageLoader,
            children: [
               {
                  path: 'detail/:detailId',
                  element: <DetailModal />,
                  loader: detailLoader,
               },
            ],
         },
         {
            path: '/genre/:genreId',
            element: <GenrePage />,
            loader: genreLoader,
            children: [
               {
                  path: 'detail/:detailId',
                  element: <DetailModal />,
                  loader: detailLoader,
               },
            ],
         },
         {
            path: '/tv-shows',
            element: <TvShows />,
            children: [
               {
                  path: 'detail/:detailId',
                  element: <DetailModal />,
               },
            ],
         },
         {
            path: '/search',
            element: <Search />,
            loader: searchLoader,
            // children: [
            //    {
            //       path: '&:detailId',
            //       element: <DetailModal />,
            //       loader: detailLoader,
            //    },
            // ],
         },
         // {
         //    path: '/profile',
         //    element: <Profile />,
         // },
      ],
   },
   {
      path: '/profile',
      element: <Profile />,
      children: [
         {
            path: 'detail/:detailId',
            element: <DetailModal />,
            loader: detailLoader,
         },
      ],
   },
   {
      element: <BlankLayout />,
      children: [
         {
            path: '/login',
            element: <Login />,
         },
         {
            path: '/signup',
            element: <SignUp />,
         },
      ],
   },
]);
function App() {
   return (
      <>
         <AuthProvider>
            <CssVarsProvider theme={allTheme}>
               <CssBaseline />
               <RouterProvider router={router} />
            </CssVarsProvider>
         </AuthProvider>
      </>
   );
}

export default App;
