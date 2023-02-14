import { BASE_URL } from './config';
import axios from 'axios';
// console.log(BASE_URL);
// certification/movie/list?api_key=<<api_key>>
const apiKey = '2fed9efcc05ad422cc465ed0144f1b31';
const AUTH_ = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZmVkOWVmY2MwNWFkNDIyY2M0NjVlZDAxNDRmMWIzMSIsInN1YiI6IjYzZGJmNzNlMjVhNTM2MDA4ZmJhNGU3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gzGQu91Cxdr7GJuEGX0lKWL5rKav_f1sftyGKTM4e-4`;
const contentType = 'application/json;charset=utf-8';
export const getDataMovie = async (id, page = '', language = 'en-US') => {
   const getConvertToString = convertToString(id, page, language);
   try {
      const response = await axios.request({
         method: 'GET',
         url: getConvertToString,
         headers: {
            Authorization: AUTH_,
            'Content-Type': contentType,
         },
      });
      return response;
   } catch (error) {
      console.log(error.message);
   }
};

export const search = async (
   option,
   q,
   page = 1,
   language = 'en-US',
   includeAdult,
) => {
   const getConvertToString = convertToString(
      '',
      page,
      language,
      option,
      includeAdult,
      q,
   );
   try {
      const response = await axios.request({
         method: 'GET',
         url: getConvertToString,
         headers: {
            Authorization: AUTH_,
            'Content-Type': contentType,
         },
      });
      return response.data;
   } catch (error) {
      console.log(error.message);
   }
};

export const getGenres = async (language = 'en-US') => {
   try {
      // console.log(BASE_URL);
      const response = await axios.request({
         method: 'GET',
         url: `${BASE_URL}/genre/movie/list?api_key=${apiKey}&language=${language}`,
         headers: {
            Authorization: AUTH_,
            'Content-Type': contentType,
         },
      });
      return response.data.genres;
   } catch (error) {
      console.log(error.message);
   }
};
export const getOptionData = async (
   option1 = '', // what is option1?
   option2 = '', // what is option2?
   option3 = '', // what is option3?
   page,
   option4 = '', // what is option4?
   language = 'en-US',
) => {
   const ConvertPage = page ? `&page=${page}` : '';
   try {
      // console.log(BASE_URL);
      const response = await axios.request({
         method: 'GET',
         url: `${BASE_URL}${option1}${option2}${option3}?api_key=${apiKey}&language=${language}${ConvertPage}${option4}`,
         headers: {
            Authorization: AUTH_,
            'Content-Type': contentType,
         },
      });
      return response.data;
   } catch (error) {
      console.log(error.message);
   }
};

const convertToString = (
   id = '',
   page = '',
   language = 'en-US',
   option,
   includeAdult,
   q,
) => {
   const getPage = page ? `&page=${page}` : '';
   if (option) {
      return `${BASE_URL}/search${option}?api_key=${apiKey}&language=${language}&page=${page}&include_adult=${includeAdult}&query=${q}`;
   } else {
      return `${BASE_URL}/movie/${id}?api_key=${apiKey}&language=${language}${getPage}&append_to_response=videos,images`;
   }
};
