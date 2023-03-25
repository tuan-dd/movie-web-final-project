import { createContext, useReducer, useEffect, useMemo } from 'react';
import {
   sendPasswordResetEmail,
   createUserWithEmailAndPassword,
   signOut,
   signInWithEmailAndPassword,
   updatePassword,
   updateEmail,
   sendEmailVerification,
   onAuthStateChanged,
} from 'firebase/auth';
import { arrayUnion, doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../app/user';

const initialState = {
   checkLogin: false,
   currentUser: null,
   authorize: false,
   errorMessage: '',
   initialized: false,
   userFolder: [],
};
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGOUT = 'LOGOUT';
const ERROR = 'ERROR';
const NAVIGATE_HOME = 'NAVIGATE_HOME';
const INITIALIZE = 'INITIALIZE';
const UPDATE_FOLDER_USER = 'UPDATE_FOLDER_USER';
const reducer = (state, action) => {
   switch (action.type) {
      case LOGIN_SUCCESS:
         return {
            ...action.payload,
         };
      case LOGOUT:
         return {
            ...action.payload,
         };
      case NAVIGATE_HOME:
         return {
            ...state,
            authorize: true,
         };
      case ERROR:
         return {
            ...state,
            errorMessage: action.error,
         };
      case INITIALIZE:
         return {
            ...action.payload,
         };
      case UPDATE_FOLDER_USER:
         return {
            ...action.payload,
         };
      default:
         return state;
   }
};
const AuthContext = createContext({ ...initialState });

function AuthProvider({ children }) {
   const [state, dispatch] = useReducer(reducer, initialState);

   useMemo(() => {
      onAuthStateChanged(auth, async (user) => {
         if (user) {
            const dataUser = doc(db, 'user', user.email);
            const data = await getDoc(dataUser);
            const dataObject = data.data();
            dispatch({
               type: LOGIN_SUCCESS,
               payload: {
                  ...initialState,
                  checkLogin: true,
                  authorize: true,
                  currentUser: user,
                  initialized: true,
                  userFolder: dataObject.savedShows,
               },
            });
         } else {
            dispatch({
               type: INITIALIZE,
               payload: {
                  ...initialState,
                  initialized: true,
               },
            });
         }
      });
   }, []);

   const login = async (userEmail, pass, callback) => {
      try {
         await signInWithEmailAndPassword(auth, userEmail, pass);
         const user = doc(db, 'user', userEmail);
         const data = await getDoc(user);
         const dataObject = data.data();
         dispatch({
            type: LOGIN_SUCCESS,
            payload: {
               ...state,
               checkLogin: true,
               authorize: true,
               currentUser: auth.currentUser,
               errorMessage: '',
               userFolder: dataObject.savedShows,
            },
         });
         callback();
      } catch (error) {
         dispatch({
            type: ERROR,
            error: error.message,
         });
         console.log(error);
      }
   };
   const navigateHome = () => {
      dispatch({
         type: NAVIGATE_HOME,
      });
   };
   const logout = () => {
      signOut(auth);
      dispatch({
         type: LOGOUT,
         payload: {
            ...initialState,
            initialized: true,
         },
      });
   };

   const createUser = async (newUserEmail, NewPass) => {
      try {
         await createUserWithEmailAndPassword(auth, newUserEmail, NewPass);
         await setDoc(doc(db, '/user', newUserEmail), {
            savedShows: [],
         });
         // await signOut(auth);
         return true;
      } catch (error) {
         dispatch({
            type: ERROR,
            error: error.message,
         });
         console.log(error.code);
         return false;
      }
   };

   const changePass = async (newPass) => {
      try {
         await updatePassword(auth.currentUser, newPass);
         return true;
      } catch (error) {
         dispatch({
            type: ERROR,
            error: error.message,
         });
         console.log(error);
         return false;
      }
   };

   const changeEmail = async (newEmail) => {
      try {
         await updateEmail(auth.currentUser, newEmail);
         return true;
      } catch (error) {
         dispatch({
            type: ERROR,
            error: error.message,
         });
         console.log(error);
         return false;
      }
   };
   const resetPass = async (email) => {
      const successAndCallback = {
         url: 'http://localhost:5173/login',
      };
      try {
         await sendPasswordResetEmail(auth, email, successAndCallback);
         return true;
      } catch (error) {
         dispatch({
            type: ERROR,
            error: error.message,
         });
         console.log(error);
         return false;
      }
   };

   const verified = async (callback) => {
      try {
         await sendEmailVerification(auth.currentUser);
         callback();
      } catch (error) {
         dispatch({
            type: ERROR,
            error: error.message,
         });
         console.log(error.code);
      }
   };

   const handleUpdateFolderUser = async (card) => {
      const dataUser = doc(db, 'user', `${state.currentUser.email}`);
      await updateDoc(dataUser, {
         savedShows: arrayUnion({
            id: card.id,
            title: card.title,
            poster_path: card?.poster_path,
            backdrop_path: card?.backdrop_path,
            popularity: card.popularity,
            vote_count: card.vote_count,
         }),
      });
      const addCard = [...state.userFolder, card];
      console.log(addCard);
      dispatch({
         type: UPDATE_FOLDER_USER,
         payload: {
            ...state,
            userFolder: addCard,
         },
      });
   };
   const handleDeleteCardUser = async (card) => {
      try {
         const dataUser = doc(db, 'user', `${state.currentUser.email}`);
         const filter = state.userFolder.filter((item) => item.id !== card.id);
         await updateDoc(dataUser, {
            savedShows: filter,
         });
         dispatch({
            type: UPDATE_FOLDER_USER,
            payload: {
               ...state,
               userFolder: filter,
            },
         });
         console.log('handleDeleteCardUser');
      } catch (error) {
         dispatch({
            type: ERROR,
            error: error.message,
         });
         console.log(error.code);
      }
   };
   return (
      <AuthContext.Provider
         value={{
            ...state,
            createUser,
            login,
            logout,
            verified,
            resetPass,
            changeEmail,
            changePass,
            dispatch,
            handleUpdateFolderUser,
            handleDeleteCardUser,
            navigateHome,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
}

export { AuthContext, AuthProvider };
