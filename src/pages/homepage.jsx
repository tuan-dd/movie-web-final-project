import React from 'react';
import { Outlet, useLoaderData, redirect } from 'react-router-dom';
import MovieListRow from '../components/movieListRow';
import VideoCardOfHeader from '../components/videoControl/videoCardOfHeader';
import useVideos from '../hooks/useVideos';
import useAuth from '../hooks/useAuth';
import UserListRow from '../components/userListRow';
function HomePage() {
   const { dataGenres, dataPopular, allMoviesOfGenres } = useVideos();
   const ids = dataPopular?.results.map((item) => item.id);

   const { userFolder, currentUser } = useAuth();
   return (
      <>
         <VideoCardOfHeader popular={dataPopular} ids={ids} />
         {userFolder.length > 0 && currentUser?.emailVerified && (
            <UserListRow allMoviesOfUser={userFolder} index={'user'} />
         )}
         {allMoviesOfGenres?.map((allMoviesOfGenre, index) => (
            <MovieListRow
               key={index}
               dataGenres={dataGenres}
               allMoviesOfGenre={allMoviesOfGenre}
               index={index}
            />
         ))}
         <Outlet />
      </>
   );
}

export default HomePage;
