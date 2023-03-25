import React, { useContext } from 'react';
import { VideoContext } from '../contexts/dataMoviesProvider';

function useVideos() {
   const { data, isLoading } = useContext(VideoContext);

   const { popular } = data;
   const { dataGenres } = data;
   const { allMoviesOfGenres } = data;
   return {
      dataGenres,
      dataPopular: popular,
      allMoviesOfGenres,
   };
}

export default useVideos;
