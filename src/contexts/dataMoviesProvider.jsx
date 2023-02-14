import React, {
   Children,
   createContext,
   useMemo,
   useState,
   useEffect,
} from 'react';
import { getDataMovie, getGenres, getOptionData } from '../app/apiService';
import useAuth from '../hooks/useAuth';
import { db } from '../app/user';
import { doc, getDoc } from 'firebase/firestore';

export const VideoContext = createContext();

function dataMoviesProvider({ children }) {
   const [data, setData] = useState({});
   const [isLoading, setIsLoading] = useState(true); //
   const { currentUser } = useAuth();
   // const user = doc(db, 'user', `${currentUser?.email}`);
   async function getData() {
      try {
         const getData = await Promise.all([
            getOptionData('/movie', '/popular'),
            getGenres(),
         ]).then((value) => value);
         const allMoviesOfGenres = await Promise.all(
            getData[1].map(async (genre) => {
               let id = genre.id;
               return await getOptionData(
                  '/discover',
                  '/movie',
                  '',
                  1,
                  `&sort_by=popularity.desc&with_genres=${id}`,
               );
            }),
         );

         // const data = await getDoc(user);
         // const dataObject = data.data();
         // console.log(dataObject.savedShows);
         setData({
            popular: getData[0],
            dataGenres: getData[1],
            allMoviesOfGenres: allMoviesOfGenres,
         });
      } finally {
         setIsLoading(false);
      }

      // console.log(allMoviesOfGenres);
   }

   // useMemo là không đúng => chuyển thành useEffect
   useEffect(() => {
      // console.log('run')
      getData();
   }, []);

   return (
      <VideoContext.Provider value={{ data, isLoading }}>
         {children}
      </VideoContext.Provider>
   );
}

export default dataMoviesProvider;
