import React, { useEffect, useRef, useState } from 'react';
import { FCheckBox, FormProvider, FTextField } from '../components/form';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Alert, InputAdornment, Stack, Typography, Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { LoadingButton } from '@mui/lab';
import useAuth from '../hooks/useAuth';
import LinkRoute from '../components/link';
import ResetPassword from './resetPassword';

const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
const LoginSchema = Yup.object().shape({
   email: Yup.string().email('Must enter Email').required(),
   password: Yup.string()
      .required()
      .matches(
         passwordRegExp,
         'Password contain at least one numeric digit, one uppercase and one lowercase letter',
      ),
});

// const defaultValues = {
//    email: '',
//    password: '',
//    remember: false,
// };

const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: 400,
   height: 400,
   backgroundColor: 'black',
   border: '2px solid #000',
   boxShadow: 24,
   p: 2,
   color: 'white',
   opacity: 0.8,
};

function Login() {
   const auth = useAuth();
   const [showPassword, setShowPassword] = useState(false);
   const [forgottenPassword, setForgottenPassword] = useState(false);
   const [defaultValues, setDefaultValues] = useState({
      email: 'tuandd.310797@gmail.com',
      password: 'Tuan310779',
      remember: false,
   });
   // console.log(defaultValues)
   const navigate = useNavigate();
   const location = useLocation();
   const methods = useForm({
      resolver: yupResolver(LoginSchema),
      defaultValues,
   });

   const {
      watch,
      handleSubmit,
      formState: { isSubmitting },
      getValues,
   } = methods;

   const onSubmit = (data) => {
      let from = location.state?.from?.pathname || '/';
      auth.login(data.email, data.password, () => {
         return navigate(from, { replace: true });
      });
   };
   const handleStoredUser = (e) => {
      // const value = e.target.checked;
      const data = watch();
      setDefaultValues((previous) => ({
         ...previous,
         remember: data.remember,
      }));
      if (!data.remember) {
         // console.log(data.remember)
         window.localStorage.setItem('email', data.email);
         window.localStorage.setItem('password', data.password);
         window.localStorage.setItem('remember', e.target.checked);
      } else {
         window.localStorage.removeItem('email');
         window.localStorage.removeItem('password');
         window.localStorage.removeItem('remember');
      }
   };
   useEffect(() => {
      const email = window.localStorage.getItem('email');
      const password = window.localStorage.getItem('password');
      const remember = window.localStorage.getItem('remember');
      getValues()
      if (remember) {
         let object = {
            email: email,
            password: password,
            remember: remember === 'true' ? true : false,
         };
         setDefaultValues((e) => ({ ...object }));
         // getValues(object)
      }
   }, []);

   return (
      <>
         {!forgottenPassword ? (
            <Box sx={style}>
               <Typography variant='h3' textAlign='center'>
                  Login
               </Typography>
               <FormProvider
                  methods={methods}
                  onSubmit={handleSubmit(onSubmit)}
               >
                  <Stack spacing={3}>
                     {auth.errorMessage && (
                        <Alert severity='error'>
                           The email address or password you entered isn't
                           connected to an account.{' '}
                           <Link to={'/signup'}> Create account.</Link>
                        </Alert>
                     )}
                     <FTextField name='email' label='Email' />
                     <FTextField
                        name='password'
                        label='Password'
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                           endAdornment: (
                              <InputAdornment position='end'>
                                 <IconButton
                                    aria-label='toggle password visibility'
                                    onClick={() => setShowPassword((e) => !e)}
                                    onMouseDown={(e) => e.preventDefault()}
                                    edge='end'
                                 >
                                    {showPassword ? (
                                       <VisibilityOff
                                          sx={{
                                             color: (theme) =>
                                                theme.palette.primary
                                                   .contrastText,
                                          }}
                                       />
                                    ) : (
                                       <Visibility
                                          sx={{
                                             color: (theme) =>
                                                theme.palette.primary
                                                   .contrastText,
                                          }}
                                       />
                                    )}
                                 </IconButton>
                              </InputAdornment>
                           ),
                        }}
                     />
                  </Stack>
                  <Stack>
                     <FCheckBox
                        name='remember'
                        label='Remember me'
                        onClick={(e) => handleStoredUser(e)}
                     />
                  </Stack>
                  <LoadingButton
                     size='large'
                     type='submit'
                     variant='contained'
                     loading={isSubmitting}
                     sx={{
                        display: 'flex',
                        m: '0 auto',
                     }}
                  >
                     Login
                  </LoadingButton>
               </FormProvider>

               <Box
                  sx={{
                     display: 'flex',
                     flexWrap: 'wrap',
                     justifyContent: 'center',
                     typography: 'body1',
                     '& > :not(style) + :not(style)': {
                        ml: 2,
                     },
                     mt: 2,
                  }}
               >
                  <LinkRoute
                     value={'Sign up for PhimHay.com'}
                     pathname={'/signUp'}
                  />
                  <Typography
                     onClick={() => setForgottenPassword((e) => !e)}
                     sx={{
                        textDecoration: 'underline',
                        textDecorationColor: 'rgba(25, 118, 210, 0.4)',
                        color: '#1976d2',
                        lineHeight: 1.43,
                        fontSize: '0.875rem',
                        cursor: 'pointer',
                        ':hover': {
                           filter: 'brightness(120%)',
                           color: '#646cff',
                        },
                     }}
                  >
                     Forgotten password ?
                  </Typography>
               </Box>
            </Box>
         ) : (
            <ResetPassword setForgottenPassword={setForgottenPassword} />
         )}
      </>
   );
}

export default Login;
