import axios from 'axios';
import { AUTH_ID_URL } from './config';
const apiKey = '2fed9efcc05ad422cc465ed0144f1b31';
const AUTH_ = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZmVkOWVmY2MwNWFkNDIyY2M0NjVlZDAxNDRmMWIzMSIsInN1YiI6IjYzZGJmNzNlMjVhNTM2MDA4ZmJhNGU3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gzGQu91Cxdr7GJuEGX0lKWL5rKav_f1sftyGKTM4e-4`;
const contentType = 'application/json;charset=utf-8';

export const getRequestAuth = async () => {
   try {
      const request = await axios.request({
         url: AUTH_ID_URL,
         method: 'POST',
         headers: {
            Authorization: AUTH_,
            'Content-Type': contentType,
         },
         data: {
            redirect_to: 'http://localhost:51746',
         },
      });
      return request;
   } catch (error) {
      console.log(error.message);
   }
};
