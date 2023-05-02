import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, Link } from 'react-router-dom';
import * as Yup from 'yup';
import {
   Alert,
   InputAdornment,
   Stack,
   Typography,
   Box,
   Button,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { LoadingButton } from '@mui/lab';
import { FCheckBox, FormProvider, FTextField } from '../components/form';
import useAuth from '../hooks/useAuth';
import FCheckbox from '../components/form/fCheckBox';

const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
const signUpSchema = Yup.object().shape({
   username: Yup.string().email('Must enter email').required(),
   password: Yup.string()
      .required()
      .matches(
         passwordRegExp,
         'Password contain at least one numeric digit, one uppercase and one lowercase letter',
      ),
   passwordConfirmation: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Passwords must match',
   ),
});
const defaultValues = {
   username: '',
   password: '',
   passwordConfirmation: '',
   kids: false,
};

const styleSignUp = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: 400,
   height: 'auto',
   backgroundColor: 'black',
   border: '2px solid #000',
   boxShadow: 24,
   p: 2,
   color: 'white',
   opacity: 0.8,
};
const styleVerified = {
   ...styleSignUp,
   width: 400,
   height: 200,
};

function SignUp() {
   const { createUser, errorMessage, verified } = useAuth();
   const [showPassword, setShowPassword] = useState(false);
   const [getVerified, setGetVerified] = useState(false);
   const navigate = useNavigate();
   const methods = useForm({
      resolver: yupResolver(signUpSchema),
      defaultValues,
   });

   const {
      handleSubmit,
      formState: { isSubmitting },
   } = methods;

   const onSubmit = async (data) => {
      // console.log(auth);
      const registerSuccess = await createUser(data.username, data.password);
      if (registerSuccess) {
         setGetVerified((e) => !e);
      }
   };
   const handleCallback = async () => {
      await verified(() => {
         navigate('/login');
      });
   };
   return (
      <Box sx={!getVerified ? styleSignUp : styleVerified}>
         <Typography variant='h3' textAlign='center'>
            {getVerified ? 'Sign up success' : 'Sign Up'}
         </Typography>
         {!getVerified ? (
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
               <Stack spacing={3}>
                  {errorMessage && (
                     <Alert severity='error'>{errorMessage}</Alert>
                  )}
                  <FTextField name='username' label='Username' />
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
                                             theme.palette.primary.contrastText,
                                       }}
                                    />
                                 ) : (
                                    <Visibility
                                       sx={{
                                          color: (theme) =>
                                             theme.palette.primary.contrastText,
                                       }}
                                    />
                                 )}
                              </IconButton>
                           </InputAdornment>
                        ),
                     }}
                  />
                  <FTextField
                     name='passwordConfirmation'
                     label='Password Confirmation'
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
                                             theme.palette.primary.contrastText,
                                       }}
                                    />
                                 ) : (
                                    <Visibility
                                       sx={{
                                          color: (theme) =>
                                             theme.palette.primary.contrastText,
                                       }}
                                    />
                                 )}
                              </IconButton>
                           </InputAdornment>
                        ),
                     }}
                  />
                  <FCheckbox
                     name='kids'
                     label='Children`s profiles give parents control, allowing you to restrict the age rating of the content your kids can see'
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
                     mt: 3,
                  }}
               >
                  Sign Up
               </LoadingButton>
            </FormProvider>
         ) : (
            <Typography variant='p' textAlign='center'>
               You have successfully registered,Click on the
               <Button onClick={handleCallback}>Link</Button>
               in your email to verify your account
            </Typography>
         )}
      </Box>
   );
}

export default SignUp;
