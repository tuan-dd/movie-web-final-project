import React, { useContext } from 'react';
import { VideoContext } from '../contexts/dataMoviesProvider';

function useVideos() {
   const { data, isLoading } = useContext(VideoContext);
   const popular = data.popular;
   const dataGenres = data.dataGenres;
   const allMoviesOfGenres = data.allMoviesOfGenres;
   return {
      dataGenres: dataGenres,
      dataPopular: popular,
      allMoviesOfGenres: allMoviesOfGenres,
   };
}

export default useVideos;
