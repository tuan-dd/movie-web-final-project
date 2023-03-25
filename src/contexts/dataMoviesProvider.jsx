import React, { createContext, useState, useEffect } from 'react';
import { getGenres, getOptionData } from '../app/apiService';

export const VideoContext = createContext();

function DataMoviesProvider({ children }) {
   const [data, setData] = useState({});
   const [isLoading, setIsLoading] = useState(true);

   async function getData() {
      try {
         const allData = await Promise.allSettled([
            getOptionData('/movie', '/popular'),
            getGenres(),
         ]);
         const genres = allData[1].value;

         const allMoviesOfGenres = await Promise.allSettled(
            genres.map(async (genre) => {
               let { id } = genre;
               const result = await getOptionData(
                  '/discover',
                  '/movie',
                  '',
                  1,
                  `&sort_by=popularity.desc&with_genres=${id}`,
               );
               return result;
            }),
         );
         setData({
            popular: allData[0].value,
            dataGenres: allData[1].value,
            allMoviesOfGenres,
         });
      } finally {
         setIsLoading(false);
      }

      // console.log(allMoviesOfGenres);
   }

   useEffect(() => {
      getData();
   }, []);

   return (
      <VideoContext.Provider value={{ data, isLoading }}>
         {children}
      </VideoContext.Provider>
   );
}

export default DataMoviesProvider;
