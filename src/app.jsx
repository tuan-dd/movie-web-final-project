import './css/app.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './pages/login';
import { AuthProvider } from './contexts/authProvider';
import AuthRequire from './routes/authRequire';
import BlankLayout from './layout/blankLayout';
import SignUp from './pages/signUp';
import { allTheme } from './contexts/theme';
import TvShows from './pages/tvShows';
import HomePage from './pages/homepage';
import IsLoading from './routes/isLoading';
import GenrePage, { loader as genreLoader } from './pages/genrePage';
import Search, { loader as searchLoader } from './pages/search';
import MainLayout, { loader as mainLayoutLoader } from './layout/mainLayout';
import Profile from './pages/profile';
import DataMoviesProvider from './contexts/dataMoviesProvider';
import NavigationListener from './utils/navigationListener';

const router = createBrowserRouter([
   {
      path: '/',
      element: (
         <AuthRequire>
            <NavigationListener />
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
         },
         {
            path: '/genre/:genreId',
            element: <GenrePage />,
            loader: genreLoader,
         },
         {
            path: '/tv-shows',
            element: <TvShows />,
         },
         {
            path: '/search',
            element: <Search />,
            loader: searchLoader,
         },
      ],
   },
   {
      path: '/profile',
      element: <Profile />,
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
            <DataMoviesProvider>
               <CssVarsProvider theme={allTheme}>
                  <CssBaseline />
                  <RouterProvider router={router} />
               </CssVarsProvider>
            </DataMoviesProvider>
         </AuthProvider>
      </>
   );
}

export default App;
